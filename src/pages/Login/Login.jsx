import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/userApi';
import { useAppContext } from '../../context/AppContext';

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigate = useNavigate();
  const {setUser} = useAppContext()

  const handleLogin =async()=>{
    if(phoneNumber.length===10){
      await loginUser({phone:phoneNumber})
      setUser({phone:phoneNumber })
      navigate('/otp-verification')
    }else{
      alert('Please enter a valid phone number')
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00B4E5] to-[#0086AD] flex flex-col items-center relative overflow-hidden">
      {/* Header Illustration */}
      <div className="w-full max-w-md relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-20 w-24 h-24 bg-[#00B4E5] rounded-full flex items-center justify-center shadow-lg">
          <img src="/placeholder.svg" alt="Location icon" className="w-12 h-12 object-contain" />
        </div>
        <div className="w-full h-64 relative">
          <img src="/placeholder.svg" alt="Cityscape" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md px-6 pt-16">
        <h1 className="text-white text-4xl font-bold text-center mb-4">
          Let Me Go
        </h1>
        <p className="text-white/90 text-center mb-8">
          SignIn with your mobile number
        </p>

        {/* Phone Input */}
        <div className="relative mb-6">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-[#00B4E5] font-medium">IN</span>
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full h-14 bg-white/20 rounded-full text-white pl-16 pr-6 text-lg focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder="9895311777"
          />
        </div>


        <button className="w-full h-14 bg-white rounded-full text-[#00B4E5] font-bold text-lg shadow-lg hover:bg-white/90 transition-colors"
        onClick={handleLogin}
        >
          SEND VERIFICATION CODE
        </button>
        <div className='w-full flex justify-center mb-4 text-sm text-white font-medium cursor-pointer' onClick={()=>navigate('/registration')}>
            Sign up
        </div>
      <div className="w-full flex justify-center mt-4"></div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute right-0 bottom-0 w-32 h-32 border-4 border-dashed border-white/20 rounded-full -mr-16 -mb-16" />
        <div className="absolute left-0 top-1/2 w-24 h-24 border-4 border-dashed border-white/20 rounded-full -ml-12" />
      </div>
    </div>
  )
}