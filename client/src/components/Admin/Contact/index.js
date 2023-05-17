import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSomeData } from "../../../redux/productSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Contact() {
    const dispatch = useDispatch()
    const contact = useSelector(state => state.product.contact.data)
    useEffect(() => {
        dispatch(fetchSomeData("contact"))
    }, [])
    const sortedContact = [...contact].sort((a, b) => b.id - a.id);
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'userId', headerName: 'UserId', width: 80 },
        {
            field: 'name',
            headerName: 'Tên khách hàng',
            sortable: false,
            width: 200,
        },
        {
            field: 'address',
            headerName: 'Địa chỉ',
            sortable: false,
            width: 200,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: true,
        },
        {
            field: 'notes',
            headerName: 'Ghi chú',
            width: 150,
            editable: true,
        },
        {
            field: 'action',
            headerName: 'Trạng thái',
            align: 'center',
            width: 100,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        sx={{ background: "red" }}
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Xóa
                    </Button>
                </>
            ),
        },
    ];
    const handleDelete = async (id) => {
        await axios.delete(`https://server-oum7.onrender.com/contact/${id}`)
            .then(response => {
                toast.success('Xóa thành công!', {
                    position: toast.POSITION.TOP_RIGHT,
                })
                dispatch(fetchSomeData("contact"))
            })
    }
    return (
        <div className="contact">
            <ToastContainer />
            <div className="contact-top">
                <h1>Khách hàng liên hệ</h1>
            </div>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={sortedContact}
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

export default Contact