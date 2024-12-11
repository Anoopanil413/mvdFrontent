import  { useState, useRef, useEffect } from 'react'

export default function VerificationForm() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

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

  const handleVerify = () => {
    const otpString = otp.join('')
    console.log('Verifying OTP:', otpString)
  }

  const handleResend = () => {
    console.log('Resending OTP')
    setOtp(['', '', '', '', '', ''])
    inputRefs.current[0].focus()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center relative overflow-hidden px-4">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-32 h-32 border border-gray-200" />
        <div className="absolute left-0 top-1/2 w-24 h-24 border border-gray-200" />
      </div>

      <div className="mt-16 mb-8">
        <div className="w-24 h-32 bg-[#00B4E5] rounded-b-full relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/placeholder.svg"
              alt="Location icon"
              className="w-12 h-12 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md px-4 text-center">
        <h1 className="text-[#00B4E5] text-3xl font-bold mb-4">
          Verification
        </h1>
        <p className="text-gray-600 mb-8 px-4">
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
              className="w-8 h-8 md:w-12 md:h-12  rounded-full bg-[#00B4E5] text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/50"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full h-14 bg-[#00B4E5] rounded-full text-white font-bold text-lg shadow-lg hover:bg-[#00B4E5]/90 transition-colors mb-4"
        >
          VERIFY CODE
        </button>

        <button
          onClick={handleResend}
          className="text-[#00B4E5] font-medium hover:underline"
        >
          RESEND CODE
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <img
          src="/placeholder.svg"
          alt="Cityscape"
          className="w-full h-32 object-cover"
        />
      </div>
    </div>
  )
}