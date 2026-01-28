import { useForm } from "react-hook-form";
import { useAuthContext } from "../hooks/useAuth";
import { editRoom } from "../services/roomServices";
import { generateDates } from "../utils/dateUtils";

const EditRoom = ({ rooms, movies, setRooms, getAllRooms }) => {
  const { userPayload } = useAuthContext();
  const dates = generateDates()

  const times = [
    "10:00",
    "11:00",
    "12:30",
    "13:30",
    "14:00",
    "15:00",
    "16:00",
    "16:30",
    "17:30",
    "18:30",
    "19:00",
    "20:00",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editRoomSubmit = async (data) => {
    const role = userPayload.role;
    if (role !== "ADMIN") {
      console.error("Invalid credentials");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const movie = movies.find((movie) => movie._id === data.movieId);

      if (!movie) {
        console.error("Movie not found");
        return;
      }

      const selectedTime = data.time;

      const seatsTemplate = [
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "A8",
        "A9",
        "A10",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "B8",
        "B9",
        "B10",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "C9",
        "C10",
        "D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "D8",
        "D9",
        "D10",
      ];

      const functionTime = {
        movie: movie._id,
        date: data.date, // ISO date (YYYY-MM-DD)
        time: selectedTime,
        seats: [...seatsTemplate],
        occupiedSeats: [],
      };

      const roomData = {
        roomId: data.roomId,
        functionTime: functionTime,
      };

      const response = await editRoom(roomData, token);

      if (response.status === 200) {
        setRooms((prevRooms) => {
          const updatedRooms = prevRooms.map((room) =>
            room._id === data.roomId
              ? {
                  ...room,
                  functionTimes: [...room.functionTimes, functionTime],
                }
              : room
          );
          return updatedRooms;
        });
        getAllRooms();
      }
    } catch (error) {
      console.error("Error editing room:", error);
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
                  <option disabled="disabled" selected="true">
                    Room
                  </option>
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
                  <option disabled="disabled" selected="true">
                    Movie
                  </option>
                  {movies.length > 0 &&
                    movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.name}
                      </option>
                    ))}
                </select>
                {errors.movieId && (
                  <p className="text-danger">Selecting a movie is required</p>
                )}
                <div id="movie-name" className="form-text">
                  Select a Movie.
                </div>
                <label htmlFor="date-select" className="form-label p-2 fw-bold">
                  Avilable dates:
                </label>
                <select name="date" id="dates" {...register("date", { required: true })}>
                  <option disabled value="">Date</option>
                  {dates?.map((date, index) => (
                    <option key={index} value={date.iso}>
                      {date.formattedDate}
                    </option>
                  ))}
                </select>
                {errors.date && (
                  <p className="text-danger">Selecting a date is required</p>
                )}
                <div id="movie-name" className="form-text">
                  Select a Date.
                </div>
                <label htmlFor="time-selec" className="form-label p-2 fw-bold">
                  Avilable times:
                </label>
                <select
                  name="time"
                  id="times"
                  {...register("time", { required: true })}
                >
                  <option disabled="disabled" selected="true">
                    Time
                  </option>
                  {times.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.time && (
                  <p className="text-danger">Selecting a time is required</p>
                )}
                <div id="time-selec" className="form-text">
                  Select a Time.
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
                <button type="submit" className="btn btn-primary">
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
