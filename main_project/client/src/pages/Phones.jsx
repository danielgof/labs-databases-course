import React from 'react'
import GetPhoneNum from '../components/getPhoneNum'

const Phones = () => {
  return (
    <div>
      <p>Номера телефонов</p>
      <GetPhoneNum />
      <a href="/" >
        <button className="Btn">
        Вернуться домой
        </button>
      </a>
    </div>
  )
}

export default Phones