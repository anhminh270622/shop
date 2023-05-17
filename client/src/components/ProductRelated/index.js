import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductGeneral from '../ProductGeneral';
import './ProductRelated.scss';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
export default function ProductRelated() {
    const { id, type } = useParams();
    const [ralated, setRalated] = useState('');
    useEffect(() => {
        axios
            .get(`https://server-oum7.onrender.com/products?type=${type}`)
            .then((response) => setRalated(response.data))
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="ralated">
            <hr />
            <div className="ralated-wrapper">
                <h2>Sản phẩm liên quan</h2>
                <ScrollMenu>
                    <div className="items">
                        {ralated &&
                            ralated.map((item) => {
                                return (
                                    <ProductGeneral
                                        key={item.id}
                                        id={item.id}
                                        name={item.name}
                                        price={item.price}
                                        sale={item.price_sale}
                                        image={item.images}
                                        trademark={item.trademark}
                                        tag={item.tag}
                                        description={item.description}
                                        type={item.type}
                                    />
                                );
                            })}
                    </div>
                </ScrollMenu>
            </div>
        </div>
    );
}
