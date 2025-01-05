
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './views/login';
import Singup from './views/singup';
import Home from './views/homepage';
import Admin from './views/pageadmin';
import { PasswordRecovery } from './components/login/pswdrecovery';

createRoot(document.getElementById('root')!).render(
  
    <Router>
      <Routes>
      <Route path="/singup" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/psw" element={
              <div className="flex min-h-svh flex-col items-center justify-center bg-muted  ">
              <div className="w-full max-w-sm md:max-w-3xl ">
                <PasswordRecovery />
              </div>
           </div> 
          } />
      </Routes>
    </Router>
 
);
