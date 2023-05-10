import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGeneral from '../../ProductGeneral';
import { Filter, Sort } from '../../Define';
import { fetchSomeData } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import './Sandal.scss';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
export default function Sandal() {
    const [sandal, setSandal] = useState('');
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.products.data)
    const value = useSelector(state => state.value.items)
    const productSandal = product.filter(product => product.type === "sandal")
    const trademark = useSelector(state => state.value.data)
    useEffect(() => {
        dispatch(fetchSomeData("products"))
    }, [dispatch])
    useEffect(() => {
        if (value === "max500") {
            const sortFunction = productSandal.filter(product => product.price < 500000);
            setSandal(sortFunction);
        } else if (value === "max1000") {
            const sortFunction = productSandal.filter(product => product.price >= 500000 && product.price < 1000000);
            setSandal(sortFunction);
        }
        else if (value === "max1500") {
            const sortFunction = productSandal.filter(product => product.price >= 1000000 && product.price <= 1500000);
            setSandal(sortFunction);
        } else if (value === "max5000") {
            const sortFunction = productSandal.filter(product => product.price >= 2000000 && product.price <= 5000000);
            setSandal(sortFunction);
        } else if (value === "min5001") {
            const sortFunction = productSandal.filter(product => product.price > 5000000);
            setSandal(sortFunction);
        }
        else {
            setSandal(productSandal);
        }
    }, [product, value]);
    useEffect(() => {
        if (trademark.length > 0) {
            const sortFunction = productSandal.filter(product =>
                trademark.includes(product.trademark)
            );
            setSandal(sortFunction);
        } else {
            setSandal(productSandal);
        }
        console.log("trademark", trademark)


    }, [trademark])
    const sortFunctions = {
        new: (sandal) => {
            const newProducts = sandal.filter((product) => product.tag === "new");
            const oldProducts = sandal.filter((product) => product.tag !== "new");
            return [...newProducts, ...oldProducts];
        },
        asc: (sandal) => sandal.sort((a, b) => a.price - b.price),
        desc: (sandal) => sandal.sort((a, b) => b.price - a.price),
        az: (sandal) => sandal.sort((a, b) => a.trademark.localeCompare(b.trademark)),
        za: (sandal) => sandal.sort((a, b) => b.trademark.localeCompare(a.trademark)),
    };
    const handleOnchange = (e) => {
        const sortFunction = sortFunctions[e.target.value];
        setSandal(sortFunction(productSandal));
    };
    useEffect(() => {
        const sortFunction = sortFunctions.asc;
        setSandal(sortFunction(productSandal));
    }, [product])
    return (
        <div className="sandal">
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
                <div className="filter">
                    <Filter />
                    {/* <Box sx={{ width: "100%" }}>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                        />
                    </Box> */}
                </div>
                <div className="items">
                    {sandal &&
                        sandal.map((item) => {
                            return (
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
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
