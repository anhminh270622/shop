import "./App.css"
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
        <HeaderPage />
        {
          publicRouters && publicRouters.map((route, index) => {
            return (
              <Routes>
                <Route key={index}></Route>
              </Routes>
            )
          })
        }
      </BrowserRouter>
    </div >
  )


}
export default App;