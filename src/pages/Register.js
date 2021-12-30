import React from "react";
import { Row, Col, Form, Input,Select } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from "../redux/actions/userActions";
import AOS from 'aos';
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import {useState} from 'react';
import axios from 'axios';
// ..

AOS.init()
function Register() {
  const dispatch = useDispatch()
  const [file,setFile]= useState(null)
  const { Option } = Select;

  const { loading } = useSelector(state => state.alertsReducer)

const hanldeFilChange =(e)=>{
  const fileUpload = e.target.files[0]
  const formData = new FormData()
  formData.append("file",fileUpload)
  formData.append("upload_preset","osq9zyxx")

  axios.post('https://api.cloudinary.com/v1_1/hasibul-hasan/image/upload',formData)
  .then((response)=>{
    console.log(response.data.url);
    setFile(response.data.url)
  })
  
}


  function onFinish(values) {
    const newValue = {...values}
    newValue.upload = file;
    console.log(newValue);
    dispatch(userRegister(newValue))
  }

  return (
    <div className="login">
      {loading && (<Spinner />)}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={12} style={{ position: "relative" }}>
          <img
            className='w-100'
            data-aos='slide-left'
            data-aos-duration='1500'
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80" />
          <h1 className="login-logo">HT Car Sharing</h1>
        </Col>
        <Col lg={12} className="text-left p-5">
          <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
            <h1>Register</h1>
            <hr />
            <Row gutter={16}>
              <Col lg={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[{ required: true }]}
                >
                  <Input/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={12}>
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true }]}
                >
                  <Input type="password" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true }]}
                >
                  <Input type="email" />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true }]}
                >
                  <Input type="phone" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col lg={12}>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select defaultValue="select">
                    <Option disabled value="select" >Select</Option>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">others</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name="nid"
                  label="National Id"
                  rules={[{ required: true }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
           
            <Row gutter={16}>
              <Col lg={12}>
              <Form.Item
                  name="pAddress"
                  label="Permanent Address"
                  rules={[{ required: true }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
              <Col lg={12}>
                <Form.Item
                  name="currentAddress"
                  label="Current address"
                  rules={[{ required: true }]}
                >
                  <Input type="text" />
                </Form.Item>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col lg={12}>
              <Form.Item
                  name="upload"
                  label="Upload"
                  rules={[{ required: true }]}
                >
                  <Input onChange={hanldeFilChange} type="file" />
                </Form.Item>
              </Col>
              <Col lg={12}>
                
              </Col>
            </Row>
            <button className="btn1 mt-2 mb-3">Register</button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
