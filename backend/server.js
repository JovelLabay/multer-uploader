const express = require('express')
const fs = require('fs')
const multer = require('multer')

const app = express()
const upload = multer({ dest: 'images/' })

app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName
  const readStream = fs.createReadStream(`images/${imageName}`)
  readStream.pipe(res)
})

app.get('/mama', (req, res) => {
  fs.readdir("./images", (err, file) => {
    if (err) {
      console.error(err);
    } else {
      res.send(JSON.stringify(file))
    }
  })
})

app.post('/api/images', upload.single('image'), (req, res) => {
  const imagePath = req.file.path
  const description = req.body.description

  console.log(description, imagePath)
})

app.listen(8080, () => console.log("listening on port 8080"))