import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row } from "antd";
import Spinner from '../components/Spinner';
import moment from "moment";
function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <h3 className="text-center mt-2">My Bookings</h3>

      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>

          {
            bookings.filter(o => o.user == user._id).map((booking) => {

              return <Row gutter={16} style={{ borderRadius: '10px' }} className="bs1 p-4 mt-3 text-left">
                <Col lg={9} sm={24}>
                  <p><b>Car Name : {booking.car.name}</b></p>
                  <p>From: <b>{booking.from}</b></p>
                  <p>To: <b>{booking.to}</b></p>
                  <p>Contact : <b>{booking.contactNumber}</b></p>
                  <p>Total km : <b>{booking.totalHours} km</b></p>
                  <p>Rent per km : <b>{booking.car.rentPerHour} BDT</b></p>
                  <p>Total amount : <b>{booking.totalAmount} BDT </b></p>
                  <p>Booking Count : <b>{booking.bookingCount}</b></p>
                </Col>

                <Col lg={9} sm={24}>
                  <p>Transaction Id : <b>{booking.transactionId}</b></p>
                  <p>Date of booking: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                  <p>Travel Day : <b>{booking.travelDate}</b></p>
                  <p>Travel Time : <b>{booking.travelTime}</b></p>
                  <p>Travel last Time : <b>{booking.bookingLastTime}</b></p>
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                  <img style={{ borderRadius: 5 }} src={booking.car.image} height="140" className="p-2" />
                </Col>
              </Row>
            })}

        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
