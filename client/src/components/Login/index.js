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
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = () => {
        axios.get('https://server-oum7.onrender.com/user').then((response) => {
            setLogin(response.data);
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        setPassword('');
        if (email && password && login && login.length > 0) {
            const foundUser = login.find(
                (user) => user.email === email && user.password === password
            );
            if (foundUser) {
                localStorage.setItem('login', 'true');
                localStorage.setItem('id', foundUser.id);
                localStorage.setItem(
                    'avatar',
                    'https://product.hstatic.net/200000174405/product/f35538-1_9d20486f06094ef5a63a069de2968353_master.jpg'
                );
                if (foundUser.role === 'admin') {
                    localStorage.setItem('role', 'admin');
                }
                navigate('/');
                window.location.reload();
            } else {
                toast.error('Tài khoản hoặc mật khẩu không đúng!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
    };
    return (
        <div className="login">
            <ToastContainer />
            <div className="login-wrapper">
                <div className="main">
                    <img src="https://anhdep123.com/wp-content/uploads/2021/01/anh-giay-adidas.jpg"></img>
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
                                type={showPassword === false ? 'password' : 'text'}
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}></input>
                            {showPassword === false ? (
                                <>
                                    <VisibilityOffIcon onClick={handleShowPassword} />
                                </>
                            ) : (
                                <>
                                    <VisibilityIcon onClick={handleShowPassword} />
                                </>
                            )}
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
