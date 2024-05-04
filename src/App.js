// import './App.css';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Home from "./component/Home/Home.js";
import Login from "./component/Auth/Login.js";
import Register from "./component/Auth/Register.js";
import BuyTicket from './component/BuyTicket/BuyTicket.js';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/buy-ticket" element={<BuyTicket/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
