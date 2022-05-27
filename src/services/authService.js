

// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../services/AuthProvider";




const logout = () => {
    // const { auth, setAuth } = useContext(AuthContext);
    // const navigate = useNavigate();
    // setAuth({});
    // localStorage.removeItem("user");
    // navigate('/');
  
};

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken
};

  
const getCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return {...user?.account}
};


export  {
    logout,
    getCurrentUser,
    getAccessToken,
};
  