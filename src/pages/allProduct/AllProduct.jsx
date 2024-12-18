import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart); // Get cart items from Redux store
    const dispatch = useDispatch();

    const addCart = (item) => {
        // Preparing item to add to the cart (with a default quantity of 1)
        const productForCart = {
            id: item.id,
            title: item.title,
            price: item.price,
            productImageUrl: item.productImageUrl,
            category: item.category,
            quantity: 1, // Default quantity for new items
        };
        console.log("Adding to cart:", productForCart);
        dispatch(addToCart(productForCart)); // Dispatch action to Redux store
        toast.success("Added to cart!");
    };

    const deleteCart = (item) => {
        console.log("Removing from cart:", item);
        dispatch(deleteFromCart(item)); // Dispatch delete action
        toast.success("Removed from cart!");
    };

    const handleBuyNow = (item) => {
        // Add the product to the cart first
        const productForCart = {
            id: item.id,
            title: item.title,
            price: item.price,
            productImageUrl: item.productImageUrl,
            category: item.category,
            quantity: 1, // Default quantity for new items
        };
        dispatch(addToCart(productForCart)); // Add to cart
        navigate("/cart"); // Redirect to the cart page
    };

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems)); // Sync Redux state to localStorage on change
    }, [cartItems]);

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div className="text-center mb-5">
                    <h1 className="text-2xl font-semibold">All Products</h1>
                </div>

                {/* Product Grid */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {getAllProduct.map((item, index) => {
                                const inCart = cartItems.some((p) => p.id === item.id);

                                return (
                                    <div key={index} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                                loading="lazy"
                                                onClick={() => navigate(`/productinfo/${item.id}`)}
                                                className="lg:h-80 h-96 w-full"
                                                src={item.productImageUrl}
                                                alt={item.title}
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                    E-bharat
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    {item.title.substring(0, 25)}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    ₹{item.price}
                                                </h1>
                                                <div className="flex justify-center gap-4">
                                                    {inCart ? (
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className="bg-red-700 hover:bg-red-800 w-full text-white py-[4px] rounded-lg font-bold"
                                                        >
                                                            Remove from Cart
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                        >
                                                            Add to Cart
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleBuyNow(item)} // Buy Now functionality
                                                        className="bg-pink-600 hover:bg-pink-700 w-full text-white py-[4px] rounded-lg font-bold"
                                                    >
                                                        Buy Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
