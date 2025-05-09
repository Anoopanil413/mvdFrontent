import { useState, useEffect } from 'react'
import { BellRing, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { KERALA_DISTRICTS } from '../../utils/utils'
import { registerUser } from '../../api/userApi'
import { useAppContext } from '../../context/AppContext'
import { showToast } from '../../components/Toast/Toast'


export default function RegistrationForm() {
  const navigate = useNavigate()
  const{setUser} = useAppContext()
  const [districts] = useState(Object.keys(KERALA_DISTRICTS))
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    location: '',
    city: ''
  })

  useEffect(() => {
    if (!formData.location) {
      setCities([])
      return
    }

    setLoading(true)
    setTimeout(() => {
      const districtCities = KERALA_DISTRICTS[formData.location]?.cities || []
      setCities(districtCities)
      setLoading(false)
    }, 300)
  }, [formData.location])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData(prev => {
      if (name === 'location') {
        return {
          ...prev,
          [name]: value,
          city: ''
        }
      }
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true);

    // const error = validateField(name, value.trim());
    // if (error) {
    //   alert(error);
    //   return;
    // }
    const { name, email, gender, dateOfBirth, location, city } = formData
    if (!name || !email || !gender || !dateOfBirth || !location || !city) {
      showToast("Invalid fields!", "warning");
      return
    }
    const registrationData = {
      ...formData,
      country: 'India',
      state: 'Kerala'
    }

    try{
      const userData = await registerUser(registrationData)
      if(userData){
        setUser({phone:formData?.phone, })
        navigate('/otp-verification') 
      }

      } catch (error) {
          showToast("Regostration failed!", "error");
        
      } finally {
      setLoading(false)
      }
    }


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#00B4E5]  flex flex-col items-center relative overflow-hidden px-4">
      <div className="w-full max-w-md pt-6 pb-4">
        <h1 className="text-[#00B4E5] text-3xl font-bold text-center mb-6">
          User Registration
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full h-14 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full h-14 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full h-14 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
            pattern="[0-9]{10}"
            required
            title="Please enter a valid 10-digit phone number"
          />

          <div className="relative">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full h-14 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400 appearance-none"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#00B4E5] w-5 h-5" />
          </div>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            placeholder="Date of Birth"
            className="w-full h-14 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400"
          />

          {/* District Selector */}
          <div className="relative">
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full h-14 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400 appearance-none"
            >
              <option value="">Select District</option>
              {districts.map(district => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#00B4E5] w-5 h-5" />
          </div>

          {/* City Selector */}
          <div className="relative">
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.location || loading}
              className="w-full h-14 px-6 rounded-full border border-[#00B4E5] focus:outline-none focus:ring-2 focus:ring-[#00B4E5]/20 text-gray-600 placeholder-gray-400 appearance-none disabled:bg-gray-100"
            >
              <option value="">
                {loading
                  ? 'Loading cities...'
                  : formData.location
                  ? 'Select City'
                  : 'First select a district'}
              </option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#00B4E5] w-5 h-5" />
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-[#00B4E5] border border-blue-900 rounded-full text-white font-bold text-lg shadow-lg hover:bg-[#00B4E5]/90 transition-colors mt-8"
          >
            NEXT
          </button>
        </form>

        <div
          className="w-full flex justify-center mt-2 mb-4 text-sm text-white font-medium cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Already have an account? Log in
        </div>
      </div>

      {/* Cityscape Illustration */}
      {/* <div className="fixed bottom-0 left-0 right-0 pointer-events-none">
        <img
          src="/placeholder.svg"
          alt="Cityscape"
          className="w-full h-32 object-cover"
        />
      </div> */}

      {/* Notification Bell */}
      <div className="fixed bottom-8 right-8">
        <button className="w-12 h-12 bg-[#00B4E5] rounded-full flex items-center justify-center text-white shadow-lg">
          <BellRing className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}