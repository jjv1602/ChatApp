import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChatPg from './Components/screens/ChatPg/ChatPg';
import MainScreen from './Components/screens/login_sign_up/MainScreen';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainScreen/>}/>
    <Route path="/chat" element={<ChatPg/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
