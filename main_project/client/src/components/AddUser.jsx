import { useState } from "react";

const AddUser = () => {
  
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const body = JSON.stringify({
      name: name,
      lastname: lastname,
      phonenumber: phonenumber
    })

    const headers = new Headers({
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(body).length
    })
      console.log(JSON.stringify({
        name: name,
        lastname: lastname,
        phonenumber: phonenumber
      }))
      let res = await fetch("http://localhost:5000/api/add_person", {
        method: "POST",
        mode: "cors",
        headers: headers,
        body: body
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        setName("");
        setLastname("");
        setPhonenumber("");
        setMessage("User added to database successfully");
        // navigate("/home");
      } 
      else {
        setMessage("Возникла ошибка при добавлении пользователя");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={lastname}
          placeholder="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          value={phonenumber}
          placeholder="phonenumber"
          onChange={(e) => setPhonenumber(e.target.value)}
        />

        <button type="submit">Add user</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}


export default AddUser;