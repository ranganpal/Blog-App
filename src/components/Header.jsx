import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Logo, LogoutBtn } from './index'


function Header() {
  const authStatus = useSelector(state => state.auth.authStatus)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      url: "/",
      active: true
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "My Posts",
      url: "/my-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
    {
      name: "My Account",
      url: "/account",
      active: authStatus,
    }
  ]

  return (
    <header className="px-5 py-3 shadow bg-gray-500">
      <nav className="flex">

        <div className="mr-4">
          <Link to="/">
            <Logo width="50px" />
          </Link>
        </div>

        <ul className="flex ml-auto text-lg">
          {navItems.map((item) => (
            item.active ? (
              <li key={item.name}>
                <button
                  className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => (
                      `${isActive ? "underline underline-offset-2 font-medium" : null}`
                    )}
                  >
                    {item.name}
                  </NavLink>
                </button>
              </li>
            ) : (null)
          ))}
        </ul>

      </nav>
    </header >
  )
}

export default Header