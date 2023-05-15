import React from 'react';
import './ProfileMobile.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Scroll } from '../Define';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Person2Icon from '@mui/icons-material/Person2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import ContactMailIcon from '@mui/icons-material/ContactMail';
export default function ProfileMobile() {
    const navigate = useNavigate();

    const LogOut = () => {
        localStorage.setItem('login', 'false');
        navigate('/');
        localStorage.setItem('avatar', null);
        localStorage.setItem('role', null);
        localStorage.setItem('id', null);
        window.location.reload();
        Scroll();
    };
    const Admin = () => {
        navigate('/');
        localStorage.setItem('admin', 'true')
        Scroll();
        window.location.reload();
    }
    return (
        <div className="profile-mobile">
            <Link className="profile-user">
                <img src={localStorage.getItem('avatar')}></img>
                <p>Minh</p>
            </Link>
            <Link to="/buy" className="profile-buy">
                <p>
                    <StorefrontIcon />
                    <span>Đơn mua</span>
                </p>

                <NavigateNextIcon />
            </Link>
            <Link to='/contact' className="profile-contact">
                <p>
                    <ContactMailIcon />
                    <span>Liên hệ chúng tôi</span>
                </p>
                <NavigateNextIcon />
            </Link>
            <Link to='/profile' className="profile-edit">
                <p>
                    <EditIcon />
                    <span>Chỉnh sửa thông tin</span>
                </p>
                <NavigateNextIcon />
            </Link>
            <Link className="profile-like">
                <p>
                    <FavoriteBorderIcon />
                    <span>Đã thích</span>
                </p>
                <NavigateNextIcon />
            </Link>
            <Link className="profile-admin" onClick={Admin}>
                <p>
                    <Person2Icon />

                    <span>Quản lý Admin</span>
                </p>
                <NavigateNextIcon />
            </Link>
            <Link onClick={LogOut} className="profile-logout">
                <p>
                    <LogoutIcon />
                    <span>Đăng xuất</span>
                </p>
                <NavigateNextIcon />
            </Link>
        </div>
    );
}
