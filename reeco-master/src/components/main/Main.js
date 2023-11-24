import React from 'react';
import OrderInfo from '../orderInfo/OrderInfo';
import OrderData from '../orderData/OrderData';
import './main.css'

function Main() {
  return (
    <div className='main'>
      <OrderInfo />
      <OrderData />
    </div>
  );
}

export default Main;
