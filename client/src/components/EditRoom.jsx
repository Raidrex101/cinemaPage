import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import { useState } from "react";
import { editRoom } from "../services/roomServices";

const EditRoom = ({ rooms, movies, setRooms }) => {
  const { userPayload } = useAuthContext();
  const [closeModal, setCloseModal] = useState(false);

  const primeTimes = ["10:00", "12:30", "15:00", "17:30", "20:00", "22:30"];
  const standardTimes = ["11:00", "13:30", "16:00", "18:30", "21:00"];
  const legacyTimes = ["14:00", "16:30", "19:00", "21:30"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editRoomSubmit = async (data) => {
    const role = userPayload.role;
    if (role !== "ADMIN") {
      console.error("Invalid credentials");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
    }

    try {
      const response = await editRoom(data, token);
      if (response.status === 200) {
        const updatedRooms = rooms.map((room) =>
          room._id === data.roomId
            ? {
                ...room,
                functionTimes: [
                  {
                    movie: movies.find((m) => m._id === data.movieId),
                    time: data.time,
                  },
                ],
              }
            : room
        );
        setRooms(updatedRooms);
        setCloseModal(true);
      }
    } catch (error) {
      console.error("Error assigning movie:", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="edit-room"
      tabIndex={-1}
      aria-labelledby="modalLabel"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modalLabel">
              Edit which funtion will be assigned in each room
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(editRoomSubmit)}>
              <div className="mb-3">
                <label htmlFor="room-name" className="form-label p-2 fw-bold">
                  Room Name:
                </label>
                <select
                  name="roomId"
                  id="room"
                  {...register("roomId", { required: true })}
                >
                  {rooms.map(
                    (room) =>
                      room.isActive === true && (
                        <option key={room._id} value={room._id}>
                          {room.name}
                        </option>
                      )
                  )}
                </select>
                {errors.roomId && (
                  <p className="text-danger">Selecting a room is required</p>
                )}
                <div id="room-name" className="form-text">
                  Select a Room.
                </div>
                <label htmlFor="movie-name" className="form-label p-2 fw-bold">
                  Movie Name:
                </label>
                <select
                  name="movieId"
                  id="movie"
                  {...register("movieId", { required: true })}
                >
                  {movies.length > 0 &&
                    movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.name}
                      </option>
                    ))}
                </select>
                {errors.movieId && (
                  <p className="text-danger">Selecting a room is required</p>
                )}
                <div id="movie-name" className="form-text">
                  Select a Movie.
                </div>
                <label htmlFor="time-selec" className="form-label p-2 fw-bold">
                  Avilable times:
                </label>
                <select
                  name="time"
                  id="times"
                  {...register("time", { required: true })}
                >
                  <option value={[primeTimes]}>Prime times</option>
                  <option value={[standardTimes]}>Standard times</option>
                  <option value={[legacyTimes]}>Legacy times</option>
                </select>
                {errors.time && (
                  <p className="text-danger">Selecting a time is required</p>
                )}
                <div id="time-selec" className="form-text">
                  Prime: more functions, Standard: less functions and Legacy:
                  less functions at late hours.
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  {...(closeModal ? { "data-bs-dismiss": "modal" } : {})}
                >
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
export default EditRoom;
