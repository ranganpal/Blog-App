import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { Header, Footer } from "./components"
import { authLogin, authLogout } from "./store/authSlice.js"
import { setPosts, removePosts } from "./store/postSlice.js"
import authService from "./appwrite/auth.js"
import storageService from './appwrite/storage.js'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        dispatch(userData ? authLogin(userData) : authLogout())
        storageService.getPosts().then((postList) => {
          if (postList) {
            const allPosts = postList.documents
            const myPosts = allPosts.filter((post) => (
              userData.$id == post.authorId
            ))
            dispatch(setPosts({ allPosts, myPosts }))
          }
          else {
            dispatch(removePosts())
          }
        })
      })
      .finally(() => setLoading(false))
  }, [])

  return loading ? (
    <div className="min-h-screen bg-gray-400">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-b-4 border-gray-700 rounded-full animate-spin mb-2"></div>
        <p className="text-gray-700 text-xl font-medium">Loading...</p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-300">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
