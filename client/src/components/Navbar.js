import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../features/cartSlice";


const Navbar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const qtyIncreaseHandler = (item) => {
        dispatch(addToCart(item))
    }
    
    const qtyDecreaseHandler = (item) => {
        dispatch(decreaseCart(item))
    }

    const viewBagHandler = () => {
        navigate("/cart");
    };

    return (
        <div>
            <nav>
                <div className="nav-links">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={(navLink) =>
                                    navLink.isActive ? "active-link" : ""
                                }
                            >
                                ALL
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/clothes"
                                className={({ isActive }) =>
                                    isActive ? "active-link" : ""
                                }
                            >
                                CLOTHES
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/tech"
                                className={({ isActive }) =>
                                    isActive ? "active-link" : ""
                                }
                            >
                                TECH
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="logo">Mayra</div>

                <div className="cart-overview">
                    <ul className="currency-switcher">
                        <li className="currency-selector">
                            ${" "}
                            <span>
                                <i className="fa-solid fa-angle-down open"></i>
                                <i className="fa-solid fa-angle-up close"></i>
                            </span>
                            <ul className="currencies">
                                <li>$ USD</li>

                                <li>£ GBP</li>

                                <li>A$ AUD</li>

                                <li>¥ JPY</li>

                                <li>₽ RUB</li>
                            </ul>
                        </li>

                        <li className="cart">
                            <i className="fa-brands fa-opencart"></i>

                            <div className="cart-item-number">
                                {cart.cartTotalQty}
                            </div>

                            <div className="viewport-overlay"></div>

                            <div className="cart-overlay">
                                <div className="title">
                                    <p>
                                        <span>My Bag</span>,{" "}
                                        <span>
                                            {cart.cartTotalQty}{" "}
                                            {cart.cartTotalQty <= 1
                                                ? "item"
                                                : "items"}
                                        </span>
                                    </p>
                                </div>

                                {cart.cartItems.length === 0 ? (
                                    <>
                                        <h3 className="empty-bag">Your bag is empty!</h3>
                                    </>
                                ) : (
                                    <>
                                            <div className="item-details">
                                                {cart.cartItems.map((item)=>(<><div className="item-detail" key={item.id}>
                                                <p className="item-name">
                                                    {item.name}
                                                </p>

                                                <p className="item-desc">
                                                    {item.brand}
                                                </p>

                                                <p className="item-price">
                                                    ${item.price}
                                                </p>

                                                <div className="item-size">
                                                    <span className="selected">
                                                        {
                                                            item.attribute
                                                        }
                                                    </span>
                                                    <span className="not-selected">
                                                        M
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="item-visual">
                                                <div className="qty-details">
                                                    <p
                                                        className="plus"
                                                        onClick={
                                                            qtyIncreaseHandler
                                                        }
                                                    >
                                                        +
                                                    </p>

                                                    <p className="qty">1</p>

                                                    <p
                                                        className="minus"
                                                        onClick={
                                                            qtyDecreaseHandler
                                                        }
                                                    >
                                                        -
                                                    </p>
                                                </div>

                                                <img
                                                    src={item.gallery}
                                                    alt=""
                                                    className="item-img"
                                                />
                                            </div></>))}
                                            
                                        </div>

                                        <div className="cart-overlay-total">
                                            <p className="total">Total</p>
                                            <p className="total-amount">
                                                $100.00
                                            </p>
                                        </div>

                                        <div className="cart-overlay-actions">
                                            <button
                                                type="button"
                                                className="btn view-bag"
                                                onClick={viewBagHandler}
                                            >
                                                VIEW BAG
                                            </button>

                                            <button
                                                type="button"
                                                className="btn checkout"
                                            >
                                                CHECKOUT
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
export default Navbar