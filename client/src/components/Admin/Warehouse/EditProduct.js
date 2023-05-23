import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSomeData } from '../../../redux/productSlice';
export default function EditProduct(props) {
    const { openEdit, setOpenEdit, id } = props
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parameter, setParameter] = useState('');
    const [price, setPrice] = useState('');
    const [priceSale, setPriceSale] = useState('');
    const [tags, setTags] = useState('');
    const [quantity, setQuantity] = useState('');
    const [trademark, setTrademark] = useState('');
    const [type, setType] = useState('');
    const [img, setImg] = useState('');
    const [editProduct, setEditProduct] = useState('');
    const dispatch = useDispatch();
    const product = useSelector(state => state.product.products.data)
    useEffect(() => {
        dispatch(fetchSomeData("products"))
    }, [])
    useEffect(() => {
        const productId = product.filter(item => item.id === id)
        setName(productId[0].name)
        setDescription(productId[0].description)
        setParameter(productId[0].parameter)
        setPrice(productId[0].price)
        setPriceSale(productId[0].price_sale)
        setTags(productId[0].tag)
        setQuantity(productId[0].quantity)
        setTrademark(productId[0].trademark)
        setType(productId[0].type)
        setImg(productId[0].images)
        setEditProduct(productId)
    }, [product])
    const handleOnChange = (e) => {
        const files = e.target.files;
        const newImages = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = function (e) {
                const thumbnail = e.target.result;
                newImages.push(thumbnail);
                setImg((prevImg) => [...prevImg, thumbnail]); // concatenate new images to existing array
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async () => {
        setOpenEdit(false)
        const productAdd = {
            name: name,
            description: description,
            parameter: parameter,
            price: price,
            price_sale: priceSale,
            tag: tags,
            trademark: trademark,
            images: img,
            type: type,
            quantity: quantity,
        };
        await axios
            .put(
                `https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json`,
                productAdd
            )
            .then((response) => {
                toast.success('Thêm thành công!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                dispatch(fetchSomeData("products"))
            })
            .catch((error) => console.error(error));
    };
    return (
        <Box>
            <ToastContainer />
            <FormControl sx={{ display: 'flex', gap: '10px' }}>
                <TextField
                    label="Tên sản phẩm"
                    maxRows={4}
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Mô tả"
                    maxRows={4}
                    variant="standard"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />{' '}
                <TextField
                    label="Thông số"
                    maxRows={4}
                    variant="standard"
                    value={parameter}
                    onChange={(e) => setParameter(e.target.value)}
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Giá"
                        maxRows={4}
                        variant="standard"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <TextField
                        label="Giảm giá"
                        maxRows={4}
                        type="number"
                        value={priceSale}
                        variant="standard"
                        onChange={(e) => setPriceSale(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        label="Tag"
                        maxRows={4}
                        variant="standard"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <TextField
                        label="Số lượng"
                        maxRows={4}
                        variant="standard"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </Box>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
                    <FormControl
                        variant="standard"
                        sx={{ width: '50%', m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                            Thương hiệu
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={trademark}
                            onChange={(e) => setTrademark(e.target.value)}
                            label="Age">
                            <MenuItem value="NIKE">NIKE</MenuItem>
                            <MenuItem value="ADIDAS">ADIDAS</MenuItem>
                            <MenuItem value="JOGARBOLA">JOGARBOLA</MenuItem>
                            <MenuItem value="AKKA">AKKA</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{ width: '50%', m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">
                            Thương hiệu
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            label="Age">
                            <MenuItem value="soccer-shoe">Giày bóng đá</MenuItem>
                            <MenuItem value="fashion-shoe">Giày thời trang</MenuItem>
                            <MenuItem value="sandal">Dép</MenuItem>
                            <MenuItem value="hose">Vớ</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'left',
                        gap: '5px',
                    }}>
                    <Box>
                        <Button
                            variant="contained"
                            component="label">
                            Ảnh 1
                        </Button>
                        <input
                            type="file"
                            onChange={handleOnChange}
                        />
                    </Box>
                    <Box>
                        {' '}
                        <Box>
                            <Button
                                variant="contained"
                                component="label">
                                Ảnh 1
                            </Button>
                            <input
                                type="file"
                                onChange={handleOnChange}
                            />
                        </Box>
                    </Box>
                    <Box>
                        {' '}
                        <Box>
                            <Button
                                variant="contained"
                                component="label">
                                Ảnh 1
                            </Button>
                            <input
                                type="file"
                                onChange={handleOnChange}
                            />
                        </Box>
                    </Box>
                </Box>
                <Button
                    sx={{}}
                    variant="contained"
                    onClick={handleSubmit}>
                    Sửa
                </Button>
            </FormControl>
        </Box>
    );
}
