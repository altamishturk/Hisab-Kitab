import Section from "../components/Section";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import { axiosInstance } from "../utils/axiosInstance";
import { useState } from "react";
import { toast } from "react-toastify";

export function Login() {
    const {register,handleSubmit} = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (data:any) => {
        try {
            setIsLoading(true);
            const d = await axiosInstance.post("/auth",data,{});
            localStorage.setItem("hisab-kitab-token",d.data.token);
            return navigate("/");

        } catch (error:any) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
        finally {
           setIsLoading(false); 
        }
    }


  return (
    <Section XYCenter>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                            <input {...register('email',{required: true})} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com"/>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input {...register('password',{required: true})} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="remember" className="text-gray-500">Remember me</label>
                                </div>
                            </div>
                            <a href="/" className="text-sm font-medium text-primary-600 hover:underline ">Forgot password?</a>
                        </div>
                        <button onClick={handleSubmit((data) => submitForm(data))} type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled={isLoading}>{isLoading? "Signing in..":"Sign in"}</button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <a href="/" className="font-medium text-primary-600 hover:underline">Sign up</a>
                        </p>
                    </form>
                </div>
        </div>
    </Section>
  )
}
