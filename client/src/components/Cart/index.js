import React, { useEffect } from 'react';
import './Cart.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
export default function Cart() {
    const [count, setCount] = useState(1);
    const [cart, setCart] = useState("")
    //đếm số lượng size
    const Increase = () => {
        setCount(count + 1);
    };
    const Reduce = () => {
        setCount(count - 1);
    };
    const navigate = useNavigate();
    const handleClose = () => {
        navigate('/');
    };

    const updateCart = () => {
        axios.get("http://localhost:3000/api/cart")
            .then((response) => {
                setCart(response.data)

            }).catch((error) => {
                console.error(error)
            })
    }
    useEffect(() => {
        updateCart()

    }, [cart])
    const handleClickDelete = (id) => {
        toast.success('Xóa thành công!', {
            position: toast.POSITION.TOP_RIGHT,
            top: "3rem"
        });
        axios.delete(`http://localhost:3000/api/cart/${id}`)
            .then((response) => {
                updateCart()
            })
            .catch((error) => {
                console.error(error)
            })
        console.log(cart.length - 1)
    }


    return (
        <>
            <div className="cart">
                <ToastContainer />
                <div className="title">
                    <h1>Giỏ hàng của bạn có {cart.length} sản phẩm</h1>
                </div>
                <div className="content">
                    {cart && cart.map(item => {
                        return (
                            <div className="content-wrapper" key={item.id}>
                                <div className="left">
                                    <input
                                        type="checkbox"
                                        className="check"
                                    />
                                    <div className="image">
                                        <img src={item.firtImg.url} />
                                    </div>
                                    <div className="detail">
                                        <p className="name">{item.name}</p>
                                        <p className="price">
                                            <span>{item.price}</span>
                                            {item.cost ? <s>({item.cost})</s> : ""}

                                        </p>
                                        <p className="size">{item.size}</p>
                                        <div className="quantity">
                                            <button
                                                onClick={Reduce}
                                                disabled={item.quantity === 1 ? true : false}>
                                                <RemoveIcon />
                                            </button>
                                            <input value={item.quantity}></input>
                                            <button onClick={Increase}>
                                                <AddIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="right">
                                    <Button onClick={() => handleClickDelete(item.id)}>Delete</Button>
                                </div>
                            </div>
                        )
                    })}

                    <hr />
                    <div className="buy">
                        <div className="left">
                            <div className="all"> <input
                                type="checkbox">
                            </input>
                                <span>Chọn tất cả</span>
                            </div>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Ghi chú"
                                style={{ minWidth: 400, maxWidth: 700, minHeight: 100 }}
                            />
                        </div>
                        <div className="right">
                            <div className="sum">
                                <p>Tổng tiền</p>
                                <h3>1,000,000 đ</h3>
                            </div>
                            <div className="button">
                                <Button
                                    className="close"
                                    onClick={handleClose}>
                                    Quay lại mua sắm
                                </Button>
                                <Button className="buy">Thanh Toán</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
