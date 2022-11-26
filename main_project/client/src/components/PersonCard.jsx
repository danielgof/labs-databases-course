import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';

const PersonCard = (props) => {
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  return (
    <Card style={{ textAlign:'left' }}>
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title>
          {props.position}
        </Card.Title>
        <Card.Text style={{ textAlign: 'left',
                backgroundColor: 'rgb(97, 146, 189)'
        }}>
          Имя: {props.name}
          <br />
          Фамилия: {props.lastname}
        </Card.Text>
          <Button style={{ textAlign: 'left',
                backgroundColor: 'rgb(97, 146, 189)'
            }}
            onClick={toggleShowA} className="mb-2">
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
    </Card>
  );
}

export default PersonCard;