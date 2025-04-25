import Input from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useRef } from 'react'
import axios from 'axios'
const BACKEND_URL=import.meta.env.VITE_BACKEND_URL
import {  useNavigate } from 'react-router-dom'

const Signup= () => {
    const usernameref=useRef<HTMLInputElement>(null)
    const passwordref=useRef<HTMLInputElement>(null)
    const navigate=useNavigate();
 
    async function signup() {
        const username=usernameref.current?.value
        const password=passwordref.current?.value
        console.log(username,password)
        const responce =await axios.post(BACKEND_URL+"/api/v1/signup",{
            
                username:username,
                password:password
            
        }) 
        const token=responce.data.token;
        localStorage.setItem("token",token)
        alert("user sign up") 
        navigate("/dashboard")
    
    }
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-amber-50'>
      <div className='max-w-2xl bg-white rounded-md p-5 flex flex-col gap-5'>
        <div className=' text-2xl font-semibold flex justify-center'>SignUp</div>
        <Input ref={usernameref} placeholder={"username"}/>
        <Input ref={passwordref} placeholder={"password"}/>
        <Button onClick={signup} variant='primary' text='Submit' size='md'loading={false} />
      </div>
    </div>
  )
}

export default Signup
