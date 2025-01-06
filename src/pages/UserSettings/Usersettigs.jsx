
import { ArrowLeft, Bell } from 'lucide-react'
import { Switch } from "../../components/ui/Switch"
import { useState } from "react"
import { updateUserProfile } from '../../api/userApi'
import { showToast } from '../../components/Toast/Toast'

export default function PrivacySettings() {
  const [hideName, setHideName] = useState(false)
  const [hideNumber, setHideNumber] = useState(false)


  const handleUserPrivacyUpdate = async()=>{
    try {
      setHideNumber(!hideNumber)
      const response = await updateUserProfile({phoneVisible:!hideNumber})
      
    } catch (error) {
      showToast("Update failed!", "error");
      
    }
  }

  return (
    <div className=" bg-white p-6 relative">
      <button className="rounded-full bg-[#29B6F6] p-4 text-white hover:bg-[#0288D1] transition-colors">
        <ArrowLeft className="h-4 w-4" />
      </button>
      <div className="max-w-md mx-auto mt-8 space-y-6">
        <h1 className="text-[#29B6F6] text-3xl font-medium text-center">
          Set your Privacy
        </h1>

        <div className="flex justify-center">
          <svg
            className="w-32 h-32 text-[#29B6F6]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M70 45V35C70 24.5066 61.4934 16 51 16C40.5066 16 32 24.5066 32 35V45"
              stroke="currentColor"
              strokeWidth="6"
            />
            <rect
              x="25"
              y="45"
              width="52"
              height="40"
              rx="8"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Toggle Switches */}
        <div className="bg-[#E3F2FD] rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="hide-name" className="text-lg font-medium">
              Hide Name
            </label>
            <Switch
              id="hide-name"
              checked={hideName}
              onCheckedChange={setHideName}
              onClick={() => setHideName(!hideName)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="hide-number" className="text-lg font-medium">
              Hide Number
            </label>
            <Switch
              id="hide-number"
              checked={hideNumber}
              onCheckedChange={setHideNumber}
              onClick={handleUserPrivacyUpdate}
            />
          </div>
        </div>

        {/* Privacy Message */}
        <div className="text-center text-gray-600 space-y-1">
          <p>We will hide your name and number, if you wish.</p>
          <p>Your privacy is our priority.</p>
        </div>


        {/* Notification Bell */}
        <div className="fixed bottom-6 right-6">
          <button className="rounded-full bg-[#29B6F6] p-4 text-white hover:bg-[#0288D1] transition-colors">
            <Bell className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

