import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import { createRoom } from "../services/roomServices";

const AddRoom = ({ setRooms }) => {
  const { userPayload } = useAuthContext()
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const roomName = watch("name", "")

  const createRoomSubmit = async (data) => {
    const role = userPayload.role
    if (role !== "ADMIN") {
      console.error("Invalid credentials")
    }

    const token = localStorage.getItem("token")

    if (!token) {
      console.error("No token found")
    }
    
    try {
      const response = await createRoom(data , token)
      if (response.status === 201) {
        setRooms((prevRooms) => [...prevRooms, response.data])
      }
    } catch (err) {
      console.log("Error creating room", err)
  }}

  return (
    <div
      className="modal fade"
      id="add-room"
      tabIndex={-1}
      aria-labelledby="modalLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">
              Create a new room
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(createRoomSubmit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Room Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors.name && <p className="text-danger">Room name is required</p>}
                <div id="room-name" className="form-text">
                  Add a room name to enable movie assignment.
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary" {...(roomName ? {"data-bs-dismiss": "modal"} : {})}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
