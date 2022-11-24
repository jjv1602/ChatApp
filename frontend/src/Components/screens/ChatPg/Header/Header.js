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

            <Image alt="logo" src={require("../../Assets_Img/website_logo_chat_pg.jpg")} style={{ height: "100%", width: "5%", borderRadius: "50%" }}></Image>

            <Button w={350} variant="ghost" onClick={onOpen} className={style.search_btn} >
                <i className="fas fa-search"></i>
                <Text px={4}>
                    Search User
                </Text>
            </Button>


            {/* Search Side Drawer */}
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search Users </DrawerHeader>
                    <DrawerBody>
                        <Box pb={2}>
                            <Input placeholder='Search User here...'
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button colorScheme='blue' onClick={handleSearch} w='140px' ml="50%" mt={3} p={1}>Search </Button>
                        </Box>

                        {/* if loading then component chatloading which is skeleton chakra */}
                        {loading ? (<ChatLoading />
                        ) : (
                            searchResult?.map((res) => (
                                <SearchListItem
                                    key={res._id}
                                    user={res}
                                    handleFunction={() => accessChat(res._id)}
                                />
                            ))
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>


            <Text fontSize="5xl" className={style.app_name}>
                Splice Chat
            </Text>
            <div className={style.menu}>
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
                        src="https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                    />
                </MenuButton>
                <MenuList p={2}>
                    <ProfileModal user={user}>
                        <MenuItem>My Profile</MenuItem>{" "}
                    </ProfileModal>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
            </Menu>
            </div>
        </Box >
    )
}

export default Header
