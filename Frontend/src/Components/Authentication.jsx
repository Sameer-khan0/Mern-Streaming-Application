import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import img from "../assets/Images/authvc.png";
import { useDispatch } from "react-redux";
import { RegisterUser, LoginUser } from "../../redux/user/userFunction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Authentication() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkValidity = () => {
      const isToken = localStorage.getItem("atoken");
      if (isToken) {
        navigate("/home");
      }
    };
    checkValidity();
  }, [navigate]);

  const dispatch = useDispatch();

  const signupRef = useRef(null);
  const loginRef = useRef(null);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [authValues, setAuthValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [authType, setAuthType] = useState(false);

  const handleChange = (e) => {
    setAuthValues({ ...authValues, [e.target.name]: e.target.value });
  };

  const handleAuthType = () => {
    setAuthType(!authType);
    setAuthValues({ username: "", email: "", password: "" });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupRef.current) {
      signupRef.current.value = "Loading..";
    }
    try {
      const userData = authValues;
      const res = await dispatch(RegisterUser(userData));
      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload.token) {
          localStorage.setItem("atoken", res.payload.token);
          navigate("/home");
          toast.success("User Registered Successfully");
          setAuthValues({ username: "", email: "", password: "" });
        }
      } else {
        toast.error("Something went wrong, try again");
      }
    } catch (error) {
      toast.error("An error occurred, please try again");
      console.error(error);
    }
    if (signupRef.current) {
      signupRef.current.value = "Submit";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginRef.current) {
      loginRef.current.value = "Loading..";
    }
    try {
      const userData = authValues;
      const res = await dispatch(LoginUser(userData));
      console.log(res)
      if (res.meta.requestStatus === "fulfilled") {
        if (res.payload.token) {
          localStorage.setItem("atoken", res.payload.token);
          navigate("/home");
          toast.success("Login Successful");
          setAuthValues({ username: "", email: "", password: "" });
        }
      } else {
        toast.error("Something went wrong, try again");
      }
    } catch (error) {
      toast.error("An error occurred, please try again");
      console.error(error);
    }
    if (loginRef.current) {
      loginRef.current.value = "Submit";
    }
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="flex justify-center items-center w-full md:shadow-xl shadow-none p-10 md:w-[100%] h-[40rem]"
    >
      <div className="h-full w-[50%] hidden md:block">
        <img src={img} alt="Design" className="w-full h-full object-cover" />
      </div>
      <div className="bg-white h-full flex flex-col justify-center items-center w-full md:w-[50%] p-[4%]">
        {authType ? (
          <>
            <h2 className="text-2xl md:text-xl font-semibold">LOGIN</h2>
            <form
              className="h-[60%] flex flex-col pt-5 w-full gap-5 justify-evenly"
              onSubmit={handleLogin}
            >
              <input
                ref={emailRef}
                id="email"
                className="p-[2%] shadow-sm"
                type="text"
                name="email"
                placeholder="Email"
                value={authValues.email}
                onChange={handleChange}
              />
              <input
                ref={passwordRef}
                id="password"
                className="p-[2%] shadow-sm"
                type="password"
                name="password"
                placeholder="Password"
                value={authValues.password}
                onChange={handleChange}
              />
              <input
                type="submit"
                value="Submit"
                ref={loginRef}
                className="p-[2%] bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 transition-colors duration-300"
                disabled={!authValues.email || !authValues.password}
              />
              <p className="text-sm md:text-sm">
                New account?{" "}
                <span
                  onClick={handleAuthType}
                  className="text-blue-400 cursor-pointer"
                >
                  Sign up
                </span>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl md:text-xl font-semibold">SIGN UP</h2>
            <form
              className="h-[60%] flex flex-col gap-5 pt-5 w-full justify-evenly"
              onSubmit={handleSignup}
            >
              <input
                ref={usernameRef}
                id="username"
                className="p-[2%] shadow-sm"
                type="text"
                name="username"
                placeholder="Username"
                value={authValues.username}
                onChange={handleChange}
              />
              <input
                ref={emailRef}
                className="p-[2%] shadow-sm"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={authValues.email}
                onChange={handleChange}
              />
              <input
                ref={passwordRef}
                className="p-[2%] shadow-sm"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={authValues.password}
                onChange={handleChange}
              />
              <input
                type="submit"
                value="Submit"
                ref={signupRef}
                className="p-[2%] bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:from-blue-600 hover:to-blue-800 transition-colors duration-300"
                disabled={
                  !authValues.username ||
                  !authValues.email ||
                  !authValues.password
                }
              />
              <p className="text-sm md:text-sm">
                Already have an account?{" "}
                <span
                  onClick={handleAuthType}
                  className="text-blue-400 cursor-pointer"
                >
                  Login
                </span>
              </p>
            </form>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Authentication;
