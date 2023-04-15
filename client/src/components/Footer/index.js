import "./Footer.scss"
import Logo from "../../assets/image/logo.png"
function Footer() {
    return (<>
        <div className="footer">
            <div className="footer-wrapper">
                <ul>
                    <li className="left">
                        <img src={Logo}></img>
                    </li>
                    <li className="right">
                        <ul>
                            <li className="category">Danh mục</li>
                            <li className="contact">Liên hệ</li>
                            <li className="rules">Điều khoản</li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
    </>);
}

export default Footer;