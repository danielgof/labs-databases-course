import React, { useState } from 'react';
import './AddPhoneToUser.css';

const AddPhoneToUser = (props) => {
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
  
    let handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const body = JSON.stringify({
        id: props.id,
        phone: phone
      })
  
      const headers = new Headers({
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(body).length
      })
        console.log(JSON.stringify({
          id: props.id,
          phone: phone
        }))
        let res = await fetch("http://localhost:5000/api/v1/add_phone_to_user", {
          method: "POST",
          mode: "cors",
          headers: headers,
          body: body
        });
        // let resJson = await res.json();
        if (res.status === 200) {
            setPhone("");
          setMessage("Новый номер телефона успешно добавлен");
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
        <form className="add-phone-to-user" onSubmit={handleSubmit}>
          <input
            type="text"
            value={phone}
            placeholder="введите телефон в формате: **********"
            pattern = "[0-9]{10}"
            onChange={(e) => setPhone(e.target.value)}
          />  
          <button className="btn-add-user" type="submit">
            Добавить телефон пользователю
          </button>
  
          <div className="message">{message ? <p>{message}</p> : null}</div>
        </form>
      </div>
    );
}
export default AddPhoneToUser;