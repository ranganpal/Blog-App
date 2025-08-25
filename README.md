# Blog-App

A modern blogging platform built with **React**, **Redux Toolkit**, **Vite**, and **Appwrite**. This project allows users to sign up, log in, create, edit, and manage blog posts with a clean and responsive UI.

🔗 **Live Demo:** [https://appwrite-blog-app-iota.vercel.app](https://appwrite-blog-app-iota.vercel.app)


---

## 🚀 Features

- User authentication (Sign Up, Login, Logout)
- Create, edit, and delete blog posts
- Rich text editor for post content
- Upload and preview featured images
- View all posts or only your own posts
- Responsive design with Tailwind CSS
- Protected routes for authenticated users
- State management with Redux Toolkit
- Persistent authentication state

---

## 💻 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Appwrite](https://appwrite.io/) (for backend/auth/storage)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hook-form](https://react-hook-form.com/)
- [html-react-parser](https://github.com/remarkablemark/html-react-parser)
- [@tinymce/tinymce-react](https://www.tiny.cloud/docs/integrations/react/)

---

## 📂 Project Structure
```bash
Blog-App/
├── public/                # Static assets
├── src/
│   ├── appwrite/          # Appwrite service wrappers (auth, storage)
│   ├── assets/            # Images and static assets
│   ├── components/        # Reusable React components
│   ├── conf/              # Configuration files
│   ├── pages/             # Route-based page components
│   ├── store/             # Redux slices and store setup
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── package.json           # Project metadata and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```
---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Appwrite](https://appwrite.io/) instance (self-hosted or cloud)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ranganpal/Blog-App.git
   cd Blog-App
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install dependencies:**

   Create a .env file in the root directory and add your Appwrite credentials:
   ```sh
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   ```

4. **Start the development server:**

   Create a .env file in the root directory and add your Appwrite credentials:
   ```sh
   npm run dev
   ```

5. **Open the app:**

   Visit http://localhost:5173 in your browser.

---

## 📜 Available Scripts
-   **npm run dev** — Start the development server
-   **npm run build** — Build for production
-   **npm run preview** — Preview the production build
-   **npm run lint** — Run ESLint

---

## 🎨 Customization
-   **Appwrite Setup:**

    Make sure to configure your Appwrite project, database, and storage bucket according to your needs. Update the .env file with the correct IDs and endpoints.

-   **Styling:**

    Tailwind CSS is used for styling. You can customize the theme in tailwind.config.js.
    
---

## 🧑‍💻 Author

-   Rangan Pal