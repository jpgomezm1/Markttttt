import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Button, IconButton, Link } from '@mui/material';
import { removeFromCart, updateQuantity, updateSize, clearCart } from '../../redux/cartSlice';
import { FaRegImage, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import './ShoppingCart.css';
import logo from '../../assets/logos/thelogo.png';
import PaymentForm from '../PaymentForm/PaymentForm';
import LoginForm from '../Navbar/LoginForm/LoginForm';

const ShoppingCart = ({ handleClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleUpdateQuantity = (index, change) => {
    const updatedQuantity = cartItems[index].quantity + change;
    if (updatedQuantity >= 1) {
      dispatch(updateQuantity({ index, quantity: updatedQuantity }));
    }
  };

  const handleUpdateSize = (index, newSize) => {
    dispatch(updateSize({ index, size: newSize }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const itemVariants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } },
    exit: { x: '100vw', transition: { ease: 'easeInOut' } },
  };

  const handleShowLoginForm = (show) => {
    setShowLoginForm(show);
  };

  if (showPaymentForm) {
    return <PaymentForm handleClose={() => setShowPaymentForm(false)} />;
  }

  if (showLoginForm) {
    return <LoginForm handleClose={() => setShowLoginForm(false)} />;
  }

  return (
    <Container fluid className="shopping-cart-container">
      <IconButton
        color="inherit"
        aria-label="close"
        onClick={handleClose}
        sx={{ position: 'absolute', top: 20, right: 20, fontSize: '2rem' }}
      >
        <CloseIcon />
      </IconButton>
      <h2 className="shopping-cart-title">Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <img src={logo} alt="logo" style={{ width: '160px', marginBottom: '20px' }} />
          <p className="empty-cart-message">Ups! Todavía no tienes productos agregados al carrito</p>
          <p className="empty-cart-submessage">
            Explora tus productos favoritos en tus emprendimientos favoritos y agrégalos al carrito.
          </p>
          <Button
            onClick={() => console.log('Aquí agregar lógica para ver productos recomendados')}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              fontFamily: 'Poppins',
              borderRadius: '10px',
              textTransform: 'none',
              padding: '10px 0',
              fontSize: '18px',
            }}
          >
            Ver Recomendados
          </Button>
        </div>
      ) : (
        <motion.div
          className="cards-container-sc"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={itemVariants}
        >
          {cartItems.map((item, index) => (
            <motion.div key={index} className="card-sc">
              <div className="product-info">
                {item.image ? (
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="product-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                ) : (
                  <FaRegImage className="product-placeholder" />
                )}
                <div className="product-details">
                  <motion.p className="product-name">{item.name}</motion.p>
                  <motion.p className="product-store">{item.store}</motion.p>
                  <motion.p className="product-price">
                    ${item.price.toLocaleString()} COP
                  </motion.p>
                  <div className="product-quantity">
                    <span className="quantity-label">Cantidad: </span>
                    <FaMinus
                      className="quantity-icon"
                      onClick={() => handleUpdateQuantity(index, -1)}
                    />
                    <span>{item.quantity}</span>
                    <FaPlus
                      className="quantity-icon"
                      onClick={() => handleUpdateQuantity(index, 1)}
                    />
                  </div>
                  {item.size && (
                    <div className="product-size">
                      <span className="size-label">Talla: </span>
                      <select
                        value={item.size}
                        className="size-select"
                        onChange={(e) => handleUpdateSize(index, e.target.value)}
                      >
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
              <FaTrashAlt
                className="delete-icon"
                onClick={() => handleRemoveFromCart(index)}
              />
            </motion.div>
          ))}
           <Link
          component="button"
          variant="body2"
          sx={{ textAlign: 'left', color: '#555', fontFamily: 'Poppins' }}
          onMouseEnter={(event) => event.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(event) => event.currentTarget.style.textDecoration = 'none'}
          onClick={handleClearCart}
        >
          Limpiar Carrito
        </Link>
        </motion.div>
        
      )}

      {cartItems.length > 0 && (
        <div className="total-container">
          <h3>Subotal:</h3>
          <p className="total-price">${calculateTotal().toLocaleString()} COP</p>
          <div className="cart-actions-container">
          <Button
         onClick={() => {
           if (isAuthenticated) {
             setShowPaymentForm(true);
           } else {
             handleShowLoginForm(true);
           }
         }}
        variant="contained"
        fullWidth
        sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' }, color: '#fff', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
      >
        Ir a Pagar
      </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShoppingCart;


