import React from 'react';
import './Register.scss';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordEnter, setPasswordEnter] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        setPasswordEnter('');
        toast.success('Đăng ký thành công!', {
            position: toast.POSITION.TOP_RIGHT,
        });
        axios.post('http://localhost:3000/api/user', {
            name: name,
            email: email,
            password: password,
            phone: "",
            role: "client",
            url: ""
        });
    };
    return (
        <div className="register">
            <ToastContainer />
            <div className="register-wrapper">
                <div className="main">
                    <img src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/avatar-mac-dinh-nu-co-mau-30-10-31-43.jpg"></img>
                    <h1>Đăng ký</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <MailIcon />
                            <input
                                type="text"
                                placeholder="Tên người dùng"
                                onChange={(e) => setName(e.target.value)}
                                value={name}></input>
                        </div>
                        <div>
                            <MailIcon />
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}></input>
                        </div>
                        <div>
                            <LockIcon />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}></input>
                        </div>
                        <div>
                            <LockIcon />
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                onChange={(e) => setPasswordEnter(e.target.value)}
                                value={passwordEnter}></input>
                        </div>
                        <p>
                            <Link to="/login">Đăng Nhập</Link>
                        </p>
                        <button>Đăng ký</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
