import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Link, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import RegisterForm from './RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/authSlice';
import logo from '../../../assets/logos/thelogo.png'
import { Close } from '@mui/icons-material';

const LoginForm = ({ handleClose, handleGuest }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState("login");
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (email === "" || password === "") {
      setSnackbarMessage("Por favor, llena todos los campos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    dispatch(login({email, password}))
      .then((action) => {
        if (login.fulfilled.match(action)) {
          // Si la acción es 'fulfilled' (es decir, si el inicio de sesión fue exitoso), entonces cierra el modal después de 5 segundos.
          setTimeout(handleClose, 3000);
        }
      });
  };

  const handleRegister = () => {
    setFormType("register");
  }


  return formType === "login" ? (
    <>
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
        {status === 'loading' && <CircularProgress />}
        {status === 'failed' && 
          <>
            <p>Error: Ya estas registrado con Markt?</p>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            </Snackbar>
          </>
        }
        {status === 'succeeded' && 
          <>
            <p>Bienvenido, {user.first_name}!</p>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                Bienvenido, {user.first_name}!
              </Alert>
            </Snackbar>
          </>
        }
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
    </>
  ) : (
    <RegisterForm setFormType={setFormType} handleClose={handleClose} />
  );
};

export default LoginForm;




