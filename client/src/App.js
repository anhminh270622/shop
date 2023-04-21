import './App.scss';
import Footer from './components/Footer';
import Header from './components/Header';
import { publicRouters, privateRouters,privateAdmin } from './routers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
	return (
		<div className="App">
			<BrowserRouter>
				{localStorage.getItem('login') === 'true' ? (
          localStorage.getItem('admin') === 'true' ? ( <Routes>
            {privateAdmin &&
              privateAdmin.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.component}>
                    {' '}
                  </Route>
                );
              })}
          </Routes>):(
            <>
            <Header />
              <Routes>
                {privateRouters &&
                  privateRouters.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={route.path}
                        element={route.component}>
                        {' '}
                      </Route>
                    );
                  })}
              </Routes>
                  <Footer />
            </>
          )
				) : (
					<>
								<Header />
								<Routes>
									{publicRouters &&
										publicRouters.map((route, index) => {
											return (
												<Route
													key={index}
													path={route.path}
													element={route.component}>
													{' '}
												</Route>
											);
										})}
								</Routes>
								<Footer />
					</>
				)}
			</BrowserRouter>
		</div>
	);
}
export default App;
