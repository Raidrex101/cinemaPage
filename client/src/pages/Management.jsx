import { useAuthContext } from "../hooks/useAuth";
import { MovieContext } from "../context/movieContext";
import { useState, useEffect, useContext } from "react";
import AddRoom from "../components/AddRoom";
import EditRoom from "../components/EditRoom";
import { isActiveControl } from "../services/roomServices";

const Management = () => {
  const { autenticated, userPayload } = useAuthContext();
  const { movies } = useContext(MovieContext);
  const mainUrl = import.meta.env.VITE_CINEMA_API;
  const [rooms, setRooms] = useState([]);

  const activeOrInactiveRoom = async (roomId) => {
    if (userPayload.role !== "ADMIN") {
      console.error("Invalid credentials");
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
    }

    try {
      const response = await isActiveControl(roomId, token);

      if (response.status === 200) {
        const updatedRooms = rooms.map((room) => {
          if (room._id === roomId) {
            return {
              ...room,
              isActive: !room.isActive,
              functionTimes: room.isActive ? [] : room.functionTimes,
            };
          }

          return room;
        });
        setRooms(updatedRooms);
      } else {
        console.error("Error changing room status:", response.statusText);
      }
    } catch (error) {
      console.error("Error changing room status:", error);
    }
  };

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const response = await fetch(`${mainUrl}/rooms`);

        if (!response.ok) {
          throw new Error(
            `Error fetching rooms: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Rooms data:", data);
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };
    getAllRooms();
  }, [mainUrl]);

  return (
    <>
      {!autenticated && userPayload.role !== "ADMIN" ? (
        <div>You do not have permission to see this page</div>
      ) : (
        <section className=" custommt pt-3">
          <div className="container-fluid text-center fw-bold">
            <h2>Welcome {userPayload?.name}</h2>
            <div className="fixed-top mt-4 pt-4 w-25 top-0 start-50 translate-middle">
              {/* Button trigger modal */}
              <button
                type="button"
                className="btn btn-success m-2 fw-bold"
                data-bs-toggle="modal"
                data-bs-target="#add-room"
              >
                Add new room
              </button>

              <button
                type="button"
                className="btn btn-warning fw-bold m-2"
                data-bs-toggle="modal"
                data-bs-target="#edit-room"
              >
                Edit room
              </button>

            </div>
              <AddRoom setRooms={setRooms} />
              <EditRoom rooms={rooms} movies={movies} setRooms={setRooms} />
            <div className="row mt-2">
              {rooms.map((room) => (
                <div key={room._id} className="col-md-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{room.name}</h5>
                      <p className="card-text">
                        Movie:{" "}
                        {room.functionTimes.length > 0 &&
                        room.functionTimes[0].movie
                          ? room.functionTimes[0].movie.name
                          : "No movie assigned"}
                      </p>
                      <p className="card-text">Capacity: {room.seats.length}</p>
                      <p className="card-text">
                        Price:{" "}
                        {room.functionTimes.length > 0 &&
                        room.functionTimes[0].movie
                          ? room.functionTimes[0].movie.seatPrice
                          : "No price assigned"}
                      </p>
                      <p className="card-text">
                        Times:{" "}
                        {room.functionTimes.length > 0
                          ? room.functionTimes.map((funcTime, index) => (
                              <span key={index}>
                                {funcTime.time}
                                {index < room.functionTimes.length - 1 && ", "}
                              </span>
                            ))
                          : "No times available"}
                        <p className="card-text py-1 fw-bold">
                          Status:
                          {room.isActive ? (
                            <p>
                              Active{" "}
                              <button
                                type="button"
                                className="btn btn-danger"
                                value={room._id}
                                onClick={() => activeOrInactiveRoom(room._id)}
                              >
                                Press to deactivate
                              </button>
                            </p>
                          ) : (
                            <p>
                              Inactive{" "}
                              <button
                                type="button"
                                className="btn btn-primary"
                                value={room._id}
                                onClick={() => activeOrInactiveRoom(room._id)}
                              >
                                Press to activate
                              </button>
                            </p>
                          )}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Management;
