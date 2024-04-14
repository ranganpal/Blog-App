import React, { useEffect } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import storageService from '../appwrite/storage'

function EditPost() {
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      storageService.getPost(slug).then((post) => {
        if (post) setPost(post)
      })
    }
    else {
      navigate('/')
    }
  }, [])

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null
}

export default EditPost