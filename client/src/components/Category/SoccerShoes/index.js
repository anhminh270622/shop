import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGeneral from '../../ProductGeneral'
import "./SoccerShoes.scss"
import { Filter } from '../../Define'
export default function SoccerShoes() {
    const [soccerShoes, setSoccerShoes] = useState("")
    // const { type } = useParams()
    // console.log(type)
    useEffect(() => {
        axios.get("http://localhost:3000/api/products?type=soccer-shoe")
            .then(response => setSoccerShoes(response.data))
            .catch((error) =>
                console.log(error)
            )
    }, [])
    return (
        <div className="soccerShoes">
            <h1>Giày bóng đá</h1>
            <div className="container">
                <div className="filter">
                    <Filter />
                </div>

                <div className='items'>
                    {soccerShoes && soccerShoes.map(item => {
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
