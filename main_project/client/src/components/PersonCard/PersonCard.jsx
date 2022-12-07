import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import './PersonCard.css';

const PersonCard = (props, {data}) => {
  const [showA, setShowA] = useState(false);
  const [message, setMessage] = useState("");
  const toggleShowA = () => setShowA(!showA);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
    const body = JSON.stringify({
      phonenumber: props.phone
    })

    const headers = new Headers({
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(body).length
    })
      console.log(JSON.stringify({
        phonenumber: props.phone
      }))
      let res = await fetch("http://127.0.0.1:5000/api/v1/delete_person", {
        method: "DELETE",
        mode: "cors",
        headers: headers,
        body: body
      });
      // let resJson = await res.json();
      if (res.status === 200) {
        setMessage(`Пользователь ${props.name} был удалён из базы данных`);
        // navigate("/home");
      } 
      else {
        setMessage("Произошла ошибка при удалении пользователя");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card className='container'>
      <Card.Body>
        <Card.Title>
          <CloseButton className='delete-person'
          onClick={handleClick} />
        </Card.Title>
        <Card.Text className='text-card'>
          <div className='person-card-img-container'>
            <div className='person-card-img'>
              <img src="https://eu.ui-avatars.com/api/?name=John+Doe&size=150" alt="avatar"/>
            </div>
            <div className='person-card-maindata'>
              Должность: {props.position}
              <br />
              Имя: {props.name}
              <br />
              Фамилия: {props.lastname}
            </div>
          </div>
        </Card.Text>
          <Button className='btn-dop-info'
            onClick={toggleShowA}>
            Дополнительная информация
          </Button>
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Доп.инфа</strong>
            </Toast.Header>
            <Toast.Body>
              Зарплата: {props.salary}
              <br />
              Отдел: {props.department}
              <br />
              Номер телефона: {props.phone}
            </Toast.Body>
          </Toast>
      </Card.Body>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </Card>
  );
}

export default PersonCard;