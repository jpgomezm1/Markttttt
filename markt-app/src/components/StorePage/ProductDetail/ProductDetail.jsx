import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './ProductDetail.css';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


import { addToCart } from '../../../redux/cartSlice';
import { addToWishlist } from '../../../redux/wishlistSlice';

function ProductDetail({ product, onClose, category, store }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('M');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productid: product.productid,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity, 10),
        size: category === 'ropa' ? size : undefined,
        image: product.image,
        store: store.name,
      })
    );
    onClose();
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        productid: product.productid,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity, 10),
        size: category === 'ropa' ? size : undefined,
        image: product.image,
        store: store.name,
        category: category,
      })
    );
    onClose();
  };

  const allImages = [product.image, ...product.imageSlide];

  return (
    <motion.div className="product-detail-container">
      <motion.div className="product-detail-background" onClick={onClose} />
      <motion.div className="product-detail-card">
        <motion.button className="product-detail-close-button" onClick={onClose}>
          <FaTimes />
        </motion.button>

        <motion.div className="product-detail-content">
          <motion.div className="product-detail-images">
            <motion.div className="carousel">
              <motion.div className="main-image">
                <FaArrowLeft
                  onClick={() =>
                    setActiveImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length)
                  }
                />
                <motion.img src={allImages[activeImageIndex]} alt={product.name} className="product-detail-image" />
                <FaArrowRight
                  onClick={() => setActiveImageIndex((prevIndex) => (prevIndex + 1) % allImages.length)}
                />
              </motion.div>

              <motion.div className="thumbnail-container">
                {allImages.map((img, index) => (
                  <motion.img
                    key={index}
                    src={img}
                    alt={`thumbnail-${index}`}
                    className={`thumbnail ${activeImageIndex === index ? 'active-thumbnail' : ''}`}
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="product-detail-info">
            <Typography
              variant="body1"
              sx={{
                color: '#686868',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
                fontSize: '18px',
              }}
            >
              {store.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#000',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '500',
                lineHeight: 'normal',
                fontSize: '22px',
              }}
            >
              {product.name}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#686868',
                fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
                fontSize: '18px',
              }}
            >
              ${product.price.toLocaleString()} COP
            </Typography>
            {category === 'ropa' && (
              <>
                <motion.label className="product-detail-label">Selecciona la talla:</motion.label>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {['XS', 'S', 'M', 'L', 'XL'].map((value) => (
                    <Button
                      key={value}
                      variant="contained"
                      onClick={() => setSize(value)}
                      sx={{
                        backgroundColor: size === value ? '#333' : '#fff',
                        color: size === value ? '#fff' : '#333',
                        fontFamily: 'Poppins',
                        borderRadius: '25px',
                        textTransform: 'none',
                        padding: '5px 10px',
                        fontSize: '14px',
                        border: size === value ? 'none' : '1px solid #000',
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </Box>
              </>
            )}

            <motion.label className="product-detail-label">Cantidad:</motion.label>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton
                size="small"
                onClick={() => setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))} // no permitimos menos de 1
                sx={{
                  border: '1px solid #000',
                  padding: '5px',
                }}
              >
                <RemoveIcon fontSize="inherit" />
              </IconButton>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: 'Poppins',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                  color: '#333',
                }}
              >
                {quantity}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 10))} // limitamos la cantidad a 10
                sx={{
                  border: '1px solid #000',
                  padding: '5px',
                }}
              >
                <AddIcon fontSize="inherit" />
              </IconButton>
            </Box>

            <motion.p className="product-detail-total">
              Total: ${(product.price * quantity).toLocaleString()} COP
            </motion.p>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button
                onClick={handleAddToCart}
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
                Añadir a la bolsa
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="contained"
                sx={{
                  backgroundColor: '#fff',
                  color: '#333',
                  fontFamily: 'Poppins',
                  borderRadius: '10px',
                  textTransform: 'none',
                  padding: '10px 20px',
                  fontSize: '18px',
                  border: '1px solid #000',
                  flexGrow: 1,
                }}
              >
                Añadir a Favoritos
              </Button>
            </Box>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ProductDetail;
