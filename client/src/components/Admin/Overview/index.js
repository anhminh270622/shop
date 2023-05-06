import { useEffect, useState } from 'react'
import "./Overview.scss"
import { useSelector, useDispatch } from 'react-redux'
import { fetchSomeData } from '../../../redux/productSlice'
export default function Overview() {
  const product = useSelector(state => state.product.data)
  const dispatch = useDispatch()
  const [userData, setUserData] = useState([])
  useEffect(() => {
    // dispatch(fetchSomeData("products"))
    dispatch(fetchSomeData("products"))

  }, [dispatch])
  return (
    <div className="overview">
      <h1>Tổng quan Admin</h1>
      <div className="overview-container">
        <div>
          <h4>Đơn đặt hàng</h4>
          <p>20</p>
        </div>
        <div>
          <h4>Chờ xử lý</h4>
          <p>20</p>
        </div>
        <div>
          <h4>Tài khoản</h4>
          {/* <p>{userData.length}</p> */}
        </div>
        <div>
          <h4>Đơn đặt hàng</h4>
          <p>20</p>
        </div>
        <div>
          <h4>Kho</h4>
          <p>{product.length}</p>

        </div>
      </div>
    </div>

  )
}
