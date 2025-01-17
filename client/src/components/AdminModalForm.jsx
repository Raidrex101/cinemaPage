import { useForm } from "react-hook-form";

const AdminModalForm = ({ buttonName }) => {
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {buttonName === "addRoom" ? "Add New Room" : "Edit Room"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {buttonName === "addRoom" ? (
              <p>Form to add a new room...</p>
            ) : (
              <p>Form to edit an existing room...</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              {buttonName === "addRoom" ? "Save Room" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminModalForm;
