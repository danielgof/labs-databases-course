import React, { useState, useEffect } from 'react';

const GetPhoneNums = () => {
  const [data, getData] = useState([])
  const URL = 'http://127.0.0.1:5000/get_all_phone_num';

  useEffect(() => {
      fetchData()
  }, [])

  const fetchData = () => {
    fetch(URL)
        .then((res) =>
            res.json())

        .then((response) => {
            console.log(response.result);
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
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>

      </>
  );
}

export default GetPhoneNums;