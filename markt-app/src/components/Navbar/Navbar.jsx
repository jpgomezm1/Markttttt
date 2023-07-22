import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  InputBase,
  useTheme,
  useMediaQuery,
  Grid,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FaTshirt, FaHamburger, FaGem, FaDog, FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import LoginForm from './LoginForm/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import UserDropdownMenu from './UserdropDownMenu/UserDropdownMenu';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import Marktt from '../../assets/markt1.png';
import logo from '../../assets/logos/thelogo.png';
import SearchIcon from '@mui/icons-material/Search';

import './Navbar.css';

function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false); // Nuevo estado para el drawer del carrito
  const [loginOpen, setLoginOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItemsInCart = cartItems.length;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleCartDrawer = (open) => (event) => { // Nuevo método para controlar el estado del drawer del carrito
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCartDrawerOpen(open);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const list = () => (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#144579',
        color: 'white',
        position: 'relative',
      }}
      role="presentation"
    >
      <IconButton
        color="inherit"
        aria-label="close drawer"
        onClick={toggleDrawer(false)}
        sx={{ position: 'absolute', left: 10, top: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography
        sx={{
          mt: 8,
          mb: 2,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        Explora los emprendimientos por tu categoría favorita
      </Typography>
      <Divider />
      <List>
        {[
          { text: 'Ropa', icon: <FaTshirt /> },
          { text: 'Comida', icon: <FaHamburger /> },
          { text: 'Joyeria', icon: <FaGem /> },
          { text: 'Mascotas', icon: <FaDog /> },
        ].map((item, index, array) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              key={item.text}
              onClick={toggleDrawer(false)}
              style={{ justifyContent: 'center' }}
            >
              <Link to={`/stores/${item.text.toLowerCase()}`} className="drawer-nav-link">
                <Box display="flex" alignItems="center">
                  {item.icon}
                  <Box ml={1}>{item.text}</Box>
                </Box>
              </Link>
            </ListItem>
            {index < array.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" style={{ backgroundColor: '#FFFFFF' }}>
      <Toolbar style={{ padding: 0 }}>
        <Grid container direction="column">
        <Grid item container alignItems="center" style={{ padding: '0 20px' }}>
  <Grid item xs={12} sm={2} md={1} lg={1}>
    <Box display="flex" justifyContent="flex-start" width="100%" pr={2}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Markt Logo" style={{ width: '130px', height: '73px', flexShrink: 0, marginTop: '8px' }} />
      </Link>
    </Box>
  </Grid>
  <Grid item xs={12} sm={8} md={10} lg={10}>
    <Box display="flex" justifyContent="center" width="100%">
      <InputBase
        placeholder="Buscar…"
        style={{
          width: '80%',
          height: '40px',
          borderRadius: '20px',
          border: '2px solid #000',
          padding: '0 16px',
        }}
      />
    </Box>
  </Grid>
  <Grid item xs={12} sm={2} md={1} lg={1}>
    <Box display="flex" justifyContent="flex-end" width="100%" pl={2}>
      <IconButton color="inherit" onClick={toggleCartDrawer(true)} style={{ color: 'black' }}>
        <FaShoppingCart />
      </IconButton>
      {isAuthenticated ? (
        <IconButton color="inherit" onClick={handleClick} style={{ color: 'black' }}>
          <FaUserCircle />
        </IconButton>
      ) : (
        <Button color="inherit" onClick={() => setLoginOpen(true)} style={{ color: 'black' }}>
          Login
        </Button>
      )}
    </Box>
  </Grid>
          </Grid>
          <Grid item container justifyContent="space-around" style={{ backgroundColor: '#FFFFFF', padding: '10px 50px' }}>
            <Link to="/stores/ropa" style={linkStyle}>
            Ropa y Zapatos
            </Link>
            <Link to="/stores/comida" style={linkStyle}>
            Decoracion de hogar
            </Link>
            <Link to="/stores/joyeria" style={linkStyle}>
            Joyería y accesorios
            </Link>
            <Link to="/stores/mascotas" style={linkStyle}>
              Mascotas
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
      <Drawer open={cartDrawerOpen} onClose={toggleCartDrawer(false)}>
        <ShoppingCart handleClose={() => setCartDrawerOpen(false)} />
      </Drawer>
      {loginOpen && (
        <Drawer anchor="right" open={loginOpen} onClose={() => setLoginOpen(false)}>
          <LoginForm handleClose={() => setLoginOpen(false)} />
        </Drawer>
      )}
      {isAuthenticated && (
        <UserDropdownMenu anchorEl={anchorEl} handleClose={handleClose} handleLogout={handleLogout} />
      )}
    </AppBar>
  );
}

const linkStyle = {
  color: '#000',
  fontFamily: 'Poppins',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  textDecoration: 'none',
  margin: '0 10px' // Espacio menor entre los enlaces
};

export default NavBar;

