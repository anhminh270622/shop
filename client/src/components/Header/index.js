import './Header.scss';
import Logo from '../../assets/image/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Scroll } from '../Define';
// import { animateScroll } from 'react-scroll';
function Header() {
	const navigate = useNavigate();
	const [countCart, setCountCart] = useState('');
	const [input, setInput] = useState('');

	function handleScrollToTopClick() {
		Scroll();
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
		}
	};
	useEffect(() => {
		axios
			.get('http://localhost:3000/api/cart')
			.then((response) => setCountCart(response.data))
			.catch((error) => console.error(error));
	}, [countCart]);
	// axios
	// 	.get('http://localhost:3000/api/cart')
	// 	.then((response) => setCountCart(response.data))
	// 	.catch((error) => console.error(error));


	// axios
	// 	.get('http://localhost:3000/api/cart')
	// 	.then((response) => setCountCart(response.data))
	// 	.catch((error) => console.error(error));
	return (
		<>
			<div className="header">
				<div className="header_wrapper">
					<div
						className="left"
						onClick={handleScrollToTopClick}>
						<img
							src={Logo}
							alt="Logo"
						/>
					</div>
					<ul className="center">
						<div className="sections">
							<NavLink
								exact={true}
								to="/"
								activeClassName="active-home"
								onClick={handleScrollToTopClick}
							>
								Trang chủ
							</NavLink>
							<NavLink
								activeClassName="active-categories"
								className="categories"
							>
								<span>Thể loại</span>
								<span>
									<KeyboardArrowDownIcon />
								</span>
								<ul className="section" onClick={Scroll}>
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
							</NavLink>
							<NavLink to="/contact" activeClassName="active-contact">
								Liên hệ
							</NavLink>

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
						<Link to="/cart" onClick={Scroll}>
							<li className="cart">
								<AddShoppingCartIcon />
								{countCart && countCart.length !== 0 ? (
									<span className="count">{countCart.length}</span>
								) : (
									''
								)}
							</li>
						</Link>
						<Link to="/">
							<li className="user">
								<AccountCircleIcon />
							</li>
						</Link>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;
