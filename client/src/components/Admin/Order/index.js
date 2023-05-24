import './Order.scss';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchSomeData,
  updateOrderStatus,
  updateStatus,
  updateQuantityOrder,
} from '../../../redux/productSlice';
import CheckIcon from '@mui/icons-material/Check';
import { reverseArray } from '../../Define';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Order() {
  const [order, setOrder] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSomeData('order'));
    dispatch(fetchSomeData('products'));
  }, []);
  const orders = useSelector((state) => state.product.order.data);
  const products = useSelector((state) => state.product.products.data);
  useEffect(() => {
    setOrder(reverseArray(orders));
  }, [orders]);
  const handleDelete = (id) => {
    axios
      .delete(
        `https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/order/${id}.json`
      )
      .then((response) => {
        const product = order.filter((item) => item.id !== id);
        setOrder(product);
        toast.success('Xóa thành công!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleConfirm = (id, productId) => {
    dispatch(updateStatus(id, productId));
    for (let i = 0; i < productId.length; i++) {
      const id = productId[i].split(' - ')[0];
      const quantityId = productId[i].split(' - ')[1];
      const index = products.findIndex((item) => item.id === id);
      const quantityOrder = products[index].quantity - quantityId;
      dispatch(updateQuantityOrder(id, quantityOrder));
    }
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'userId', headerName: 'UserId', width: 80 },
    {
      field: 'product',
      headerName: 'Chi tiết đơn hàng',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 400,
    },
    {
      field: 'total',
      headerName: 'Tổng tiền',
      type: 'number',
      width: 130,
      editable: true,
    },
    {
      field: 'confirm',
      headerName: 'Trang thái',
      align: 'center',
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            className="delete"
            onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon /> Xóa
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleConfirm(params.row.id, params.row.productId);
            }}
            className={params.row.status === 'Chờ xử lý' ? '' : 'status'}
          // disabled={params.row.status === 'Chờ xử lý' ? false : true}
          >
            <CheckIcon />
            {params.row.status === 'Chờ xử lý' ? 'Xác Nhận' : params.row.status}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="order">
      <ToastContainer />
      <div className="order-top">
        <h1>Đơn mua</h1>
      </div>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={order}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}

export default Order;
