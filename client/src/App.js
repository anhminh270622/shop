import "./App.css"
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeaderPage from "./pages/HeaderPage";
import { publicRouters, privateRouters } from "./routers";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>

          {
            publicRouters && publicRouters.map((route, index) => {
              return (
                <Route key={index} path={route.path} element={route.component}> </Route>
              )
            })
          }
        </Routes>
        <Footer />
      </BrowserRouter>
    </div >
  )


}
export default App;