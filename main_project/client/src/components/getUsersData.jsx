import React, { useState, useEffect } from 'react';

const GetUsersData = () => {
  const [data, getData] = useState([])
  const URL = 'http://127.0.0.1:5000/get_all_people_data';

  useEffect(() => {
      fetchData()
  }, [])

  const fetchData = () => {
      fetch(URL)
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
                  <th>Идентификатор</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Должность</th>
              </tr>
              {data.map((item, i) => (
                  <tr key={i}>
                      <td>{item.id}</td>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      <td>{item.position_id}</td>
                  </tr>
              ))}
          </tbody>
      </>
  );
}

export default GetUsersData;