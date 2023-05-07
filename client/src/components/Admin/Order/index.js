import "./Order.scss"
import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSomeData } from "../../../redux/productSlice";
function Order() {
  const [rows, setRows] = useState("")
  const [confirm, setConfirm] = useState("Xác nhận")
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSomeData("order"))
  }, [])
  const order = useSelector(state => state.product.order.data)
  const handleConfirm = (items) => {
    const index = order.filter(item => item.id === items)

    console.log("items", items)
  }
  // console.log("order", order)
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
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
            variant="contained" onClick={() => handleConfirm(params.row.id)}
          >
            {confirm}
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
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={order}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  )
}

export default Order