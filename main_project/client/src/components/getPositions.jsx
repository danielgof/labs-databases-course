import React, { useState, useEffect } from 'react';

const GetPositionsData = () => {
  const [data, getData] = useState([])
  const URL = 'http://127.0.0.1:5000/get_all_positions';

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
                  <th>Отдел</th>
                  <th>Зарплата</th>
                  <th>Должность</th>
              </tr>
                {data.map((item, i) => (
                // console.log(data.result),
                  <tr key={i}>
                      <td>{item.departament}</td>
                      <td>{item.salary}</td>
                      <td>{item.position}</td>
                      {/* <td>{item.result.position_id}</td> */}
                  </tr>
             ))}
          </tbody>
      </>
  );
}

export default GetPositionsData;
