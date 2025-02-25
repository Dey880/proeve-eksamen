import './App.css';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/Landingpage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile"
import RegisterReinsdyr from "./pages/RegistrerReinsdyr";
import PrivateRoute from "./components/PrivateRoute";
import RegistrerFlokk from "./pages/RegistrerFlokk";

import NotFound from "./pages/NotFound";


export default function App() {
  return (
    <div className='wrapper'>
      <Routes>
          {/* Public Routes */}
          <Route path='/' element={<LandingPage />}> </Route>
          <Route path="/login" element={<Login  />}> </Route>
          <Route path="/register" element={<Register  />}> </Route>


          {/* Protected Routes */}
          <Route path='/profile' element={ <PrivateRoute><Profile /></PrivateRoute> }> </Route>
          <Route path="/regrein" element={ <PrivateRoute><RegisterReinsdyr /></PrivateRoute> }> </Route>
          <Route path="/regflokk" element={ <PrivateRoute> <RegistrerFlokk /> </PrivateRoute> }> </Route>

          {/* 404 Page */}
          <Route path="*" element={<NotFound  />}> </Route>
      </Routes>
    </div>
  );
}