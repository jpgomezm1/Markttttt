import React from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/authSlice';
import { Link } from 'react-router-dom';
import { FaRegUserCircle, FaHeart, FaSignOutAlt, FaExclamationCircle, FaGift } from 'react-icons/fa';
import { RiAdminFill } from "react-icons/ri";
import './UserDropdownMenu.css'


const UserDropdownMenu = ({ anchorEl, handleClose, handleLogout}) => {
  const dispatch = useDispatch();

  const internalHandleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Link to="/profile" className="user-dropdown-link">
           <FaRegUserCircle /> Mi Perfil
        </Link>
      </MenuItem>
      
      {/* Modificar este elemento de menú para redirigir a Mis Tiendas Favoritas */}
      <MenuItem onClick={handleClose}>
        <Link to="/liked-stores" className="user-dropdown-link">
          <FaHeart /> Mis Tiendas Favoritas
        </Link>
      </MenuItem>

      <MenuItem onClick={handleClose}>
        <Link to="/wish" className="user-dropdown-link">
           <FaGift /> Mi Lista De Deseos
        </Link>
      </MenuItem>
      
      <MenuItem onClick={handleClose}>
        <Link to="/help" className="user-dropdown-link">
          <FaExclamationCircle /> Ayuda
        </Link>
      </MenuItem>

      <MenuItem onClick={handleLogout}>
        <FaSignOutAlt /> Cerrar Sesión
      </MenuItem>
    </Menu>
  );
};

export default UserDropdownMenu;


