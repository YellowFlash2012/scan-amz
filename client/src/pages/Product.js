import { useParams } from "react-router-dom";
import "./Product.css"

import { useQuery, gql } from "@apollo/client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";


const Product = () => {

    const [mainImg, setMainImg] = useState([])

    let { id } = useParams();

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

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>;

    const displayThumb = () => {
        
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
                            onClick={()=>displayThumb(setMainImg(thumb))}
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

                    {data.product.attributes.length>=1 && <p className="attribute-name">
                        {data.product.attributes[0].name}:
                    </p>}
                    <div className="attribute-items">
                        {data.product.attributes.length>=1 && data.product.attributes[0].items.map((item) => (
                            <div
                                key={uuidv4()}
                                style={{ color: "{item.value}" }}
                                className="item"
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

                    <button type="button" className="add-to-cart">
                        ADD TO CART
                    </button>

                    <div className="desc">
                        {data.product.description}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Product