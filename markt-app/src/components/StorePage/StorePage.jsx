import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import tiendas from '../../data/tiendas';
import ProductDetail from './ProductDetail/ProductDetail';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  Container,
  Typography,
  Box
} from '@mui/material';
import productos from '../../assets/logos/details/Productos.png';
import { FaInstagram, FaTwitter, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';

function StorePage() {
  let { id } = useParams();
  const store = tiendas.find((tienda) => tienda.id === parseInt(id));
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <Container style={{ marginTop: '20px', backgroundColor: '#FFFFFF' }}>
      {/* Store Information */}
      <Grid container spacing={2} style={{ marginBottom: '20px' }}>
        {/* Header Image */}
        <Grid item xs={12} sm={6} style={{ position: 'relative' }}>
          <img
            src={store.headImage}
            alt={`${store.name} Header`}
            style={{ width: '100%' }}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            <img
              src={store.logo}
              alt={`${store.name} Logo`}
              style={{
                maxWidth: '80%',
                maxHeight: '80%'
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton>
                <FaInstagram />
              </IconButton>
              <IconButton>
                <FaTwitter />
              </IconButton>
              <IconButton>
                <FaTiktok />
              </IconButton>
              <IconButton>
                <FaWhatsapp />
              </IconButton>
            </Box>
          </Box>
        </Grid>
        {/* Description */}
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            component="div"
            style={{
              fontSize: '3.1em',
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            {store.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ fontSize: '2.4em', textAlign: 'center' }}
          >
            {store.description}
          </Typography>
        </Grid>
      </Grid>

      {/* Sub Images */}
      <Grid container spacing={0} style={{ marginBottom: '20px' }}>
        {store.subImage.map((image, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <img
              src={image}
              alt={`Subimage ${index + 1}`}
              style={{
                width: '100%',
                aspectRatio: '1/1',
                objectFit: 'cover'
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Products */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <img src={productos} alt="Productos" style={{ marginRight: '10px' }} />
      </div>
      <Grid container spacing={2}>
        {store.products.map((product) => (
          <Grid item xs={12} sm={4} key={product.productid}>
            <Card
              elevation={0}
              style={{
                transition: 'box-shadow 0.3s ease-in-out',
                marginBottom: '40px'
              }}
            >
              <CardActionArea
                disableRipple
                style={{ textAlign: 'left' }}
                onMouseOver={(e) =>
                  (e.currentTarget.parentNode.style.boxShadow =
                    '0 4px 20px 0 rgba(0,0,0,0.12)')
                }
                onMouseOut={(e) =>
                  (e.currentTarget.parentNode.style.boxShadow = 'none')
                }
              >
                <div
                  style={{
                    height: 0,
                    paddingTop: '100%',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${product.image})`,
                    backgroundPosition: 'center'
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    style={{ marginBottom: '10px' }}
                  >
                    {product.name}
                  </Typography>
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#333',
                      color: '#fff',
                      fontFamily: 'Poppins',
                      borderRadius: '10px',
                      textTransform: 'none',
                      padding: '10px 0',
                      fontSize: '18px'
                    }}
                  >
                    Ver este producto
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Product Detail */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          category={store.category}
          store={store}
        />
      )}
    </Container>
  );
}

export default StorePage;











