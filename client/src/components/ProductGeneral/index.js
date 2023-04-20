import React from 'react';
import './ProductGeneral.scss';
import { useNavigate } from 'react-router-dom';
import { priceConvertCost, priceSaleConvert, Scroll } from '../Define';
export default function ProductGeneral(props) {
    const { id, price, description, tag, name, trademark, image, sale, type } = props;
    const firtImg = image && image.length > 0 ? image[0] : null;
    // console.log(firtImg)
    // const cost = sale !== 0 ? ((price * sale / 100).toLocaleString() + "đ") : '';
    // const costToString = cost
    const navigate = useNavigate();



    function handleClick() {
        const state = {
            price: price,
            description: description,
            tag: tag,
            name: name,
            trademark: trademark,
            image: image,
            sale: sale,
            type: type
        }
        navigate(`/${type}/${id}`, { state })
        Scroll()
    }
    return (
        <div className="product-general">
            <div className="item">
                <div className="image" onClick={handleClick}>
                    <img className='product-image'
                        src={firtImg.url}
                        alt=""
                    />
                </div>
                <div className="title">
                    <h3>{trademark}</h3>
                    <p onClick={handleClick} className="description">{name}</p>
                    <p className="price">
                        <span className={sale ? "sale-padding" : ""}>{priceSaleConvert(sale)} </span>
                        <span> {price.toLocaleString()}đ</span>
                        <span className="cost"><s>{priceConvertCost(price, sale)}</s></span>
                    </p>
                </div>
                <span className="new">{tag === "new" ? tag : ""}</span>
            </div>
        </div>
    );
}
