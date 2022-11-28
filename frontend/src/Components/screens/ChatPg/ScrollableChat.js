
import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";

import { Box, Heading, Text } from '@chakra-ui/react'
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <>
      <ScrollableFeed>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
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

                <Heading size="sm">{m.sender.name}</Heading>
                <Text>{m.content}</Text>


              </Box>
            </div>
          ))}
      </ScrollableFeed>

    </>
  );

};

export default ScrollableChat;
