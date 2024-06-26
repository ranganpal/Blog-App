import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Logo } from './index'
import { authLogin } from '../store/authSlice'
import { setPosts } from '../store/postSlice'
import authService from '../appwrite/auth'
import storageService from '../appwrite/storage'

function Login() {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = async (data) => {
    setError("")

    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          const postList = await storageService.getPosts()
          if (postList) {
            const allPosts = postList.documents
            const myPosts = allPosts.filter((post) => (
              userData.$id == post.authorId
            ))
            dispatch(setPosts({ allPosts, myPosts }))
          }
          navigate("/")
        }
      }
    }
    catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-8 border border-black/10">

        <div className="text-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-4 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-6 text-center">
          {error}
        </p>}

        <form
          className="mt-6"
          onSubmit={handleSubmit(login)}
        >
          <div className='space-y-3'>

            <Input
              type="email"
              label="Email: "
              placeholder="Enter your email"
              {...register("email", {
                required: true
              })}
            />

            <Input
              type="password"
              label="Password: "
              placeholder="Enter your password"
              {...register("password", {
                required: true
              })}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
              >
                Sign In
              </Button>
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}

export default Login