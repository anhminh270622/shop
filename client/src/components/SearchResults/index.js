import axios from "axios";
import "./SearchResults.scss"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import ProductGeneral from "../ProductGeneral"
import { Filter } from "../Define";
export default function SearchResults() {
    const location = useLocation();
    const { input } = location.state || {};
    const [searchResult, setSearchResult] = useState('')
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');
    const [tag, setTag] = useState('')
    useEffect(() => {
        if (tag) {
            axios.get(
                `http://localhost:3000/api/products?q=${input}&_sort=${sort}&_order=${order}&tag=${tag}`)
                .then((response) => setSearchResult(response.data)
                )
                .catch((error) => console.log(error));
        } else {
            axios.get(
                `http://localhost:3000/api/products?q=${input}&_sort=${sort}&_order=${order}`)
                .then((response) => setSearchResult(response.data)
                )
                .catch((error) => console.log(error));
        }
    }, [sort, order, tag, input]);
    const handleOnchange = (e) => {
        if (e.target.value === 'new') {
            setTag('new')
        } else {
            setSort(e.target.value.split(' ')[0]);
            setOrder(e.target.value.split(' ')[1]);
            setTag('')
        }

    };
    return (
        <>
            <div className="search-results">
                <div className="top">
                    <h1>Dép</h1>
                    <select onChange={handleOnchange}>
                        <option value="price asc">Giá: Tăng dần</option>
                        <option value="price desc">Giá: Giảm dần</option>
                        <option value="trademark asc">Thương hiệu:A-Z</option>
                        <option value="trademark desc">Thương hiệu:Z-A</option>
                        <option value="new">Sản phẩm: Mới</option>
                    </select>
                </div>
                <div className="container">
                    <div className="filter">
                        <Filter />
                    </div>
                    <div className="search-item">
                        {searchResult && searchResult.map(item => (
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
            </div>
        </>);
}
