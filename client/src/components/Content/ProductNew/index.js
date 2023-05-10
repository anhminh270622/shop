import "./ProductNew.scss"
import { useState, useEffect } from "react";
import ImageSlider, { Slide } from "react-auto-image-slider";
import axios from "axios";
import ProductGeneral from "../../ProductGeneral";
import { fetchSomeData } from "../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
function ProductNew() {
    const [product, setProduct] = useState("")
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');
    const [selling, setSelling] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get(`http://localhost:3000/api/products?tag=new&_sort=${sort}&_order=${order}`)
            .then(response => {
                const products = response.data.slice(0, 10)
                setProduct(products)
            })
            .catch((error) =>
                console.log(error)
            )
    }, [sort, order, dispatch])
    const handleOnchange = (e) => {
        setSort(e.target.value.split(' ')[0]);
        setOrder(e.target.value.split(' ')[1]);
    };
    useEffect(() => {
        dispatch(fetchSomeData("products"))
    }, [dispatch])
    const productBuy = useSelector(state => state.product.products.data)
    const productSelling = productBuy.filter(product => product.quantity < 50)
    const sortFunctions = {
        new: (products) => {
            const newProducts = products.filter((product) => product.tag === "new");
            const oldProducts = products.filter((product) => product.tag !== "new");
            return [...newProducts, ...oldProducts];
        },
        asc: (products) => products.sort((a, b) => a.price - b.price),
        desc: (products) => products.sort((a, b) => b.price - a.price),
        az: (products) => products.sort((a, b) => a.trademark.localeCompare(b.trademark)),
        za: (products) => products.sort((a, b) => b.trademark.localeCompare(a.trademark)),
    };
    const handleOnchangeSelling = (e) => {
        const sortFunction = sortFunctions[e.target.value];
        setSelling(sortFunction(productSelling));
    };
    useEffect(() => {
        const sortFunction = sortFunctions.asc;
        setSelling(sortFunction(productSelling));
    }, [productBuy])
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
            <hr />

        </div>
        <div className="product-selling">
            <div className="top">
                <h1>Sản phẩm bán chạy</h1>
                <select defaultValue="asc" onChange={handleOnchangeSelling}>
                    <option value="asc">Giá: Tăng dần</option>
                    <option value="desc">Giá: Giảm dần</option>
                    <option value="az">Thương hiệu:A-Z</option>
                    <option value="za">Thương hiệu:Z-A</option>
                    <option value="new">Sản phẩm: Mới</option>
                </select>
            </div>
            <div className="product-item">
                {selling && selling.map(item => (
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