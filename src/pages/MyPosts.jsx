import React from 'react'
import { useSelector } from 'react-redux'
import { Container, PostCard } from '../components'

function MyPosts() {
  const posts = useSelector(status => status.post.myPosts)

  return ( posts.length === 0 ? 
    <div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-5xl font-bold hover:text-gray-500">
        No Posts
      </h1>
    </div> :
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