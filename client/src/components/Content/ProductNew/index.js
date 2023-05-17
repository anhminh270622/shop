import './ProductNew.scss';
import { useState, useEffect } from 'react';
import ImageSlider, { Slide } from 'react-auto-image-slider';
import axios from 'axios';
import ProductGeneral from '../../ProductGeneral';
import { fetchSomeData } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function ProductNew() {
    const [product, setProduct] = useState('');
    const [sort, setSort] = useState('price');
    const [order, setOrder] = useState('asc');
    const [selling, setSelling] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        axios
            .get(
                `https://server-oum7.onrender.com/products?tag=new&_sort=${sort}&_order=${order}`
            )
            .then((response) => {
                const products = response.data.slice(0, 10);
                setProduct(products);
            })
            .catch((error) => console.log(error));
    }, [sort, order, dispatch]);
    const handleOnchange = (e) => {
        setSort(e.target.value.split(' ')[0]);
        setOrder(e.target.value.split(' ')[1]);
    };
    useEffect(() => {
        dispatch(fetchSomeData('products'));
    }, [dispatch]);
    const productBuy = useSelector((state) => state.product.products.data);
    const productSelling = productBuy.filter((product) => product.quantity < 50);
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
    const handleOnchangeSelling = (e) => {
        const sortFunction = sortFunctions[e.target.value];
        setSelling(sortFunction(productSelling));
    };
    useEffect(() => {
        const sortFunction = sortFunctions.asc;
        setSelling(sortFunction(productSelling));
    }, [productBuy]);
    return (
        <>
            <div className="product-new">
                <div className="product-mobile">
                    <div className="mobile">
                        <Link to="/sandal">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="flip-flops"><path fill="#dce0e0" d="M57.2 14.4c.9 8.4-1.1 18.1-1.6 26.5-.3 5.3.7 13.7-2.1 18.6-2.9 5-10.7 5.9-15.2 2.6C33.6 58.7 34.7 53 35 48c.8-12-2.6-24-2.3-36.1C33 5.3 35.5-1.4 43.4.3c5.3 1.2 13.2 8.6 13.8 14.1z"></path><path fill="#53c5e7" d="M56.8 31c-.1 1.1-.1 2.2-.3 3.1-.4-3.8-2.3-6.8-2.3-6.8-.1-.3-.3-.6-.4-.8l-9.4-12.7-5.5 8.8s-1 1.3-1.6 3.6c0 0-2.1 2.9-2.8 7.5-.5-2.8-.3-5.2-.3-5.2.1-2 .4-4.4 1.2-6.6 1.2-3.3 5.3-8.9 7.4-11.7l-.8-1c-.1-.2-.2-.3-.3-.5.2-.5.3-.9.6-1.5.5-.3.9-.4 1.3-.5.1.2.2.3.3.5l1.7 2.4c2 1.3 3.6 3.3 3.6 3.3 7.2 9.4 8 10.9 7.6 18.1z"></path><path fill="#379fc8" d="M56.5 34.1c-.1.5-.1 1-.2 1.5-.3 1.6-.7 2.9-1.1 4-.8 2-2 3.5-3.4 4.7-2.9 2.5-2.2-2.7-2.2-2.7.6-.8 1.2-2.1 1.9-3.7.9-2 1.7-4.4 2.4-6.3.1-.4.3-.8.4-1.2.3-1 .3-2.1-.1-3.1.1 0 1.9 3 2.3 6.8zM39.3 44.3c-1.9-2.2-2.9-4.3-3.5-6.1-.7-1.4-1.1-3-1.3-4.4.7-4.6 2.8-7.5 2.8-7.5-.5 1.9-.7 4.6.3 7.7v.1c.3.8.6 1.6 1 2.3 1 2.2 2 3.6 2 3.6.3 6.4-1.3 4.3-1.3 4.3z"></path><path fill="#dce0e0" d="M6.7 14.6C5.9 23 8 32.6 8.6 41c.4 5.3-.6 13.7 2.3 18.5 2.9 5 10.8 5.8 15.3 2.4 4.7-3.5 3.5-9.1 3.1-14.2-.9-12 2.4-24.1 1.9-36.2-.3-6.4-2.9-13-10.8-11.2C15.1 1.5 7.3 9 6.7 14.6z"></path><path fill="#53c5e7" d="M7.3 31.1c.1 1.1.2 2.2.3 3.1.4-3.8 2.2-6.8 2.2-6.8.1-.3.3-.6.4-.8l9.2-12.8 5.6 8.7s1 1.3 1.7 3.6c0 0 2.1 2.9 2.9 7.5.4-2.8.3-5.2.3-5.2-.1-2-.5-4.4-1.3-6.6-1.2-3.3-5.4-8.9-7.5-11.6l.8-1.2c.1 0 .2-.2.3-.4-.2-.5-.3-.9-.6-1.5-.5-.3-.9-.4-1.3-.5-.1.2-.2.3-.3.5l-1.7 2.4c-1.9 1.3-3.6 3.4-3.6 3.4-7.1 9.5-7.8 11-7.4 18.2z"></path><path fill="#379fc8" d="M7.6 34.2c.1.5.1 1 .2 1.5.3 1.6.7 2.9 1.2 4 .9 2 2 3.5 3.4 4.7 2.9 2.4 2.1-2.7 2.1-2.7-.6-.7-1.3-2.1-1.9-3.7-.9-2-1.8-4.4-2.5-6.3-.2-.4-.3-.8-.4-1.2-.4-1-.3-2.1 0-3.1.1 0-1.7 3-2.1 6.8zm17.3 10c1.9-2.3 2.8-4.4 3.4-6.1.7-1.4 1.1-3 1.3-4.4-.7-4.6-2.9-7.5-2.9-7.5.5 1.9.8 4.6-.2 7.7v.1c-.3.8-.6 1.6-.9 2.3-1 2.2-2 3.7-2 3.7-.2 6.4 1.3 4.2 1.3 4.2z"></path></svg>
                                <p>Dép</p>
                            </div></Link>
                        <Link to="/hose">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="socks"><path d="M13,21a4.06,4.06,0,0,1-1.75,3.31l-3-3A1,1,0,0,1,8,20.64V17.13A4,4,0,0,1,13,21Z"></path><path d="M25.31,21.5a7,7,0,0,0-9.43,7.43l-3.2-3.19A6.07,6.07,0,0,0,15,21a6,6,0,0,0-7-5.91V2A1,1,0,0,1,9,1h2V5a1,1,0,0,0,2,0V1h2V5a1,1,0,0,0,2,0V1h2a1,1,0,0,1,1,1V16.09l4.82,4.81C25,21.09,25.15,21.3,25.31,21.5Z"></path><path d="M18.54,30.77a6,6,0,0,0,6.28-1.38h0a6,6,0,0,0,1.73-4.51C23,20.19,15.37,24.93,18.54,30.77Z"></path></svg>
                                <p>Vớ</p>
                            </div></Link>
                        <Link to="/soccer-shoe">

                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" id="football-studs"><path d="m495.71 185.77-26-58.42v-.09L463.38 113a2.56 2.56 0 0 1-.11-.24c-6.58-13.48-32-41.18-55-43.85-6.86-.79-12.28-1.42-17.28 1s-7.79 6.92-11.5 12.69c-1 1.56-3.66 5.7-4.49 44.92-.27 2-5.51 9.56-19.51 19-12.54 8.46-23.86 12.86-28.76 12.92l-18.49-1.86c3.26-23.1-12.64-54-32.75-71.89a27.09 27.09 0 0 0-42.69 9l-.06.13-28.76 66.93a95.31 95.31 0 0 0-14.41 12.49c-.78.81-1.07 1.11-14.55 22.59-4.89 7.79-10.74 17.14-16.94 27-12.28 19.61-26.35 42.07-36.66 58.36l-.07.11-1.52 2.39-.47.73-1 1.63-1 1.62-.42.66c-3.76 5.91-6.72 10.49-8.47 13.09-.17.25-.31.47-.46.68l-.14.21c-.09.14-.17.24-.25.36s-.16.22-.22.31l-87.63 84.74-.18.17c-4.19 4.32-6 11.34-5.3 20.84.46 6.48 2.1 13.57 4.09 17.66.35.71.76 1.44 1.22 2.2a7.46 7.46 0 0 0 5.08 6.71 72.83 72.83 0 0 0 10.93 10c7.27 5.34 14.11 8 20.19 8a18.23 18.23 0 0 0 7.83-1.7l13.88-5.58 23.32 23.79a7.49 7.49 0 0 0 8.64 1.49l21.59-10.53a7.5 7.5 0 0 0 4.18-7.46L132.41 425l2.75-1.1L157 444.1a7.49 7.49 0 0 0 8.38 1.24l21.84-10.64a7.51 7.51 0 0 0 4.19-7.34l-2.16-27.15 2.56-1.24L212.94 419a7.53 7.53 0 0 0 8.44 1.3l21.8-10.63a7.49 7.49 0 0 0 4.18-7.45l-2.74-28.94 114.85-55.77 21.2 20.09a7.5 7.5 0 0 0 8.45 1.3l21.8-10.62a7.49 7.49 0 0 0 4.18-7.45l-2.76-29 4-1.95 21.35 20.24a7.5 7.5 0 0 0 8.44 1.29l21.8-10.62a7.52 7.52 0 0 0 4.19-7.45l-2.78-29.2 5.08-2.46c15.65-7.63 25.36-20 28.06-35.82 2.14-12.45-.27-26.7-6.77-40.09Zm-35.66-43.31 22 49.52a2.56 2.56 0 0 0 .11.24 62 62 0 0 1 5 14.29l-49.3 23.93c-.42-3.85-1.07-7.82-1.74-11.89-3.78-22.74-8-48.32 23.93-76.09ZM297.7 171.65l27.84 2.8h.6c10.71.22 26.72-8 38.13-15.79 9.36-6.37 25.14-18.8 25.67-30.48a1.15 1.15 0 0 0 0-.19c.32-15.21 1.34-33.63 2.47-37.83 1.72-2.68 4.09-6.28 5.1-6.78s6 .06 9 .4c15.85 1.83 37.74 24.3 43.23 35.41l4 9c-42.07 34.28-36.52 68-32.41 92.79a119.59 119.59 0 0 1 2 16.51l-53 25.74C366.18 256 357.68 251.09 354 249c-10.9-6.28-25.57-12.06-41.1-18.17-14.58-5.74-29.66-11.67-40.47-17.76-9.56-5.38-12.72-9.15-13.71-11.32l29.39-31.06 9.53 1Zm59 98.19-27.58 13.38q-3.66-6.9-13.92-13.05c-9.49-5.67-22.27-10.59-35.8-15.81-12.61-4.86-25.65-9.88-34.92-15.26-6.37-3.7-10.32-7.23-11.44-10.16l15.11-16c9.77 12.3 33.22 21.54 59.32 31.81 14.34 5.64 29.16 11.48 39.1 17.2 5.97 3.49 8.87 6.14 10.1 7.89Zm-110.22-169a12.09 12.09 0 0 1 19-3.94c18.63 16.58 30.65 43 27.81 59.19l-48.89-4.89h-.61a81.4 81.4 0 0 0-19.66 1.64ZM129 298.33l.24-.38c.33-.51.66-1 1-1.58l.55-.85.83-1.31.48-.76 1.3-2.05.5-.79 1-1.54c.18-.29.37-.58.55-.88l1.39-2.19.46-.74 1.12-1.76c.18-.29.36-.58.55-.87.45-.73.92-1.46 1.39-2.2l.18-.3 1.67-2.64.52-.83 1-1.65.76-1.21 1.66-2.63 1.77-2.82c.12-.19.25-.38.37-.58l1.62-2.58c.09-.13.17-.27.25-.4.62-1 1.24-2 1.87-3l.24-.39.36-.57 14.6 2a7 7 0 0 0 1 .07 7.5 7.5 0 0 0 1-14.93l-7.86-1.06q1.56-2.5 3.13-5l.1-.18a976.6 976.6 0 0 1 4-6.33l14.68 2a7 7 0 0 0 1 .07 7.5 7.5 0 0 0 1-14.93l-7.95-1.08 7.79-12.46 14.68 2a7 7 0 0 0 1 .07 7.5 7.5 0 0 0 1-14.93l-7.92-1.14c.21-.32.4-.62.59-.93l.78-1.24.64-1c2.56-4.05 4.17-6.56 4.8-7.49A76.83 76.83 0 0 1 213 173.8a7.76 7.76 0 0 0 1.7-1.08 43.84 43.84 0 0 1 5.62-2.93q1.26-.54 2.52-1c5.88-2.08 11.91-2.69 18.86-2.66h1.5l26.08 2.63L219.91 221l-46.52 49.16c-5.87 6.35-24.19 24.57-45.41 29.74.29-.52.63-1.04 1.02-1.57Zm-12.66 17.93h.65c30.81 0 57.28-24.95 67.37-35.88l38-40.14c9 11.65 29.89 19.71 51.68 28.11 12.34 4.76 25.11 9.68 33.49 14.69 1.75 1 6.52 4.07 8.07 6.75l-124.37 60.35c-6.81-6.63-21.82-13.66-58.35-16.92-12-1.07-23.55-1.48-32.46-1.62Zm-85 103.1a45.41 45.41 0 0 1-2-10.68c-.42-6 .65-8.77 1.09-9.32l54.55-52.75a464.91 464.91 0 0 1 46.65 1.55c25 2.24 37.74 6.2 44.2 9.49L146 372.07Zm76.46 37.14L92.57 441l25.33-10.19 1.91 19.79Zm55.64-26.89-12.84-11.9 15.14-6.09.48-.21 8.57-4.16 1.28 16.2Zm56.09-25.05L206.2 392l24-11.66 1.73 18.18Zm167.74-81.39-13.34-12.64 24.06-11.68 1.74 18.25Zm57-27.49-13.48-12.77L455 271.17l1.75 18.44Zm43.45-72.32c-1.88 11-8.55 19.36-19.84 24.86l-65.26 31.68a7.44 7.44 0 0 0-2.92 1.42l-41 19.92a7.17 7.17 0 0 0-2.31 1.12l-121.22 58.86a7.44 7.44 0 0 0-3.4 1.66l-40.49 19.66a7.46 7.46 0 0 0-2.87 1.4l-28.56 13.86-24.46 9.84a7.41 7.41 0 0 0-3 1.21l-54 21.72a7.49 7.49 0 0 0-3.82 1.53l-16.71 6.72-.49.22c-1.88.91-6.58-.22-12.84-4.82q-1.77-1.31-3.36-2.69L152 385.85l.42-.19 39.84-19.34 175.44-85.15.18-.08 65.8-31.94c.14-.07.29-.13.43-.21l53.65-26c-.01.06-.03.26-.06.42Z"></path></svg>
                                <p>Giày bóng đá</p>

                            </div>
                        </Link>

                        <Link to="/fashion-shoe">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="sneaker"><g data-name="Layer 32"><path fill="#c2c3c5" d="M62,38.49a5.172,5.172,0,0,1-.21,1.47A103.255,103.255,0,0,1,41.8,41.92a64.707,64.707,0,0,1-17.28-2.36l-6.67-1.85a21.537,21.537,0,0,0-5.81-.79,21.822,21.822,0,0,0-5.96.83l-3.01.86a41.586,41.586,0,0,1,1.58-9.46L5,27.92v-.37a8.731,8.731,0,0,1,1.46-4.83,1.824,1.824,0,0,1,3.07.08,8.592,8.592,0,0,0,3.09,3.02,8.5,8.5,0,0,0,4.18,1.1,9.3,9.3,0,0,0,4.17-.99L25,23.92l-2.36-2.36A2.2,2.2,0,0,1,22,20.01a2.16,2.16,0,0,1,.88-1.75L26,15.92l3.62,4.13a38.88,38.88,0,0,0,7.65,6.72A38.754,38.754,0,0,0,54.22,33l3.24.38A5.144,5.144,0,0,1,62,38.49Z"></path><path fill="#dcdddf" d="M3.151,37.587,6.08,36.75a21.822,21.822,0,0,1,5.96-.83,21.537,21.537,0,0,1,5.81.79l6.67,1.85A64.707,64.707,0,0,0,41.8,40.92a103.255,103.255,0,0,0,19.99-1.96,5.012,5.012,0,0,0,.17-.9,5.093,5.093,0,0,0-4.5-4.679L54.22,33a38.754,38.754,0,0,1-16.95-6.23,38.88,38.88,0,0,1-7.65-6.72L26,15.92l-3.12,2.34A2.16,2.16,0,0,0,22,20.01a2.2,2.2,0,0,0,.64,1.55L25,23.92l-4.03,2.01a9.3,9.3,0,0,1-4.17.99,8.5,8.5,0,0,1-4.18-1.1A8.592,8.592,0,0,1,9.53,22.8a1.824,1.824,0,0,0-3.07-.08A8.731,8.731,0,0,0,5,27.55v.37l-.35,1.23A41.523,41.523,0,0,0,3.151,37.587Z"></path><path fill="#e16c7b" d="M61.79,39.96a5.169,5.169,0,0,1-.52,1.18,9.715,9.715,0,0,1-2.81,3,9.879,9.879,0,0,1-3.79,1.59,128.587,128.587,0,0,1-23.49,2.19c-8.85.01-20.13.03-24.33.08a5.576,5.576,0,0,1-3.18-.97l-.33-.22a3.077,3.077,0,0,1-1.37-2.56A2.966,2.966,0,0,1,2,43.83a9.081,9.081,0,0,1,.74-2.39L3,40.92c0-.77.02-1.54.07-2.31l3.01-.86a21.822,21.822,0,0,1,5.96-.83,21.537,21.537,0,0,1,5.81.79l6.67,1.85A64.707,64.707,0,0,0,41.8,41.92,103.255,103.255,0,0,0,61.79,39.96Z"></path><path fill="#db4254" d="M3.34,46.81l.33.22A5.576,5.576,0,0,0,6.85,48c4.2-.05,15.48-.07,24.33-.08a128.587,128.587,0,0,0,23.49-2.19,9.879,9.879,0,0,0,3.79-1.59,9.715,9.715,0,0,0,2.81-3c.018-.03.031-.063.048-.093A103.248,103.248,0,0,1,41.8,42.92a64.707,64.707,0,0,1-17.28-2.36l-6.67-1.85a21.537,21.537,0,0,0-5.81-.79,21.822,21.822,0,0,0-5.96.83l-3.01.86c0,.023-.022.039-.032.059C3.025,40.086,3,40.5,3,40.92l-.26.52A9.081,9.081,0,0,0,2,43.83a2.966,2.966,0,0,0-.03.42A3.077,3.077,0,0,0,3.34,46.81Z"></path><path fill="#9b3041" d="M21.109,43.58A3.737,3.737,0,0,0,18,41.916H13.1a51.5,51.5,0,0,1-10.1-1v0l-.26.52A9.081,9.081,0,0,0,2,43.83a2.966,2.966,0,0,0-.03.42,3.077,3.077,0,0,0,1.37,2.56l.33.22A5.576,5.576,0,0,0,6.85,48c3.116-.037,10.131-.058,17.159-.07L24,47.916Z"></path><path fill="#c6414d" d="M17,42.916H12.1A51.462,51.462,0,0,1,2.5,42,9,9,0,0,0,2,43.83a2.966,2.966,0,0,0-.03.42,3.077,3.077,0,0,0,1.37,2.56l.33.22A5.576,5.576,0,0,0,6.85,48c2.87-.034,9.047-.054,15.5-.067L20.109,44.58A3.737,3.737,0,0,0,17,42.916Z"></path><path fill="#e16c7b" d="M16.58,30.916A19.741,19.741,0,0,0,28.192,27.14l4.92-3.578,0,0c-.235-.207-.457-.43-.686-.643H29.236a9.468,9.468,0,0,0-4.236,1h0l0,0-4.03,2.01a9.3,9.3,0,0,1-4.17.99,8.5,8.5,0,0,1-4.18-1.1A8.592,8.592,0,0,1,9.53,22.8a1.824,1.824,0,0,0-3.07-.08A8.731,8.731,0,0,0,5,27.55v.366l4.648,1.743A19.751,19.751,0,0,0,16.58,30.916Z"></path><path fill="#9a9b9f" d="M24.141,35.237l.01,0a60.455,60.455,0,0,0,17.8,2.676c4.707,0,9.473-.237,14.164-.706a4.323,4.323,0,0,0,3.656-2.938,5.145,5.145,0,0,0-1.839-.79l-.008.027a2.325,2.325,0,0,1-2.008,1.711c-4.625.462-9.324.7-13.965.7a58.432,58.432,0,0,1-17.211-2.588l-1.746-.537a14.616,14.616,0,0,0-1.811-2.419,19.76,19.76,0,0,1-2.351.4l.522.54a12.474,12.474,0,0,1,3.6,7.812l1.571.436c.162.045.326.083.488.127l-.028-.329A14.45,14.45,0,0,0,24.141,35.237Z"></path><path fill="#c6414d" d="M16.8 26.92a8.5 8.5 0 01-4.18-1.1A8.592 8.592 0 019.53 22.8a1.824 1.824 0 00-3.07-.08 8.729 8.729 0 00-1.3 3.256l4.487 1.683A19.743 19.743 0 0028.192 25.14l3.058-2.224H29.236a9.468 9.468 0 00-4.236 1h0l0 0-4.03 2.01A9.3 9.3 0 0116.8 26.92zM33.707 32.623L38.68 27.65c-.473-.287-.948-.573-1.41-.88-.107-.072-.207-.152-.313-.225l-4.664 4.664zM38.707 33.623l3.9-3.9q-.962-.439-1.9-.931l-3.413 3.414zM43.707 34.623l3.219-3.218q-1.058-.339-2.092-.737l-2.541 2.541z"></path></g></svg>
                                <p>Giày thời trang</p>

                            </div>
                        </Link>
                    </div>
                </div>
                <div className="top">
                    <h1>Sản phẩm mới</h1>
                    <select onChange={handleOnchange}>
                        <option value="price asc">Giá: Tăng dần</option>
                        <option value="price desc">Giá: Giảm dần</option>
                        <option value="trademark asc">Thương hiệu:A-Z</option>
                        <option value="trademark desc">Thương hiệu:Z-A</option>
                    </select>
                </div>
                <div className="product-item">
                    {product &&
                        product.map((item) => (
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
                <hr />
            </div>
            <div className="product-selling">
                <div className="top">
                    <h1>Sản phẩm bán chạy</h1>
                    <select
                        defaultValue="asc"
                        onChange={handleOnchangeSelling}>
                        <option value="asc">Giá: Tăng dần</option>
                        <option value="desc">Giá: Giảm dần</option>
                        <option value="az">Thương hiệu:A-Z</option>
                        <option value="za">Thương hiệu:Z-A</option>
                        <option value="new">Sản phẩm: Mới</option>
                    </select>
                </div>
                <div className="product-item">
                    {selling &&
                        selling.map((item) => (
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
        </>
    );
}

export default ProductNew;
