import './Header.scss';
import Logo from '../../assets/image/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import { useState } from 'react';
function Header() {
	const navigate = useNavigate();
	const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);

	function handleScrollToTopClick() {
		navigate('/');
		setIsScrollToTopVisible(true);
	}

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
						<li className="cart">
							<AddShoppingCartIcon />
							<span className="count">16</span>
						</li>
						<li className="user">
							<AccountCircleIcon />
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default Header;
