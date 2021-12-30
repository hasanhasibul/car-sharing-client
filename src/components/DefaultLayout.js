import React from "react";
import { Menu, Dropdown, Button, Space, Row, Col } from "antd";
import { Link } from 'react-router-dom'

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  const menu = (
    <Menu>
      <Menu.Item>
        <a

          href="/"
        >
          Home
        </a>
      </Menu.Item>
      <Menu.Item>
        <Link to="/userbookings" > Bookings </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/addcar" >  Post Car </Link>
      </Menu.Item>
      {
        user.username == "hasibul" && 
        <Menu.Item>
        <Link to="/admin" > Admin </Link>
      </Menu.Item>
      }
      
      <Menu.Item onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login'
      }}>
        <li style={{ color: 'orangered' }}>Logout</li>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <div className="header sticky-top bs1">
        <Row gutter={16} justify='center'>
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex justify-content-between">
              <h1 ><b><a href="/" style={{ color: 'orangered' }}>HT Car Sharing</a></b></h1>

              <div>
                <img className="p-2 rounded-circle" width="50px" height="50px" src={user.upload} alt="" />
                <Dropdown overlay={menu} placement="bottomCenter">
                <Button>{user.username}</Button>
              </Dropdown>
              </div>
            </div>
          </Col>
        </Row>

      </div>
      <div className="content mt-2 p-4">{props.children}</div>

      <div className="footer text-center">
        <hr />

        <p>Desinged and Developed By</p>



        <p>Hasibul || Tushar</p>

      </div>
    </div>
  );
}

export default DefaultLayout;
