import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Typography,
  Divider,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaPlus } from 'react-icons/fa';

function ProfilePage() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddresses, setIsEditingAddresses] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [userProfile, setUserProfile] = useState({
    firstName: "Juan Pablo",
    lastName: "Gomez Mejia",
    email: "juanpablog857@gmail.com",
    phoneNumber: "+57 318 335 1733",
    addresses: []
  });

  const [newAddress, setNewAddress] = useState({ name: '', address: '' });
  const [editingAddresses, setEditingAddresses] = useState([]);

  const userOrders = [
    { id: "ORD001", date: "2023-07-01", status: "Delivered" },
    { id: "ORD002", date: "2023-06-15", status: "Delivered" },
  ];

  const handleEditProfileClick = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  const handleEditAddressesClick = () => {
    if (!isEditingAddresses) {
      setEditingAddresses(userProfile.addresses);
    } else {
      setUserProfile(prevProfile => ({ ...prevProfile, addresses: editingAddresses }));
    }

    setIsEditingAddresses(!isEditingAddresses);
  };

  const handleAddAddress = () => {
    setEditingAddresses([...editingAddresses, newAddress]);
    setNewAddress({ name: '', address: '' });
  };

  const handleRemoveAddress = (indexToRemove) => {
    setEditingAddresses(editingAddresses.filter((_, index) => index !== indexToRemove));
  };

  const handlePasswordChangeClick = () => {
    setIsChangingPassword(true);
  };

  const handlePasswordChangeClose = () => {
    setIsChangingPassword(false);
  };

  const handleAddressChange = (index, field) => (event) => {
    const updatedAddresses = [...editingAddresses];
    updatedAddresses[index][field] = event.target.value;
    setEditingAddresses(updatedAddresses);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card sx={{ mt: 2, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontFamily: 'Poppins', color: '#333' }}>Mi Perfil</Typography>
            <Divider sx={{ my: 1 }} />
            <TextField label="Nombre" fullWidth disabled={!isEditingProfile} defaultValue={userProfile.firstName} sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }} />
            <TextField label="Apellido" fullWidth disabled={!isEditingProfile} defaultValue={userProfile.lastName} sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }} />
            <TextField label="Email" fullWidth disabled={!isEditingProfile} defaultValue={userProfile.email} sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }} />
            <TextField label="Teléfono" fullWidth disabled={!isEditingProfile} defaultValue={userProfile.phoneNumber} sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }} />
            <Button
              variant="contained"
              fullWidth
              onClick={handleEditProfileClick}
              sx={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
            >
              {isEditingProfile ? 'Guardar cambios' : 'Editar Perfil'}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={handlePasswordChangeClick}
              sx={{ marginTop: '10px', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
            >
              Cambiar contraseña
            </Button>
            <Dialog open={isChangingPassword} onClose={handlePasswordChangeClose}>
              <Typography variant="h4" sx={{ fontFamily: 'Poppins', color: '#333' }}>Cambiar Contraseña</Typography>
              <DialogContent>
                <TextField label="Contraseña actual" fullWidth sx={{ marginBottom: '20px' }} />
                <TextField label="Nueva contraseña" fullWidth sx={{ marginBottom: '20px' }} />
                <TextField label="Confirmar nueva contraseña" fullWidth sx={{ marginBottom: '20px' }} />
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handlePasswordChangeClose}
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
                >
                  Cambiar Contraseña
                </Button>
                <Box className="additional-options" sx={{ marginTop: '20px' }}>
                  <Button
                    onClick={handlePasswordChangeClose}
                    variant="text"
                    sx={{ textAlign: 'center', color: '#555', fontFamily: 'Poppins' }}
                    onMouseEnter={(event) => event.currentTarget.style.textDecoration = 'underline'}
                    onMouseLeave={(event) => event.currentTarget.style.textDecoration = 'none'}
                  >
                    Cancelar
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Poppins', marginTop: '20px', color: '#333' }}>Direcciones</Typography>
            <Divider sx={{ my: 1 }} />
            {isEditingAddresses ? (
              editingAddresses.map((address, index) => (
                <Box key={index} sx={{ marginBottom: '20px' }}>
                  <TextField
                    fullWidth
                    value={address.name}
                    onChange={handleAddressChange(index, 'name')}
                    sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
                    placeholder="Nombre"
                  />
                  <TextField
                    fullWidth
                    value={address.address}
                    onChange={handleAddressChange(index, 'address')}
                    sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }}
                    placeholder="Dirección"
                  />
                  <IconButton aria-label="delete" onClick={() => handleRemoveAddress(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </Box>
              ))
            ) : (
              userProfile.addresses.length > 0 ?
                userProfile.addresses.map((address, index) => (
                  <Box key={index} sx={{ marginBottom: '20px' }}>
                    <Typography variant="body1">{address.name}</Typography>
                    <Typography variant="body1">{address.address}</Typography>
                  </Box>
                )) :
                <Typography variant="body1" sx={{  color: '#555', fontFamily: 'Poppins', marginBottom: '20px' }}>Agrega tus direcciones frecuentes donde quieres que te lleguen tus productos de Markt</Typography>
            )}
            {isEditingAddresses && (
              <>
                <TextField fullWidth value={newAddress.name} onChange={e => setNewAddress(prevAddress => ({ ...prevAddress, name: e.target.value }))} sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }} placeholder="Nombre" />
                <TextField fullWidth value={newAddress.address} onChange={e => setNewAddress(prevAddress => ({ ...prevAddress, address: e.target.value }))} sx={{ marginBottom: '20px', backgroundColor: '#e8e8e8', borderRadius: '10px', fontFamily: 'Poppins' }} placeholder="Dirección" />
                <Button
                  onClick={handleAddAddress}
                  variant="text"
                  sx={{ textAlign: 'center', color: '#555', fontFamily: 'Poppins', marginBottom: '20px' }}
                  onMouseEnter={(event) => (event.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(event) => (event.currentTarget.style.textDecoration = 'none')}
                >
                  <FaPlus style={{ marginRight: '5px' }} />
                  Guardar Direccion
                </Button>
              </>
            )}
            <Button
              variant="contained"
              fullWidth
              onClick={handleEditAddressesClick}
              sx={{ backgroundColor: '#333', color: '#fff', fontFamily: 'Poppins', borderRadius: '10px', textTransform: 'none', padding: '10px 0', fontSize: '18px' }}
            >
              {isEditingAddresses ? 'Guardar direcciones' : 'Administrar direcciones'}
            </Button>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ mt: 2, backgroundColor: '#f5f5f5' }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontFamily: 'Poppins', color: '#333' }}>Historial de Pedidos</Typography>
            <Divider sx={{ my: 1 }} />
            {userOrders.map((order, index) => (
              <Box key={index} sx={{ marginBottom: '20px' }}>
                <Typography variant="body1"><strong>Orden:</strong> {order.id}</Typography>
                <Typography variant="body1"><strong>Fecha:</strong> {order.date}</Typography>
                <Typography variant="body1"><strong>Estado:</strong> {order.status}</Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <Button
          variant="text"
          onClick={() => window.location.href='/privacy'}
          sx={{ color: '#555', fontFamily: 'Poppins', textTransform: 'none', textDecoration: 'underline' }}
        >
          Política de Tratamiento de Datos
        </Button>
        <Button
          variant="text"
          onClick={() => window.location.href='/terms'}
          sx={{ color: '#555', fontFamily: 'Poppins', textTransform: 'none', textDecoration: 'underline' }}
        >
          Términos y Condiciones
        </Button>
      </Box>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;


