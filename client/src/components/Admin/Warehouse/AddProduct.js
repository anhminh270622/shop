import React from 'react';
import { Input, Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function AddProduct() {
    const [age, setAge] = React.useState('soccer-shoe');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [trademark, setTrademark] = React.useState('');
    const handleChangeTrademark = (event) => {
        setTrademark(event.target.value);
    };
    return (
        <Box>
            <FormControl sx={{ display: 'flex', gap: '10px' }}>
                <TextField
                    label="Tên sản phẩm"
                    maxRows={4}
                />
                <TextField
                    label="Mô tả"
                    maxRows={4}
                />{' '}
                <TextField
                    label="Thông số"
                    maxRows={4}
                />
                <TextField
                    label="Tên sản phẩm"
                    maxRows={4}
                />
                <Box sx={{ display: 'flex' }}>
                    <TextField
                        label="Giá"
                        maxRows={4}
                    />
                    <TextField
                        label="Giảm giá"
                        maxRows={4}
                    />
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <FormControl variant="standard">
                        <InputLabel>Thương hiệu</InputLabel>
                        <Select
                            value={trademark}
                            label="Age"
                            onChange={handleChangeTrademark}
                            maxRows={4}>
                            <MenuItem value={10}>NIKE</MenuItem>
                            <MenuItem value={20}>ADIDAS</MenuItem>
                            <MenuItem value={30}>AKKA</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        label="Nhãn"
                        maxRows={4}
                    />
                </Box>
                <FormControl>
                    <InputLabel>Kiểu sản phẩm</InputLabel>
                    <Select
                        value={age}
                        onChange={handleChange}
                        autoWidth>
                        <MenuItem value="soccer-shoe">Giày bóng đá</MenuItem>
                        <MenuItem value="fashion-shoe">Giày thời trang</MenuItem>
                        <MenuItem value="sandal">Dép</MenuItem>
                        <MenuItem value="hose"> Vớ</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    <Button
                        variant="contained"
                        component="label">
                        Ảnh 1
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                    <Button
                        variant="contained"
                        component="label">
                        Ảnh 2
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                    <Button
                        variant="contained"
                        component="label">
                        Ảnh 3
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                </Box>
            </FormControl>
        </Box>
    );
}
