import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
export default function User() {
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'password', headerName: 'Password', width: 130 },
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
                        Delete
                    </Button>
                    <Button
                        variant="contained"
                        sx={{}}
                        onClick={() => handleEdit(params.row.id)}
                        startIcon={<EditIcon />}>
                        Edit
                    </Button>
                </>
            ),
        },
    ];
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/api/user/${id}`)
            .then((response) => {
                setUser(user.filter((user) => user.id !== id));
            })
            .catch((error) => console.error(error));
    };

    const handleEdit = (id) => {
        // Điều hướng đến trang chỉnh sửa user với ID tương ứng
        console.log(`Editing user with ID ${id}`);
    };
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/user')
            .then((response) => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch((error) => console.error(error));
    }, []);
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
        <Box className="user">
            <h2>Tài khoản người dùng</h2>
            <div>
                <Button startIcon={<AddIcon />} variant='contained' onClick={handleOpen}>Thêm tài khoản</Button>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
            </div>
            <hr></hr>
            <div style={{ width: '100%' }}>
                <DataGrid
                    rows={user}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </Box>
    );
}
