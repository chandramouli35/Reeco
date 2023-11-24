import React from 'react';
import './orderInfo.css';

function OrderInfo() {
  return (
    <div className='order-info'>
      <div className='container'>
        <div className='item'>
          <div className='heading'>Supplier</div>
          <div className='info'> East coast fruits & vegetables</div>
        </div>
        <div className='item'>
          <div className='heading'>Shipping date</div>
          <div className='info'>Thu, Feb 10</div>
        </div>
        <div className='item'>
          <div className='heading'>Total</div>
          <div className='info'> $ 15,028.3</div>
        </div>
        <div className='item'>
          <div className='heading'>Category</div>
          <div className='icons'>
            <div className='row1'>
              <span className='material-symbols-outlined icon'>
                restaurant_menu
              </span>
              <span className='material-symbols-outlined icon'>restaurant</span>
              <span className='material-symbols-outlined icon'>ac_unit</span>
              <span className='material-symbols-outlined icon'>water</span>
            </div>
            <div className='row2'>
              <span className='material-symbols-outlined icon'>nights_stay</span>
              <span className='material-symbols-outlined icon'>
                devices_wearables
              </span>
              <span className='material-symbols-outlined icon'>mode_dual</span>
              <span className='material-symbols-outlined icon'>storm</span>
            </div>
          </div>
        </div>
        <div className='item'>
          <div className='heading'>Department</div>
          <div className='info'> 300-444-678</div>
        </div>
        <div className='item last'>
          <div className='heading'>Status</div>
          <div className='info'> Awaiting your approval</div>
        </div>
      </div>
    </div>
  );
}

export default OrderInfo;
