import React from 'react'
import PersonCard from '../components/PersonCard'

const Users = () => {
  const position = "Инженер ПО";
  const name = "Александр";
  const lastname = "Пушкин";
  const salary = "600.000";
  const department = "Техническая поддержка";
  const phone = "+7 800 500 4000";
  return (
    <div className='container'>
      <div className='block'>
        <PersonCard 
        position={position} 
        name={name}
        lastname={lastname}
        salary={salary} 
        department={department}
        phone={phone}
        />
      </div>
    </div>
  )
}

export default Users