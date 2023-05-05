import './ProductDetails.scss';
import { useLocation, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import {
    priceConvertCost,
    priceConvert,
    priceSaleConvert,
    Scroll,
} from '../Define';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addItem, addToCartById } from '../../redux/cartSlice';
function ProductDetails() {
    const [img, setImg] = useState(0);
    const [count, setCount] = useState(1);
    const [size, setSize] = useState('');
    const [active, setActive] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const { id, price, description, tag, name, trademark, image, sale, type } =
        location.state || {};
    const data = location.state;
    const numbers = [];
    for (let i = 35; i <= 44; i++) {
        numbers.push(i);
    }
    const handleSize = (item) => {
        setSize(item);
        setActive(item);
    };
    const firstImg = image && image.length > 0 ? image[img] : null;
    function handleOnClick(index) {
        setImg(index);
    }
    const userId = localStorage.getItem('id')

    const dispatch = useDispatch();
    // const handleClick = () => {
    //     if (size) {
    //         toast.success('Đã thêm vào giỏ hàng!', {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //         const product = {
    //             id: id,
    //             name: name,
    //             type: type,
    //             size: size,
    //             quantity: count,
    //             firstImg: firstImg,
    //             price: price,
    //             cost: priceConvertCost(price, sale),
    //         }
    //         const userId = localStorage.getItem('id')
    //         console.log("userId", userId);
    //         dispatch(addProductToCart({ userId: userId, product }));
    //         setActive('');
    //         setCount(1);
    //     } else {
    //         toast.error('Vui lòng chọn size!', {
    //             position: toast.POSITION.TOP_RIGHT,
    //         });
    //     }
    // };
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () => {
        if (!isClicked) {
            setIsClicked(true);
        }
        if (size) {
            toast.success('Đã thêm vào giỏ hàng!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(addItem({
                userId: userId,
                id: id,
                price: price,
                name: name,
                firstImg: firstImg,
                size: size,
                quantity: count,

            }))
            // const product = {
            //     user: userId,
            //     id: id,
            //     name: name,
            //     type: type,
            //     size: size,
            //     quantity: count,
            //     firstImg: firstImg,
            //     price: price,
            //     cost: priceConvertCost(price, sale),
            // }
            // dispatch(addToCart({
            //     user: userId,
            //     idCart: id,
            //     name: name,
            //     type: type,
            //     size: size,
            //     quantity: count,
            //     firstImg: firstImg,
            //     price: price,
            //     cost: priceConvertCost(price, sale),
            // }));
        } else {
            toast.error('Vui lòng chọn size!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }
    const Increase = () => {
        setCount(count + 1);
    };
    const Reduce = () => {
        setCount(count - 1);
    };
    return (
        <div className="product-details">
            <ToastContainer />
            <div className="left">
                <div className="image-small">
                    {image &&
                        image.map((img, index) => (
                            <img
                                key={index}
                                src={img.url}
                                alt=""
                                onClick={() => handleOnClick(index)}
                            />
                        ))}
                </div>
                <div className="image-big">
                    <img
                        src={firstImg.url}
                        alt=""
                    />
                </div>
            </div>
            <div className="right">
                <h4 className="name">{name}</h4>
                <p className="id">
                    <span> SKU:</span>
                    {id}
                </p>
                <div className="price">
                    <p>{priceConvert(price)}</p>
                    <p className="cost">
                        <s>{priceConvertCost(price, sale)}</s>
                    </p>
                    <p className="sale">{priceSaleConvert(sale)}</p>
                </div>
                <p className="size">
                    <span>Size:</span>
                    <span className="size-index">
                        {numbers.length > 0 &&
                            numbers.map((item) => {
                                const buttonClass = item === active ? 'active' : '';
                                return (
                                    <button
                                        key={item}
                                        onClick={() => handleSize(item)}
                                        className={buttonClass}
                                    >
                                        {item}
                                    </button>
                                );
                            })}
                    </span>
                </p>
                <div className="count">
                    <button
                        onClick={Reduce}
                        disabled={count === 1 ? true : false}>
                        <RemoveIcon />
                    </button>
                    <input value={count} onChange={(e) => setCount(e.target.value)} />
                    <button onClick={Increase}>
                        <AddIcon />
                    </button>
                </div>
                <div className="cart">
                    <button onClick={() => handleClick()}>Thêm vào giỏ hàng</button>
                </div>
                <div className="tag">
                    <p>Tag</p>
                    <div>{tag}</div>
                </div>
                <div className="description">
                    <div className="title">Mô tả</div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
