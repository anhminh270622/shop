import './Content.scss';
import ProductNew from './ProductNew';
import Slider from './Slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
function Content() {
    const [successMessage, setSuccessMessage] = useState(false);
    const location = useLocation();
    const success = location.state?.success;
    useEffect(() => {
        if (success === true && !successMessage) {
            toast.success('Đăng nhập thành công!', {
                position: toast.POSITION.TOP_RIGHT,
            });
            setSuccessMessage(true);
        }
    }, [success, successMessage]);
    return (
        <>
            <ToastContainer />
            <div className="content">
                <Slider />
                <ProductNew />
            </div>
        </>
    );
}

export default Content;
