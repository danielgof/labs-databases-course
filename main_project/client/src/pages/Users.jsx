import React from 'react'
import GetUsersData from '../components/getUsersData'

const Users = () => {
  return (
    <div>
      <p>Данные о сотрудниках</p>
      <GetUsersData />
      <a href="/" >
        <button className="Btn">
        Вернуться домой
        </button>
      </a>
    </div>
  )
}

export default Users