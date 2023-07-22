import React from 'react';
import tiendas from '../../data/tiendas';
import StoreCard from '../StoreCard/StoreCard';
import accesorios from '../../assets/logos/accesorios/accesorios.png';
import { Box, Grid } from '@mui/material';

function JewelryPage() {
  const jewelryStores = tiendas.filter(tienda => tienda.category === 'joyas');

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingTop: '30px'
    }}>
      <Box component="img" src={accesorios} alt="Accesorios" sx={{ width: '100%', height: 'auto', marginBottom: '40px', marginTop: '10px' }} />
      <Grid container spacing={3}>
        {jewelryStores.map(store => (
          <Grid item xs={12} sm={6} md={4} key={store.id}>
            <StoreCard store={store} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default JewelryPage;