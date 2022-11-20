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
              console.log(response.result);
              getData(response);
          })
  }

  return (
      <>
          <tbody>
              <tr>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  {/* <th>Должность</th> */}
              </tr>
                {data.map((item, i) => (
                // console.log(data.result),
                  <tr key={i}>
                      <td>{item.first_name}</td>
                      <td>{item.last_name}</td>
                      {/* <td>{item.result.position_id}</td> */}
                  </tr>
             ))}
          </tbody>
      </>
  );
}

export default GetUsersData;
