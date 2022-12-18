import { Box } from "@chakra-ui/layout";
import { ChatState } from "../../../Context/ChatProvider";
import SingleChat from "../SingleChat";

import './RightSideBox.css';

const RightSideBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box id="box"
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      pl={1}
      pr={1}
      w={{ md: "80%" ,base:"100%"}}
      borderRadius="lg"
      borderWidth="1px"

    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default RightSideBox;
