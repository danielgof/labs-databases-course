import React, { useState, useEffect } from 'react';

const GetPhoneNum = () => {
  const [data, getData] = useState([])
  const URL = 'http://127.0.0.1:5000/phone_num';

  useEffect(() => {
      fetchData()
  }, [])

  const fetchData = () => {
      fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            "id":2
        })
      }) 
          .then((res) =>
              res.json())

          .then((response) => {
              console.log(response);
              getData(response);
          })

  }

  return (
      <>
        <tbody>
            <tr>
                <th>Идентификатор пользователя</th>
                <th>Номер телефона</th>
            </tr>
            {data.map((item, i) => (
                <tr key={i}>
                    <td>{item.person_id}</td>
                    <td>{item.phone_num}</td>
                </tr>
            ))}
        </tbody>

      </>
  );
}

export default GetPhoneNum;