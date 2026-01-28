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

  const getAllRooms = async () => {
    try {
      const response = await fetch(`${mainUrl}/rooms`);
      if (!response.ok) {
        throw new Error(`Error fetching rooms: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, [getAllRooms]);

  const activeOrInactiveRoom = async (roomId) => {
    if (userPayload.role !== "ADMIN") {
      console.error("Invalid credentials");
      return;
    }
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
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

  return (
    <>
      {!autenticated || userPayload?.role !== "ADMIN" ? (
        <div>You do not have permission to see this page</div>
      ) : (
        <section className="custommt pt-3">
          <div className="container-fluid text-center fw-bold">
            <h2>Welcome {userPayload?.name}</h2>
            <div className="fixed-top mt-4 pt-4 w-25 top-0 start-50 translate-middle">
              <button type="button" className="btn btn-success m-2 fw-bold" data-bs-toggle="modal" data-bs-target="#add-room">
                Add new room
              </button>
              <button type="button" className="btn btn-warning fw-bold m-2" data-bs-toggle="modal" data-bs-target="#edit-room">
                Edit room
              </button>
            </div>
            <AddRoom setRooms={setRooms} />
            <EditRoom rooms={rooms} movies={movies} setRooms={setRooms} getAllRooms={getAllRooms} />

            <div className="row mt-2">
              {rooms.map((room) => {
                const roomMovies = {};

                room.functionTimes.forEach((ft) => {
                  const movieName = ft.movie.name;
                  const functionDate = ft.date
                  const functionTime = ft.time

                  if (!roomMovies[movieName]) {
                    roomMovies[movieName] = {};
                  }

                  if (!roomMovies[movieName][functionDate]) {
                    roomMovies[movieName][functionDate] = {
                      times: [],
                      seatPrice: ft.movie.seatPrice,
                      occupiedSeats: [],
                    };
                  }

                  roomMovies[movieName][functionDate].times.push(functionTime);

                  if (Array.isArray(ft.occupiedSeats)) {
                    roomMovies[movieName][functionDate].occupiedSeats.push(...ft.occupiedSeats);
                  }
                });

                return (
                  <div key={room._id} className="col-md-4">
                    <div className="card mb-3">
                      <div className="card-body overflow-y-scroll" style={{ height: "13rem" }}>
                        <h5 className="card-title">{room.name}</h5>
                        {Object.keys(roomMovies).length > 0 ? (
                          Object.entries(roomMovies).map(([movieName, dates], index) => (
                            <div key={index}>
                              <p className="card-text">
                                <strong>Movie {index + 1}: </strong> {movieName}
                              </p>
                              {Object.entries(dates).map(([date, details], idx) => (
                                <div key={idx}>
                                  <p className="card-text">
                                    <strong>Date: </strong> {date}
                                  </p>
                                  <p className="card-text">
                                    <strong>Times: </strong> {details.times.join(", ")}
                                  </p>
                                  <p className="card-text">
                                    <strong>Price: </strong> {details.seatPrice || "No price assigned"}
                                  </p>
                                  <p className="card-text">
                                    <strong>Occupied seats?: </strong> {details.occupiedSeats.length > 0 ? "Yes" : "No"}
                                  </p>
                                  <hr />
                                </div>
                              ))}
                            </div>
                          ))
                        ) : (
                          <p className="card-text">No movie assigned</p>
                        )}
                        <p className="card-text py-1 fw-bold">
                          <strong>Status:</strong> {room.isActive ? "Active" : "Inactive"}
                        </p>
                        <button type="button" className={`btn ${room.isActive ? "btn-danger" : "btn-primary"}`} onClick={() => activeOrInactiveRoom(room._id)}>
                          {room.isActive ? "Press to deactivate" : "Press to activate"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Management;
