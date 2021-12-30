import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row, Divider, DatePicker, Checkbox, Select, Form } from 'antd'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import moment from 'moment'
import { Button } from 'antd';
import { axios } from 'axios';
import { searchCarApi } from './../redux/actions/carsActions';
import { Input } from 'antd';
const { RangePicker } = DatePicker
function Home() {
    const { cars } = useSelector(state => state.carsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalCars, setTotalcars] = useState([])
    const dispatch = useDispatch()
    const { Option } = Select;
    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {

        setTotalcars(cars)

    }, [cars])


    function setFilter(values) {
        var selectedFrom = values.from
        var selectedTo = values.to
        var travelDay = values.travelDate

        let carsNewArray = [];

        for (let i = 0; i < cars.length; i++) {
            const element = cars[i];
            if ( selectedFrom == element.from && selectedTo == element.to  ) {

                carsNewArray.push(cars[i])
            }
            else {
                console.log("car not found");
            }

        }
        setTotalcars(carsNewArray)

    }
    // search function

    return (
        <DefaultLayout>
            <Row className='mt-2' justify='center' gutter={16} >
                <Col lg={12} >
                    <Form className='' layout='vertical' onFinish={setFilter} >
                        <Row gutter={16} >
                            <Col lg={7} >
                                <Form.Item name='from' label='From' rules={[{ required: false }]}>
                                    <Select
                                        showSearch
                                        placeholder="From"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="Bogura">Bogura</Option>
                                        <Option value="Chatmohor">Chatmohor</Option>
                                        <Option value="Dhaka">Dhaka</Option>
                                        <Option value="Sylhet">Sylhet</Option>
                                        <Option value="Cox Bazar">Cox Bazar</Option>
                                        <Option value="Rangpur">Rangpur</Option>
                                        <Option value="Saint Martin">Saint Martin</Option>
                                        <Option value="Chittagong">Chittagong</Option>
                                        <Option value="Pabna">Pabna</Option>
                                        <Option value="Jamalpur">Jamalpur</Option>
                                        <Option value="Jessore">Jessore</Option>
                                        <Option value="Rangamati">Rangamati</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col lg={7} >
                                <Form.Item name='to' label='To' rules={[{ required: false }]}>
                                    <Select
                                        showSearch
                                        placeholder="To"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        <Option value="Bogura">Bogura</Option>
                                        <Option value="Chatmohor">Chatmohor</Option>
                                        <Option value="Dhaka">Dhaka</Option>
                                        <Option value="Sylhet">Sylhet</Option>
                                        <Option value="Cox Bazar">Cox Bazar</Option>
                                        <Option value="Rangpur">Rangpur</Option>
                                        <Option value="Saint Martin">Saint Martin</Option>
                                        <Option value="Chittagong">Chittagong</Option>
                                        <Option value="Pabna">Pabna</Option>
                                        <Option value="Jamalpur">Jamalpur</Option>
                                        <Option value="Jessore">Jessore</Option>
                                        <Option value="Rangamati">Rangamati</Option>
                                    </Select>
                                </Form.Item>

                            </Col>
                            {/* <Col className='' lg={7} >
                                <Form.Item name='travelDate' label='Travel Date' rules={[{ required: false }]}>
                                    <Input type='date' />
                                </Form.Item>
                            </Col> */}
                            <Col className='mt-4 pt-2' lg={3} >
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        search
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

            {loading == true && (<Spinner />)}

            {totalCars.length ? <Row justify='center' gutter={32}>

                {totalCars.map(car => {
                    return <Col lg={6} sm={24} xs={24}>
                        <div className="car p-2 bs1">
                            <img src={car.image} className="carimg" />
                            <Row className='car-content text-left pl-2' >
                                <Col lg={12}>
                                    <p>From : {car.from}</p>
                                </Col>
                                <Col lg={12}>
                                    <p>To : {car.to}</p>
                                </Col>
                            </Row>
                            <Row className='car-content' >
                                <Col lg={24}>
                                    <div className='text-left pl-2'>
                                        <p> Car Name : {car.name}</p>
                                        {/* <p> Rent Per km {car.rentPerHour} /-</p>
                                        <p> Travel Date : {car.travelDate}</p>
                                        <p> Travel Time : {car.travelTime}</p>
                                        <p> Booking Last time : {car.bookingLastTime}</p> */}
                                    </div>
                                </Col>
                                <Col lg={24}>
                                    <div className='mt-4' >
                                        <button className="btn1 "><Link to={`/booking/${car._id}`}>View Details </Link></button>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                    </Col>
                })}

            </Row>
                : <div className='p-4 m-4' >
                    <h1 className='text-danger text-bold' >Car Not Found</h1>
                </div>}

        </DefaultLayout>
    )
}

export default Home
