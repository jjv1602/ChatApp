
import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isSameSenderMargin,
  isSameUser, isfirst_msg_of_Sender,
} from "../../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import './ScrollableChat.css';
import { Avatar, Box, Heading, Image, Text, Tooltip } from '@chakra-ui/react'
import { useEffect, useState } from "react";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [blockWords, setblockWords] = useState(userInfo.blockWords);
  const [blockSwitch, setBlockSwitch] = useState(userInfo.blockSwitch);
  const [AllWordsPresent, setAllWordsPresent] = useState(false);
  useEffect(() => {
    setblockWords(userInfo.blockWords);
    setBlockSwitch(userInfo.blockSwitch);
  }, [localStorage.getItem('userInfo')]);
  return (

    <>
      {messages &&
        messages.map((m, i) => (
          <>
            <div style={{ display: "flex" }} key={m._id}>
              {isfirst_msg_of_Sender(messages, m, i, user._id) &&
                <>
                  <Avatar id="av" size='lg' src={m.sender.pic} />
                  <Box className="message-body"
                    style={{
                      backgroundColor: `${m.sender._id === user._id ? "#B9F5D0" : "#BEE3F8"
                        }`,
                      marginLeft: isSameSenderMargin(messages, m, i, user._id),
                      marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                      marginBottom: "10px",
                      borderRadius: "20px",
                      padding: "5px 15px",
                      maxWidth: "75%",
                    }}

                  >
                    <Heading size="sm">{m.sender.name}</Heading>
                    {m.isImg ? <Image
                      boxSize='150px'
                      objectFit='cover'
                      src={m.ImgContent}
                      alt='Dan Abramov'
                    /> : (<></>)}
                    <Text>{m.content}</Text>
                  </Box>

                </>
              }

              {!isfirst_msg_of_Sender(messages, m, i, user._id) &&

                <Box
                  style={{
                    backgroundColor: `${m.sender._id === user._id ? "#B9F5D0" : "#BEE3F8"
                      }`,
                    marginLeft: isSameSenderMargin(messages, m, i, user._id),
                    marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                    marginBottom: "10px",
                    borderRadius: "20px",
                    padding: "5px 15px",
                    maxWidth: "75%",
                  }}

                >
                  {blockWords.map((words, i) => {
                      const arr=words.split('');
                      setAllWordsPresent(true);
                      arr.forEach(word => {
                        if (!m.imgContent.includes(word)) {
                          setAllWordsPresent(false);
                        }
                      });
                    
                      return(
                        <>
                        {   m.isImg && m.sender.name !== user.name ?
                        <>
                          <Heading size="sm">{m.sender.name === user.name ? "You" : m.sender.name}</Heading>
                          <Image
                            boxSize='150px'
                            objectFit='cover'
                            src={m.ImgContent}
                          />
                          <Text >{m.content}</Text>
                        </>:
                        
                        (
                        <>
                        <Heading size="sm">{m.sender.name === user.name ? "You" : m.sender.name}</Heading>
                        <Text >{m.content}</Text>
                        </>
                        )
                        }
                        
                        </> 
                      )
                  })}
                </Box>

              }

            </div>
          </>
        ))}
    </>
  );

};

export default ScrollableChat;
