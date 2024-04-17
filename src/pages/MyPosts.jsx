import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'
import storageService from '../appwrite/storage'

function MyPosts() {
  const [posts, setPosts] = useState([])
  const userData = useSelector(state => state.auth.userData)

  useEffect(() => {
    storageService.getPosts().then((posts) => {
      if (posts && userData) {
        setPosts(posts.documents.filter((post) => (
          userData.$id == post.authorId
        )))
      }
    })
  }, [])

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

export default MyPosts