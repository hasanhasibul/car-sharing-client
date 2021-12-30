import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import AOS from 'aos';

import 'aos/dist/aos.css'; // You can also use <link> for styles
import MapContainer from './../components/MapContainer';
import LocationSearchInputTo from "../components/LocationSearchInputTo";
import LocationSearchInputFrom from './../components/LocationSearchInputFrom';
import {
  toLatLon, toLatitudeLongitude, headingDistanceTo, moveTo, insidePolygon
} from 'geolocation-utils'

import { useContext } from 'react';
import { MyContext } from './../App';

const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const [to, setTo, from, setFrom] = useContext(MyContext);
  const [km, setKm] = useState()
  const [bookings, setBookings] = useState([])
  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const [closeTime, setCloseTime] = useState(false)
  const dispatch = useDispatch();
  const [bookingCount, setBookingCount] = useState(0)

  const [showModal, setShowModal] = useState(false);
  let km2 = [];
  if (Object.keys(to).length && Object.keys(from).length) {

    km2.push(headingDistanceTo(to, from))
  }
  else {
    console.log("error");
  }

  const handleBlur = (e) => {
    if (e.target.value <= AvailableBooking) {
      setBookingCount(e.target.value)
    }
  }
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == match.params.carid));
    }
  }, [cars]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/bookings/getBooking/${match.params.carid}`)
      .then((res => res.json()))
      .then((data) => {
        console.log(data);
        setBookings(data)
      })
  }, [match.params.carid])


  const price = km2.length && Math.round(km2[0].distance / 1000 + 30) * 3 *bookingCount ;
  const totalkm = km2.length && Math.round(km2[0].distance / 1000);
  const AvailableBooking = car.capacity - bookings.length;
  const capacityCar = car.capacity;
  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalHours: totalkm,
      totalAmount: price,
      from: car.from,
      to: car.to,
      bookingCount: bookingCount,
      travelDate: car.travelDate,
      travelTime: car.travelTime,
      bookingLastTime: car.bookingLastTime,
      carNumber: car.carNumber,
      contactNumber: car.phone,
      capacity: car.capacity

    };

    dispatch(bookCar(reqObj));
  }


  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={car.image} className="carimg2 bs1 w-100" data-aos='flip-left' data-aos-duration='1500' />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-center">
          <Divider type="horizontal" dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: "center" }}>
            <p> From : {car.from}</p>
            <p>To: {car.to}</p>
            <p> Car Name : {car.name}</p>
            <p> Contact Number : {car.phone}</p>

            <p> Travel Date : {car.travelDate}</p>
            <p> Travel Time  : {car.travelTime}</p>
            <p> Booking Last Time  : {car.bookingLastTime}</p>
            <p>Max Persons : {car.capacity}</p>
            {
              AvailableBooking == 0 ? <p className="text-danger" >Booking is not Available</p> :
                <p>Available Booking : {AvailableBooking}</p>
            }
          </div>
          <Row gutter={12} className="pt-4" >
            <Col lg={9}>
            <LocationSearchInputFrom ></LocationSearchInputFrom>
              
            </Col>
            <Col lg={9}>
            <LocationSearchInputTo  ></LocationSearchInputTo>
            </Col>
            <Col lg={6}>
              {
                AvailableBooking == 0 ? <input disabled required onChange={handleBlur} type="number" className="form-control " placeholder="not available  " />
                  : <input required onChange={handleBlur} type="number" className="form-control" placeholder=" booking Count " />
              }

            </Col>
          </Row>
          {km2.length && car.from && car.to && (
            <div>

              {
                km2.length ? <p>Distance: <b>{Math.round(km2[0].distance / 1000 + 30)} km</b></p> : <p>Distance: 0km </p>
              }

              {
                km2.length ? <h6>Per Person : {Math.round(km2[0].distance / 1000 + 30) * 3} BDT</h6> : <h3>Total Amount : 0 BDT </h3>
              }
              {
                km2.length ? <h5>Total Amount : {Math.round(km2[0].distance / 1000 + 30) * 3 *bookingCount } BDT</h5> : <h3>Total Amount : 0 BDT </h3>
              }


              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='BDT'
                amount={price * 100}
                stripeKey="pk_test_51GvUxmHspu8WL2jGr3e9tOUJoUOPAoe9ZDu7QuIcnvpRmKGqHaIDe44CRiyIQ1fXiCr3Z9TMiFmEo9dlsl3C70hM00TIi5qYyB"
              >

                {
                  AvailableBooking == 0 ? <button disabled className="btn1 btn btn-danger ">
                    Booking Not available
                  </button> :
                    <button className="btn1">
                      Book Now
                    </button>
                }

              </StripeCheckout>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title="Booked time slots"
          >
            <div className="p-2">
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className="btn1 mt-2">
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className="text-right mt-5">
                <button
                  className="btn1"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
