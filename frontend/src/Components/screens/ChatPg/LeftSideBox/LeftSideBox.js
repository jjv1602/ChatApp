import React from 'react'
import { AddIcon, BellIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../../../../config/ChatLogics";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { ChatState } from "../../../Context/ChatProvider";
import GrpChatModal from "../../GrpChatModal/GrpChatModal";
import ChatLoading from '../../../Loading/ChatLoading';
import SearchListItem from '../SearchListItem/SearchListItem';
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import './LeftSideBox.css'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
const LeftSideBox = () => {
    const [loggedUser, setLoggedUser] = useState();

    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef();
    const toast = useToast();
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const { notification } = ChatState();
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


    const fetchChats = async () => {
        // console.log(user._id);
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get("/api/chat", config);
            setChats(data);
            console.log(data);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
        // eslint-disable-next-line
    }, []);

    return (

        <Box
            display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            p={1}
            bg="#181C34"
            w={{ base: "100%", sm: "100%", md: "40%" }}
            borderRadius="lg"
            borderWidth="1px"

        >
            <Box
                pb={3}
                px={2}
                bg="#181C34"
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"

            >
                <Button w={450} variant="ghost" bg={"#dce5f8"} onClick={onOpen} >
                    <Text fontSize="lg" pl={"2px"} ml={"2px"} fontFamily={"'Fredoka', sans-serif "}>
                        Search <i className="fas fa-search" p={4}></i>
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
                            <Box pb={2} >
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

                {/* Add group chat button on left side  */}
                {/* on clicking Modal would be open  */}
                <GrpChatModal>
                    {/* between this is children so it is taking button as children */}
                    <Button
                        pl={2}
                        fontSize={"20px"}
                        rightIcon={<AddIcon />}
                    >
                    </Button>
                </GrpChatModal>
            </Box>

            <Box
                display="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
                backgroundColor='#181C34'
            >
                <Text fontSize='lg' fontWeight="bold" color='#ffffff' >Your Messages</Text>
                <br></br>
                {chats ? (
                    <Stack overflowY="scroll"
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '9px',

                            },
                            '&::-webkit-scrollbar-track': {
                                background: "ffffff",

                            },
                            '&::-webkit-scrollbar-thumb': {
                                height: "1px",
                                background: "#000000",
                            },
                        }}
                    >
                        {chats.map((chat) => (
                            <Box
                                onClick={() => setSelectedChat(chat)}
                                cursor="pointer"
                                bg={selectedChat === chat ? "#38B2AC" : "#2e2c42"}
                                color={selectedChat === chat ? "white" : "black"}
                                px={3}
                                py={4}
                                borderRadius="lg"
                                key={chat._id}
                                display="flex"
                            >

                                <Avatar id="av" size='lg' src={chat.users[1].pic} />
                                <Box display="flex" flexDirection="column" pl="4">
                                    <Text id="person" fontSize='2xl' color='#ffffff' fontWeight="bold">
                                        {!chat.isGroupChat
                                            ? getSender(loggedUser, chat.users)
                                            : chat.chatName}
                                    </Text>

                                    {chat.latestMessage && (
                                        <Text fontSize='md' color='#ffffff'>
                                            <b>{chat.latestMessage.sender.name === user.name ? "You" : chat.latestMessage.sender.name} : </b>
                                            {chat.latestMessage.content.length > 50
                                                ? chat.latestMessage.content.substring(0, 51) + "..."
                                                : chat.latestMessage.content}
                                        </Text>
                                    )}

                                </Box>
                               
                                {(notification.map((not) => (
                                    <>
                                    {not.sender.name.includes(chat.latestMessage.sender.name)
                                             &&
                                            <Button colorScheme='green' borderRadius="20" ml={"65%"} ><BellIcon/></Button>
                                    }
                                    </>

                                )
                                ))
                                }
                            </Box>

                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>
        </Box>
    )
}

export default LeftSideBox
