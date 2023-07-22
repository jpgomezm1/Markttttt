import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLikedStore, removeLikedStore } from '../../redux/likedStoresSlice';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function StoreCard({ store }) {
  const dispatch = useDispatch();
  const likedStores = useSelector(state => state.likedStores);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likedStores.some(likedStore => likedStore.id === store.id));
  }, [likedStores, store.id]);

  const handleLikeClick = () => {
    if (!isLiked) {
      dispatch(addLikedStore(store));
    } else {
      dispatch(removeLikedStore(store));
    }
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Card sx={{ position: 'relative', marginBottom: '20px', cursor: 'pointer' }}>
        <Box
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            zIndex: 1
          }}
          onClick={handleLikeClick}
        >
          {isLiked ? <FaHeart size={30} /> : <FaRegHeart size={30} />}
        </Box>
        <Box component="img" src={store.cardImage} alt="Card Background" sx={{ width: '100%', height: 'auto' }} />
        <Box component="img" src={store.cardTitle} alt="Card Title" sx={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: ['40%', '50%', '60%'], height: 'auto' }} />
        <CardContent sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="outlined" color="primary" component={Link} to={`/stores/${store.id}`} sx={{ textTransform: 'none', borderRadius: '20px' }}>
            Explora {store.name}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default StoreCard;