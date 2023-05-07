import { useEffect } from 'react';
import './Overview.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSomeData } from '../../../redux/productSlice';

export default function Overview() {
  const dispatch = useDispatch();
  const types = ['products', 'order', 'user'];

  useEffect(() => {
    types.forEach((type) => {
      dispatch(fetchSomeData(type));
    });
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);
  const orders = useSelector((state) => state.product.order);
  const users = useSelector((state) => state.product.user);
  return (
    <div className="overview">
      <h1>Tổng quan Admin</h1>
      <div className="overview-container">
        <div>
          <h4>Đơn đặt hàng</h4>
          <p>{orders.data.length}</p>
        </div>
        <div>
          <h4>Chờ xử lý</h4>
          <p>
            {
              orders.data.filter((order) => order.status === 'Đang chờ xử lý')
                .length
            }
          </p>
        </div>
        <div>
          <h4>Tài khoản</h4>
          <p>{users.data.length}</p>
        </div>
        <div className="sum-warehouse">
          <h4>Tổng Kho</h4>
          <p>{products.data.length}</p>
        </div>
        <div>
          {' '}
          <h4>Dép</h4>
          <p>
            {
              products.data.filter((products) => products.type === 'sandal')
                .length
            }
          </p>
        </div>
        <div>
          <h4>Tất</h4>
          <p>
            {
              products.data.filter((products) => products.type === 'hose')
                .length
            }
          </p>
        </div>
        <div>
          <h4>Tất</h4>
          <p>
            {
              products.data.filter((products) => products.type === 'hose')
                .length
            }
          </p>
        </div>
        <div>
          <h4>Tất</h4>
          <p>
            {
              products.data.filter((products) => products.type === 'hose')
                .length
            }
          </p>
        </div>
      </div>
    </div>
  );
}
