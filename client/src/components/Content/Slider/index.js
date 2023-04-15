import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSlider, { Slide } from "react-auto-image-slider";
import "./Slider.scss"
export default function Slider() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/advertisement")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <div className="slider">
            <ImageSlider effectDelay={500} autoPlayDelay={2000} className="auto-slider">

                {data.map(item => (
                    <Slide key={item.id}>
                        <img src={item.url}></img>
                    </Slide>
                ))}

            </ImageSlider>

        </div>
    );
}
