import React from 'react'
import GetPositionsData from "../components/getPositions"

const Positions = () => {
  return (
    <div>
      <p>Информация о должностях</p>
      <hr></hr>
      <GetPositionsData />

      <a href="/" >
        <button className="Btn">
        Вернуться домой
        </button>
      </a>
    </div>
  )
}

export default Positions