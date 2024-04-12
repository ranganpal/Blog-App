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
    <h1>Loading...</h1>
  ) : (
    <>{children}</>
  )
}

export default Protected