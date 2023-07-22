import { Dialog, DialogContent, IconButton, Typography, Box } from '@mui/material';
import { FaInstagram, FaWhatsapp, FaTwitter, FaFacebook } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';

function ShareModal({ open, handleClose }) {
  const shareUrl = 'http://localhost:3000/wish'; // Aquí va la URL de tu lista de deseos

  const shareOnSocialMedia = (network) => {
    let url = '';
    let shareText = '';

    switch (network) {
      case 'facebook':
        shareText = 'Estoy emocionado por mis próximas compras. ¡Mira mi lista de deseos en este sitio!';
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        shareText = 'No puedo esperar a comprar estos productos. ¡Mira mi lista de deseos!';
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'whatsapp':
        shareText = 'Estoy por hacer unas compras increíbles. ¡Mira lo que está en mi lista de deseos!';
        url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`;
        break;
      case 'instagram':
        alert('Instagram no permite compartir links directamente. Por favor, copia el enlace y pégalo en tu post.');
        return;
    }

    window.open(url, '_blank');
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" align="center" sx={{ mb: 2, fontFamily: 'Poppins' }}>
        ¡Comparte tu Wishlist!
      </Typography>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 3, fontFamily: 'Poppins', textAlign: 'center' }}>
          ¡Haz que tus amigos sientan envidia de tus próximas compras! Comparte tu lista de deseos en tus redes sociales
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <IconButton color="primary" aria-label="Compartir en Instagram" 
            sx={{ "&:hover": { transform: 'scale(1.2)' }, color: '#E1306C' }}
            onClick={() => shareOnSocialMedia('instagram')}
          >
            <FaInstagram size={30} />
          </IconButton>
          <IconButton color="primary" aria-label="Compartir en Whatsapp" 
            sx={{ "&:hover": { transform: 'scale(1.2)' }, color: '#25D366' }}
            onClick={() => shareOnSocialMedia('whatsapp')}
          >
            <FaWhatsapp size={30} />
          </IconButton>
          <IconButton color="primary" aria-label="Compartir en Twitter" 
            sx={{ "&:hover": { transform: 'scale(1.2)' }, color: '#1DA1F2' }}
            onClick={() => shareOnSocialMedia('twitter')}
          >
            <FaTwitter size={30} />
          </IconButton>
          <IconButton color="primary" aria-label="Compartir en Facebook" 
            sx={{ "&:hover": { transform: 'scale(1.2)' }, color: '#1877F2' }}
            onClick={() => shareOnSocialMedia('facebook')}
          >
            <FaFacebook size={30} />
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ShareModal;



