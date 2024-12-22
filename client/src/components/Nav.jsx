import { useAuthContext } from "../hooks/useAuth";
import { Link } from 'react-router-dom'

const Nav = () => {
  const { autenticated } = useAuthContext();
  return (
    <nav className="navbar navbar-expand-lg fixed-top py-3 navbg">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="#">
      Cinema Page
    </a>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <a className="nav-link text-white fw-bold mx-3">
            Home
          </a>
        </li>
        {autenticated ? (
        <li className="nav-item">
          <Link to={'/login'}
           className="nav-link text-white fw-bold" href="#">
            Login
          </Link>
        </li>
        ): (
          <>
          <li className="nav-item">
          <a className="nav-link text-white fw-bold" href="#">
            Logout
          </a>
        </li>
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
        
        )}
      </ul>
      <form className="d-flex" role="search">
        <input
          className="form-control me-4"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-primary rounded-3" type="submit">
          <i className="bi bi-search"> </i>
        </button>
      </form>
    </div>
  </div>
</nav>

  );
};
export default Nav;
