import React, { useEffect } from 'react';
import './Cart.scss';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { priceConvert, Scroll } from '../Define';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
    removeItem,
    clearCart,
    quantityIncrease,
    quantityReduce,
} from '../../redux/cartSlice';

export default function Cart() {
    const [isCartLoaded, setIsCartLoaded] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const [address, setAddress] = useState('');
    const [sdt, setSdt] = useState('');
    const [note, setNote] = useState('');
    const [nameOrder, setNameOrder] = useState('');
    //đếm số lượng size
    const items = useSelector((state) => state.cart.items);
    const quantityCart = useSelector((state) => state.cart.quantityCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem('id'))
    // console.log("userId", userId)

    const Reduce = (item) => {
        dispatch(quantityReduce(item));
    };
    const Increase = (item) => {
        dispatch(quantityIncrease(item));
    };
    const handleClose = () => {
        navigate('/');
        Scroll();
    };
    //tổng đơn giá trị đơn hàng
    const SumCart = () => {
        let totalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            totalPrice += items[i].price * items[i].quantity;
        }
        return priceConvert(totalPrice);
    };
    const clear = () => {
        dispatch(clearCart());
        toast.success('Xóa thành công!', {
            position: toast.POSITION.TOP_RIGHT,
        });
    };
    const handleClickDelete = (data) => {
        toast.success('Xóa thành công!', {
            position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(removeItem(data));
    };
    const handleCart = (type, id) => {

    };
    const handleBuy = () => {
        const products = items.map(item => `${item.name} - Size ${item.size}`);
        const productsId = items.map(item => item.id);
        // console.log("productsId", productsId)
        axios.post('http://localhost:3000/api/order', {
            nameOrder: nameOrder,
            address: address,
            phone: sdt,
            note: note,
            product: products.join(', '),
            total: SumCart(),
            status: "Đang chờ xử lý",
            userId: userId,
            productId: productsId
        }).then(orderResponse => {
            // setNameOrder('')
            // setNote('')
            // setSdt('')
            // setAddress('')
            handleCloseModal()
            dispatch(clearCart());
            toast.success('Mua hàng thành công!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        });

    }
    const handleBuy1 = () => {
        navigate('/buy');
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <>
            <div className="cart">
                <ToastContainer />
                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    className="modal">
                    <Box
                        sx={style}
                        className="modal-wrapper">
                        <Typography
                            variant="h6"
                            component="h2">
                            Thông tin giao hàng
                        </Typography>
                        <Box className="address">
                            <div>
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    value={nameOrder}
                                    onChange={(e) => setNameOrder(e.target.value)}></input>
                            </div>
                            <div>
                                <label>Địa chỉ</label>
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}></input>
                            </div>
                            <div>
                                <label>SĐT</label>
                                <input
                                    type="number"
                                    value={sdt}
                                    onChange={(e) => setSdt(e.target.value)}></input>
                            </div>
                            <div>
                                <label>Ghi chú</label>
                                <TextareaAutosize
                                    value={note}
                                    aria-label="empty textarea"
                                    placeholder="Ghi chú"
                                    onChange={(e) => setNote(e.target.value)}
                                    style={{ minWidth: 292, minHeight: 50 }}
                                />
                            </div>
                        </Box>
                        <Button
                            variant="contained"
                            onClick={() => handleBuy()}>
                            Xong
                        </Button>
                    </Box>
                </Modal>
                <div className="title">
                    <h1>Giỏ hàng của bạn có {quantityCart} sản phẩm</h1>
                    <div>
                        <Button
                            onClick={() => handleBuy1()}
                            variant="contained">
                            Đơn mua
                        </Button>
                    </div>
                    <hr />
                </div>
                <div className="content">
                    {items &&
                        items.map((item) => {
                            const countQuantity = item.quantity;
                            return (
                                <div
                                    className="content-wrapper"
                                    key={item.id}>
                                    <div className="left">
                                        <div
                                            className="image"
                                            onClick={() => handleCart(item.type, item.id)}>
                                            <img src={item.firstImg.url} />
                                        </div>
                                        <div className="detail">
                                            <p className="name">{item.name}</p>
                                            <p className="name">{item.s}</p>
                                            <p className="price">
                                                <span>{priceConvert(item.price)}</span>
                                                {item.cost ? <s>({item.cost})</s> : ''}
                                            </p>
                                            <p className="size">{item.size}</p>
                                            <div className="quantity">
                                                <button
                                                    onClick={() => Reduce(item)}
                                                    disabled={item.quantity === 1 ? true : false}>
                                                    <RemoveIcon />
                                                </button>
                                                <input value={countQuantity} />
                                                <button onClick={() => Increase(item)}>
                                                    <AddIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <Button onClick={() => handleClickDelete(item)}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}

                    <hr />
                    <div className="buys">
                        <div className="left">
                            <Button
                                variant="contained"
                                onClick={clear}
                                className={quantityCart > 0 ? "" : "button"}
                                disabled={quantityCart > 0 ? false : true}>
                                Xóa tất cả
                            </Button>
                        </div>
                        <div className="right">
                            <div className="sum">
                                <p>Tổng tiền</p>
                                <h3>{SumCart()}</h3>
                            </div>
                            <div className="button">
                                <Button
                                    className="close"
                                    onClick={handleClose}>
                                    Quay lại mua sắm
                                </Button>
                                <Button
                                    className="buys"
                                    onClick={() => handleOpenModal()}
                                    disabled={quantityCart > 0 ? false : true}>
                                    Thanh Toán

                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
