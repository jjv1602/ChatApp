export const isSameSenderMargin = (messages, m, i, userId) => {
  // m- current message
  // i-index of current message

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 20;
  else return "auto";
};

export const isfirst_msg_of_Sender = (messages, m, i, userId) => {
  return (
    i < messages.length && i>1 &&
    messages[i - 1].sender._id !== m.sender._id &&
    messages[i].sender._id !== userId
    )
};

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
export const checkingBlockContent = (blockWords, ImgOCRContent) => {
  // console.log(blockWords);
    blockWords.map((words, i) => {
      const arr = words.split(" ");
      let AllWordsPresent=true;
      let temp="";
      // console.log(ImgOCRContent);
      arr.forEach(word => {
        // console.log("lkj");
        // console.log(word);
        // if (!ImgOCRContent.toLowerCase().includes(word.toLowerCase())) {
        //   AllWordsPresent=false;
        // }
        // console.log(ImgOCRContent.toLowerCase().includes(word.toLowerCase()));
      });
      if(AllWordsPresent===true){
        // console.log("temp");
        return true;
      }
    })
    return false;
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

//   Exported to DisplayChatPg.js
export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
