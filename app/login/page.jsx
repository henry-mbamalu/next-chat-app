"use client"
import { useState, useEffect } from "react";
import { SIGN_IN } from "../graphql/mutations";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signIn, { loading }] = useMutation(SIGN_IN);
    const { setAuthUser, authUser } = useAuthContext()
    const router = useRouter()

    useEffect(() => {
        if (authUser && authUser.token) {
            router.push('/')
        }
    }, [authUser])

    useEffect(() => {
        if (typeof window !== "undefined") {
          const userInfo = localStorage.getItem("user-info");
          setAuthUser(userInfo ? JSON.parse(userInfo) : null);
        }
      }, []);
    
      const storeUserInfo = (userInfo) => {
        if (typeof window !== "undefined") {
          localStorage.setItem("user-info", JSON.stringify(userInfo));
          setAuthUser(userInfo);
        }
      };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signIn({ variables: { username, password } });
            const userInfo = { token: data.signIn.accessToken, username: data.signIn.username }
            storeUserInfo(userInfo)
            
            toast.success("Sign-in successful!");
        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSignIn}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter username'
                            className='w-full input input-bordered h-10'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full input input-bordered h-10'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                   

                    <div>
                        <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                            {loading ? <span className='loading loading-spinner '></span> : "Login"}
                        </button>
                    </div>

                    <a href='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </a>
                </form>
            </div>
        </div>
    );
};
export default Login;

