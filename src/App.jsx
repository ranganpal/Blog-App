import { Header, Footer } from "./components"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice.js"
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [])


  return loading ? (
    <div className="min-h-screen bg-gray-400">
      <h1>Please Wait</h1>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          main
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default App
