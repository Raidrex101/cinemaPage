const Checkout = ({ ticketData }) => {
  return (
    <div>
  
  <form className="needs-validation" noValidate="">
    <h4 className="mb-3">Payment</h4>
    <div className="my-3">
      <div className="form-check">
        <input
          id="credit"
          name="paymentMethod"
          type="radio"
          className="form-check-input"
          defaultChecked=""
          required=""
        />
        <label className="form-check-label" htmlFor="credit">
          Credit card
        </label>
      </div>
      <div className="form-check">
        <input
          id="debit"
          name="paymentMethod"
          type="radio"
          className="form-check-input"
          required=""
        />
        <label className="form-check-label" htmlFor="debit">
          Debit card
        </label>
      </div>
    </div>
    <div className="row gy-3">
      <div className="col-md-6">
        <label htmlFor="cc-name" className="form-label">
          Name on card
        </label>
        <input
          type="text"
          className="form-control"
          id="cc-name"
          placeholder=""
          required=""
        />
        <small className="text-body-secondary">
          Full name as displayed on card
        </small>
        <div className="invalid-feedback">Name on card is required</div>
      </div>
      <div className="col-md-6">
        <label htmlFor="cc-number" className="form-label">
          Credit card number
        </label>
        <input
          type="text"
          className="form-control"
          id="cc-number"
          placeholder=""
          required=""
        />
        <div className="invalid-feedback">Credit card number is required</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="cc-expiration" className="form-label">
          Expiration
        </label>
        <input
          type="text"
          className="form-control"
          id="cc-expiration"
          placeholder=""
          required=""
        />
        <div className="invalid-feedback">Expiration date required</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="cc-cvv" className="form-label">
          CVV
        </label>
        <input
          type="text"
          className="form-control"
          id="cc-cvv"
          placeholder=""
          required=""
        />
        <div className="invalid-feedback">Security code required</div>
      </div>
      <div className="col-md-3">
        <label htmlFor="cc-cvv" className="form-label">
          Total
        </label>
        <input
          type="text"
          className="form-control fw-bold text-center"
          id="cc-cvv"
          placeholder={`$${ticketData.totalValue}`}
          disabled
        />
        <div className="invalid-feedback">Security code required</div>
        
      </div>
    </div>
  </form>
</div>

  )
}
export default Checkout