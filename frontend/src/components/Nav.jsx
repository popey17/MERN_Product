import { Link } from "react-router-dom"
import { MdDarkMode , MdLightMode } from "react-icons/md";
import { useThemeStore } from "../store/theme";

const Nav = () => {
  
  const { theme, toggleTheme } = useThemeStore();
  
  return (
    <div className="max-w-[95vw] mx-auto">
      <div className="flex justify-between items-center py-4">

        <h1 className="text-[30px] font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          <Link to="/">LOGO</Link></h1>
        <div className="flex items-center space-x-4">
          <Link to="/create">Create</Link>
          <button onClick={toggleTheme}>
            {theme === 'light' ?
            <MdLightMode className="text-[25px]"/>
            :
            <MdDarkMode className="text-[25px]"/>
            }
          </button>

          

        </div>
      </div>
    </div>
  )
}

export default Nav