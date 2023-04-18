import { useState } from 'react';
import './Define.scss';
import { animateScroll } from 'react-scroll';
export const priceConvert = (price) => {
    const convert = price.toLocaleString() + 'đ';
    return convert;
};
export const priceConvertCost = (price, sale) => {
    const convert =
        sale !== 0 ? (price + (price * sale) / 100).toLocaleString() + 'đ' : '';
    return convert;
};

export const priceSaleConvert = (sale) => {
    const convert = sale === 0 ? '' : `-${sale}%`;
    return convert;
};
export const Filter = () => {
    const numbers = [];
    for (let i = 35; i <= 46; i++) {
        numbers.push(i);
    }
    const [isChecked, setIsChecked] = useState(false);
    const [value, setValue] = useState(false);
    const handleOnchange = (e) => {
        if (isChecked === false) {
            console.log(e.target.value);
            setIsChecked(true);
            setValue(e.target.value);
        } else {
            setIsChecked(false);
        }
    };
    return (
        <div className="filter">
            <div className="trademark">
                <h4>THƯƠNG HIỆU</h4>
                <div>
                    <input
                        checked={isChecked}
                        type="checkbox"
                        value={isChecked === false ? 'ADIDAS' : ''}
                        onChange={(e) => handleOnchange(e)}></input>
                    <span>ADIDAS</span>
                </div>
                <div>
                    <input
                        checked={isChecked}
                        type="checkbox"
                        value={isChecked === false ? 'NIKE' : ''}
                        onChange={(e) => handleOnchange(e)}></input>
                    <span>NIKE</span>
                </div>{' '}
                <div>
                    <input
                        checked={isChecked}
                        type="checkbox"
                        value={isChecked === false ? 'JOGARBOLA' : ''}
                        onChange={(e) => handleOnchange(e)}
                    />
                    <span>JOGARBOLA</span>
                </div>
                <div>
                    <input
                        checked={isChecked}
                        value={isChecked === false ? 'KAKA' : ''}
                        type="checkbox"
                        onChange={(e) => handleOnchange(e)}></input>
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
            <div>
                <h4>KÍCH CỠ</h4>
                <div className="size">
                    {numbers.map((n, i) => {
                        return <button key={i}>{n}</button>;
                    })}
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
}
export const Scroll = () => {
    animateScroll.scrollToTop();
};
