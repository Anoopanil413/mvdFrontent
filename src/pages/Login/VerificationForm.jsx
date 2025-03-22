import  { useState, useRef, useEffect } from 'react'
import { verifyUser } from '../../api/userApi'
import { useAppContext } from '../../context/AppContext'
import { setLocalStorage } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
import imagei from '../../assets/2.png'
import imagein from '../../assets/1.png'
import { showToast } from '../../components/Toast/Toast'


export default function VerificationForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
    const {state,setUser} = useAppContext()
    const navigate = useNavigate()
  

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  const handleChange = (index, value) => {
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleVerify = async() => {
    try {
      const otpString = otp.join('')
      const verifyUSerOtp = await verifyUser({phone:state?.user?.phone, otp: otpString })
      console.log('OTP verified:', verifyUSerOtp)
      setUser(verifyUSerOtp?.user)
      setLocalStorage('token', verifyUSerOtp?.token)
      navigate('/dashboard')

    } catch (error) {
      showToast("Invalid Otp", "error");
    }
  }

  const handleResend = () => {
    console.log('Resending OTP')
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0].focus()
  }

  return (
    <div className="min-h-screen bg-[#00B4E5] flex flex-col items-center relative overflow-hidden px-4">
      {/* <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute right-0 top-0 w-32 h-32 border border-blue-600/30 bg-blue-200/45" />
        <div className="absolute left-0 top-1/2 w-24 h-24 border border-blue-600/30" />
      </div> */}

      <div className="mt-16 mb-8">
        <div className="w-24 h-32 bg-white rounded-b-full relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={imagein}
              alt="Location icon"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md px-4 text-center">
        <h1 className="text-white text-3xl font-bold mb-4">
          Verification
        </h1>
        <p className="text-gray-200 mb-8 px-4">
          We will read the OTP automatically. If it wont work please enter OTP which you recieve through SMS manually
        </p>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              onKeyDown={e => handleKeyDown(index, e)}
              className="w-8 h-8 md:w-12 md:h-12  rounded-full bg-white text-[#00B4E5] text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full h-14 bg-white rounded-full text-[#00B4E5] font-bold text-lg shadow-lg hover:bg-white/90 transition-colors mb-4"
        >
          VERIFY CODE
        </button>

        <button
          onClick={handleResend}
          className="text-white font-medium hover:underline"
        >
          RESEND CODE
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        {/* <img
          src={imagei}
          alt="Cityscape"
          className="w-full h-32 object-cover"
        /> */}
      </div>
    </div>
  )
}