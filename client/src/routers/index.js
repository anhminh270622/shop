import HomePage from '../pages/HomePage';
import ProductDetailsPage from '../pages/DetailsPage';
import SandalPage from '../pages/SandalPage';
import SoccerShoesPage from '../pages/SoccerShoesPage';
import FashionShoesPage from '../pages/FashionShoesPage';
import HosePage from '../pages/HosePage';
import CartPage from '../pages/CartPage';
import NotFoundPage from '../pages/NotFoundPage';
import SearchResultsPage from '../pages/SearchResultsPage';
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
    {
        path: '/soccer-shoe',
        component: <SoccerShoesPage />,
    },
    {
        path: '/fashion-shoe',
        component: <FashionShoesPage />,
    },
    {
        path: '/cart',
        component: <CartPage />
    },
    {
        path: '/search',
        component: <SearchResultsPage />
    },
    {
        path: '*',
        component: <NotFoundPage />
    }
];
export const privateRouters = [];
// export { publicRouters, privateRouters }
