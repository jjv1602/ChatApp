import {
    Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, MenuItem, Image, Avatar
} from '@chakra-ui/react'
import { useState } from 'react'
import NotificationBadge from "react-notification-badge";  //installed using npm install --save react-notification-badge
import { Effect } from "react-notification-badge";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'; //https://chakra-ui.com/docs/components/icon/usage
import style from './Header.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const [notification, setNotification] = useState([4, 1]);
    const navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("userInfo");
        navigate("/");
    }
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

            <Image alt="logo" src={require("../../Assets_Img/website_logo_chat_pg.jpg")} style={{ height: "80%", width: "5%", borderRadius: "50%", marginLeft: "1%" }}></Image>
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
                        {/* <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem> */}
                    </MenuList>
                </Menu>
                <Menu>
                    <MenuButton p={4} m={1} as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar
                            size="sm"
                            cursor="pointer"
                            // name={user.name}
                            src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                        />
                    </MenuButton>
                    <MenuList p={2}>
                        {/* <ProfileModal user={user}> */}
                        <ProfileModal >
                            <MenuItem>My Profile</MenuItem>{" "}
                        </ProfileModal>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </MenuList>
                </Menu>

            </div>

        </Box>
    )
}

export default Header
