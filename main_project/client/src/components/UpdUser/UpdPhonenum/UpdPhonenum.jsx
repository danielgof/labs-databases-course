import { useState } from "react";
import './UpdPhonenum.css';

const UpdPhonenum = (props) => {
  
    const [phonenumber_new, setNumber] = useState("");
    const [message, setMessage] = useState("");
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const body = JSON.stringify({
        phonenumber_new: phonenumber_new,
        phonenumber: props.phonenumber
      })
  
      const headers = new Headers({
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(body).length
      })
        console.log(JSON.stringify({
        phonenumber_old: props.phonenumber,
        phonenumber_new
        }))
        let res = await fetch("http://localhost:5000/api/v1/upd_phone", {
          method: "PUT",
          mode: "cors",
          headers: headers,
          body: body
        });
        // let resJson = await res.json();
        if (res.status === 200) {
          setNumber("");
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
        <form className="add-user-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={phonenumber_new}
            placeholder="номер телефона"
            onChange={(e) => setNumber(e.target.value)}
          />  
          <button className="btn-add-user" type="submit">
            Изменить номер телефона пользователя
          </button>
  
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    );
}
export default UpdPhonenum;