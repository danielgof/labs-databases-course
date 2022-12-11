import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import './PersonCard.css';
import UpdFirstname from '../UpdUser/UpdFirstname/UpdFirstname';
import UpdLastname from '../UpdUser/UpdLastname/UpdLastname';
import UpdPhonenum from '../UpdUser/UpdPhonenum/UpdPhonenum';
import UpdUserPosition from '../UpdUser/UpdUserPosition/UpdUserPosition';
import AddPhoneToUser from '../AddPhoneToUser/AddPhoneToUser';
import DeletePhone from '../DeletePhone/DeletePhone';


const PersonCard = (props, {data}) => {
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [showC, setShowC] = useState(false);
  const [message, setMessage] = useState("");
  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);
  const toggleShowC = () => setShowC(!showC);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
    const body = JSON.stringify({
      id: props.id
    })

    const headers = new Headers({
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(body).length
    })
      console.log(JSON.stringify({
        id: props.id
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
          <Button className='btn-dop-info'
            onClick={toggleShowB}>
            Изменить информацию пользователю
          </Button>
          <Button className='btn-dop-info'
            onClick={toggleShowC}>
            Добавить телефон пользователю
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
              Номера телефона: 
              {props.phone.map((phone, i) => (
                <div key={i}>
                  {phone}
                  <DeletePhone phone={phone}/>
                </div>
              ))}
            </Toast.Body>
          </Toast>
          <Toast show={showB} onClose={toggleShowB}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">изменение информации пользователя</strong>
            </Toast.Header>
            <Toast.Body>
              <UpdFirstname id={props.id}/>
              <UpdLastname id={props.id}/>
              <UpdPhonenum id={props.id}/>
              <UpdUserPosition id={props.id}/>
            </Toast.Body>
          </Toast>
          <Toast show={showC} onClose={toggleShowC}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Добавить телефон пользователю</strong>
            </Toast.Header>
            <Toast.Body>
              <AddPhoneToUser id={props.id}/>
            </Toast.Body>
          </Toast>
      </Card.Body>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </Card>
  );
}

export default PersonCard;