import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPg from './Components/screens/LandingPg/LandingPg';
import MainScreen from './Components/screens/login_sign_up/MainScreen';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainScreen/>}/>
    <Route path="/chat" element={<LandingPg/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
