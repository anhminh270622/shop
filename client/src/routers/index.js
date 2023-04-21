import HomePage from '../pages/HomePage';
import ProductDetailsPage from '../pages/DetailsPage';
import SandalPage from '../pages/SandalPage';
import SoccerShoesPage from '../pages/SoccerShoesPage';
import FashionShoesPage from '../pages/FashionShoesPage';
import HosePage from '../pages/HosePage';
import CartPage from '../pages/CartPage';
import NotFoundPage from '../pages/NotFoundPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomeAdminPage from '../pages/HomeAdminPage';
import WarehouseAdmin from '../pages/WarehouseAdmin';
export const privateRouters = [
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
        path: '/admin',
        component: <HomeAdminPage />
    },
    {
        path: '*',
        component: <NotFoundPage />
    }
];
export const privateAdmin = [
        {
            path: '/admin',
            component: <HomeAdminPage />
        },
        {
            path: '/admin/warehouse',
            component: <WarehouseAdmin/>
        },

]
export const publicRouters = [
    {
        path: '/',
        component: <HomePage />,
    },
    {
        path: '/login',
        component: <LoginPage />
    },
    {
        path: '/register',
        component: <RegisterPage />
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
        path: '/search',
        component: <SearchResultsPage />
    },
    {
        path: '*',
        component: <NotFoundPage />
    }
];
// export { publicRouters, privateRouters }
