import React, { useEffect } from 'react';
import './Register.scss';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchSomeData } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkPassword } from '../Define';
export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordEnter, setPasswordEnter] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const user = useSelector((state) => state.product.user.data);
    const navigate = useNavigate();
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSomeData('user'));
    }, [dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password && email && name) {
            if (password === passwordEnter) {
                if (checkPassword(password)) {
                    setEmail('');
                    setPassword('');
                    setPasswordEnter('');
                    setName('');
                    navigate('/login', { state: { success: true } });
                    axios.post(
                        'https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/user.json',
                        {
                            name: name,
                            email: email,
                            password: password,
                            phone: '',
                            role: 'client',
                            url: '',
                        }
                    );
                } else {
                    toast.warning('Mật khẩu tối thiểu 8 kí tự, 1 kí tự viết hoa, 1 số!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                toast.warning('Mật khẩu không trùng khớp!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } else {
            toast.warning('Vui lòng điền đẩy đủ thông tin!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div className="register">
            <ToastContainer />
            <div className="register-wrapper">
                <div className="main">
                    <img src="https://anhdep123.com/wp-content/uploads/2021/01/anh-giay-adidas.jpg"></img>
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
                        <li className="password-warning">
                            Mật khẩu tối thiểu 8 kí tự và có ít nhất 1 chữ hoa (vd:
                            Minh123456)
                        </li>
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
