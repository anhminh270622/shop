import React, { useEffect, useState } from 'react';
import './Profile.scss';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSomeData } from '../../redux/productSlice';
import axios from 'axios';
import { checkPassword, checkEmail, checkPhoneNumber } from '../Define';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Profile() {
    const [imageUrl, setImageUrl] = useState('');
    const [profile, setProfile] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const handleShow = () => {
        setShow(!show);
    };
    useEffect(() => {
        dispatch(fetchSomeData('user'));
    }, []);
    const user = useSelector((state) => state.product.user.data);
    const id = localStorage.getItem('id');
    useEffect(() => {
        if (user && user.length > 0) {
            const index = user.findIndex((user) => user.id === id);
            setEmail(user[index]?.email);
            setPhone(user[index]?.phone);
            setPassword(user[index]?.password);
            setName(user[index]?.name);
            setImageUrl(user[index]?.imageUrl);
            setProfile(user[index]);
        }
    }, [user, id]);
    const handleSubmitEdit = async () => {
        if (checkPassword(password)) {
            if (phone) {
                if (checkPhoneNumber(phone)) {
                    await axios
                        .put(
                            `https://minh-924e1-default-rtdb.firebaseio.com/user/${id}.json`,
                            {
                                ...profile,
                                email: email,
                                name: name,
                                password: password,
                                phone: phone,
                                imageUrl: imageUrl,
                            }
                        )
                        .then((response) => {
                            toast.success('Cập nhật thành công!', {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                        });
                } else {
                    toast.warning('Số điện thoại phải là 10 số và bắt đầu từ 0!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }
            } else {
                await axios
                    .put(
                        `https://minh-924e1-default-rtdb.firebaseio.com/user/${id}.json`,
                        {
                            ...profile,
                            email: email,
                            name: name,
                            password: password,
                            phone: phone,
                            imageUrl: imageUrl,
                        }
                    )
                    .then((response) => {
                        toast.success('Cập nhật thành công!', {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    });
            }
        } else {
            toast.warning('Sai định dạng mật khẩu!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    const handleOnChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const thumbnail = e.target.result;
            setImageUrl(thumbnail);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className="profile">
            <ToastContainer />
            <h1>Hồ Sơ</h1>
            <div className="content">
                <div className="left">
                    <img
                        src={imageUrl ? imageUrl : localStorage.getItem('avatar')}
                        alt="Avatar"
                    />
                    <input
                        type="file"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="right">
                    <div className="right-content">
                        <div>Email:</div>
                        <input
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}></input>
                        <div>Tên:</div>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="right-content">
                        <div>Số điện thoại:</div>
                        <input
                            value={phone}
                            type="number"
                            onChange={(e) => setPhone(e.target.value)}></input>
                        <div>Mật khẩu:</div>
                        <input
                            value={password}
                            type={show === false ? 'password' : 'text'}
                            onChange={(e) => setPassword(e.target.value)}
                            className="password"></input>
                        {show === false ? (
                            <>
                                <VisibilityOffIcon onClick={handleShow} />
                            </>
                        ) : (
                            <>
                                <VisibilityIcon onClick={handleShow} />
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="update"
                onClick={handleSubmitEdit}>
                <Button>Cập nhật</Button>
            </div>
        </div>
    );
}

export default Profile;
