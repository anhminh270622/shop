import './Header.scss';
import Logo from '../../assets/image/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Header() {
	const navigate = useNavigate();
	const [countCart, setCountCart] = useState('')
	const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

	function handleScrollToTopClick() {
		navigate('/');
		setIsScrollToTopVisible(true);
	}

	axios.get("http://localhost:3000/api/cart")
		.then((response) =>
			setCountCart(response.data)
		).catch((error) =>
			console.error(error))
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
						<li onClick={handleScrollToTopClick}>Trang chủ</li>
						{/* <li>About</li> */}
						<li className="categories">
							<span>Thể loại</span>
							<span>
								<KeyboardArrowDownIcon />
							</span>
							<ul className="section">
								<Link to="/sandal" ><li>Dép</li></Link>
								<Link to="/soccer-shoe"><li>Giày bóng đá</li></Link>
								<Link to="/fashion-shoe"><li>Giày thời trang</li></Link>
								<Link to="/hose"><li>Vớ</li></Link>
							</ul>
						</li>
						<li>Liên hệ</li>
					</ul>
					<ul className="right">
						<Link to="/cart">
							<li className="cart">
								<AddShoppingCartIcon />
								<span className="count">{countCart.length}</span>
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
