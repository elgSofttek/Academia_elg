import {Button, Col, Input, Row,Checkbox,Form} from 'antd'
import React,{useEffect, useState} from 'react'
import { signinUser } from '../Config/authCall';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';


export default function Login({mail}) {
    const{user}=useAuth();
    const[userName, setUserName]=useState(mail);
    const[password, setPassword]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{
      if (user) navigate('/navbar');
    },[user]);

    const changeName = (inputvalue) => {
      setUserName(inputvalue.target.value);
  };

    const changePassword=(inputvalue)=>{
        setPassword(inputvalue.target.value);
    }; 

    const Login = ()=>{
      signinUser(userName,password);
    };

  return (
    <div>
      {JSON.stringify(user)}
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Input
            size='small'
            placeholder='Correo'
            value={userName}
            onChange={changeName}
            ></Input>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Input.Password
            size='small'
            placeholder='Contraseña'
            value={password}
            onChange={changePassword}     
            />
        </Col>
      </Row>
      <Button onClick={Login}>Login</Button>
    </div>
  )
}
