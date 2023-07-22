import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, TextField, FormControl, Select, MenuItem, InputLabel, Typography, Paper, Box, Card, CardContent, Divider, Grid, List, ListItem, ListItemText } from '@mui/material';
import './PaymentForm.css';

const PaymentForm = ({ handleClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('tarjeta-credito');
  const [total, setTotal] = useState(0);

  const deliveryFee = 10000;
  const paymentGatewayFee = 0.0299;

  useEffect(() => {
    let subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (deliveryOption === 'delivery') {
      subTotal += deliveryFee;
    }
    if (paymentMethod !== 'pago-contra-entrega') {
      subTotal *= (1 + paymentGatewayFee);
    }
    setTotal(subTotal - discount);
  }, [cartItems, deliveryOption, paymentMethod, discount]);

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
    if (event.target.value === 'DESCUENTO10') {
      setDiscount(10000);
    } else {
      setDiscount(0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Pagando...");
    // Aquí debes agregar la lógica de procesamiento de pago
  };

  return (
    <Paper elevation={3} className="payment-form-container">
      <h2 className="shopping-cart-title">Registra Tu Pago</h2>
      <form onSubmit={handleSubmit} className="payment-form">

        <FormControl variant="outlined" fullWidth required className="delivery-option-select">
          <InputLabel>Opción de entrega</InputLabel>
          <Select value={deliveryOption} onChange={handleDeliveryOptionChange} label="Opción de entrega" sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}>
            <MenuItem value="delivery" sx={{ backgroundColor: '#e8e8e8', fontFamily: 'Poppins' }}>Incluir domicilio</MenuItem>
            <MenuItem value="pickup" sx={{ backgroundColor: '#e8e8e8', fontFamily: 'Poppins' }}>Recoger en tienda</MenuItem>
          </Select>
        </FormControl>

        {deliveryOption === 'pickup' && (
          <Box component="div" bgcolor="warning.main" p={1} my={2} borderRadius={1} color="white" textAlign="center">
            Debes recoger tu pedido en Calle 5 sur #25-130, en 3 días hábiles.
          </Box>
        )}

        {deliveryOption === 'delivery' && (
          <TextField
            label="Dirección de envío"
            variant="outlined"
            fullWidth required
            sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
          />
        )}

        <FormControl variant="outlined" fullWidth required className="payment-method-select">
          <InputLabel>Método de pago</InputLabel>
          <Select value={paymentMethod} onChange={handlePaymentMethodChange} label="Método de pago"sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}>
            <MenuItem value="tarjeta-credito" sx={{ backgroundColor: '#e8e8e8', fontFamily: 'Poppins' }}>Tarjeta de crédito</MenuItem>
            <MenuItem value="pago-contra-entrega" sx={{ backgroundColor: '#e8e8e8', fontFamily: 'Poppins' }}>Pago contra entrega</MenuItem>
          </Select>
        </FormControl>

        <TextField variant="outlined" label="Cupón de descuento" value={coupon} onChange={handleCouponChange} fullWidth sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}/>

        <Card elevation={3} className="summary-container-pf" sx={{ mt: 2, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>Resumen de Pedido</Typography>
            <Divider sx={{ my: 1 }} />
            <List dense>
              {cartItems.map((item, index) => (
                <ListItem key={index} disableGutters>
                  <Grid container justifyContent="space-between">
                    <Grid item><Typography variant="body2">{item.name} x {item.quantity}</Typography></Grid>
                    <Grid item><Typography variant="body2">${(item.price * item.quantity).toLocaleString()} COP</Typography></Grid>
                  </Grid>
                </ListItem>
              ))}
              {deliveryOption === 'delivery' && (
                <ListItem disableGutters>
                  <Grid container justifyContent="space-between">
                    <Grid item><Typography variant="body2">Costo de entrega</Typography></Grid>
                    <Grid item><Typography variant="body2">${deliveryFee.toLocaleString()} COP</Typography></Grid>
                  </Grid>
                </ListItem>
              )}
              {paymentMethod !== 'pago-contra-entrega' && (
                <ListItem disableGutters>
                  <Grid container justifyContent="space-between">
                    <Grid item><Typography variant="body2">Costo pasarela de pago</Typography></Grid>
                    <Grid item><Typography variant="body2">2.99%</Typography></Grid>
                  </Grid>
                </ListItem>
              )}
              {discount > 0 && (
                <ListItem disableGutters>
                  <Grid container justifyContent="space-between">
                    <Grid item><Typography variant="body2">Descuento</Typography></Grid>
                    <Grid item><Typography variant="body2">-${discount.toLocaleString()} COP</Typography></Grid>
                  </Grid>
                </ListItem>
              )}
            </List>
            <Divider sx={{ my: 1 }} />
            <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
              <Grid item><Typography variant="h6">Total:</Typography></Grid>
              <Grid item><Typography variant="h6">${total.toLocaleString()} COP</Typography></Grid>
            </Grid>
          </CardContent>
        </Card>

        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#45a049' }, color: '#fff', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
        >
          Pagar
        </Button>
        <Box className="additional-options" sx={{ marginTop: '20px' }}>
          <Button
            onClick={handleClose}
            variant="text"
            sx={{ textAlign: 'center', color: '#555', fontFamily: 'Poppins' }}
            onMouseEnter={(event) => event.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(event) => event.currentTarget.style.textDecoration = 'none'}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default PaymentForm;



