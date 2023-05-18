import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductGeneral from '../ProductGeneral';
import './ProductRelated.scss';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
export default function ProductRelated() {
    const { id, type } = useParams();
    const [related, setRelated] = useState([]);
    console.log("type", type)
    useEffect(() => {
        axios
            .get('https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/products.json')
            .then((response) => {
                const data = response.data;
                const filteredData = data.filter(item => item.type === type);
                setRelated(filteredData);
            })
            .catch((error) => console.log(error));

    }, [type]);
    return (
        <div className="ralated">
            <hr />
            <div className="ralated-wrapper">
                <h2>Sản phẩm liên quan</h2>
                <ScrollMenu>
                    <div className="items">
                        {related &&
                            related.map((item) => {
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
