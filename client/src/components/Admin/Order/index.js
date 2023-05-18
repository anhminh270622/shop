import "./Order.scss"
import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSomeData, updateOrderStatus, updateStatus, updateQuantityOrder } from "../../../redux/productSlice";
import CheckIcon from '@mui/icons-material/Check';
function Order() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSomeData("order"))
    dispatch(fetchSomeData("products"))
  }, [])
  // const order = useSelector(state => state.product.order.data)
  const order = useSelector(state => state.product.order.data)
  const products = useSelector(state => state.product.products.data)
  const orderKeys = Object.keys(order);
  const rows = orderKeys.map((key, index) => ({
    id: index + 1, // Thêm thuộc tính id dựa trên index
    ...order[key],
  }));
  const sortedOrder = [...rows].sort((a, b) => b.id - a.id);
  const handleConfirm = (id, productId) => {
    dispatch(updateStatus(id, productId))
    for (let i = 0; i < productId.length; i++) {
      const id = productId[i].split(" - ")[0];
      const quantityId = productId[i].split(" - ")[1];
      const index = products.findIndex(item => item.id === id)
      const quantity = products[index].quantity - quantityId
      dispatch(updateQuantityOrder(id, quantity))
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'userId', headerName: 'UserId', width: 80 },
    {
      field: 'product',
      headerName: 'Chi tiết đơn hàng',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 500,
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
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained" onClick={() => {
              handleConfirm(params.row.id, params.row.productId)
            }
            }
            className={params.row.status === "Chờ xử lý" ? "" : "status"}
            disabled={params.row.status === "Chờ xử lý" ? false : true}
          >
            <CheckIcon />
            {params.row.status === "Chờ xử lý" ? "Xác Nhận" : params.row.status}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="order">
      <div className="order-top">
        <h1>Đơn mua</h1>
      </div>
      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={sortedOrder}
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
  )
}

export default Order