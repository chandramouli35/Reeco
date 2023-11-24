import React from 'react';
import Navbar from '../navbar/Navbar';
import './header.css';

function Header() {
  return (
    <div className='header'>
      <Navbar />
      <div className='order-nav'>
        <p>
          Orders {'>'} <p className='order'>Order 32457ABC</p>
        </p>
      </div>
      <div className='order-detail'>
        <p className='order-number'>Order 32457ABC</p>

        <div className='cta'>
          <button className='back'>Back</button>
          <button className='approve-order'>Approve Order</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
