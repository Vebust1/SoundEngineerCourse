import React from "react"
import { Routes, Route } from "react-router-dom"
import { Header } from "./components/header"
import { Home } from "./pages/Home"
import { Articles } from "./pages/Articles"
import { Chat } from "./pages/Chat"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { NotFound } from "./pages/NotFound"
import { Footer } from "./components/footer"
import { ChatPage } from "./pages/ChatPage"
import Article from "./components/Article"
import { Knowledge } from "./pages/Knowledge"
import { About } from "./pages/About"
import Profile from "./pages/Profile"
import { useDispatch, useSelector } from "react-redux"
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth"
import { Audio } from "./pages/Audio"
import { UploadAudio } from "./pages/UploadAudio"

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/articles/:id" element={<Article />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/test" element={<Knowledge />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/audiotest" element={<Audio />} />
          <Route path="/upload" element={<UploadAudio />} />
         </Routes>
         <Footer />
    </>
  )
}

export default App