import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGeneral from '../../ProductGeneral'
import "./FashionShoes.scss"
import { Filter } from '../../Define'
export default function FashionShoes() {
    const [fashionShoes, setFashionShoes] = useState("")
    // const { type } = useParams()
    // console.log(type)
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');
    useEffect(() => {
        axios
            .get(
                `http://localhost:3000/api/products?type=fashion-shoe&_sort=${sort}&_order=${order}`
            )
            .then((response) => setFashionShoes(response.data)
            )
            .catch((error) => console.log(error));
        // console.log('sort:', sort, 'order:', order);

    }, [sort, order]);
    const handleOnchange = (e) => {
        setSort(e.target.value.split(' ')[0]);
        setOrder(e.target.value.split(' ')[1]);
    };
    return (
        <div className="sandal">
            <div className="top">
                <h1>Giày thời trang</h1>
                <select onChange={handleOnchange}>
                    <option value="price asc">Price: Tăng dần</option>
                    <option value="price desc">Price: Giảm dần</option>
                    <option value="trademark asc">Thương hiệu:A-Z</option>
                    <option value="trademark desc">Thương hiệu:Z-A</option>
                </select>
            </div>
            <div className='container'>
                <div className="filter">
                    <Filter />
                </div>
                <div className='items'>
                    {fashionShoes && fashionShoes.map(item => {
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
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
