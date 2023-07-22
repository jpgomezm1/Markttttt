import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import ClothesPage from './components/ClothesPage/ClothesPage';
import FoodPage from './components/FoodPage/FoodPage';
import JewelryPage from './components/JewelryPage/JewelryPage';
import PetsPage from './components/PetsPage/PetsPage';
import StorePage from './components/StorePage/StorePage';
import LikedStores from './components/LikedStores/LikedStores';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import DataPolicy from './components/Terms/DataPolicy';
import TermsConds from './components/Terms/TermsConds';
import Help from './components/Help/Help';
import ProfilePage from './components/ProfilePage/ProfilePage';
import WishlistPage from './components/WishlistPage/WishlistPage';


import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stores/:id" element={<StorePage />} />
            <Route path="/stores/ropa" element={<ClothesPage />} />
            <Route path="/stores/comida" element={<FoodPage />} />
            <Route path="/stores/joyeria" element={<JewelryPage />} />
            <Route path="/stores/mascotas" element={<PetsPage />} />
            <Route path="/liked-stores" element={<LikedStores />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/terms" element={<TermsConds />} />
            <Route path="/privacy" element={<DataPolicy />} />
            <Route path="/help" element={<Help />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wish" element={<WishlistPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
