import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GoMarkGithub } from "react-icons/go";
import AuthContext from "../authContext/AuthContext";
import { Link } from "react-router-dom";
import { loginUserAxios } from "../../api/api";

function Login() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const {userID,  setUserID} = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  // const [loggedInUserId, setLoggedInUserId] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "gitAuth") {
        console.log("Received message:", event.data);

        if (event.data.success) {
          setIsLoggedIn(true);
          // setLoggedInUserId(event.data.userId);
          setUserID(event.data.userId);
          setRedirect(true);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleGitAuth = () => {
    const width = 600;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const options = `width=${width},height=${height},top=${top},left=${left}`;


    //!!!11   needs to be moved to api file, eventually will not be localhost
    window.open("http://localhost:4000/auth/github", "_blank", options);
  };

  const handleLogin = async () => {
    try {
      const resData = await loginUserAxios(loginUsername, loginPassword);

      if (resData.data.authed) {
        setIsLoggedIn(true);
        setUserID(resData.data.result.id);
        // setLoggedInUserId(resData.data.result.id);
        setRedirect(true);
      }

      if (resData.data.error) {
        setErrorMessage(resData.data.error);
      }
    } catch (err) {
      setErrorMessage(err);
    }
  };

  //redirect to profile page.
  return (
    <>
      {redirect && <Navigate replace to={`/customer/${userID}`} />}
      <article className="mt-12 mx-12 px-6 py-12  
      border rounded-lg
      bg-slate-300
      ">
        <section className="m-auto max-w-md ">
          <h1>Login</h1>
          <div className="w-full mt-10">
            <div
              className="
              grid grid-cols-[100px_2fr] items-center gap-5
              m-auto max-w-md 
               "
            >
              <label
                className="text-gray-600 font-bold md:text-right 
                mb-1 md:mb-0 pr-8"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
              />
              <label
                className="text-gray-600 font-bold md:text-right 
                mb-1 md:mb-0 pr-8"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 "
              />
              {errorMessage && (
                <p className="text-red-600  font-bold col-span-2">
                  {errorMessage}
                </p>
              )}
              <button
                type="button"
                onClick={handleLogin}
                className="col-span-2 mt-5
                font-bold uppercase
                bg-key text-white
                hover:bg-orange-700
                "
              >
                Login
              </button>

              <div className="col-span-2">
                <Link to="/register" className="hover:text-key font-medium">
                  Not yet Register? Register Here
                </Link>
              </div>
            </div>
          </div>

          <div
            className="
          mt-10
          flex w-full justify-around"
          >
            {/* <div><Link to='/auth/github' ><GoMarkGithub size={32}/></Link></div> */}
            <div onClick={handleGitAuth}>
              <GoMarkGithub size={32} />
            </div>
            <div>Google</div>
            <div>Facebook</div>
          </div>
        </section>
      </article>
    </>
  );
}

export default Login;
