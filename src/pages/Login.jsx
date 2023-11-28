import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import pos from "../assets/pos.jpg";


import logo from "../assets/pain.png";
// import { response } from "express";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const data = {
    email: email,
    password: password,
  };

const navigate = useNavigate() 

  const handleCLick = () => {
    axios
      .post("https://www.globalpayng.com/new-admin/v1/auth/login", data)
      .then((response) => {
        console.log(response)
        const token = response.data.data.token
        localStorage.setItem("token", token);
        
        console.log("logged in");
        
       
        navigate('/');
        
        // console.log(response.data.data.token)
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
        alert(err.response.data.message)
      });
  };

  const logged = localStorage.getItem("token");

  return (
    <>
      {!logged && (
              <div className="justify-center bg-opacity-40 border-solid items-center h-[100vh] mx-auto relative gap-y-4 p-5 ">
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  backgroundImage: `url(${pos})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-800/60 via-green-800/60 to-green-800/60"></div>{" "}
              <div className="h-[65%] shadow-xl w-[90%] bg-white mx-auto my-auto top-[100px] relative md:w-[80%] lg:w-[35%] rounded-2xl">
                <div className="h-[20%] w-full items-center my-auto pt-6 relative mx-auto justify-center">   <img
                src={logo}
                className="items-center w-[150px] h-[35px]  relative pt-2 mx-auto"
                alt=""
              />

              {/* <p className="item-center text-sm font-semibold text-center text-gray-400">
                Terminal Management System
              </p> */}
            </div>
            <div className="grid gap-y-4 pb-7 p-8">
              <h1 className="relative text-center pb-4 text-xl font-semibold text-amber-400 ">
                Login
              </h1>
              {/* <label className="text-md font-semibold pb-2"  htmlFor="">Email</label> */}
              <input
                type="email"
                placeholder="Email Adress"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                id=""
                className="align center relative mx-auto p-2 outline-slate-300 w-[95%] md:w-[55%] border-2 border-gray-300 rounded-md h-[40px] bg-white"
              />

              {/* <label htmlFor="">password</label> */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="align center relative mx-auto p-2 outline-slate-300  w-[95%] md:w-[55%] border-2 border-gray-300 rounded-md h-[40px] bg-white"
              />
              {/* {!error &&   <div className="text-red-500 text-center">
                  sdsd
              </div>
              
              } */}
{/* {!error && <div> {setError}  </div>} */}
              {/* {setError} */}
              <button
                className="bg-green-600 align-center rounded-md h-[40px] border-none justify-center mx-auto text-white  w-[95%] md:w-[55%]"
                onClick={handleCLick}
              >
                {" "}
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      {logged && <Navigate to="/" />}
    </>
  );
};

export default Login;
