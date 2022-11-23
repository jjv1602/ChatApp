import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import style from './ChatPg.module.css';
import { useNavigate } from 'react-router-dom';
import LeftSideBox from './LeftSideDrawer/LeftSideBox';
import { Box } from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
const ChatPg = () => {
  return (
    <div className={style.main}>
      <Header></Header>
      <Box display="flex" p={"2px"}  w="100%">
        <LeftSideBox ></LeftSideBox>
      </Box>

    </div>
  )
}

export default ChatPg
