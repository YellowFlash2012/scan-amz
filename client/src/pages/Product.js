import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux"
import { addToCart } from "../features/cartSlice";
import "./Product.css"

import { useQuery, gql } from "@apollo/client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";


const Product = () => {

    
    const dispatch = useDispatch();

    let { id } = useParams();

    const [pdtAttr, setPdtAttr] = useState(false);

    const PRODUCT_QUERY = gql`
        query {
            product (id:"${id}") {
                id
                name
                brand
                category
                inStock
                description
                gallery
                attributes {
                id
                name
                type
                items {
                    id
                    value
                    displayValue
                }
                }
                prices {
                amount
                currency {
                    label
                    symbol
                }
                }
            }
        }
    `;

    const { data, loading, error } = useQuery(PRODUCT_QUERY);
    
    console.log(data);

    const [mainImg, setMainImg] = useState([
        !loading && data.product.gallery[0],
    ]);

    
    const setAttributeHandler = (e, id) => {
        console.log(id, e.target.innerText, "I was clicked");

        if (e.target.innerText === id) {
            setPdtAttr(prevState => !prevState);
        } 
    };
        
    
    if (loading) return "Loading...";

    if (error) return <pre>{error.message}</pre>;

    const displayThumb = () => {
        
    }
    
    const addToCartHandler = (product) => {
        dispatch(addToCart(product))
    }

    return (
        <div>
            <div className="grid-container">
                <div className="thumbs">
                    {data.product.gallery.map((thumb) => (
                        <img
                            key={uuidv4()}
                            src={thumb}
                            alt=""
                            className="thumb"
                            onClick={() => displayThumb(setMainImg(thumb))}
                        />
                    ))}
                </div>

                <img
                    className="main-img"
                    src={mainImg}
                    alt=""
                />

                <div className="product-details">
                    <p className="name">{data.product.name}</p>

                    <p className="brand">{data.product.brand}</p>

                    {data.product.attributes.length >= 1 && (
                        <p className="attribute-name">
                            {data.product.attributes[0].name}:
                        </p>
                    )}
                    <div className="attribute-items">
                        {data.product.attributes.length >= 1 &&
                            data.product.attributes[0].items.map((item) => (
                                <div
                                    key={uuidv4()}
                                    style={{ color: "{item.value}" }}
                                    className={`item${!pdtAttr ? " " : " active-attribute-item"}`}

                                    onClick={(e)=>setAttributeHandler(e,item.id)}
                                >
                                    {item.displayValue}
                                </div>
                            ))}
                    </div>

                    <p className="attribute-price">PRICE:</p>
                    <p className="price">
                        {data.product.prices[0].currency.symbol}
                        {data.product.prices[0].amount}
                    </p>

                    <button
                        type="button"
                        className="add-to-cart"
                        onClick={() => addToCartHandler(data.product)}
                        disabled={!pdtAttr}
                    >
                        ADD TO CART
                    </button>

                    <div className="desc">{data.product.description}</div>
                </div>
            </div>
        </div>
    );
}
export default Product