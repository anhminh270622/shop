import axios from "axios";
import "./SearchResults.scss"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import ProductGeneral from "../ProductGeneral"
import { Filter } from "../Define";
import { fetchSomeData } from "../../redux/productSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SearchResults() {
    const location = useLocation();
    const { input } = location?.state;
    const [searchResult, setSearchResult] = useState([]);
    const [searched, setSearched] = useState(false);
    const dispatch = useDispatch();
    const search = useSelector(state => state.product.products.data);
    const value = useSelector((state) => state.value.items);
    const trademark = useSelector((state) => state.value.data);


    useEffect(() => {
        let result = search;
        if (value === 'max500') {
            result = result.filter((product) => product.price < 500000);
        } else if (value === 'max1000') {
            result = result.filter(
                (product) => product.price >= 500000 && product.price < 1000000
            );
        } else if (value === 'max1500') {
            result = result.filter(
                (product) => product.price >= 1000000 && product.price <= 1500000
            );
        } else if (value === 'max5000') {
            result = result.filter(
                (product) => product.price >= 2000000 && product.price <= 5000000
            );
        } else if (value === 'min5001') {
            result = result.filter((product) => product.price > 5000000);
        }

        let updatedResults = result;
        if (trademark.length > 0) {
            updatedResults = result.filter((product) =>
                trademark.includes(product.trademark)
            );
        }
        setSearchResult(updatedResults);
    }, [search, value, trademark]);

    useEffect(() => {
        dispatch(fetchSomeData("products"))
    }, [dispatch]);

    useEffect(() => {
        if (input) {
            const results = search.filter(item => item.name && item.name.toLowerCase().includes(input.toLowerCase()));
            setSearchResult(results);
            setSearched(true);
        }
    }, [input, search]);
    console.log("setSearchResult", searchResult)
    const sortFunctions = {
        new: (products) => {
            const newProducts = products.filter((product) => product.tag === 'new');
            const oldProducts = products.filter((product) => product.tag !== 'new');
            return [...newProducts, ...oldProducts];
        },
        asc: (products) => products.sort((a, b) => a.price - b.price),
        desc: (products) => products.sort((a, b) => b.price - a.price),
        az: (products) =>
            products.sort((a, b) => a.trademark.localeCompare(b.trademark)),
        za: (products) =>
            products.sort((a, b) => b.trademark.localeCompare(a.trademark)),
    };

    const handleOnchange = (e) => {
        const sortFunction = sortFunctions[e.target.value];
        const sortedResults = sortFunction([...searchResult]);
        setSearchResult(sortedResults);
    };

    useEffect(() => {
        const sortFunction = sortFunctions.asc;
        const sortedSearch = sortFunction([...search]);
        setSearchResult(sortedSearch);
    }, [search]);
    return (
        <>
            <div className="search-results">
                <div className="top">
                    <span>
                        {input !== "" ? input : "Tất cả"}
                        <hr />
                    </span>
                    <select onChange={handleOnchange}>
                        <option value="asc">Giá: Tăng dần</option>
                        <option value="desc">Giá: Giảm dần</option>
                        <option value="az">Thương hiệu:A-Z</option>
                        <option value="za">Thương hiệu:Z-A</option>
                        <option value="new">Sản phẩm: Mới</option>
                    </select>
                </div>
                <div className="container">
                    <div className="filter-results">
                        <Filter />
                    </div>
                    {/* <div className="search-item">
                        {searched && searchResult && searchResult.length > 0 ? (
                            searchResult.map(item => (
                                <ProductGeneral
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    sale={item.price_sale}
                                    image={item?.images}
                                    trademark={item.trademark}
                                    tag={item.tag}
                                    description={item.description}
                                    type={item.type}
                                />
                            ))) : (
                            !searched && (
                                <p>Bắt đầu tìm kiếm để hiển thị kết quả</p>
                            )
                        )
                        }

                    </div> */}
                    <div className="search-item">
                        {searched && searchResult && searchResult.length > 0 ? (
                            searchResult.map(item => (
                                <ProductGeneral
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    sale={item.price_sale}
                                    image={item?.images}
                                    trademark={item.trademark}
                                    tag={item.tag}
                                    description={item.description}
                                    type={item.type}
                                />
                            ))
                        ) : null}
                    </div>
                </div>
            </div>
        </>
    );
}
