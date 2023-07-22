import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { removeFromWishlist, markAsPurchased } from '../../redux/wishlistSlice';
import ShareIcon from '@mui/icons-material/Share';
import ShareModal from '../ShareModal/ShareModal';

const WishlistContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  fontFamily: 'Poppins, sans-serif',
});


const WishlistItem = styled(Box)(({ isPurchased }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '20px',
  margin: '20px 0',
  padding: '20px',
  width: '90%',
  maxWidth: '800px',
  borderRadius: '10px',
  backgroundColor: '#f8f8f8',
  boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
  border: isPurchased ? '2.5px solid green' : '2.5px solid black', 
  textDecoration: isPurchased ? 'line-through' : 'none',
  color: isPurchased ? '#aaa' : '#000',
  '&:hover': { 
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)', 
    transform: 'scale(1.02)', 
    transition: 'all 0.3s ease-in-out' 
  },
}));

const WishlistItemImage = styled('img')({
  width: '30%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '10px',
});

const WishlistItemDetails = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '70%',
});

function WishlistPage() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  

  const handleRemoveFromWishlist = (productid) => {
    dispatch(removeFromWishlist({ productid }));
  };

  const handleMarkAsPurchased = (productid) => {
    dispatch(markAsPurchased({ productid }));
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <WishlistContainer>
      {wishlist.length > 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h4" sx={{ margin: '20px 0', fontFamily: 'Poppins' }}>
            Mi lista de deseos
          </Typography>
          <Box sx={{ color: 'grey.800', fontSize: '2rem', cursor: 'pointer' }}>
            <ShareIcon onClick={handleOpenModal} />
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" sx={{ margin: '20px 0', fontFamily: 'Poppins' }}>
            Ups! Todavía no tienes productos agregados a la Wishlist.
          </Typography>
          <Typography variant="h6" sx={{ margin: '10px 0', fontFamily: 'Poppins' }}>
            Paso 1: Explora tus categorías y tus tiendas favoritas.
          </Typography>
          <Typography variant="h6" sx={{ margin: '10px 0', fontFamily: 'Poppins' }}>
            Paso 2: Agrega los productos que más te gusten a la Wishlist para que nunca te olvides de ellos.
          </Typography>
          <Typography variant="h6" sx={{ margin: '10px 0', fontFamily: 'Poppins' }}>
            Paso 3: ¡Comparte tu Wishlist con tus amigos para que sepan qué regalarte!
          </Typography>
          <Button
            onClick={() => console.log('Aquí agregar lógica para ver productos recomendados')}
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#333',
              color: '#fff',
              fontFamily: 'Poppins',
              borderRadius: '10px',
              textTransform: 'none',
              padding: '10px 0',
              fontSize: '18px',
              marginTop: '10px',
            }}
          >
            Explora los Recomendados!!
          </Button>
        </Box>
      )}

      <ShareModal open={open} handleClose={handleCloseModal} />
      {wishlist.map((product, index) => (
        <WishlistItem key={index} isPurchased={product.isPurchased}>
          <WishlistItemImage src={product.image} alt={product.name} />
          <WishlistItemDetails>
            <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '600' }}>
              {product.name}
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>{product.store}</Typography>
            {product.size && <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>Talla: {product.size}</Typography>}
            <Typography variant="h6" sx={{ fontFamily: 'Poppins', color: '#333' }}>
              Precio: ${(product.price).toLocaleString()} COP
            </Typography>
            {!product.isPurchased && (
              <Button
                onClick={() => handleMarkAsPurchased(product.productid)}
                variant="text"
                sx={{
                  textAlign: 'center',
                  color: '#555',
                  fontFamily: 'Poppins',
                  marginTop: '20px',
                  fontWeight: 'bold',
                }}
                onMouseEnter={(event) => (event.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={(event) => (event.currentTarget.style.textDecoration = 'none')}
              >
                Marcar como comprado
              </Button>
            )}
            <Button
              onClick={() => handleRemoveFromWishlist(product.productid)}
              variant="text"
              sx={{
                textAlign: 'center',
                color: '#555',
                fontFamily: 'Poppins',
                marginTop: '20px',
                fontWeight: 'bold',
              }}
              onMouseEnter={(event) => (event.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(event) => (event.currentTarget.style.textDecoration = 'none')}
            >
              Eliminar de la lista
            </Button>
          </WishlistItemDetails>
        </WishlistItem>
      ))}
    </WishlistContainer>
  );
}

export default WishlistPage;