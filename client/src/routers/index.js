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
import WarehouseAdminPage from '../pages/WarehouseAdminPage';
import HomeAdminPage from '../pages/HomeAdminPage';
import UserAdminPage from '../pages/UserAdminPage';
import OrderAdminPage from '../pages/OrderAdminPage';
import BuyPage from '../pages/Buy';
import OverviewAdminPage from '../pages/OverviewAdminPage';

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
        path: '/buy',
        component: <BuyPage />
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
export const privateAdmin = [
    {
        path: '/',
        component: <OverviewAdminPage />
    },
    {
        path: '/admin/user',
        component: <UserAdminPage />
    },
    {
        path: '/admin/order',
        component: <OrderAdminPage />
    },
    {
        path: '/admin/warehouse',
        component: <WarehouseAdminPage />
    }

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
