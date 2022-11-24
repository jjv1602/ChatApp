import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import style from './ChatPg.module.css';
import { useNavigate } from 'react-router-dom';
import LeftSideBox from './LeftSideBox/LeftSideBox';
import { Box } from '@chakra-ui/react';
import RightSideBox from './RightSideBox/RightSideBox';
// import { useNavigate } from 'react-router-dom';
const ChatPg = () => {
  return (
    <div className={style.main}>
      <Header></Header>
      <Box display="flex" p={"2px"}  w="100%" h={"88vh"}>
        <LeftSideBox ></LeftSideBox>
        <RightSideBox></RightSideBox>
      </Box>

    </div>
  )
}

export default ChatPg
