import { Routes, Route } from "react-router-dom"
import Nav from "./components/Nav"
import Home from "./pages/Home"
import Create from "./pages/Create"
import { useThemeStore } from "./store/theme"
import "./App.css"

function App() {

  const { theme } = useThemeStore();

  return (
    <div className={`min-h-full ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>      
      <Nav />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  )
}

export default App
