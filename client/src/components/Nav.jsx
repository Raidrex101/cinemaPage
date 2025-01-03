import { useAuthContext } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const { autenticated, userPayload } = useAuthContext();
  console.log('la payload', userPayload);
  console.log('estoy autenticado?', autenticated);
  
  
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand fixed-top py-3 navbg">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="#">
          Cinema Page
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link text-white fw-bold mx-3">Home</a>
            </li>
            {autenticated ? (
              <>
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold" href="#">
                    My tickets
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold" href="#">
                    Food
                  </a>
                </li>
                
              </>
            ) : (
              <>
              <li className="nav-item">
                  <Link
                    to={"/food"}
                    className="nav-link text-white fw-bold"
                    href="#"
                  >
                    Food
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold mx-3" href="#">
                    Promo
                  </a>
                </li>
              </>
            )}
          </ul>
            <button
              className="btn btn-primary rounded-3 mx-3"
              type="submit"
              onClick={() => navigate("/login")}
            >
              <i className="bi bi-person"> </i>
            </button>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
