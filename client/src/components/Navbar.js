import {NavLink} from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <nav>
                <div className="nav-links">
                    <ul>
                        <li
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                        >
                            ALL
                        </li>
                        <li
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                        >
                            CLOTHES
                        </li>
                        <li
                            className={({ isActive }) =>
                                isActive ? "active-link" : ""
                            }
                        >
                            TECH
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

                            <div className="cart-item-number">2</div>

                            <div className="cart-overlay">
                                <div className="title">
                                    <p>
                                        My Bag, <span>2 items</span>
                                    </p>
                                </div>

                                <div className="item-details">
                                    <div className="item-detail">
                                        <p className="item-name">Apollo</p>

                                        <p className="item-desc">
                                            Running Short
                                        </p>

                                        <p className="item-price">$50.00</p>

                                        <div className="item-size">
                                            <span className="selected">S</span>
                                            <span className="not-selected">
                                                M
                                            </span>
                                        </div>
                                    </div>

                                    <div className="item-visual">
                                        <div className="qty-details">
                                            <p className="plus">+</p>

                                            <p className="qty">1</p>

                                            <p className="minus">-</p>
                                        </div>

                                        <img
                                            src="https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087"
                                            alt=""
                                            className="item-img"
                                        />
                                    </div>
                                </div>

                                <div className="cart-overlay-total">
                                    <p className="total">Total</p>
                                    <p className="total-amount">$100.00</p>
                                </div>

                                <div className="cart-overlay-actions">
                                    <button
                                        type="button"
                                        className="btn view-bag"
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
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
export default Navbar