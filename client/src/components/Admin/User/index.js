import axios from 'axios';
import './User.scss';
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSomeData } from '../../../redux/productSlice';
export default function User() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('client');
    const [id, setId] = useState('');
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [edit, setEdit] = useState('');
    const dispatch = useDispatch();
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setEmail('');
        setPassword('');
        setId('');
        setOpen(false);
        setOpenEdit(false);
    };
    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'password', headerName: 'Password', width: 150 },
        { field: 'role', headerName: 'Role', width: 70 },
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
                        disabled={params.row.role === 'admin' ? true : false}
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
        console.log('id', id);
        axios
            .delete(
                `https://minh-924e1-default-rtdb.firebaseio.com/user/${id}.json`
            )
            .then((response) => {
                // dispatch(fetchSomeData("user"))
                setUser(user.filter((item) => item.id !== id));
                toast.success('Xóa thành công!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
            .catch((error) => console.error(error));
    };
    const handleEdit = (id) => {
        console.log('id', id);
        axios
            .get(
                `https://minh-924e1-default-rtdb.firebaseio.com/user/${id}.json`
            )
            .then((response) => {
                setEmail(response.data.email);
                setPassword(response.data.password);
                setRole(response.data.role);
                setId(id);
                setEdit(response.data);
            });
        setOpenEdit(true);
    };
    // console.log("edit", edit)
    const handleSubmitEdit = () => {
        const data = {
            email: email,
            password: password,
            role: role,
        };
        axios
            .put(
                `https://minh-924e1-default-rtdb.firebaseio.com/user/${id}.json`,
                data
            )
            .then((response) => {
                dispatch(fetchSomeData('user'));
            });

        handleClose();
    };
    const user1 = useSelector((state) => state.product.user.data);
    useEffect(() => {
        dispatch(fetchSomeData('user'));
    }, [dispatch]);
    useEffect(() => {
        if (user1 && user1.length > 0) {
            setUser(user1);
        }
    }, [user1]);
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
        display: 'flex',
        gap: '10px',
    };
    const handleSubmit = () => {
        if (email && password) {
            axios
                .post(
                    'https://minh-924e1-default-rtdb.firebaseio.com/user.json/',
                    {
                        email: email,
                        password: password,
                        role: role,
                        // id: user1.length + 1
                    }
                )
                .then((response) => {
                    dispatch(fetchSomeData('user'));
                });
            handleClose();
        } else {
            toast.warning('Vui lòng nhập!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
        setEmail('');
        setPassword('');
    };
    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };
    return (
        <Box className="user">
            <ToastContainer />
            <h2>Tài khoản người dùng</h2>
            <div>
                <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={handleOpen}>
                    Thêm tài khoản
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2">
                            Thêm tài khoản
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 101 101"
                                id="user">
                                <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                            </svg>
                        </Typography>
                        <Box
                            component="form"
                            id="modal-modal-description"
                            sx={{ mt: 2 }}>
                            <Box>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Mật khẩu"
                                    variant="standard"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormControl
                                    variant="standard"
                                    sx={{ width: '100%' }}>
                                    <InputLabel>Phân Quyền</InputLabel>
                                    <Select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}>
                                        <MenuItem value={'admin'}>admin</MenuItem>
                                        <MenuItem value={'client'}>client</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ mt: 5, width: '100%' }}
                                onClick={handleSubmit}>
                                {' '}
                                Thêm
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={openEdit}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2">
                            Chỉnh sửa
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 101 101"
                                id="user">
                                <path d="M50.4 54.5c10.1 0 18.2-8.2 18.2-18.2S60.5 18 50.4 18s-18.2 8.2-18.2 18.2 8.1 18.3 18.2 18.3zm0-31.7c7.4 0 13.4 6 13.4 13.4s-6 13.4-13.4 13.4S37 43.7 37 36.3s6-13.5 13.4-13.5zM18.8 83h63.4c1.3 0 2.4-1.1 2.4-2.4 0-12.6-10.3-22.9-22.9-22.9H39.3c-12.6 0-22.9 10.3-22.9 22.9 0 1.3 1.1 2.4 2.4 2.4zm20.5-20.5h22.4c9.2 0 16.7 6.8 17.9 15.7H21.4c1.2-8.9 8.7-15.7 17.9-15.7z"></path>
                            </svg>
                        </Typography>
                        <Box
                            component="form"
                            id="modal-modal-description"
                            sx={{ mt: 2 }}>
                            <Box>
                                <TextField
                                    label="Email"
                                    variant="standard"
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <TextField
                                    label="Mật khẩu"
                                    variant="standard"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Box>

                            <Box>
                                <FormControl
                                    variant="standard"
                                    sx={{ width: '100%' }}>
                                    <InputLabel>Thương hiệu</InputLabel>
                                    <Select
                                        value={role}
                                        onChange={handleChangeRole}>
                                        <MenuItem value={'admin'}>admin</MenuItem>
                                        <MenuItem value={'client'}>client</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Button
                                variant="contained"
                                sx={{ mt: 5, width: '100%' }}
                                onClick={() => handleSubmitEdit()}>
                                {' '}
                                Sửa
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </div>
            <hr></hr>
            <div style={{ width: '100%', height:'84vh' }} >
                <DataGrid
                    rows={user}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                // checkboxSelection
                />
            </div>
        </Box>
    );
}
