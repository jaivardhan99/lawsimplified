import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingAIButton from './components/FloatingAIButton'
import Home from './pages/Home'
import Docs from './pages/Docs'
import LawyerConnect from './pages/LawyerConnect'
import Insights from './pages/Insights'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Disclaimer from './pages/Disclaimer'
import Login from './pages/Login'
import Register from './pages/Register'
import DocumentGenerator from './pages/DocumentGenerator'
import ProtectedRoute from './components/ProtectedRoute'
import TestEnv from './TestEnv'
import TestFirebase from './TestFirebase'

function App() {
  const RootLayout = () => (
    <div className="flex flex-col min-h-screen bg-soft-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingAIButton />
    </div>
  )

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: 'docs', element: <Docs /> },
          { path: 'document-generator', element: (
            <ProtectedRoute>
              <DocumentGenerator />
            </ProtectedRoute>
          ) },
          { path: 'lawyer-connect', element: (
            <ProtectedRoute>
              <LawyerConnect />
            </ProtectedRoute>
          ) },
          { path: 'insights', element: <Insights /> },
          { path: 'pricing', element: <Pricing /> },
          { path: 'about', element: <About /> },
          { path: 'contact', element: <Contact /> },
          { path: 'disclaimer', element: <Disclaimer /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'env', element: <TestEnv /> },
          { path: 'firebase-test', element: <TestFirebase /> },
        ],
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  )

  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
