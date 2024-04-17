import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector(state => state.auth.authStatus)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      // when authStatus is false
      navigate("/login")
    }
    else if (!authentication && authStatus !== authentication) {
      // when authStatus is true
      navigate("/")
    }

    setLoading(false)
  }, [navigate, authStatus, authentication])

  return loading ? (
    <div className="min-h-screen bg-gray-400">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-b-4 border-gray-700 rounded-full animate-spin mb-2"></div>
        <p className="text-gray-700 text-xl font-medium">Loading...</p>
      </div>
    </div>
  ) : (
    <>{children}</>
  )
}

export default Protected