import React, { useState } from 'react';

const ContactsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message || !agree) {
      setFormError('Заполните все поля и согласитесь на обработку данных');
      return;
    }
    setFormError('');
    // Имитация отправки
    setTimeout(() => {
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');
      setAgree(false);
    }, 500);
  };

  const isFormValid = name.trim() && email.trim() && message.trim() && agree;

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center my-4">Контакты</h2>
          <p className="text-center">
            Свяжитесь с нами любым удобным способом или оставьте сообщение через форму ниже.
          </p>

          <div className="row mt-4">
            <div className="col-md-4">
              <h5>Телефон</h5>
              <p><a href="tel:+74957903503">+7 (495) 79 03 5 03</a></p>
            </div>
            <div className="col-md-4">
              <h5>Email</h5>
              <p><a href="mailto:office@bosanoga.ru">office@bosanoga.ru</a></p>
            </div>
            <div className="col-md-4">
              <h5>Адрес</h5>
              <p>г. Москва, ул. Тверская, д. 1</p>
            </div>
          </div>

          <div className="order-form-wrapper">
            <h3 className="text-center mb-3">Написать нам</h3>
            {success ? (
              <div className="alert alert-success">Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Ваше имя</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Сообщение</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="4"
                    placeholder="Введите ваше сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agree"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="agree">
                    Согласен на обработку персональных данных
                  </label>
                </div>
                {formError && <div className="alert alert-danger">{formError}</div>}
                <button
                  type="submit"
                  className={`btn btn-order ${isFormValid ? 'btn-order-active' : 'btn-order-disabled'}`}
                  disabled={!isFormValid}
                >
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;