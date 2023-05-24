import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductGeneral from '../ProductGeneral';
import './ProductRelated.scss';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { fetchSomeData } from '../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function ProductRelated() {
    const { id, type } = useParams();
    const product = useSelector(state => state.product.products.data)
    const relatedType = product.filter(item => item.type === type);
    const related = relatedType.filter(item => item.id !== id);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSomeData("products"))
    }, [dispatch])
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
