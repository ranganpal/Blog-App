import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/storage'

function PostCard({ $id, title, featuredImage, authorName }) {
  return (
    <Link to={`/post/${$id}`} >
      <div className="w-full h-full bg-gray-100 rounded-xl p-4 ">

        <div className="w-full text-center mb-4">
          <img
            src={storageService.getFliePreview(featuredImage)}
            alt={title}
            style={{ "maxHeight": "180px", "width": "100%" }}
            className="rounded-xl"
          />
        </div>

        <div className="text-lg font-bold">
          <h2>{title}</h2>
          <h2>
            <span className="font-normal">posted by </span>
            <span className="font-semibold">{authorName}</span>
          </h2>
        </div>

      </div>
    </Link>
  )
}

export default PostCard