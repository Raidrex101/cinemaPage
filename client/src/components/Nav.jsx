import { useAuthContext } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const { autenticated, userPayload, logout } = useAuthContext();
  const userId = userPayload?._id
  
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
                  <Link
                  to={`/my-tickets/${userId}`}
                  className="nav-link text-white fw-bold" href="#">
                    My tickets
                  </Link>
                </li>
                {userPayload.role === "ADMIN" && (
                <li className="nav-item">
                  <Link to="/management" className="nav-link text-white fw-bold">
                    Management
                  </Link>
                </li>
                )}
                
              </>
            ) : (
              <>
              
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
