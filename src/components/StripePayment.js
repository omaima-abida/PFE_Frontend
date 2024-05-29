// import '../../App.css';
import StripeCheckout from 'react-stripe-checkout';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useParams } from "react-router-dom";

const MySwal = withReactContent(Swal);

function StripePayment() {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);
  const publishableKey = 'pk_test_51PJ44VRtSxlhOmShWUoyZY63YxpJeRO3WNTN9oJleYzIidVo4OS8GkbMOdTd8aNQ1fQ5mEvu5KKDVjPijyywkMFA00YeNhnrEB';

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3001/bookings/${bookingId}`);
        const booking = await response.json();
        setTotalPrice(booking.totalPrice);
      } catch (err) {
        console.error("Failed to fetch booking details:", err);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleSuccess = async () => {
    // update payed in ("/edit/:BookingId"
    // update booking status to "payed"
    // update booking status to "payed"

    const respone = await fetch(`http://localhost:3001/bookings/edit/${bookingId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ payed : true})
    });
    const data = await respone.json();
    console.log(data);




    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      timer: 6000,
    });
    window.location = "/";
  };

  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      timer: 4000,
    });
    navigate('/');
  };

  const payNow = async (token) => {
    console.log(JSON.stringify(token));
    try {
      const response = await axios({
        url: 'http://localhost:3001/api/payment',
        method: 'post',
        data: {
          amount: totalPrice * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
      }
    } catch (error) {
      handleFailure();
      console.log(error);
    }
  };

  return (
    <div className="home-container">
      <div className="products">
        <div className="product">
          <h2>Complete payment</h2>
          <p>Total: {totalPrice} TND</p>
          <StripeCheckout
            stripeKey={publishableKey}
            label="Pay Now"
            name="Pay With Credit Card"
            billingAddress
            shippingAddress
            amount={totalPrice * 100}
            description={`Your total is ${totalPrice} TND`}
            token={payNow}
          />
        </div>
      </div>
    </div>
  );
}

export default StripePayment;
