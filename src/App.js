

// Core
import {useContext, useEffect } from 'react';

// Third party
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'


// Application
import AuthRequired from './routers/AuthRequired';
import AuthContext from "./services/AuthProvider";

import {
  SigninScreen,
  SignupScreen
} from './pages/auth';

import MainLayout from './pages/MainLayout';
import ScreenerDashboard from './pages/screener';


import Missing from './pages/Missing';
import Unauthorized from './pages/Unauthorized';


const ROLES = {
  'Trader': 2001,
  'Admin': 7001,
  'dev': 8001
}


const queryClient = new QueryClient()

function App() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.account) {

      const account = user?.account;
      const accessToken = user?.accessToken;

      setAuth({ 
        account,
        accessToken
      });
      navigate(location.pathname);
    }

  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* public routes */}
          <Route path="signin" element={<SigninScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* Traders Routes */}
          <Route element={<AuthRequired allowedRoles={[ROLES.Trader]} />}>
            <Route path="/" element={<ScreenerDashboard />} />
          </Route>

          {/* All Typo URLs Routes */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;