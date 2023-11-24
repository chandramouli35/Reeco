import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, updateData } from './orderDataSlice';

import './orderData.css';

function OrderData() {
  const [crossPopup, setCrossPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [id, setId] = useState(null);
  const [newPrice, setNewPrice] = useState(0);
  const [newQuantity, setNewQuantity] = useState(0);

  const data = useSelector((state) => state.orderData.orderData);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(fetchData());
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCross = (id) => {
    setCrossPopup(true);
    setId(id);
  };

  const handleDone = (id) => {
    dispatch(updateData({ id, status: 'Approved' }));
  };

  const closePopup = () => {
    setCrossPopup(false);
    setId(null);
  };

  const handleNo = () => {
    dispatch(updateData({ id, status: 'Missing' }));
    setCrossPopup(false);
  };

  const handleYes = () => {
    dispatch(updateData({ id, status: 'Missing-Urgent' }));
    setCrossPopup(false);
  };

  const handleEditModal = (id) => {
    setEditPopup(true);
    setNewPrice(data[id].price);
    setNewQuantity(data[id].quantity);
    setId(id);
  };

  const closeEditPopup = () => {
    setEditPopup(false);
    setId(null);
  };

  const handlePriceChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setNewPrice(Number(e.target.value));
  };

  const handleQuantityChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setNewQuantity(Number(e.target.value));
  };

  const handleSend = () => {
    if (data[id].price !== newPrice && data[id].quantity === newQuantity) {
      dispatch(
        updateData({
          id,
          status: 'Price updated',
          price: newPrice,
          quantity: newQuantity,
          total: newPrice * newQuantity,
        })
      );
    } else if (
      data[id].quantity !== newQuantity &&
      data[id].price === newPrice
    ) {
      dispatch(
        updateData({
          id,
          status: 'Quantity updated',
          price: newPrice,
          quantity: newQuantity,
          total: newPrice * newQuantity,
        })
      );
    } else if (
      data[id].quantity !== newQuantity &&
      data[id].price !== newPrice
    ) {
      dispatch(
        updateData({
          id,
          status: 'Quantity and price updated',
          price: newPrice,
          quantity: newQuantity,
          total: newPrice * newQuantity,
        })
      );
    }

    closeEditPopup();
  };

  return (
    <>
      <div className='order-data'>
        <div className='head'>
          <div className='search'>
            <input placeholder='Search...' />
          </div>
          <div className='add-print'>
            <button className='back add-item'>Add item</button>
            <span className='material-symbols-outlined icon print'>print</span>
          </div>
        </div>

        <div>
          <table>
            <tr>
              <th></th>
              <th>Product name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className='image'>
                    <img src='./avocado.jpg' alt='avocado' />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.brand}</td>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.total}</td>
                  <td className='backg'>
                    <div className={`status status-${item.status}`}>
                      {item.status}
                    </div>
                  </td>
                  <td className='backg'>
                    <span
                      className={`material-symbols-outlined icon-cta done-${item.status}`}
                      onClick={() => {
                        handleDone(item.id);
                      }}
                    >
                      done
                    </span>
                  </td>
                  <td className='backg'>
                    <span
                      className={`material-symbols-outlined icon-cta close-${item.status}`}
                      onClick={() => {
                        handleCross(item.id);
                      }}
                    >
                      close
                    </span>
                  </td>
                  <td
                    className='edit-cta backg'
                    onClick={() => {
                      handleEditModal(item.id);
                    }}
                  >
                    edit
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      {crossPopup && (
        <div className='cross-popup'>
          <div className='popup-content'>
            <span className='close-button' onClick={closePopup}>
              &times;
            </span>
            <h2 className='dialog-title'>Missing Product</h2>

            <p className='dialog-question'>
              Is {`'${data[id].productName}...'`} urgent?
            </p>

            <div className='buttons-container'>
              <button className='buttons' onClick={handleNo}>
                No
              </button>
              <button className='buttons' onClick={handleYes}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {editPopup && (
        <div className='cross-popup'>
          <div className='edit-popup-content'>
            <span className='close-button' onClick={closeEditPopup}>
              &times;
            </span>
            <h3 className='dialog-title'>{`${data[id].productName}...`}</h3>

            <div className='edit-container'>
              <img src='./apple.png' className='edit-image' alt='apple' />

              <div>
                <div className='edit-inputs'>
                  <p>Price($)</p>
                  <input value={newPrice} onChange={handlePriceChange} />
                </div>
                <div className='edit-inputs'>
                  <p>Quantity</p>
                  <input value={newQuantity} onChange={handleQuantityChange} />
                </div>
                <div className='edit-inputs'>
                  <p>Total</p>
                  <p>${newPrice * newQuantity}</p>
                </div>
              </div>
            </div>

            <div className='r-container'>
              <div>
                <b>Choose reason</b>
                <p className='optional'>(Optional)</p>
              </div>
              <div className='reasons-container'>
                <p className='reasons'>Missing Product</p>
                <p className='reasons'>Quantity is not the same</p>
                <p className='reasons'>Price is not the same</p>
                <p className='reasons'>Other</p>
              </div>
            </div>

            <div className='buttons-container'>
              <button className='back' onClick={closeEditPopup}>
                Cancel
              </button>
              <button className='send-btn' onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrderData;
