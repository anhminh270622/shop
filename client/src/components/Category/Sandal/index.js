import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductGeneral from '../../ProductGeneral';
import { Filter, Sort } from '../../Define';
import './Sandal.scss';
export default function Sandal() {
    const [sandal, setSandal] = useState('');
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');
    const [tag, setTag] = useState('')
    useEffect(() => {
        if (tag) {
            axios.get(
                `http://localhost:3000/api/products?type=sandal&_sort=${sort}&_order=${order}&tag=${tag}`)
                .then((response) => setSandal(response.data)
                )
                .catch((error) => console.log(error));
        } else {
            axios.get(
                `http://localhost:3000/api/products?type=sandal&_sort=${sort}&_order=${order}`)
                .then((response) => setSandal(response.data)
                )
                .catch((error) => console.log(error));
        }
    }, [sort, order, tag]);
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
        <div className="sandal">
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
