import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    const result = await axios.post("/api/images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setImage(result);

    console.log(result);

    console.log(image);
  };

  const [oo, setOO] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/mama",
    })
      .then((res) => setOO(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          filename={file}
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
        ></input>
        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>

      {oo.map((data) => {
        const qq = "http://localhost:8080/images/" + data;
        return (
          <div key={data}>
            <img height="100px" weight="50px" alt="sdfsdf" src={qq} />
          </div>
        );
      })}
    </div>
  );
}

export default App;
