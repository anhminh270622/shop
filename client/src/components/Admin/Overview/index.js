import { useEffect } from 'react';
import './Overview.scss';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSomeData } from '../../../redux/productSlice';
import { Link } from 'react-router-dom';
export default function Overview() {
  const dispatch = useDispatch();
  const types = ['products', 'order', 'user', 'contact'];
  useEffect(() => {
    types.forEach((type) => {
      dispatch(fetchSomeData(type));
    });
  }, [dispatch]);
  const products = useSelector((state) => state.product.products);
  const orders = useSelector((state) => state.product.order);
  const users = useSelector((state) => state.product.user);
  const contact = useSelector((state) => state.product.contact);
  return (
    <div className="overview">
      <h1>Tổng quan Admin</h1>
      <div className="overview-container">
        <div>
          <Link to="/admin/order">
            <h4>Đơn đặt hàng</h4>
            <p>{orders.data.length}</p>
          </Link>
        </div>
        <div>
          <Link to="/admin/order">
            <h4>Thành Công</h4>
            <p>
              {
                orders.data.filter((order) => order.status === 'Thành công')
                  .length
              }
            </p>
          </Link>
        </div>
        <div>
          <Link to="/admin/order">
            <h4>Chờ xử lý</h4>
            <p>
              {
                orders.data.filter((order) => order.status === 'Chờ xử lý')
                  .length
              }
            </p>
          </Link>
        </div>
        <div>
          <Link to="/admin/user">
            <h4>Tài khoản</h4>
            <p>{users.data.length}</p>
          </Link>
        </div>
        <div className="sum-warehouse">
          <Link to="/admin/warehouse">
            <h4>Tổng Kho</h4>
            <p>{products.data.length}</p>
          </Link>
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
          <h4>Giày thời trang</h4>
          <p>
            {
              products.data.filter(
                (products) => products.type === 'fashion-shoe'
              ).length
            }
          </p>
        </div>
        <div>
          <h4>Giày bóng đá</h4>
          <p>
            {
              products.data.filter(
                (products) => products.type === 'soccer-shoe'
              ).length
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
          <Link to="/admin/contact">
            <h4>Khách hàng liên hệ</h4>
            <p>{contact.data.length}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
