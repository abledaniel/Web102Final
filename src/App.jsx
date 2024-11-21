import { useState } from 'react'
import { BrowserRouter, Route , Routes} from 'react-router-dom'
import Navbar from './pages/nav/nav'
import Home from './pages/home/home'
import Create from './pages/create/create'
import Edit from './pages/edit/edit'
import Post from './pages/post/post'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/edit/:postId" element={<Edit />} />
          </Routes>
      </BrowserRouter>
    </>
    
  )
}

export default App
