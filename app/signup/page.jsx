"use client"
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutations";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const [signUp, { loading }] = useMutation(SIGN_UP);
    const router = useRouter();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signUp({ variables: inputs });

            toast.success("Sign-up successful!")

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Sign Up <span className='text-blue-500'> ChatApp</span>
                </h1>

                <form onSubmit={handleSignUp}>
                    <div>
                        <label className='label p-2 '>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input
                            type='text'
                            placeholder='johndoe'
                            className='w-full input input-bordered h-10'
                            value={inputs.username}
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
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
                            value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        />
                    </div>


                    <div>
                        <button className='btn btn-block btn-sm mt-2  border border-slate-700' disabled={loading}>
                            {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                        </button>
                    </div>

                    <a
                        href={"/login"}
                        className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
                    >
                        Already have an account?
                    </a>
                </form>
            </div>
        </div>
    );
};
export default SignUp;

