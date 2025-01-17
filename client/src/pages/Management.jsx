import { useAuthContext } from "../hooks/useAuth";
import { useState } from "react";
import AdminModalForm from "../components/AdminModalForm";

const Management = () => {
  const { autenticated, userPayload } = useAuthContext();
  const [buttonName, setButtonName] = useState(null);

  // Función para manejar la apertura del modal según el botón
  const handleOpenModal = (name) => {
    setButtonName(name);
  };

  return (
    <>
      {autenticated && userPayload.role === "ADMIN" ? (
        <div>Management</div>
      ) : null}
      <section className="vh-100 custommt">
        <div className="container-fluid text-center"></div>
        Welcome {userPayload.name}
        <div>
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => handleOpenModal("addRoom")}
          >
            Add new room
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => handleOpenModal("editRoom")}
          >
            Edit room
          </button>

          {/* Modal */}
          <AdminModalForm buttonName={buttonName} />
        </div>
      </section>
    </>
  );
};

export default Management;
