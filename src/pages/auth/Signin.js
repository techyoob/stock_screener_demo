


// Core
import { useRef, useState, useEffect } from 'react';


// Third
import { Link, useNavigate, useLocation } from 'react-router-dom';


// Application
import './auth.css'
import authBackground from '../../assets/svg/abstractThree.svg'
import useAuth from '../../services/useAuth';
import queryHandler from '../../services/queryHandler';


const SIGNIN_URL = '/signin';
const query = queryHandler();

const Signin = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('techyoob649@gmail.com');
    const [password, setPwd] = useState('Qwerty$$22');
    // const [email, setEmail] = useState('');
    // const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {  
            const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCZWE81RFRPQkciLCJzdWIiOi2NTM3NjA2NTZ9";
            const account =  {
                "account_id": "9MWQY64A1UHI_BQTCBETVADENGGCEQGYJA",
                "email": "techyoob9001@gmail.com",
                "full_name": "techy techii",
                "role": 2001
            };


            const user = {accessToken, account}

            setAuth({ account, accessToken });
            localStorage.setItem("user", JSON.stringify(user));
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Signin Failed');
            }
            errRef.current.focus();
        }
    }

    return (
            <section className='sign-in-box-container'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/signup">Sign Up</Link>
                    </span>
                </p>
            </section>
    )
}

export default Signin
