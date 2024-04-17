import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import storageService from '../appwrite/storage'

function Home() {
  const [posts, setPosts] = useState([])
  const authStatus = useSelector(status => status.auth.authStatus)

  useEffect(() => {
    storageService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (authStatus && posts.length > 0) {
    return (
      <div className="w-full min-h-screen py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    )
  }
  else if (authStatus && posts.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="text-5xl font-bold hover:text-gray-500">
          No Posts
        </h1>
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-5xl font-bold hover:text-gray-500">
        Login to read Posts
      </h1>
    </div>
  )
}

export default Home