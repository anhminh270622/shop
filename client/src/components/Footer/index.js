import "./Footer.scss"
import Logo from "../../assets/image/logo.png"
import ScrollToTopButton from "../ScrollTopButton";
function Footer() {
    return (<>
        <div className="footer">
            <div className="footer-wrapper">
                <ul className="title">
                    <li className="left">
                        <img src={Logo}></img>
                    </li>
                    <li className="right">
                        <ul className="right-title">
                            <li>
                                <h3>Danh mục</h3>
                                <ul>
                                    <li>Giày thời trang</li>
                                    <li>Giày thể thao</li>
                                    <li>Dép</li>
                                    <li>Vớ</li>
                                </ul>
                            </li>
                            <li className="category">
                                <h3>Thương hiệu</h3>
                                <ul>
                                    <li>Nike</li>
                                    <li>Adidas thể thao</li>
                                    <li>Akka</li>
                                    <li>Jogarbola</li>
                                </ul>
                            </li>
                            <li className="contacts">
                                <h3>Liên hệ</h3>
                                <ul>
                                    <li>Email: anhminh270622@gmail.com</li>
                                    <li>Github: https://github.com/anhminh270622</li>
                                    <li>Địa chỉ: Dịch Vọng Hậu - Cầu Giấy - Hà Nội</li>
                                </ul></li>
                            <li className="rules">
                                <h3>Hỗ trợ khách hàng</h3>
                                <ul>
                                    <li>Chính sách bảo hành và đổi trả</li>
                                    <li>Chính sách vận chuyển</li>
                                    <li>Hướng dẫn đặt</li>
                                </ul></li>
                        </ul>
                    </li>
                </ul>
                <ScrollToTopButton />

            </div>
        </div>
    </>);
}

export default Footer;