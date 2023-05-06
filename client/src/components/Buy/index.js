import "./Buy.scss"
import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
function Buy() {
    const [rows, setRows] = useState("")
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'product',
            headerName: 'Chi tiết đơn hàng',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 800,
        },
        {
            field: 'total',
            headerName: 'Tổng tiền',
            type: 'number',
            width: 130,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Trang thái',
            align: 'center',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"

                    >
                        Đang chờ xử lý
                    </Button>
                </>
            ),
        },
    ];

    // const rows = [
    //     { id: 1, name: 'Minh', sdt: '03465559933', address: "phúc thịnh -ngọc lặc -thanh hóa", note: "giao trước", details: "", sum: "32235235đ" },
    // ];
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await axios.get("http://localhost:3000/api/order")
    //         console.log(response.data)
    //     }
    //     fetchData()
    // }, [])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/order")
                setRows(response.data) // Cập nhật state rows với dữ liệu trả về từ API
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    console.log(rows)

    return (
        <div className="buy">
            <div className="buy-top">
                <h1>Đơn mua</h1>
            </div>
            {/* <div className="buy-container">
                <div className="info">
                    <p>Minh</p>
                    <p>0345778493257</p>
                    <p>phúc thịnh ngọc lặc thanh hóa</p>
                    <p>giao trước hôm nay</p>
                </div>
                <div className="detail">
                    <p>Dép sportswear Nike On Deck nữ CU3959</p>
                    <p>size:43</p>
                    <p>số lượng:2</p>
                </div>
                <div className="status">
                    <Button variant="contained">Đang chờ xử lí</Button>
                </div>
            </div> */}
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
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
            <hr />

        </div>
    )
}

export default Buy