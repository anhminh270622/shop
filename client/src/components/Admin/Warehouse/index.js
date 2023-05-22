import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddProduct from './AddProduct';
import { fetchSomeData } from '../../../redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function Warehouse() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [warehouse, setWarehouse] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSomeData("products"))
    }, [dispatch])
    const products = useSelector(state => state.product.products.data)
    useEffect(() => {
        if (products && products.length > 0)
            setWarehouse(products)
    }, [products])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'quantity', headerName: 'Quantity', width: 80 },
        { field: 'trademark', headerName: 'Trademark', width: 100 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'type', headerName: 'Type', width: 100 },
        {
            field: 'actions',
            headerName: 'Actions',
            align: 'center',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        sx={{
                            marginRight: '10px',
                            background: 'red',
                            color: 'white',
                            '&:hover': { background: 'red' },
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(params.row.id)}>
                        Xóa
                    </Button>
                    <Button
                        variant="contained"
                        sx={{}}
                        onClick={() => handleEdit(params.row.id)}
                        startIcon={<EditIcon />}>
                        Sửa
                    </Button>
                </>
            ),
        },
    ];
    const handleDelete = (id) => {
        // console.log("delete", id);
        axios.delete(`https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`)
            .then((response) =>
                setWarehouse(warehouse.filter(item => item.id !== id))
            )
            .catch((err) => console.error(err));
    };
    const handleEdit = (id) => {
    };
    // const fetchData = () => {
    //     axios.get('http://localhost:3000/api/products')
    //         .then(response => {
    //             setWarehouse(response.data);
    //         }).catch(error => console.error(error))
    // }
    // useEffect(() => {
    //     fetchData();
    // }, [])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div className="user">
            <div>
                <h2>Kho</h2>
                <div>
                    <Button startIcon={<AddIcon />} onClick={handleOpen} variant='contained'>Thêm sản phẩm</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <AddProduct />
                        </Box>
                    </Modal>
                </div>
            </div>

            <hr></hr>
            <div style={{ height: '90vh', width: '100%' }}>
                <DataGrid
                    rows={warehouse}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection

                />
            </div>
        </div >
    )
}
