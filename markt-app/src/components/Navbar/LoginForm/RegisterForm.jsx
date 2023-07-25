import React, { useState } from 'react';
import { Box, TextField, Button, Typography, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { register } from '../../../redux/authSlice'; // asegúrate de que la ruta sea correcta
import './LoginForm.css';
import logo from '../../../assets/logos/thelogo.png'

const RegisterForm = ({ handleClose, setFormType }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      phoneNumber === "" ||
      !acceptTerms ||
      !acceptPrivacy
    ) {
      alert("Todos los campos deben estar llenos y debes aceptar los Términos y Condiciones y la Política de Tratamiento de Datos para completar el registro.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
  
    // Aquí, añade la lógica para manejar el envío del formulario
    dispatch(register({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password1: password,
      password2: confirmPassword,
      phone_number: phoneNumber,
      // Añade los otros campos si los necesitas
    }));
  
    handleClose();
  };
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (value.length > 10) { 
      alert("El número de teléfono no puede exceder los 10 dígitos."); // Alerta para el límite de longitud
    } else if (!/^[0-9]*$/.test(value)) { 
      alert("Solo se permiten números en el campo de teléfono."); // Alerta para caracteres no numéricos
    } else {
      setPhoneNumber(value);
    }
  }

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value); // Simplemente actualizamos el valor del estado de email sin hacer ninguna comprobación
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      className="login-form-container"
    >
       <IconButton
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={() => setFormType("login")}
        sx={{ mb: 2}}
      >
        <ArrowBack />
      </IconButton>
      <img src={logo} alt="logo" style={{ width: '120px', marginBottom: '20px' }}/>
      <Typography variant="h4" sx={{ fontFamily: 'Poppins', marginBottom: '20px', color: '#333' }}>Crear Cuenta</Typography>
      <Box className="input-container">
        <TextField
          label="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
        />
        <TextField
          label="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
        />
        <TextField
          label="Número de teléfono"  // Nuevo campo para el número de teléfono
          value={phoneNumber}
          onChange={handlePhoneNumberChange} // Usamos la nueva función para manejar los cambios
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
        <TextField
          type="password"
          label="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              name="acceptTerms"
            />
          }
          label={<span className="link-text" onClick={() => window.location.href='/terms'}>Acepto los Términos y Condiciones</span>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={acceptPrivacy}
              onChange={(e) => setAcceptPrivacy(e.target.checked)}
              name="acceptPrivacy"
            />
          }
          label={<span className="link-text" onClick={() => window.location.href='/privacy'}>Acepto la Política de Tratamiento de Datos</span>}
        />
      </Box>
      <Button
        onClick={handleFormSubmit}
        variant="contained"
        fullWidth
        sx={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
      >
        Ingresar
      </Button>
    </motion.div>
  );
};

export default RegisterForm;



