import {Button, Input,Checkbox,Form,Flex,Typography} from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React,{useEffect, useState} from 'react'
import { signinUser } from '../Config/authCall';
import { useAuth } from '../hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Login({mail}) {
    
    
    const{user}=useAuth();
    const[password, setPassword]=useState('');
    const navigate=useNavigate();

    useEffect(()=>{
      if (user!==undefined && user !==null) navigate('/tasks');
    },[user]);

    const changeName = (inputvalue) => {
      setUserName(inputvalue.target.value);
  };

    const changePassword=(inputvalue)=>{
        setPassword(inputvalue.target.value);
    }; 

    const Login = async(values)=>{
      try {
        await signinUser(values.username, values.password);
        navigate('/tasks');
      } catch (err) {
        console.error('Error de inicio de sesión:', err);
      }
    };

  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:'100vh',width:'100%'}}>
        <Title style={{textAlign:'center',marginBottom:'20px'}}>¡Bienvenido!</Title>
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          style={{
            maxWidth: 360,
          }}
          onFinish={Login}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Correo de usuario',
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Usuario" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Contraseña',
              },
            ]}
          >
            <Input prefix={<LockOutlined />} type="password" placeholder="Contraseña" />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">Login
            </Button>
          </Form.Item>
        </Form>
    </div>
      
  )
}