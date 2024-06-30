import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { Logo, Container } from './index'


function Header() {
  const authStatus = useSelector(state => state.auth.authStatus)

  const navItems = [
    {
      name: 'Home',
      url: "/",
      active: true
    },
    {
      name: "LogIn",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
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
    <header className="py-3 shadow bg-gray-500">
      <Container>
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
                        `${isActive && "underline underline-offset-2 font-medium"}`
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
      </Container>
    </header >
  )
}

export default Header