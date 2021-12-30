import { Col, Row, Form, Input, Select } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { addCar } from '../redux/actions/carsActions'
import axios from 'axios';
import { useState } from 'react';
function AddCar() {
    const { Option } = Select;
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    const [file, setFile] = useState(null)

    const hanldeFilChange = (e) => {
        const fileUpload = e.target.files[0]
        const formData = new FormData()
        formData.append("file", fileUpload)
        formData.append("upload_preset", "osq9zyxx")

        axios.post('https://api.cloudinary.com/v1_1/hasibul-hasan/image/upload', formData)
            .then((response) => {
                console.log(response.data.url);
                setFile(response.data.url)
            })

    }

    function onFinish(values) {
        const newValue = { ...values }
        newValue.image = file;
        values.bookedTimeSlots = []

        dispatch(addCar(newValue))
        console.log(newValue)
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2'>
                    <Form className='bs1 p-4' layout='vertical' onFinish={onFinish}>
                        <h3>Add New Car</h3>
                        <hr />

                        <Row gutter={16} >
                            <Col lg={12} >
                                <Form.Item name='from' label='From' rules={[{ required: true }]}>
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
                            <Col lg={12} >
                                <Form.Item name='to' label='To' rules={[{ required: true }]}>
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
                        </Row>
                        <Row gutter={16} >
                            <Col lg={8}>
                                <Form.Item name='travelDate' label='Travel Date' rules={[{ required: true }]}>
                                    <Input type='date' />
                                </Form.Item>
                            </Col>
                            <Col lg={8}>
                                <Form.Item name='travelTime' label='Travel Time' rules={[{ required: true }]}>
                                    <Input type='time' />
                                </Form.Item>
                            </Col>
                            <Col lg={8}>
                                <Form.Item name='bookingLastTime' label='Booking Last Time' rules={[{ required: true }]}>
                                    <Input type='time' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} >
                            <Col lg={12}>
                                <Form.Item name='name' label='Car name' rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={12}>
                                <Form.Item name='carNumber' label='Car Number' rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16} >
                            <Col lg={12}>
                                <Form.Item name='capacity' label='Capacity' rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={12}>
                                <Form.Item name='rentPerHour' label='Rent per hour' rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16} >
                            <Col lg={12}>
                                <Form.Item name='phone' label='Contact Number' rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col lg={12}>
                                <Form.Item name='dLicence' label='Driving Licence' rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item
                            name="image"
                            label="Upload"
                            rules={[{ required: true }]}
                        >
                            <Input onChange={hanldeFilChange} type="file" />
                        </Form.Item>




                        <div className='text-right'>
                            <button className='btn1'>ADD CAR</button>
                        </div>

                    </Form>
                </Col>
            </Row>

        </DefaultLayout >
    )
}

export default AddCar
