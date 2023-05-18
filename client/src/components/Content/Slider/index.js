import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider, { Slide } from "react-auto-image-slider";
import "./Slider.scss"
export default function Slider() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get("https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/advertisement.json")
            .then(response => {
                setData(response.data);
                setLoading(false)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div className="slider">
            {loading ? (<></>) : (
                <ImageSlider effectDelay={500} autoPlayDelay={2000} className="auto-slider">
                    {data.map(item => (
                        <Slide key={item.id}>
                            <img src={item.url}></img>
                        </Slide>
                    ))}
                </ImageSlider>
            )}

        </div>
    );
}
