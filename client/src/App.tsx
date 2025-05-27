import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

import clientPaths from "@/configs/paths/client.paths.config"

// Marketing
import LandingPage from "@/pages/marketing/landing-page"

// Auth
import SignInPage from "@/pages/auth/sign-in-page"
import CallbackPage from "@/pages/auth/callback-page"

// Home
import ProjectDashboardPage from "@/pages/home/project-dashboard-page"
import ProjectIdPage from "@/pages/home/project-id-page"

// Common
import NotFoundPage from "@/pages/not-found-page"

// Routes
import PrivateRoutes from "@/routes/private-routes"
import PublicRoutes from "@/routes/public-routes"

// Layouts
import MarketingLayout from "@/layouts/marketing-layout"
import HomeLayout from "@/layouts/home-layout"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route element={<PublicRoutes />} >
          <Route element={<MarketingLayout />}>
            <Route path={clientPaths.marketing.landing} element={<LandingPage />} />
            <Route path={clientPaths.auth.signin} element={<SignInPage />} />
            <Route path={clientPaths.auth.callback} element={<CallbackPage />} />
          </Route>
        </Route>

        <Route path={clientPaths.home.project.dashboard} element={<PrivateRoutes />} >
          <Route element={<HomeLayout />}>
            <Route index element={<ProjectDashboardPage />} />
            <Route path={clientPaths.home.project.id} element={<ProjectIdPage />} />

          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
