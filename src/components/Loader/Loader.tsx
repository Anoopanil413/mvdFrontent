import { Loader } from 'lucide-react'
import React from 'react'

const LoaderComp = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader className="animate-spin text-blue-500" size={48} />
        </div>
    )
}

export default LoaderComp
