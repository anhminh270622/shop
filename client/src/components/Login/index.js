import React, { useEffect } from 'react';
import './Login.scss';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        axios.get('http://localhost:3000/api/user').then((response) => {
            setLogin(response.data);
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        if (email && password && login && login.length > 0) {
            const foundUser = login.find(user => user.email === email && user.password === password);
            if (foundUser) {
                localStorage.setItem('login', 'true');
                localStorage.setItem('avatar', 'https://product.hstatic.net/200000174405/product/f35538-1_9d20486f06094ef5a63a069de2968353_master.jpg');
                if (foundUser.role === 'admin') {
                    localStorage.setItem('role', 'admin');
                }
                navigate('/');
                window.location.reload();
            } else {
                toast.error('Tài khoản hoặc mật khẩu không đúng!', { position: toast.POSITION.TOP_RIGHT });
            }
        }

    };
    return (
        <div className="login">
            <ToastContainer />
            <div className="login-wrapper">
                <div className="main">
                    <img src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/avatar-mac-dinh-nu-co-mau-30-10-31-43.jpg"></img>
                    <h1>Đăng nhập</h1>
                    <form onSubmit={handleSubmit}>
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
                        <p>
                            <Link to="/register">Đăng ký</Link>
                        </p>

                        <button>Đăng nhập</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
