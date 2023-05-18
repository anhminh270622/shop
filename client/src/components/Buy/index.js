import "./Buy.scss"
import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import { useEffect, useState } from "react";
function Buy() {
    const [rows, setRows] = useState("")
    const userId = JSON.parse(localStorage.getItem("id"))
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
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
            field: 'status',
            headerName: 'Trang thái',
            align: 'center',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="contained"
                        className={`button ${params.row.status === "Thành công" ? "status" : ""}`}
                    >
                        {params.row.status}
                    </Button>
                </>
            ),
        },
    ];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://shop-server-b86ab-default-rtdb.asia-southeast1.firebasedatabase.app/order.json");
                const orders = response.data;
                const orderKeys = Object.keys(orders);
                const rows = orderKeys.map((key, index) => ({
                    id: index + 1, // Thêm thuộc tính id dựa trên index
                    ...orders[key],
                }));
                setRows(rows);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="buy">
            <div className="buy-top">
                <h1>Lịch sử đơn hàng</h1>
            </div>
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
                    // checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}

export default Buy