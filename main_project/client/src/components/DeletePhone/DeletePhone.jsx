import { useState } from 'react'
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

const DeletePhone = (props) => {
    const [message, setMessage] = useState("");
    const handleClick = async (e) => {
      e.preventDefault();
      try {
      const body = JSON.stringify({
        phone: props.phone
      })
  
      const headers = new Headers({
          "Content-Type": "application/json",
          "Content-Length": JSON.stringify(body).length
      })
        console.log(JSON.stringify({
            phone: props.phone
        }))
        let res = await fetch("http://localhost:5000/api/v1/delete_phone", {
          method: "DELETE",
          mode: "cors",
          headers: headers,
          body: body
        });
        // let resJson = await res.json();
        if (res.status === 200) {
          setMessage(`Телефон был удален из базы данных`);
          // navigate("/home");
        } 
        else {
          setMessage("Произошла ошибка при удалении телефона");
        }
      } catch (err) {
        console.log(err);
      }
    }
    return (
      <Card className='container'>
          <Card.Title>
            <CloseButton className='delete-phone'
            onClick={handleClick} />
          </Card.Title>
         <div className="message">{message ? <p>{message}</p> : null}</div>
      </Card>
    );
}
export default DeletePhone;