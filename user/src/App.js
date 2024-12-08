import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Page/Main';
import Cart from './Page/Cart';
import Checkout from './Page/Checkout';
import CheckoutSuccess from "./Page/CheckoutSuccess";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Main/>}></Route>
      <Route path ="/cart" element={<Cart/>}></Route>
      <Route path ="/checkout" element={<Checkout/>}></Route>
      <Route path="/checkout/success" element={<CheckoutSuccess />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
