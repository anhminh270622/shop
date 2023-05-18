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
    const { input } = location.state || {};
    const [searchResult, setSearchResult] = useState([]);
    const dispatch = useDispatch();
    const search = useSelector(state => state.product.products.data);

    useEffect(() => {
        dispatch(fetchSomeData("products"))
    }, [dispatch]);

    useEffect(() => {
        if (input) {
            const results = search.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
            setSearchResult(results);
        }
    }, [search, input]);

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
        const sortedResults = sortFunction(searchResult.slice()); // Create a copy of the array
        setSearchResult(sortedResults);
    };

    useEffect(() => {
        const sortFunction = sortFunctions.asc;
        const sortedSearch = sortFunction(search.slice()); // Create a copy of the array
        setSearchResult(sortedSearch);
    }, [search]);


    return (
        <>
            <div className="search-results">
                <div className="top">
                    <h1>Dép</h1>
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
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
