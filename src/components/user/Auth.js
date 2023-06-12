import React, { useState } from 'react';
import "../../styles/Auth.css";
import { Spinner, Alert,Modal,Button,Form } from "react-bootstrap";
import { registerUser, loginUser, requestPasswordReset,sendDiscountEmail } from '../../api'; // Import the submitDailyReport function
import { useNavigate } from 'react-router-dom';




// const Auth = (props) => {
const Auth = ({ updateAuth,props}) => {

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  //  const to alert
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  // const modal alert
  const [showModal, setShowModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");

  // const to reset password
  const [isReset, setIsReset] = useState(false);

  // const para redirigir a una url 
  const navigate = useNavigate();


  const showAlert = (message, type = "info") => {
    setAlertMessage(message);
    setAlertType(type); // Set the alert type
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
    }, 3000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  
  };
  const handleShowModal = (messageModal) => {
      setLoading(false);
      setMessageModal(messageModal);
      props.updateAuth(true);
      setShowModal(true);
  };

  const toggleAuthMode = () => {
    if (isReset) {
      setIsReset(false);
    } else {
      setIsLogin(!isLogin);
    }
  };


 

  const handleResetRequest = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = event.target.email.value;
    try {
      const data = await requestPasswordReset(email);
      setLoading(false);
      showAlert(data.message, "success");
    } catch (error) {
      console.error('Failed to request password reset:', error);
      showAlert("An error occurred, please try again", "danger");
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try{
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem("username", data.username);


      if (data.error) {
        setLoading(false);
        console.log("error in data register user")
        showAlert("Error in create user", "danger");

      } else {
        // Guarda el token en el almacenamiento local
        // localStorage.setItem('token', data.token);
        setLoading(false);
        updateAuth(true); // Update the authentication status
        navigate('/');

        
      }
        
    }catch (error) {
      console.error('Failed to login:', error);
      // Si hay un error en el inicio de sesión, muestra el mensaje de error
      if (error.message) {
        showAlert(error.message, "danger");
        setLoading(false);
      } else {
        showAlert('Unknown bug. Please try again.', "danger");
        setLoading(false);
      }
    }
  }
  const handleLogin1 = async (email, password) => {
   
    try {
      const data = await loginUser(email, password);
      // Aquí puedes manejar la respuesta de la API después del inicio de sesión
      // Guarda el token en el almacenamiento local
      localStorage.setItem('token', data.token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userType", data.userType);
      console.log(data, "data")
      // Verifica si el usuario está dentro de los 30 días de acceso gratuito
      const withinFreeTrial = () => {
        const createdDate = new Date(data.created_at);
        console.log(createdDate)
        const today = new Date();
        const daysSinceCreation = Math.ceil((today - createdDate) / (1000 * 60 * 60 * 24));
        console.log(daysSinceCreation, "dias desde su creacion")
        if( 0 <=(30-daysSinceCreation) &&(30-daysSinceCreation) <= 5){
          handleShowModal(`Your free trial will expire in ${30-daysSinceCreation} days. Get a 45% discount on the subscription for your first time`, "info");
        }
        if ((30-daysSinceCreation) == -1){
        }
        return 30-daysSinceCreation;
      };
 
      if (data.subscription === true){
        console.log("days data.subscription",data)

        if (data.subscription_end_date) {
          const today = new Date();
          const subscriptionEndDate = new Date(data.subscription_end_date);
          const days = Math.ceil((subscriptionEndDate - today) / (1000 * 60 * 60 * 24));
          if (days > 5){
            localStorage.setItem("fullAccess", true);
            setLoading(false);
            props.updateAuth(true,data.userType,true);
            navigate('/');
          }
          // Lanza una alerta cuando la suscripción esté próxima a vencerse o haya expirado
          switch (true) {
            case 0 < days && days <= 5:
              localStorage.setItem("fullAccess", true);
              handleShowModal(`Your subscription will expire in ${days} days.`, "info");
              break;
            case days <= 0:
              localStorage.setItem("fullAccess", false);
              handleShowModal(`Your subscription expired. Please subscribe to gain full access.`, "warning");
              break;
            default:
              break;
          }
        }
        
      }else{
        const daysSinceCreation= withinFreeTrial();
        if (daysSinceCreation > 5){
          localStorage.setItem("fullAccess", true);
          setLoading(false);
          props.updateAuth(true,data.userType,true);
          navigate('/');
        }
        // else{
        //   localStorage.setItem("fullAccess", false);
        //   handleShowModal("You don't have full access to the website. Please subscribe to gain full access.", "warning");
          
        // }

        switch (true) {
          case 0 < daysSinceCreation && daysSinceCreation <= 5:
            localStorage.setItem("fullAccess", true);
            handleShowModal(`Your free trial will expire in ${daysSinceCreation} days. Get a 45% discount on the subscription for your first time`);
            break;
          case daysSinceCreation == 0:
              localStorage.setItem("fullAccess", true);
              handleShowModal(`Your free trial will expire today. Get a 45% discount on the subscription for your first time`);
              break;
          case daysSinceCreation == -1:
              localStorage.setItem("fullAccess", false);
              handleShowModal(`Your free trial expired. Get a 80% discount on the subscription for the next 72 hours`, "info");
              await sendDiscountEmail(data.token)
              
              break;
          case daysSinceCreation <-1:
            localStorage.setItem("fullAccess", false);
            handleShowModal(`Your free trial expired. Please subscribe to gain full access.`);
            break;
          default:
            break;
        }
      }

    } catch (error) {
      console.error('Failed to login:', error);
      // Si hay un error en el inicio de sesión, muestra el mensaje de error
      if (error.message) {
        showAlert(error.message, "danger");
        setLoading(false);
      } else {
        showAlert('Unknown bug. Please try again.', "danger");
        setLoading(false);
      }
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (isLogin) {

      handleLogin(email, password);

    } else {
      const username = event.target.username.value;
      const phone = event.target.phone.value;
      // const checkbox = event.target.userType;
      // const userType = checkbox.checked ? checkbox.value : "usergeneral";
      // console.log("el usertype es: ",userType)
 
      try {
        // const data = await registerUser(username, email, password, phone,userType);
        const data = await registerUser(username, email, password, phone);

        setLoading(false);
        // Aquí puedes manejar la respuesta de la API después del registro
        if (data.error) {
          setLoading(false);
          console.log("error in data register user")
          showAlert("Error in create user", "danger");

        } else {
          // Guarda el token en el almacenamiento local
          // localStorage.setItem('token', data.token);
          setLoading(false);
          showAlert('Sign up successful, please log in');
          
        }
        event.target.reset();
      } catch (error) {
        console.error('Failed to register:', error);
        setLoading(false);
        showAlert(error.message, "danger");

      }
    }
  };

  return (
    <div className="auth-container">
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Hi</Modal.Title>
        </Modal.Header>
        <Modal.Body>{messageModal}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Suscribe
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="auth-card">
      
        {/* <h2>{isLogin ? 'Log in' : 'Sign up'}</h2> */}
        <h2>{isReset ? 'Reset Password' : (isLogin ? 'Log in' : 'Sign up')}</h2>
        <hr></hr>
        {alertVisible && (
          <Alert variant={alertType} onClose={() => setAlertVisible(false)} dismissible>
            {alertMessage}
          </Alert>
        )}
        {/* <form className="auth-form" onSubmit={handleSubmit}> */}
        <form className="auth-form" onSubmit={isReset ? handleResetRequest : handleSubmit} >
          {/* {!isLogin && ( */}
          {!isReset && !isLogin && (
            <>  <input
              type="text"
              name="username"
              placeholder="Username"
              required />
              <input
                type="text"
                name="phone"
                placeholder="phone"
                required />
                
            </>
          )}
      

          {isReset ? (
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          ) : (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </>
          )}
          {/* {!isReset && !isLogin && (
              <div className="checkbox-container">
              <input
                type="checkbox"
                id="userType"
                name="userType"
                value="childcareWorker"
                className="big-checkbox"
              />
              <label htmlFor="userType" className="checkbox-label">Are you a Childcare Worker?</label>
            </div>
          )} */}
          <button className="button-shared  auth-submit" type="submit">
            {isReset ? 'Request Reset' : (isLogin ? 'Log in' : 'Sign up')}
            {loading && (
              <Spinner
                animation="border"
                size="sm"
                style={{ marginLeft: '8px' }}
              />
            )}
          </button>
    

        </form>
              

           <button className="button-shared  auth-toggle " onClick={toggleAuthMode}>
        {isReset
          ? 'Back to Login'
          : (isLogin
              ? 'You do not have an account? Sign up'
              : 'Do you already have an account? Log in')}
      </button>

      {!isReset && (
        <button
          className="button-shared  auth-toggle "
          onClick={() => setIsReset(true)}
        >
          Forgot Password?
        </button>
      )}
      <br></br>
     

      </div>
    </div>
  );
};


export default Auth;



