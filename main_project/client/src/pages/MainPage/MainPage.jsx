import React from 'react';
import NumVisitors from '../../components/NumVisitors/NumVisitors';
import './MainPage.css';
import logo from './arc.drawio.png';

const StartPage = () => {
  return (
    <div className='container'>
      <div className='block'>
        <h2>Начальная страница</h2>
        <NumVisitors />
        <div className='main-page-info'>
          <div className='img'>
            <img className='img' src={logo} alt="Logo"/>
          </div>
          <div className='text'>
            <p className='home'>
            Общая часть
            </p>
            <p className='home'> 
              Реализовать в проекте все нереализованные операции.
              Реализовать недостающие проверки на ограничения целостности и размер полей.
              Найти и устранить возможную SQL-инъекцию.
              Переписать проект на работу с СУБД PostgreSQL. </p>
            <p className='home' >Индивидуальные задания (по вариантам)
            Вариант 1
            Добавить таблицу "Должности" с полями: отдел, зарплата, должность.
            Сделать постраничный просмотр людей.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartPage