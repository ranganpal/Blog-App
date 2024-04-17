import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button, Logo } from './index'
import { authLogin, authLogout } from '../store/authSlice'
import authService from '../appwrite/auth'


function Signup() {
  const currentUserData = useSelector(status => status.auth.userData)
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: currentUserData?.name,
      email: currentUserData?.email
    }
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const signup = async (formData) => {
    setError("")

    if (currentUserData) {
      // Update Account
      try {
        const updatedUserData = await authService.updateAccount(formData)
        if (updatedUserData) {
          dispatch(authLogin(updatedUserData))
          navigate("/account")
        }
      }
      catch (error) {
        setError(error.message)
      }
    }
    else {
      // Create Account
      try {
        const session = await authService.createAccount(formData)

        if (session) {
          const newUserData = await authService.getCurrentUser()
          if (newUserData) dispatch(authLogin(newUserData))
          navigate("/")
        }
      }
      catch (error) {
        setError(error.message)
      }
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

        {!currentUserData ? (
          <>
            <h2 className="text-center text-2xl font-bold leading-tight mt-4">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-black/60">
              Already have an account?&nbsp;
              <Link
                to="/login"
                className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </>
        ) : (
          <h2 className="text-center text-2xl font-bold leading-tight mt-4">
            My Account
          </h2>
        )}

        {error && <p className="text-red-600 mt-6 text-center">
          {error}
        </p>}

        <form
          className="mt-6"
          onSubmit={handleSubmit(signup)}
        >
          <div className="space-y-3">

            <Input
              type="text"
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
              onChange={(event) => {
                setValue("name", event.target.value)
              }}
            />

            <Input
              type="email"
              label="Email: "
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => (
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address"
                  )
                }
              })}
              onChange={(event) => {
                setValue("email", event.target.value)
              }}
            />

            {!currentUserData ? (
              <Input
                type="password"
                label="Password: "
                placeholder="Enter your password"
                {...register("password", {
                  required: true
                })}
              />
            ) : (
              <>
                <Input
                  type="password"
                  label="Password: "
                  placeholder="Enter your old password"
                  {...register("oldPassword", {
                    required: true
                    // }
                  })}
                />
                <Input
                  type="password"
                  label="Password: "
                  placeholder="Enter your new password"
                  {...register("newPassword", {
                    required: true
                  })}
                />
              </>

            )}

            <div className="flex pt-4">
              <Button
                type="submit"
                bgColor={!currentUserData ? "bg-blue-600" : "bg-green-500"}
                className={`w-full ${!currentUserData ? "hover:bg-blue-700" : "hover:bg-green-600"}`}
              >
                {!currentUserData ? "Create Account" : "Update Account"}
              </Button>

              {currentUserData && (
                <Button
                  bgColor="bg-blue-600"
                  className="w-full ml-4 hover:bg-blue-700"
                  onClick={() => {
                    authService.logout().then(() => {
                      dispatch(authLogout())
                    })
                  }}
                >
                  Logout
                </Button>
              )}
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}

export default Signup