import React from 'react';
import logo from './logo.png';

const StartPage = () => {
  return (
    <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Начальная страница</h2>
        <a href="/phones" >
            <button className="Btn">
            Номера телефонов
            </button>
        </a>
        <a href="/users" >
            <button className="Btn">
            Данные о сотрудниках
            </button>
        </a>
        <a href="/positions" >
            <button className="Btn">
            Должности
            </button>
        </a>
    </div>
  )
}

export default StartPage