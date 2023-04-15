import HomePage from "../pages/HomePage"
import ProductDetailsPage from "../pages/DetailsPage"
// import ProductDetailsPage from "../pages/ProductDetailsPage"
export const publicRouters = [
    {
        path: "/", component: <HomePage />
    },
    {
        path: "/:type/:id", component: <ProductDetailsPage />
    }
]
export const privateRouters = []
// export { publicRouters, privateRouters }