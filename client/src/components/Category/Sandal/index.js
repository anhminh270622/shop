import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGeneral from '../../ProductGeneral'
import { Filter } from '../../Define'
import "./Sandal.scss"
export default function Sandal() {
    const [sandal, setSandal] = useState("")
    // const { type } = useParams()
    // console.log(type)
    useEffect(() => {
        axios.get("http://localhost:3000/api/products?type=sandal")
            .then(response => setSandal(response.data))
            .catch((error) =>
                console.log(error)
            )
    }, [])
    return (
        <div className="sandal">
            <h1>Dép</h1>
            <div className="container">
                <div className="filter"><Filter /></div>
                <div className='items'>
                    {sandal && sandal.map(item => {
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
