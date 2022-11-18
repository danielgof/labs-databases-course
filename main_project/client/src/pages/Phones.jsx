import React from 'react'
import GetPhoneNums from '../components/getPhoneNums'

const Phones = () => {
  return (
    <div>
      <p>Номера телефонов</p>
      <GetPhoneNums />
      <a href="/" >
        <button className="Btn">
        Вернуться домой
        </button>
      </a>
    </div>
  )
}

export default Phones