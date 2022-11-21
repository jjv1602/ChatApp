import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import style from './ChatPg.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
const ChatPg = () => {
  const [user,setUser]=useState();
  const navigate = useNavigate();
  useEffect(()=>{
    const userInfo=JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if(!userInfo){
      navigate('/');
    }
  },[])
  return (
    <body className={style.main}>
      <Header></Header>
  </body>
  )
}

export default ChatPg
