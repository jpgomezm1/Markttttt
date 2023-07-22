import React, { useState } from 'react';
import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Skeleton,
  TextField
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

import back from '../../assets/logos/backmujeres.png';
import titulo from '../../assets/logos/slogan.png';
import frase from '../../assets/logos/frase1.png';

import baner1 from '../../assets/logos/baner1.png';
import baner2 from '../../assets/logos/baner2.png';
import baner3 from '../../assets/logos/baner3.png';
import baner4 from '../../assets/logos/baner4.png';
import baner5 from '../../assets/logos/baner5.png';
import baner6 from '../../assets/logos/baner6.png';
import baner7 from '../../assets/logos/baner7.png';
import baner8 from '../../assets/logos/baner1.png';

import baner11 from '../../assets/logos/baner11.png';
import baner22 from '../../assets/logos/baner22.png';
import baner33 from '../../assets/logos/baner33.png';
import baner44 from '../../assets/logos/baner44.png';
import baner55 from '../../assets/logos/baner55.png';
import baner66 from '../../assets/logos/baner66.png';
import baner77 from '../../assets/logos/baner77.png';
import baner88 from '../../assets/logos/baner11.png';

import recom1 from '../../assets/logos/recom1.png';
import recom2 from '../../assets/logos/recom2.png';
import recom3 from '../../assets/logos/recom3.png';
import recom4 from '../../assets/logos/recom1.png';
import recom5 from '../../assets/logos/recom2.png';
import recom6 from '../../assets/logos/recom3.png';

function HomePage() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscription = () => {
    // Aquí puedes añadir la lógica para la suscripción
    console.log(`Email for subscription: ${email}`);
  };

  const recommendedImages = [
    recom1,
    recom2,
    recom3,
    recom4,
    recom5,
    recom6,
  ];

  return (
    <Box sx={{ textAlign: 'center', backgroundColor: '#FFFFFF', padding: '16px' }}>
      {/* Title and Main Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${back})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: ['cover', 'contain'],
          backgroundPosition: 'center',
          height: ['calc(100vh - 60px)', 'calc(80vh + 60px)'],
          marginTop: '60px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <Box
          component="img"
          src={titulo}
          alt="Titulo"
          sx={{
            position: 'absolute',
            top: ['5%', '-2.3%'],
            left: '50%',
            transform: 'translateX(-50%)',
            width: ['70%', '80%', '100%'],
            height: 'auto',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box
            component="img"
            src={frase}
            alt="Slogan"
            sx={{ width: ['90%', '70%', '50%'], height: 'auto', marginTop: '16px' }}
          />
        </Box>
      </Box>

      {/* Connect Section */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          padding: '16px'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: '#000',
            fontFamily: 'Poppins, sans-serif',
            fontSize: { xs: '24px', sm: '30px', md: '40px' }, // Tamaño ajustado para distintas pantallas
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            marginBottom: '16px',
            textAlign: 'left'
          }}
        >
          Conecta con lo ultimo
        </Typography>
        <Grid container spacing={0}>
          {/* Imágenes de tiendas */}
          {[
            { img: baner1, title: baner11 },
            { img: baner2, title: baner22 },
            { img: baner3, title: baner33 },
            { img: baner4, title: baner44 },
            { img: baner5, title: baner55 },
            { img: baner6, title: baner66 },
            { img: baner7, title: baner77 },
            { img: baner8, title: baner88 },
          ].map((banner, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box sx={{ position: 'relative', paddingBottom: '75%', height: 0 }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0, right: 0,
                    backgroundImage: `url(${banner.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={banner.title}
                      alt="Nombre Tienda"
                      style={{
                        width: (index === 1 || index === 6) ? '150%' : '100%',
                        height: 'auto',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Recommend Section */}
      <Box sx={{ backgroundColor: '#FFFFFF', padding: '32px 0' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#000',
            fontFamily: 'Poppins, sans-serif',
            fontSize: { xs: '24px', sm: '30px', md: '40px' }, // Tamaño ajustado para distintas pantallas
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: 'normal',
            marginBottom: '16px',
            textAlign: 'left'
          }}
        >
          Tus recomendados
        </Typography>
        <Swiper
          spaceBetween={10}
          slidesPerView={1} // Cambiado a 1 por defecto, para dispositivos muy pequeños
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 2, // Cambiado a 2 imágenes para dispositivos móviles
              spaceBetween: 8,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1600: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
        >
          {recommendedImages.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '300px' }}>
                <img
                  src={imageUrl}
                  alt={`Recommended ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Box sx={{ position: 'absolute', bottom: '10px', left: '10px', color: '#fff', fontWeight: 'bold' }}>
                  {["Zapatos", "Vestido de baño", "Aretas", "Camiseta", "Zapatos", "Vestido de baño"][index]}
                </Box>
                <Box sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <Button 
                    variant="contained"
                    sx={{
                      backgroundColor: '#333',
                      color: '#fff',
                      fontFamily: 'Poppins',
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontSize: '14px',
                      padding: '8px 16px',
                      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Ver más
                  </Button>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box sx={{ backgroundColor: '#FFFFFF', padding: '32px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#000',
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            textAlign: 'center'
          }}
        >
          ¿Quieres estar al tanto de los mejores productos colombianos?
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#000',
            fontFamily: 'Poppins, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            textAlign: 'center',
            marginTop: '16px'
          }}
        >
          Suscríbete a la comunidad de Markt y no te pierdas ninguna de nuestras sorpresas
        </Typography>

        <Box sx={{ marginTop: '32px', display: 'flex', justifyContent: 'center', width: '80%', maxWidth: '600px' }}>
          <TextField
            label="Ingresa tu correo electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            sx={{
              marginRight: '16px',
            }}
            InputProps={{
              style: {
                borderRadius: '13px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Poppins',
                fontSize: '18px',
              }
            }}
            InputLabelProps={{
              style: {
                fontFamily: 'Poppins',
                fontSize: '18px',
              }
            }}
          />
          <Button
            onClick={handleSubscription}
            variant="contained"
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              fontFamily: 'Poppins',
              borderRadius: '10px',
              textTransform: 'none',
              padding: '10px 20px',
              fontSize: '18px',
              flexGrow: 1,
            }}
          >
            Suscribete!
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;



