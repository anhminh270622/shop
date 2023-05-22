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
import { useNavigate, useSeletor } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, addToCartById, addCart } from '../../redux/cartSlice';
import { fetchSomeData } from '../../redux/productSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function ProductDetails() {
    const [img, setImg] = useState(0);
    const [count, setCount] = useState(1);
    const [size, setSize] = useState('');
    const [active, setActive] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [warehouseQuantity, setWarehouseQuantity] = useState('');
    const userId = localStorage.getItem('id');
    const login = localStorage.getItem('login');
    const dispatch = useDispatch();
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
    const index = useSelector((state) => state.product.products.data);
    useEffect(() => {
        dispatch(fetchSomeData('products'));
    }, []);
    const indexId = index.findIndex((index) => index.id === id);
    const quantityCart = index[indexId]?.quantity;
    const handleAddCart = () => {
        setWarehouseQuantity(quantityCart);
        if (!isClicked) {
            setIsClicked(true);
        }
        if (login === 'true') {
            if (size) {
                if (count <= quantityCart) {
                    toast.success('Đã thêm vào giỏ hàng!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    dispatch(
                        addItem({
                            userId: userId,
                            id: id,
                            price: price,
                            name: name,
                            firstImg: firstImg,
                            size: size,
                            quantity: count,
                        })
                    );
                    setActive('');
                    setCount(1);
                    setSize("")
                } else {
                    toast.warning('Vượt quá số lượng trong kho!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setCount(quantityCart);
                }
            } else {
                toast.error('Vui lòng chọn size!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } else {
            toast.warning('Vui lòng đăng nhập!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

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
                                src={img.url || img}
                                alt=""
                                onClick={() => handleOnClick(index)}
                            />
                        ))}
                </div>
                <div className="image-big">
                    <img
                        src={firstImg.url || firstImg}
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
                                        className={buttonClass}>
                                        {item}
                                    </button>
                                );
                            })}
                    </span>
                </p>
                <p>{quantityCart} sản phẩm có sẵn</p>
                <div className="count">
                    <button
                        onClick={Reduce}
                        disabled={count === 1 ? true : false}>
                        <RemoveIcon />
                    </button>
                    <input value={count} readOnly />
                    <button onClick={Increase}>
                        <AddIcon />
                    </button>
                </div>
                <div className="carts">

                    <button onClick={() => handleAddCart()}><AddShoppingCartIcon />Thêm vào giỏ hàng</button>
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
