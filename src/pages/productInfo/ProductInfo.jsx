import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams, useNavigate } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const ProductInfo = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const [product, setProduct] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Added to cart");
    };

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Deleted from cart");
    };

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            setProduct({ ...productTemp.data(), id: productTemp.id });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleBuyNow = () => {
        if (!cartItems.some((p) => p.id === product.id)) {
            dispatch(addToCart(product));  // Add product to cart if not already there
        }
        navigate('/cart');  // Redirect to the cart page
    };

    useEffect(() => {
        getProductData();
    }, [id]);

    return (
        <Layout>
            <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
                {loading ?
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                    :
                    <div className="max-w-6xl px-4 mx-auto">
                        <div className="flex flex-wrap mb-24 -mx-4">
                            <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                                <div className="">
                                    <img
                                        className=" w-full lg:h-[39em] rounded-lg"
                                        src={product?.productImageUrl}
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2">
                                <div className="lg:pl-20">
                                    <h2 className="max-w-xl mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                        {product?.title}
                                    </h2>
                                    <p className="inline-block text-2xl font-semibold text-gray-700 dark:text-gray-400">
                                        <span>₹ {product?.price}</span>
                                    </p>
                                    <p className="mb-6">{product?.description}</p>

                                    <div className="mb-6 " />
                                    <div className="flex flex-wrap items-center mb-6">
                                        {cartItems.some((p) => p.id === product.id) ?
                                            <button
                                                onClick={() => deleteCart(product)}
                                                className="w-full px-4 py-3 text-center text-white bg-red-500 border border--600  hover:bg-red-600 hover:text-gray-100  rounded-xl"
                                            >
                                                Delete from cart
                                            </button>
                                            :
                                            <button
                                                onClick={() => addCart(product)}
                                                className="w-full px-4 py-3 text-center text-pink-600 bg-pink-100 border border-pink-600  hover:bg-pink-600 hover:text-gray-100  rounded-xl"
                                            >
                                                Add to cart
                                            </button>
                                        }
                                    </div>
                                    <div className="flex gap-4 mb-6">
                                        <button
                                            onClick={handleBuyNow}
                                            className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
                                        >
                                            Buy now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </section>
        </Layout>
    );
};

export default ProductInfo;
