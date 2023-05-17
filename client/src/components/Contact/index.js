import "./Contact.scss"
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";
import SendIcon from '@mui/icons-material/Send';
export default function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('')
    const handleSubmit = async () => {
        console.log(name, email, phone, address, notes)


        if (name, email, phone, address, notes) {
            await axios.post("https://server-oum7.onrender.com/contact", {
                name: name,
                email: email,
                phone: phone,
                address: address,
                notes: notes,
                userId: localStorage.getItem("id")
            })
                .then((response) => {
                    toast.success('Gửi thông tin thành công!', {
                        position: toast.POSITION.TOP_RIGHT,
                    })
                    setName("")
                    setEmail("")
                    setPhone("")
                    setAddress("")
                    setNotes("")
                }
                )
        } else {
            toast.warning('Vui lòng điền đầy đủ  thông tin!', {
                position: toast.POSITION.TOP_RIGHT,
            })
        }


    }
    return (
        <div className="contact">
            <ToastContainer />
            <div className="top">
                {/* <h1>MStore</h1> */}
                <h1>Chào mừng đến với MStore</h1>
            </div>
            <div className="content">
                <div className="content-left">
                    <div className="title">
                        <h4>Cửa hàng</h4>
                        <hr />
                    </div>
                    <div className="store">
                        <p>Cửa hàng 1: Cầu Giấy, Hà Nội</p>
                        <p>Cửa hàng 1: Thủ Đức, Hồ Chí Minh</p>
                        <img src="https://bumshop.com.vn/wp-content/uploads/2019/12/tulo-shop.jpg">
                        </img>
                    </div>
                </div>
                <div className="content-right">
                    <div className="title">
                        <h4>Thông tin liên hệ:</h4>
                        <hr />
                    </div>
                    <div>
                        <p>Họ và Tên:</p>
                        <input value={name} onChange={e => setName(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Email:</p>
                        <input value={email} onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Số điện thoại:</p>
                        <input value={phone} onChange={e => setPhone(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Địa chỉ:</p>
                        <input value={address} onChange={e => setAddress(e.target.value)}></input>
                    </div>
                    <div>
                        <p>Ghi chú:</p>
                        <textarea value={notes} onChange={e => setNotes(e.target.value)}></textarea>
                    </div>
                    <Button onClick={handleSubmit}><SendIcon />Gửi Thông tin</Button>
                </div>
                <div className="">
                </div>
            </div>
        </div>
    )
}
