import React from 'react';
import { useSelector } from 'react-redux';
import StoreCard from '../StoreCard/StoreCard';
import { motion } from 'framer-motion';
import './LikedStores.css';
import marktLogo from '../../assets/markt2.png'; // Importando el logo de manera relativa

function LikedStores() {
  const likedStores = useSelector(state => state.likedStores);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
  };

  return (
    <div className="liked-stores-page">
      <motion.h1
        variants={titleVariants}
        initial="hidden"
        animate="visible"
      >
        Mis tiendas favoritas
      </motion.h1>
      {likedStores.length > 0 ? (
        likedStores.map(store => <StoreCard key={store.id} store={store} />)
      ) : (
        <div className="empty-state">
          <div className="empty-message">
            Explora las diferentes categorías de emprendimientos y dale like a tus tiendas favoritas para que nunca se te pierdan.
          </div>
          <img src={marktLogo} alt="Markt Logo" className="markt-logo" />
        </div>
      )}
    </div>
  );
}

export default LikedStores;
