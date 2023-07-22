import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link } from '@mui/material';
import { motion } from 'framer-motion';
import RegisterForm from './RegisterForm';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlice';
import logo from '../../../assets/logos/thelogo.png'
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const LoginForm = ({ handleClose, handleGuest }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState("login");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificación de que todos los campos están llenos
    if (email === "" || password === "") {
      alert("Por favor, llena todos los campos.");
      return;
    }
    
    dispatch(login());
    handleClose();
  };

  const handleRegister = () => {
    setFormType("register");
  }

  return formType === "login" ? (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      className="login-form-container"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', borderRadius: '15px', padding: '30px', maxWidth: '400px', margin: 'auto' }}
    >
      <IconButton
    edge="end"
    color="inherit"
    aria-label="close"
    onClick={handleClose}
    sx={{ mb: 2, position: 'absolute', top: '10px', right: '10px' }}
  >
    <Close />
  </IconButton>
      <img src={logo} alt="logo" style={{ width: '120px', marginBottom: '20px' }} />
      <Typography variant="h4" sx={{ fontFamily: 'Poppins', marginBottom: '20px', color: '#333' }}>Ingresar</Typography>
      <Box className="input-container" sx={{ width: '100%', marginBottom: '20px' }}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
        />
        <TextField
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
        />
        <Link
          component="button"
          variant="body2"
          sx={{ textAlign: 'left', color: '#555', fontFamily: 'Poppins' }}
          onMouseEnter={(event) => event.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(event) => event.currentTarget.style.textDecoration = 'none'}
          onClick={() => {
            console.log("Olvidé mi contraseña");
          }}
        >
          Olvidé mi contraseña
        </Link>
      </Box>
      <Button
        onClick={handleSubmit}
        variant="contained"
        fullWidth
        sx={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
      >
        Ingresar
      </Button>
      <Box className="additional-options" sx={{ marginTop: '20px' }}>
        <Button
          onClick={handleRegister}
          variant="text"
          sx={{ textAlign: 'center', color: '#555', fontFamily: 'Poppins' }}
          onMouseEnter={(event) => event.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={(event) => event.currentTarget.style.textDecoration = 'none'}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </Box>
    </motion.div>
  ) : (
    <RegisterForm setFormType={setFormType} handleClose={handleClose} />
  );
};

export default LoginForm;




