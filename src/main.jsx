import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './store/store.js'
import { Protected } from './components'
import {
  Home,
  Post,
  Login,
  Signup,
  AddPost,
  EditPost,
  MyPosts,
  Account
} from './pages'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/my-posts",
        element: (
          <Protected authentication={true}>
            <MyPosts />
          </Protected>
        )
      },
      {
        path: "/add-post",
        element: (
          <Protected authentication={true}>
            <AddPost />
          </Protected>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication={true}>
            <EditPost />
          </Protected>
        )
      },
      {
        path: "/account",
        element: (
          <Protected authentication={true}>
            <Account />
          </Protected>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
