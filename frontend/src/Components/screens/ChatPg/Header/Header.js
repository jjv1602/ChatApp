import {
    Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, MenuItem, Image, Avatar, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Input
} from '@chakra-ui/react'
import React, { useState } from 'react'
import NotificationBadge from "react-notification-badge";  //installed using npm install --save react-notification-badge
import { Effect } from "react-notification-badge";
import { BellIcon, ChatIcon, ChevronDownIcon } from '@chakra-ui/icons'; //https://chakra-ui.com/docs/components/icon/usage
import style from './Header.module.css';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useToast } from "@chakra-ui/toast";

import ChatLoading from '../../../Loading/ChatLoading';
import { ChatState } from '../../../Context/ChatProvider';
import SearchListItem from '../SearchListItem/SearchListItem';
import { getSender } from "../../../../config/ChatLogics";
import { Switch } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'

const Header = () => {
    const toast = useToast();
    const btnRef = React.useRef();//for drawer
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const {
        setSelectedChat,
        user,
        notification,
        setNotification,
        chats,
        setChats,
    } = ChatState();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    }
    const { isOpen, onOpen, onClose } = useDisclosure()


    const handleSearch = async () => {

        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/users/getUser?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };


    const accessChat = async (userId) => {


        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };


    return (
        <Box
            w="100%"
            h="12vh"
            bg="#ffffff"
            borderWidth="5px"
            p="2px 10px 5px 10px"
            display="flex"
            alignItems="center"
        >

            <Image alt="logo" src={require("../../Assets_Img/website_logo_chat_pg.jpg")} style={{ height: "80%", width: "5%", borderRadius: "50%" }}></Image>

            <Text pl="23vw" fontSize="5xl" className={style.app_name}>
                Splice Chat
            </Text>
            <div className={style.menu}>
                <Menu >
                    <MenuButton p={1}>
                        <NotificationBadge count={notification.length} effect={Effect.SCALE} />
                        <BellIcon fontSize="4xl" m={1} />
                    </MenuButton>
                    <MenuList>
                        {!notification.length && "No New Messages"}
                        {notification.map((notif) => (
                            <MenuItem
                                key={notif._id}
                                onClick={() => {
                                    setSelectedChat(notif.chat);
                                    setNotification(notification.filter((n) => n !== notif));
                                }}
                            >
                                {notif.chat.isGroupChat
                                    ? `New Message in ${notif.chat.chatName}`
                                    : `New Message from ${getSender(user, notif.chat.users)}`}
                            </MenuItem>))}
                    </MenuList>
                </Menu>
                <Menu >
                    <MenuButton p={4} m={1} as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar
                            size="sm"
                            cursor="pointer"
                            src={user.pic}
                        />
                    </MenuButton>
                    <MenuList p={2}>
                        <ProfileModal user={user}>
                            <MenuItem  fontSize="1.4rem"  fontFamily={"'Fredoka', sans-serif "} >My Profile</MenuItem>{" "}
                        </ProfileModal>
                        <MenuItem >
                        <FormControl display='flex' alignItems='center'>
                            <FormLabel htmlFor='email-alerts' mb='0'  fontSize="1.4rem" fontFamily={"'Fredoka', sans-serif "}>
                                Block Images with text
                            </FormLabel>
                            <Switch id='block_good_morning' /></FormControl>
                        </MenuItem>
                        
                        <MenuItem onClick={logout} fontSize="1.4rem" fontFamily={"'Fredoka', sans-serif "}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </Box >
    )
}

export default Header
