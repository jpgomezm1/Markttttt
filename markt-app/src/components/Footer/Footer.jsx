import React from 'react';
import { Container, Grid, Typography, Link, Box, styled } from '@mui/material';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import Logo from '../../assets/logos/thelogo.png'

const StyledFaInstagram = styled(FaInstagram)({
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#E1306C',
  },
});

const StyledFaTwitter = styled(FaTwitter)({
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#1DA1F2',
  },
});

const StyledFaTiktok = styled(FaTiktok)({
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#000000',
  },
});

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#FFFFFF', py: 2, borderTop: '1px solid black' }}>
      <Container>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Link href="#" color="inherit" underline="none" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Nosotros</Link>
              <Link href="#" color="inherit" underline="none" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Politicas</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={Logo} alt="Logo" style={{ width: '120px', height: 'auto' }}/>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, pt: 2 }}>
                <Link href="https://www.instagram.com/your_account/" color="inherit" underline="none" target="_blank" rel="noopener"><StyledFaInstagram size="24px" /></Link>
                <Link href="https://twitter.com/your_account/" color="inherit" underline="none" target="_blank" rel="noopener"><StyledFaTwitter size="24px" /></Link>
                <Link href="https://www.tiktok.com/@your_account/" color="inherit" underline="none" target="_blank" rel="noopener"><StyledFaTiktok size="24px" /></Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Link href="#" color="inherit" underline="none" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Tiendas</Link>
              <Link href="#" color="inherit" underline="none" sx={{ fontFamily: 'Poppins', fontWeight: 'bold' }}>Suscribete</Link>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" sx={{ pt: 2, fontFamily: 'Poppins' }}>
          © 2023 MARKT. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
