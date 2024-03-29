import React, { useEffect } from 'react';
import './Login.scss';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { fetchSomeData } from '../../redux/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Scroll } from '../Define';
import { useLocation } from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    /**
     * hàm để tự động nhập email và password khi đăng kí thành công
     * edit: 26/09/2023
     */
    const successRegister = location.state?.success;
    const passwordRegister = location.state?.password;
    const emailRegister = location.state?.email;

    const [successMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.product.user.data)
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        dispatch(fetchSomeData("user"))
    }, [dispatch]);
    useEffect(() => {
        if (successRegister === true && !successMessage) {
            toast.success('Đăng ký thành công!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setSuccessMessage(true);
            setEmail(emailRegister);
            setPassword(passwordRegister);
        }
    }, [successRegister, successMessage]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password && user.length > 0) {
            const foundUser = user.find(
                (item) => item.email === email && item.password === password
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
                navigate('/', { state: { success: true } });
                window.location.reload();
                Scroll();
            } else {
                toast.error('Tài khoản hoặc mật khẩu không đúng!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } else {
            toast.warning('Vui lòng điền đầy đủ thông tin!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div className="login">
            <ToastContainer />
            <div className="login-wrapper">
                <div className="main">
                    <img src="https://img.lovepik.com/free-png/20211206/lovepik-flat-male-avatar-png-image_401348783_wh1200.png"></img>
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
