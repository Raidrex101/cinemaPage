import { useAuthContext } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const { autenticated, userPayload, logout } = useAuthContext();
  console.log('la payload', userPayload);
  console.log('estoy autenticado?', autenticated);
  
  
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand fixed-top py-3 navbg">
      <div className="container-fluid">
        <Link
        to="/"
        className="navbar-brand text-white">
          Cinema Page
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/"
              className="nav-link text-white fw-bold mx-2">
                Home
                </Link>
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
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold" href="#">
                    Promo
                  </a>
                </li>
                {userPayload.role === "ADMIN" && (
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold" href="/management">
                    Management
                  </a>
                </li>
                )}
                
              </>
            ) : (
              <>
              <li className="nav-item">
                  <Link
                    to={"/food"}
                    className="nav-link text-white fw-bold"
                    
                  >
                    Food
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold mx-3">
                    Promo
                  </a>
                </li>
              </>
            )}
          </ul>
            <button
              className="btn btn-primary rounded-3 mx-3"
              type="submit"
              data-testid='login'
              onClick={!autenticated ?() => navigate("/login") : () => logout()}
            >
              <i className="bi bi-person"> </i>
            </button>
        </div>
      </div>
    </nav>
  );
};
export default Nav;
