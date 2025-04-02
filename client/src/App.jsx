import { Button } from "@/components/ui/button"
import Layout from "./layout/Layout"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RoutesIndex, RoutesSignIn, RoutesSignUp } from "./helpers/routeName"
import Index from "./pages/Index"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesIndex} element={<Layout/>}>
          <Route index element={<Index/>}/>
        </Route>
        <Route path={RoutesSignIn} element={<SignIn/>} />
        <Route path={RoutesSignUp} element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
