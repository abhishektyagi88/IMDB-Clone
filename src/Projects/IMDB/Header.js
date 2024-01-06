import { NavLink } from "react-router-dom";

const Header = function(){
return(
    <div className = "text-xl flex gap-6 space-x-5 justify-between border-4 border-red-400 rounded-sm">
        <div className = "flex font-semibold gap-5 text-blue-500">
            <NavLink to = "/">Movies</NavLink>
            <NavLink to = "/List">WatchList</NavLink>
        </div>       
    </div>
)
}

export default Header;