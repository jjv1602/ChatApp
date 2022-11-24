import { Box } from "@chakra-ui/layout";
// import SingleChat from "./SingleChat";
import { ChatState } from "../../../Context/ChatProvider";

const RightSideBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "80%", md: "80%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {/* <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> */}
    </Box>
  );
};

export default RightSideBox;
