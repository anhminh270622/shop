import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductGeneral from '../../ProductGeneral'
import "./Hose.scss"
import { FilterHose } from '../../Define'
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
export default function Hose() {
    const [hose, setHose] = useState("")
    const { type } = useParams()
    // console.log(type)
    useEffect(() => {
        axios.get("http://localhost:3000/api/products?type=hose")
            .then(response => setHose(response.data))
            .catch((error) =>
                console.log(error)
            )
    }, [])
    return (
        <div className="hose">
            <h1>Vớ</h1>
            <div className="container">
                <div className="filter"><FilterHose /></div>
                <div className='items'>

                    {hose && hose.map(item => {
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
