const LoginFomr = ({
  register,
  handleSubmit,
  errors,
  loginOnSubmit,
  setButtonName,
}) => {
  return (
    <div className="d-flex position-relative">
      {/* Botón Return */}
      <div className=" position-absolute top-0 end-0 m-3 p-3">
        <button
          onClick={() => setButtonName(null)}
          type="button"
          className="btn btn-outline-primary"
        >
          <i className="bi bi-arrow-left"></i>
          Return
        </button>
      </div>

      <div className="container d-flex">
        <div className=" m-5">
          <div className="text-center logincard">
            <h1 className="mb-5 pt-3">Cinema Page</h1>
            <h1 className="mb-5 mt-5">Welcome</h1>
            <h1 className="text-secondary">Please login</h1>
          </div>
          
        </div>

        <div className="d-flex text-center loginbtn">
          <form
            onSubmit={handleSubmit(loginOnSubmit)}
          >
            <div className="d-flex flex-column">
              <div>
                <h1>Please enter your email and password</h1>
              </div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="d-flex flex-column align-items-center">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  autoComplete="off"
                  className="form-control mb-3 w-50 p-2"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-danger">Email is required</p>
                )}
                <label htmlFor="password" className="form-label">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control mb-3 w-50 p-2"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-danger">Password is required</p>
                )}

                <button
                  className="btn btn-outline-secondary fw-bold p-3 rounded-4 m-3"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginFomr;
