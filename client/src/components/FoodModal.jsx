import Popcorn from "../assets/popcorn.png";
import Soda from "../assets/soda.png";
import Icee from "../assets/icee.png";

const FoodModal = () => {
  return (
    <div
      className="modal fade"
      id="paymentModal"
      tabIndex={-1}
      aria-labelledby="modalLabel"
    >
      <div className="modal-dialog" style={{ marginTop: "8.6rem" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">
              Want to add some food?
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="card" style={{ width: "10rem" }}>
              <img src={Popcorn} className="card-img-top" alt="..." />
                <p className="card-title fw-bold">Popcorn</p>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No, procceed to payment
            </button>
            <button type="button" className="btn btn-primary">
              Save food
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FoodModal;
