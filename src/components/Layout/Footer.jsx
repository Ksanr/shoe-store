import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Блок 1: Информация */}
          <div className="col-md-4">
            <div className="footer-block">
              <h5 className="footer-title">Информация</h5>
              <ul className="footer-list">
                <li><Link to="/about.html">О магазине</Link></li>
                <li><Link to="/catalog.html">Каталог</Link></li>
                <li><Link to="/contacts.html">Контакты</Link></li>
              </ul>
            </div>
          </div>

          {/* Блок 2: Принимаем к оплате + копирайт */}
          <div className="col-md-4">
            <div className="footer-block">
              <h5 className="footer-title">Принимаем к оплате:</h5>
              <div className="footer-pay">
                <div className="footer-pay-systems footer-pay-systems-paypal"></div>
                <div className="footer-pay-systems footer-pay-systems-master-card"></div>
                <div className="footer-pay-systems footer-pay-systems-visa"></div>
                <div className="footer-pay-systems footer-pay-systems-yandex"></div>
                <div className="footer-pay-systems footer-pay-systems-webmoney"></div>
                <div className="footer-pay-systems footer-pay-systems-qiwi"></div>
              </div>
              <div className="footer-copyright">
                <p>2009-2019 © BosaNoga.ru — модный интернет-магазин обуви и аксессуаров. Все права защищены.</p>
                <p>Доставка по всей России!</p>
              </div>
            </div>
          </div>

          {/* Блок 3: Контакты */}
          <div className="col-md-4 text-end">
            <div className="footer-block footer-contacts">
              <h5 className="footer-title">Контакты</h5>
              <div className="footer-contacts-phone">+7 459 79 03 5 03</div>
              <div className="footer-contacts-working-hours">Ежедневно: с 09-00 до 21-00</div>
              <div className="footer-contacts-email">office@bosanofa.ru</div>
              <div className="footer-social-links d-flex justify-content-end">
                <div className="footer-social-link footer-social-link-twitter"></div>
                <div className="footer-social-link footer-social-link-vk"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;