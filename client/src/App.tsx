import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

// Marketing
import LandingPage from "@pages/marketing/landing-page"

// Common
import NotFoundPage from "@pages/not-found-page"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
