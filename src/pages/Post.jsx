import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from '../components'
import storageService from '../appwrite/storage'

function Post() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const userData = useSelector(status => status.auth.userData)
  const isAuthor = post && userData ? post.authorId === userData.$id : false

  useEffect(() => {
    if (slug) {
      storageService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    }
    else {
      navigate("/")
    }
  }, [slug, navigate])

  return post ? (
    <div className="py-8 min-h-screen">
      <Container>

        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-4 bg-gray-400">

          <img
            src={storageService.getFliePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">

              <Button
                bgColor="bg-green-500"
                className="mr-3 hover:bg-green-600"
                children="Edit"
                onClick={() => {
                  navigate(`/edit-post/${post.$id}`)
                }}
              />

              <Button
                bgColor="bg-red-500"
                className="hover:bg-red-600"
                children="Delete"
                onClick={() => {
                  storageService.deletePost(post.$id).then((status) => {
                    if (status) {
                      storageService.deleteFile(post.featuredImage)
                      navigate("/")
                    }
                  });
                }}
              />

            </div>
          )}

        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>

        <div className="browser-css">
          {parse(post.content)}
        </div>

      </Container>
    </div>
  ) : null
}

export default Post