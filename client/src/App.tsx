import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import clientPaths from "@configs/paths/client.paths.config"

// Marketing
import LandingPage from "@pages/marketing/landing-page"

// Auth
import SignInPage from "@pages/auth/sign-in-page"

// Common
import NotFoundPage from "@pages/not-found-page"



function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path={clientPaths.marketing.landing} element={<LandingPage />} />
        <Route path={clientPaths.auth.signin.oauth} element={<SignInPage />} />


        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
