import { useRef, useState, useEffect } from "react";
import queryHandler from '../../services/queryHandler';

import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";


const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// const NAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// const NAME_REGEX = /^[a-zA-Z,.'-]+ [a-zA-Z,.'-]+$/
const NAME_REGEX =  /^[a-zA-Z,.'-]{3,12}(?: [a-zA-Z,.'-]+){1,2}$/

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/signup';

const query = queryHandler();

const Signup = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const errRef = useRef();

    const [full_name, setFullName] = useState('John Doe');
    // const [full_name, setFullName] = useState('');
    const [validName, setValidName] = useState(false);
    const [fullNameFocus, setFullNameFocus] = useState(false);

    const [email, setEmail] = useState('techyoob649@gmail.com');
    // const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPwd] = useState('Qwerty$$22');
    // const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [passwordFocus, setPwdFocus] = useState(false);

    const [password_match, setPwdMatch] = useState('Qwerty$$22');
    // const [password_match, setPwdMatch] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidName(NAME_REGEX.test(full_name));
    }, [full_name])

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === password_match);
    }, [password, password_match])

    useEffect(() => {
        setErrMsg('');
    }, [full_name, email, password, password_match])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const v3 = NAME_REGEX.test(full_name);
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            
            const response = await query.post(REGISTER_URL,
                JSON.stringify({ full_name, email, password, password_match }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            );

            setSuccess(true);
            
            setEmail('');
            setPwd('');
            setPwdMatch('');
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Email Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <span className="line">
                        <Link to="/signin">Sign In</Link>
                    </span>
                </section>
            ) : (
                <section className='sign-up-box-container'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fullname">
                            Name:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !full_name ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            ref={nameRef}
                            autoComplete="off"
                            onChange={(e) => setFullName(e.target.value)}
                            value={full_name}
                            maxLength={32}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="namenote"
                            onFocus={() => setFullNameFocus(true)}
                            onBlur={() => setFullNameFocus(false)}
                        />
                        <p id="namenote" className={fullNameFocus && full_name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            5 to  32 characters.<br />
                            Only up to 3 words full name allowed<br />
                        </p>


                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be valid email.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="passwordnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="passwordnote" className={passwordFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>


                        <label htmlFor="password_match">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && password_match ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !password_match ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password_match"
                            onChange={(e) => setPwdMatch(e.target.value)}
                            value={password_match}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validEmail || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Signup
