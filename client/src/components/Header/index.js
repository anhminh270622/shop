import './Header.scss';
import Logo from '../../assets/image/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Scroll } from '../Define';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
function Header() {
	const navigate = useNavigate();
	const [countCart, setCountCart] = useState('');
	const [input, setInput] = useState('');
	const quantityCart = useSelector(state => state.cart.quantityCart)
	function handleScrollToTopClick() {
		Scroll();
		navigate('/');
	}
	function handleSearch() {
		Scroll();
		const state = {
			input: input,
		};
		navigate('/search', { state });
		setInput('');
	}
	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleSearch();
			Scroll();
		}

	};
	const Login = () => {
		navigate('/login');
		Scroll();
	}

	const Admin = () => {
		navigate('/');
		localStorage.setItem('admin', 'true')
		Scroll();
		window.location.reload();
	}
	const LogOut = () => {
		localStorage.setItem('login', 'false');
		navigate('/');
		localStorage.setItem('avatar', null);
		localStorage.setItem('role', null);
		localStorage.setItem('id', null);
		window.location.reload();
		Scroll();
	};
	const handleContact = () => {
		const logins = localStorage.getItem('login');
		if (logins === 'false') {
			navigate('/login');

		} else {
			navigate('/contact');
			Scroll();
		}
	}
	const handleProfile = () => {
		navigate('/profile');
		Scroll();
	}
	return (
		<>
			<div className="header">
				<div className="header_wrapper">
					<div
						className="left"
					>
						<Link to="/">
							<img
								src={Logo}
								alt="Logo"
							/>
						</Link>
					</div>
					<ul className="center">
						<div className="sections">
							<li
								to="/"
								onClick={handleScrollToTopClick}>
								Trang chủ 1
							</li>
							<li className="categories">
								<span>Thể loại</span>
								<span>
									<KeyboardArrowDownIcon />
								</span>
								<ul
									className="section"
									onClick={Scroll}>
									<Link to="/sandal">
										<li>Dép</li>
									</Link>
									<Link to="/soccer-shoe">
										<li>Giày bóng đá</li>
									</Link>
									<Link to="/fashion-shoe">
										<li>Giày thời trang</li>
									</Link>
									<Link to="/hose">
										<li>Vớ</li>
									</Link>
								</ul>
							</li>
							<li onClick={handleContact}>Liên hệ</li>
						</div>
						<div className="search">
							<div className="group">
								<input
									placeholder="Search"
									type="search"
									className="input"
									value={input}
									onKeyDown={(e) => handleKeyDown(e)}
									onChange={(e) => setInput(e.target.value)}
								/>
								<svg
									onClick={handleSearch}
									className="icon"
									aria-hidden="true"
									viewBox="0 0 24 24">
									<g>
										<path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
									</g>
								</svg>
							</div>
						</div>
					</ul>
					<ul className="right">
						{localStorage.getItem('avatar') !== 'null' ? (
							<Link
								to="/cart"
								onClick={Scroll}>
								<li className="cart-header">
									<AddShoppingCartIcon />
									{quantityCart > 0 ? (
										<span className="count">{quantityCart}</span>
									) : (
										''
									)}
								</li>
							</Link>
						) : (
							<AddShoppingCartIcon />
						)}

						<li
							className="user"
						>
							{localStorage.getItem('avatar') !== 'null' ? (
								<>
									<Link to="/profile-mobile">	<img src={localStorage.getItem('avatar')}></img></Link>
									<ul className="profile">
										<li onClick={LogOut}>Đăng xuất</li>
										<li onClick={handleProfile}>Chỉnh sửa thông tin</li>
										{localStorage.getItem('role') === "admin" ? (
											<li onClick={Admin}>Admin quản lý</li>
										) : ""}
									</ul>
								</>
							) : (
								<p onClick={Login}>Đăng nhập</p>
							)}
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;
