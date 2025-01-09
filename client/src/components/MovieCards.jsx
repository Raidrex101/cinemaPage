import { Link, useNavigate } from 'react-router-dom'

const MovieCards = ({id, title, duration, poster}) => {
  const navigate = useNavigate();
    return (
      <div key={id} className="card border-0 mt-3 cardwidth">
  <img
  role='button'
  onClick={() => navigate(`/buy-tickets/${id}`)}
  className="rounded-4 shadow p-0 mb-2 bg-body-tertiary" 
  src={poster} 
  alt={title} />
    <span className="text-start text text-muted">{duration} min</span>
  <div className=" text-start fs-6 fw-bold">
    <p className="card-title">{title}</p>
    <Link to={`/movie/${id}`}>
      See details
    </Link>
  </div>
</div>

    )
  }
  export default MovieCards
  