 import { useState} from "react";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import { userLogin, userRegister } from "../services/authService";
import LoginFomr from "../components/LoginFomr";
import RegisterForm from "../components/RegisterForm";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [buttonName, setButtonName] = useState(null);
  const { login } = useAuthContext();

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
        navigate("/");
      }
    } catch (error) {
      console.log("An error ocurred", error);
    }
  };

  const registerOnSubmit = async (data) => {
    try {
      const response = await userRegister(data);
      
      if (response.status === 201) {
        setButtonName("login");
      }
    } catch (error) {
      console.error("An error ocurred", error);
    }
  };

  return (
    <>
      {buttonName === null && (
        <div className="container d-flex">
          <div className=" m-5">
            <div className="text-center logincard">
              <h1 className="mb-5">Cinema Page</h1>
              <h1 className="mb-5 mt-5">Welcome</h1>
              <h1 className="text-secondary">Want to login or register?</h1>
            </div>
          </div>

          <div className="d-flex flex-column text-center loginbtn">
            <div className="text-center">
              <h1>Have an account?</h1>
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
