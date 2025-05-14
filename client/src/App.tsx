import NotFoundPage from "@pages/not-found-page"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
