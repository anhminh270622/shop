import "./Header.scss"
import Logo from "../../assets/image/logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from "react-router-dom";
function Header() {
	return (<>
		<div className="header">
			<div className="header_wrapper">

				<div className="left">
					<Link to=""><img src={Logo} alt="Logo" /></Link>

				</div>
				<ul className="center">
					<li>Trang chủ</li>
					{/* <li>About</li> */}
					<li className="categories">
						<span>Thể loại</span>
						<span><KeyboardArrowDownIcon /></span>
						<ul className="section">
							<li>
								Dép
							</li><li>
								Giày bóng đá
							</li><li>
								Giày thời trang
							</li><li>
								Vớ
							</li>
						</ul>
					</li>
					<li>Liên hệ</li>
				</ul>
				<ul className="right">
					<li className="cart">
						<AddShoppingCartIcon />


						<span className="count">16</span>
					</li>
					<li className="user"><AccountCircleIcon /></li>
				</ul>

			</div>
		</div>
	</>);
}

export default Header;