import { useState } from "react";
import './UpdFirstname.css';

const UpdFirstname = (props) => {
  
    const [firstname, setName] = useState("");
    const [message, setMessage] = useState("");
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const body = JSON.stringify({
        id: props.id,
        firstname_new: firstname
      })
  
      const headers = new Headers({
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(body).length
      })
        console.log(JSON.stringify({
          id: props.id,
          firstname_new: firstname
        }))
        let res = await fetch("http://localhost:5000/api/v1/upd_firstname", {
          method: "PUT",
          mode: "cors",
          headers: headers,
          body: body
        });
        // let resJson = await res.json();
        if (res.status === 200) {
          setName("");
          setMessage("Данные успешно изменены");
          // navigate("/home");
        } 
        else {
          setMessage("Возникла ошибка при изменение данных");
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="add-user">
        <form className="firstname-upd" onSubmit={handleSubmit}>
          <input
            type="text"
            value={firstname}
            placeholder="имя"
            pattern = "[0-9]{30}"
            onChange={(e) => setName(e.target.value)}
          />  
          <button className="btn-add-user" type="submit">
            Изменить имя пользователя
          </button>
  
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    );
}
export default UpdFirstname;