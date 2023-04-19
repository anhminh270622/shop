import "./ProductNew.scss"
import { useState, useEffect } from "react";
import ImageSlider, { Slide } from "react-auto-image-slider";
import axios from "axios";
import ProductGeneral from "../../ProductGeneral";
function ProductNew() {
    const [product, setProduct] = useState("")
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');
    useEffect(() => {
        axios.get(`http://localhost:3000/api/products?tag=new&_sort=${sort}&_order=${order}`)
            .then(response => setProduct(response.data))
            .catch((error) =>
                console.log(error)
            )
    }, [sort, order])
    const handleOnchange = (e) => {

        setSort(e.target.value.split(' ')[0]);
        setOrder(e.target.value.split(' ')[1]);
    };
    return (<>
        <div className="product-new">
            <div className="top">
                <h1>Sản phẩm mới</h1>

                <select onChange={handleOnchange}>
                    <option value="price asc">Giá: Tăng dần</option>
                    <option value="price desc">Giá: Giảm dần</option>
                    <option value="trademark asc">Thương hiệu:A-Z</option>
                    <option value="trademark desc">Thương hiệu:Z-A</option>
                </select>
            </div>
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