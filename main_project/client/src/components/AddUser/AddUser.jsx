import { useState } from "react";
import './AddUser.css'

const AddUser = () => {
  const [firstname, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [position, setPosition] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState('');
  const position_data = [
    {
        "department": "all",
        "id": 1,
        "position": "CEO",
        "salary": "1000000"
    },
    {
        "department": "all",
        "id": 2,
        "position": "CTO",
        "salary": "650000"
    },
    {
        "department": "Audit",
        "id": 4,
        "position": "CAE",
        "salary": "350000"
    },
    {
        "department": "Audit",
        "id": 5,
        "position": "Auditor",
        "salary": "150000"
    },
    {
        "department": "Artificial Intelligence",
        "id": 6,
        "position": "CAIO",
        "salary": "400000"
    },
    {
        "department": "Artificial Intelligence",
        "id": 7,
        "position": "DS",
        "salary": "200000"
    },
    {
        "department": "new department",
        "id": 9,
        "position": "Sr. SE",
        "salary": "10000000"
    }
];

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setCategory(category);
      const body = JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        position_id: +position,
        phonenumber: phonenumber
      })

      const headers = new Headers({
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(body).length
      })
      console.log(JSON.stringify({
      firstname: firstname,
      lastname: lastname,
      position_id: +position,
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

  return (
    <div className="add-user">
      <form className="add-user-form" onSubmit={handleSubmit}>
        <input className="add-user-data"
          type="text"
          value={firstname}
          placeholder="имя"
          onChange={(e) => setName(e.target.value)}
        />
        <input className="add-user-data"
          type="text"
          value={lastname}
          placeholder="фамилия"
          onChange={(e) => setLastname(e.target.value)}
        />
        <select name="category" 
          value={category} 
          onChange={(e) => setPosition(e.target.value[0])}
          placeholder="Должность"
          >
            {position_data.map((item, i) => (
              <option id={item.id} key={i}>{item.id} {item.department} {item.position}</option>
            ))}
        </select>
        <input className="add-user-data"
          type="tel"
          value={phonenumber}
          placeholder="номер телефона"
          pattern = "\(?(\d{3})\)?[-\.\s]?(\d{3})[-\.\s]?(\d{4})"
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