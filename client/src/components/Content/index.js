import "./Content.scss"
import ProductNew from "./ProductNew";
import Slider from "./Slider";
function Content() {
    return (<>
        <div className="content">
            <Slider />
            <ProductNew />
        </div>
    </>);
}

export default Content;