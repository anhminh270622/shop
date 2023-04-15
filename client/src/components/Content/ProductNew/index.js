import "./ProductNew.scss"
import { useState, useEffect } from "react";
import ImageSlider, { Slide } from "react-auto-image-slider";
import axios from "axios";
import ProductGeneral from "../../ProductGeneral";
function ProductNew() {
    const [product, setProduct] = useState("")
    useEffect(() => {
        axios.get("http://localhost:3000/api/products?tag=new")
            .then(response => setProduct(response.data))
            .catch((error) =>
                console.log(error)
            )
    }, [])
    // console.log(product)
    return (<>
        <div className="product-new">
            <h1>Sản phẩm mới</h1>
            <div className="product-item">
                {product && product.map(item => (
                    <ProductGeneral
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        sale={item.price_sale}
                        image={item.images}
                        trademark={item.trademark}
                        tag={item.tag}
                        description={item.description}
                        type={item.type}
                    />
                ))
                }
            </div>
        </div>
    </>);
}

export default ProductNew;