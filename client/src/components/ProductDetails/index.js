import "./ProductDetails.scss"
import { useLocation, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
function ProductDetails(firtImg) {
    const [img, setImg] = useState(0)
    const location = useLocation();
    const { state } = location;
    const { id } = useParams();
    console.log(id)
    const { price, description, tag, name, trademark, image, sale, type } = location.state || {};

    const numbers = [];
    for (let i = 35; i <= 44; i++) {
        numbers.push(i);
    }
    firtImg = image && image.length > 0 ? image[img] : null;
    function handleOnClick(index) {
        console.log(index)
        setImg(index)
    }
    return (
        <div className="product-details">
            <div className="left">
                <div className="image-small">
                    {image && image.map((img, index) => (
                        <img key={index} src={img.url} alt="" onClick={() => handleOnClick(index)} />
                    ))}

                </div>
                <div className="image-big">
                    <img src={firtImg.url} alt="" />
                </div>
            </div>
            <div className="right">
                <h4 className="name">{name}</h4>
                <p className="id">
                    <span> SKU:</span>
                    {id}
                </p>
                {type === "hose" ? null :
                    <p className="size">
                        <span>Size:</span>
                        <span className="size-index">{numbers.map(item => {

                            <button key={item}> {item}</button>
                        })}</span>

                    </p>
                }

                <div className="count">
                    <button><RemoveIcon /></button>
                    <input value={1}></input>
                    <button><AddIcon /></button>
                </div>
                <div className="cart">
                    <button>Thêm vào giỏ hàng</button>
                </div>
                <div className="tag">
                    <p>Tag</p>
                    <div>{tag}</div>
                </div>
                <div className="description">
                    <div className="title">Mô tả</div>
                    <p>{description}</p>
                    {/* {description && description.map((desc, index) => (
                        <>
                            <p key={index}>{desc}</p>
                            <br />
                        </>
                    ))} */}

                </div>
            </div>
        </div>
    )
}

export default ProductDetails;
