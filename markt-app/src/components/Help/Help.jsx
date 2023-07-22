import React, { useState } from 'react';
import './Help.css';
import { FaQuestionCircle, FaShoppingCart, FaPhone, FaUserCircle } from 'react-icons/fa';

function Help() {
  const [activeSection, setActiveSection] = useState('faq');

  return (
    <div className="help-center-help-container">
    <h2>Centro de Ayuda</h2>
    <div className="help-center-menu">
    <button className={`help-center-menu-button ${activeSection === 'faq' ? 'active' : ''}`} onClick={() => setActiveSection('faq')}><FaQuestionCircle /><span className="button-text"> FAQs</span></button>
    <button className={`help-center-menu-button ${activeSection === 'booking' ? 'active' : ''}`} onClick={() => setActiveSection('booking')}><FaShoppingCart /><span className="button-text"> Problemas con mi pedido</span></button>
    <button className={`help-center-menu-button ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => setActiveSection('contact')}><FaPhone /><span className="button-text"> Contacto Servicio al Cliente</span></button>
    <button className={`help-center-menu-button ${activeSection === 'account' ? 'active' : ''}`} onClick={() => setActiveSection('account')}><FaUserCircle /><span className="button-text"> Ayuda con la cuenta</span></button>
    </div>
       <div className="help-center-content">
        {activeSection === 'faq' && (
          <div className="help-center-faq-section">
            <h3>Preguntas Frecuentes</h3>
            <div className="help-center-faq-item">
              <h4> ¿Cómo puedo empezar a vender en tu marketplace de emprendimientos pequeños?</h4>
              <p>Regístrate como vendedor y carga tus productos.</p>
            </div>
            <div className="help-center-faq-item">
              <h4>¿Qué tipo de productos puedo vender en tu marketplace?</h4>
              <p>Puedes vender productos hechos a mano, alimentos, arte, belleza, entre otros.</p>
            </div>
            {/* More FAQ items... */}
          </div>
        )}
        {activeSection === 'contact' && (
          <div className="help-center-contact-section">
            <h3>Contacta con servicio al cliente</h3>
            <p>Si necesitas ayuda adicional o tienes alguna queja comunicate con el correo markt@info.com o comunicate con la linea telefonica +57-318-517-5920</p>
          </div>
        )}
        {activeSection === 'booking' && (
          <div className="help-center-booking-section">
            <h3>Revisa tu pedido</h3>
            <p>Ingresa tu numero de orden para revisar el estado de tu pedido.</p>
            <input type="text" placeholder="Numero de Orden" className='input-help'/>
            <button className="help-center-booking-button">Check Booking</button>
            {/* This should trigger a booking lookup */}
          </div>
        )}
        {activeSection === 'account' && (
          <div className="help-center-account-help">
            <h3>Ayuda con la cuenta</h3>
            <p>Encuentra ayuda sobre problemas con tu cuenta, cambios de contraseña, cambios de correo electronico y politicas de tratamiento de datos y terminos y condiciones</p>
            {/* Add more FAQ items related to account */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Help;

