import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import { userLogin, userRegister } from "../services/authService";
import LoginFomr from "../components/LoginFomr";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [buttonName, setButtonName] = useState(null);
  const { login, autenticated } = useAuthContext();
  

  useEffect(() => {
    if (autenticated) {
      navigate('/')
    }
    
  }, [autenticated, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginOnSubmit = async (data) => {
    try {
      const response = await userLogin(data);
      if (response.status === 200) {
        login(response.data.token);
        navigate('/');
        
      }
    } catch (error) {
      console.log('An error ocurred', error);
    }
  };

  const registerOnSubmit = async (data) => {
    try {
      const response = await userRegister(data);
      if (response.status === 201){
        setButtonName("login")
      }
    } catch (error) {
      console.error('An error ocurred', error);
    }
  }

  return (
    <>
      {buttonName === null && (
        <div className="container-fluid d-flex ">
          <div className="d-flex m-5">
            <div className="text-center logincard shadow-lg">
              <h1 className="mb-5 mt-5">Cinema Page</h1>
              <h1 className="mb-5 mt-5">Welcome</h1>
              <h1 className="text-secondary">Want to login or register?</h1>
            </div>
          </div>

          <div className="d-flex flex-column p-5 ml-5 mb-5 justify-content-center align-items-center text-center ">
            <div>
              <h1>If you already have an account</h1>
            </div>
            <button
              className="btn btn-primary fw-bold p-3 rounded-4 m-3"
              onClick={() => setButtonName("login")}
            >
              Login to your account
            </button>
            <h3 className="text-secondary mt-3"> Don&#39;t have an account?</h3>
            <button
              className="btn btn-outline-secondary fw-bold p-3 rounded-4 m-3"
              onClick={() => setButtonName("register")}
            >
              Register
            </button>
          </div>
        </div>
      )}

      {buttonName === "login" && (
       <LoginFomr
        loginOnSubmit={loginOnSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
        setButtonName={setButtonName}
         />
      )}

      {buttonName === "register" && (
        <RegisterForm
          registerOnSubmit={registerOnSubmit}
          handleSubmit={handleSubmit}
          register={register}
          errors={errors} 
          setButtonName={setButtonName}
        />
      )}
    </>
  );
};
export default Login;
