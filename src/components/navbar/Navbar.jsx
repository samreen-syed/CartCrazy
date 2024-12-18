import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
    // get user from localStorage 
    const user = JSON.parse(localStorage.getItem('users'));

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login");
    }

    // CartItems
    const cartItems = useSelector((state) => state.cart);

    // navList Data
    const navList = (
        <ul className="flex items-center space-x-6 text-white font-medium text-sm px-5">
            {/* Home */}
            <li>
                <Link to={'/'} className="hover:text-yellow-500 transition duration-300">Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'} className="hover:text-yellow-500 transition duration-300">All Product</Link>
            </li>

            {/* Signup */}
            {!user ? (
                <li>
                    <Link to={'/signup'} className="hover:text-yellow-500 transition duration-300">Signup</Link>
                </li>
            ) : null}

            {/* Login */}
            {!user ? (
                <li>
                    <Link to={'/login'} className="hover:text-yellow-500 transition duration-300">Login</Link>
                </li>
            ) : null}

            {/* User */}
            {user?.role === "user" && (
                <li>
                    <Link to={'/user-dashboard'} className="hover:text-yellow-500 transition duration-300">User</Link>
                </li>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
                <li>
                    <Link to={'/admin-dashboard'} className="hover:text-yellow-500 transition duration-300">Admin</Link>
                </li>
            )}

            {/* Logout */}
            {user && (
                <li
                    className="cursor-pointer hover:text-yellow-500 transition duration-300"
                    onClick={logout}
                >
                    Logout
                </li>
            )}

            {/* Cart */}
            <li>
                <Link to={'/cart'} className="hover:text-yellow-500 transition duration-300">
                    Cart ({cartItems.length})
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-pink-600  sticky top-0 shadow-md">
            {/* Main */}
            <div className="lg:flex lg:items-center lg:justify-between py-3 px-4 lg:px-8">
                {/* Left */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-yellow-400 text-2xl">
                        CartCraze
                        </h2>
                    </Link>
                </div>

                {/* Center */}
                <div className="center flex flex-col items-center justify-center lg:flex-grow lg:order-2">
                    <div className="w-full lg:w-2/3">
                        <SearchBar />
                    </div>
                </div>

                {/* Right */}
                <div className="right flex justify-center lg:order-3 mb-4 lg:mb-0">
                    {navList}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
