import {
    Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, MenuItem, Image
} from '@chakra-ui/react'
import { useState } from 'react'
import NotificationBadge from "react-notification-badge";  //installed using npm install --save react-notification-badge
import { Effect } from "react-notification-badge";
import { BellIcon } from '@chakra-ui/icons'; //https://chakra-ui.com/docs/components/icon/usage
import style from './Header.module.css';
const Header = () => {
    const [notification, setNotification] = useState([4, 1]);
    return (
        <Box
            w="100%"
            h="80px"
            bg="#ffffff"
            borderWidth="5px"
            p="5px 10px 5px 10px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
        >

        <Image alt="logo" src={require("../../Assets_Img/website_logo_chat_pg.jpg")} style={{ height: "80%", width: "5%", borderRadius: "50%", marginLeft: "1%"}}></Image>
        <Tooltip label="Click to Search User" aria-label='A tooltip' >
            <Button className={style.search_btn} w="15%" bg="white">
                <Text style={{ fontSize: "20px" }} px={9}>
                    Search User
                </Text>
                <i className="fas fa-search"></i>
            </Button>
        </Tooltip>
        <Text fontSize="5xl" className={style.app_name}>
            Splice Chat
        </Text>
        <div>
        <Menu>
            <MenuButton p={1}>
                <NotificationBadge count={notification.length} effect={Effect.SCALE} />
                <BellIcon fontSize="4xl" m={1} />
            </MenuButton>
            <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
        </Menu>
        </div>

        </Box>
    )
}

export default Header
