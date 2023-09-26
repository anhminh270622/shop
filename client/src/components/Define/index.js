import './Define.scss';
import { animateScroll } from 'react-scroll';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { addValue, addTrademark } from '../../redux/valueFilter';
import { useDispatch } from 'react-redux';
export const priceConvert = (price) => {
	const convert = parseInt(price)?.toLocaleString() + 'đ';
	return convert;
};
export const priceConvertCost = (price, sale) => {
	const convertPrice = parseInt(price)
	const convertSale = parseInt(sale)
	const convert =
		convertSale !== 0 ? (convertPrice + (convertPrice * convertSale) / 100)?.toLocaleString() + 'đ' : '';
	return convert;
};

export const priceSaleConvert = (sale) => {
	const convertSale = parseInt(sale)
	const convert = convertSale === 0 ? '' : `-${convertSale}%`;
	return convert;
};
export const Filter = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [values, setValues] = useState(false);
	const handleOnchange = (e) => {
		dispatch(addTrademark(e.target.value))
	};
	const dispatch = useDispatch()
	const handleChangePrice = (e) => {
		dispatch(addValue(e.target.value))
	}
	return (
		<div className="filter">
			<div className="trademark">
				<h4>THƯƠNG HIỆU</h4>
				<div>
					<input
						type="checkbox"
						value={'ADIDAS'}
						onChange={(e) => handleOnchange(e)}></input>
					<span>ADIDAS</span>
				</div>
				<div>
					<input
						type="checkbox"
						value={'NIKE'}
						onChange={(e) => handleOnchange(e)}></input>
					<span>NIKE</span>
				</div>{' '}
				<div>
					<input
						type="checkbox"
						value={'JOGARBOLA'}
						onChange={(e) => handleOnchange(e)}
					/>
					<span>JOGARBOLA</span>
				</div>
				<div>
					<input
						value={'AKKA'}
						type="checkbox"
						onChange={(e) => handleOnchange(e)}></input>
					<span>AKKA</span>
				</div>
			</div>
			<div className="price">
				<h4>GIÁ SẢN PHẨM</h4>
				<div>
					<input type="radio" onChange={(e) => handleChangePrice(e)} name="price" value="all"></input>
					<span>Tất cả</span>
				</div>
				<div>
					<input type="radio" onChange={(e) => handleChangePrice(e)} name="price" value="max500" ></input>
					<span>Dưới 500,000₫</span>
				</div>
				<div>
					<input type="radio" onChange={(e) => handleChangePrice(e)} name="price" value="max1000"></input>
					<span>500,000₫ - 1,000,000₫</span>
				</div>
				<div>
					<input type="radio" onChange={(e) => handleChangePrice(e)} name="price" value="max1500"></input>
					<span>1,000,000₫ - 1,500,000₫</span>
				</div>
				<div>
					<input type="radio" onChange={(e) => handleChangePrice(e)} name="price" value="max5000"></input>
					<span>2,000,000₫ - 5,000,000₫</span>
				</div>
				<div>
					<input type="radio" onChange={(e) => handleChangePrice(e)} name="price" value="min5001"></input>
					<span>Trên 5,000,000₫</span>
				</div>
			</div>
		</div>
	);
};
export const FilterHose = () => {
	return (
		<div className="filter-hose">
			<div className="trademark">
				<h4>THƯƠNG HIỆU</h4>
				<div>
					<input type="checkbox"></input>
					<span>ADIDAS</span>
				</div>
				<div>
					<input type="checkbox"></input>
					<span>NIKE</span>
				</div>{' '}
				<div>
					<input type="checkbox"></input>
					<span>JOGARBOLA</span>
				</div>{' '}
				<div>
					<input type="checkbox"></input>
					<span>KAKA</span>
				</div>
			</div>
			<div className="price">
				<h4>GIÁ SẢN PHẨM</h4>
				<div>
					<input type="checkbox"></input>
					<span>Dưới 500,000₫</span>
				</div>
				<div>
					<input type="checkbox"></input>
					<span>500,000₫ - 1,000,000₫</span>
				</div>
				<div>
					<input type="checkbox"></input>
					<span>1,000,000₫ - 1,500,000₫</span>
				</div>
				<div>
					<input type="checkbox"></input>
					<span>2,000,000₫ - 5,000,000₫</span>
				</div>
				<div>
					<input type="checkbox"></input>
					<span>Trên 5,000,000₫</span>
				</div>
			</div>
		</div>
	);
};
export const Scroll = () => {
	animateScroll.scrollToTop();
};
export const HiddenApp = () => {
	const { pathname } = useLocation();
	const [showHeaderFooter, setShowHeaderFooter] = useState(true);
	useEffect(() => {
		if (pathname.includes('admin')) {
			setShowHeaderFooter(false);
		} else {
			setShowHeaderFooter(true);
		}
	}, [pathname]);
	return showHeaderFooter;
};
export const checkPassword = (password) => {
	return /[A-Z]/.test(password) && /\d/.test(password) && password.length > 7;
}
export const checkPhoneNumber = (phoneNumber) => {
	const sanitizedPhoneNumber = phoneNumber.replace(/\s/g, '');
	const lengthCondition = sanitizedPhoneNumber.length === 10;
	const digitCondition = /^\d+$/.test(sanitizedPhoneNumber);
	const startCondition = sanitizedPhoneNumber.startsWith('0');

	return lengthCondition && digitCondition && startCondition;
}

export const checkEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

export const reverseArray = (arr) => {
	const reversedArr = [...arr].reverse();
	return reversedArr;
};

