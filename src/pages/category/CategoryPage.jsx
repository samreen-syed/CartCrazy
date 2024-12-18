import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Access the cart state from Redux
    const cart = useSelector((state) => state.cart);

    const filterProduct = getAllProduct.filter((obj) =>
        obj.category.toLowerCase().includes(categoryname.toLowerCase())
    );

    // Add to Cart Functionality
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.title} added to cart`);
    };

    // Remove from Cart Functionality
    const handleRemoveFromCart = (product) => {
        dispatch(deleteFromCart(product));
        toast.error(`${product.title} removed from cart`);
    };

    // Check if the product is in the cart
    const isInCart = (productId) => cart.some((cartItem) => cartItem.id === productId);

    // Buy Now Functionality
    const handleBuyNow = (product) => {
        if (!isInCart(product.id)) {
            dispatch(addToCart(product));
        }
        navigate("/cart");
    };

    return (
        <Layout>
            <div className="mt-10">
                <h1 className="text-center mb-5 text-2xl font-semibold first-letter:uppercase">
                    {categoryname}
                </h1>
                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                {filterProduct.length > 0 ? (
                                    filterProduct.map((item, index) => {
                                        const { id, title, price, productImageUrl } = item;
                                        return (
                                            <div key={index} className="p-4 w-full md:w-1/4">
                                                <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                    <img
                                                        onClick={() => navigate(`/productinfo/${id}`)}
                                                        className="lg:h-80 h-96 w-full"
                                                        src={productImageUrl}
                                                        alt={title}
                                                    />
                                                    <div className="p-6">
                                                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                            E-bharat
                                                        </h2>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                            {title.substring(0, 25)}
                                                        </h1>
                                                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                            ₹{price}
                                                        </h1>
                                                        <div className="flex justify-center gap-2">
                                                            {/* Add/Remove Button */}
                                                            {isInCart(id) ? (
                                                                <button
                                                                    onClick={() => handleRemoveFromCart(item)}
                                                                    className="bg-red-500 hover:bg-red-600 w-1/2 text-white py-[4px] rounded-lg font-bold"
                                                                >
                                                                    Remove From Cart
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleAddToCart(item)}
                                                                    className="bg-pink-500 hover:bg-pink-600 w-1/2 text-white py-[4px] rounded-lg font-bold"
                                                                >
                                                                    Add To Cart
                                                                </button>
                                                            )}

                                                            {/* Buy Now Button */}
                                                            <button
                                                                onClick={() => handleBuyNow(item)}
                                                                className="bg-green-500 hover:bg-green-600 w-1/2 text-white py-[4px] rounded-lg font-bold"
                                                            >
                                                                Buy Now
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center">
                                        <img
                                            className="mb-2"
                                            src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                            alt="No Products Found"
                                        />
                                        <h1 className="text-black text-xl">
                                            No {categoryname} products found
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </Layout>
    );
};

export default CategoryPage;
