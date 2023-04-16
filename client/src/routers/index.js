import HomePage from '../pages/HomePage';
import ProductDetailsPage from '../pages/DetailsPage';
import SandalPage from '../pages/SandalPage';
import SoccerShoesPage from '../pages/SoccerShoesPage';
import FashionShoesPage from '../pages/FashionShoesPage';
import HosePage from '../pages/HosePage';
export const publicRouters = [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/:type/:id',
        component: <ProductDetailsPage />,
    },
    {
        path: '/sandal',
        component: <SandalPage />,
    },
    {
        path: '/hose',
        component: <HosePage />,
    },
    // {
    //     path: '/:type',
    //     component: <HosePage />,
    // },
    // {
    //     path: '/:type',
    //     component: <FashionShoesPage />,
    // },
    {
        path: '/soccer-shoe',
        component: <SoccerShoesPage />,
    },
    {
        path: '/fashion-shoe',
        component: <FashionShoesPage />,
    },
];
export const privateRouters = [];
// export { publicRouters, privateRouters }
