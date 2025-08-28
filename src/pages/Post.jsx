import { useState, useEffect } from 'react'
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
            src={storageService.getFileView(post.featuredImage).href}
            alt={post.title}
            className="rounded-xl"
            style={{maxWidth: "40vw"}}
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">

              <Button
                type="button"
                bgColor="bg-green-500"
                className="mr-3 hover:bg-green-600"
                children="Edit"
                onClick={() => {
                  navigate(`/edit-post/${post.$id}`)
                }}
              />

              <Button
                type="button"
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
  ) : (
    <div className="min-h-screen bg-gray-300">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-16 h-16 border-t-4 border-b-4 border-gray-700 rounded-full animate-spin mb-2"></div>
        <p className="text-gray-700 text-xl font-medium">Loading Post...</p>
      </div>
    </div>
  )
}

export default Post