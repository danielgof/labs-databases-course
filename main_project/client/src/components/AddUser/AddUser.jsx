import { useState } from "react";
import './AddUser.css'

const AddUser = () => {
  const [firstname, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [position, setPosition] = useState("");
   const [phonenumber, setPhonenumber] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const body = JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      position: position,
      phonenumber: phonenumber
    })

    const headers = new Headers({
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(body).length
    })
      console.log(JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      position: position,
      phonenumber: phonenumber
      }))
      let res = await fetch("http://localhost:5000/api/v1/add_person", {
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
        setPosition("");
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

  const [category, setCategory] = useState('');

  const handleCategoryChange = (category) => {
     setCategory(category);
     console.log(category);
  }

  return (
    <div className="add-user">
      <form className="add-user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstname}
          placeholder="имя"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={lastname}
          placeholder="фамилия"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          value={position}
          placeholder="должность"
          list="positions"
          onChange={(e) => setPosition(e.target.value)}
        />
          {/* <datalist id="positions">
            <option value="Boston">
            <option value="Cambridge">
          </datalist> */}
        <select name="category" value={category} onChange={event => handleCategoryChange(event.target.value)}>
          <option id="0" >Personal</option>
          <option id="1" >Work</option>
        </select>
        <input
          type="text"
          value={phonenumber}
          placeholder="номер телефона"
          onChange={(e) => setPhonenumber(e.target.value)}
        />

        <button className="btn-add-user" type="submit">
          Добавить пользователя
        </button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}


export default AddUser;