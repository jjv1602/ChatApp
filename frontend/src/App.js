import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from './Components/screens/login_sign_up/MainScreen';


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<MainScreen/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
