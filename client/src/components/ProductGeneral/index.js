import React from 'react';
import './ProductGeneral.scss';
import { useNavigate } from 'react-router-dom';
export default function ProductGeneral(props) {
    const { id, price, description, tag, name, trademark, image, sale, type } = props;
    const firtImg = image && image.length > 0 ? image[0] : null;
    // console.log(firtImg)
    const cost = sale !== 0 ? price * (sale / 100) : '';
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

    }
    return (
        <div className="product-general">
            <div className="item">
                <div className="image" onClick={handleClick}>
                    <img
                        src={firtImg.url}
                        alt=""
                    />
                </div>
                <div className="title">
                    <h3>{trademark}</h3>
                    <p className="description">{name}</p>
                    <p className="price">
                        <span>{sale === 0 ? '' : sale}</span>
                        <span> {price.toLocaleString()}đ</span>
                        <span className="cost">{cost}</span>
                    </p>
                </div>
                <span className="new">{tag}</span>
            </div>
        </div>
    );
}
