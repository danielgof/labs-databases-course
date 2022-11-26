import React, { useState, useEffect } from 'react';
import PersonCard from '../components/PersonCard';

const Users = () => {

  const [data, getData] = useState([])
  const URL = 'http://127.0.0.1:5000/api/v1/get_all_people_data';

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
    <div className='container'>
      <div className='block'>
        {data.map((item, i) => (
          <div key={i}>
            <PersonCard 
            position={item.position} 
            name={item.first_name}
            lastname={item.last_name}
            salary={item.salary} 
            department={item.departament}
            phone={item.phone}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users;
  