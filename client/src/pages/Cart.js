
import { useDispatch, useSelector } from "react-redux"
import { addToCart, decreaseCart } from "../features/cartSlice";
import "./Cart.css"

const Cart = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    const qtyIncreaseHandler = (item) => {
        dispatch(addToCart(item));
    };
    
    const qtyDecreaseHandler = (item) => {
        dispatch(decreaseCart(item));
    };
    return (
        <div>
            <h1>CART</h1>

            <div className="sideline"></div>

            <div className="product-listing">
                <div className="product-details">
                    <p className="name">Apollo</p>
                    <p className="brand">Running Short</p>

                    <p className="price">$50.00</p>

                    <div className="attributes-container">
                        <div className="attribute">S</div>
                    </div>
                </div>

                <div className="product-visuals">
                    <div className="qty-container">
                        <div className="plus" onClick={qtyIncreaseHandler}>
                            +
                        </div>
                        <p className="qty">1</p>
                        <div className="minus" onClick={qtyDecreaseHandler}>
                            -
                        </div>
                    </div>

                    <div className="visual">
                        <img
                            src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                            alt=""
                        />

                        <i className="fa-solid fa-chevron-left"></i>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>

            <div className="sideline"></div>
        </div>
    );
}
export default Cart