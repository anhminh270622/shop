import "./Contact.scss"
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";

export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('')
    const handleSubmit = async () => {
        await axios.post("http://localhost:3000/api/contact", {
            name: name,
            email: email,
            phone: phone,
            address: address,
            notes: notes,
        }).then((response) => {
            toast.success('Mua hàng thành công!', {
                position: toast.POSITION.TOP_RIGHT,
            })
            setName("")
            setEmail("")
            setPhone("")
            setAddress("")
            setNotes("")
        }
        )
    }
    return (
        <div className="contact">
            <ToastContainer />
            <div className="top">
                <h1>MStore</h1>
            </div>
            <h2>Chào mừng đến với MStore</h2>
            <div className="content">
                <div className="content-left">
                    <div className="title">
                        <h4>Cửa hàng</h4>
                        <hr />
                    </div>
                    <div className="store">
                        <p>Cửa hàng 1: Cầu Giấy, Hà Nội</p>
                        <p>Cửa hàng 1: Thủ Đức, Hồ Chí Minh</p>
                    </div>
                </div>
                <div className="content-right">
                    <div className="title">
                        <h4>Thông tin liên hệ:</h4>
                        <hr />
                    </div>
                    <div>
                        <div>Họ và Tên:</div>
                        <input value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <div>Email:</div>
                        <input value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <div>Số điện thoại:</div>
                        <input value={phone} onChange={e => setPhone(e.target.value)}></input>
                    </div>
                    <div>
                        <div>Địa chỉ:</div>
                        <input value={address} onChange={e => setAddress(e.target.value)}></input>
                    </div>
                    <div>
                        <div>Ghi chú:</div>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                    </div>
                    <Button onClick={handleSubmit}>Gửi Thông tin</Button>
                </div>
                <div className="">
                </div>
            </div>
        </div>
    )
}
