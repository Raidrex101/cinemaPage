import Popcorn from "../assets/popcorn.png";
import Soda from "../assets/soda.png";
import Icee from "../assets/icee.png";
import HotDog from "../assets/hotDog.png";
import Nachos from "../assets/nachos.png";
import Water from "../assets/water.png";
import { useState } from "react";
import Checkout from "./Checkout";
import { useAuthContext } from "../hooks/useAuth";
import { createTicket } from "../services/ticketServices";
import { useNavigate } from "react-router-dom";

const FoodModal = ({ selectedFood, setSelectedFood, ticketData }) => {
  const navigate = useNavigate()
  const { userPayload } = useAuthContext()
  const userId = userPayload?._id
  const [step, setStep] = useState("food");

  const foodItems = [
    { name: "Popcorn", img: Popcorn, price: 10 },
    { name: "Soda", img: Soda, price: 15 },
    { name: "Icee", img: Icee, price: 20 },
    { name: "Hotdog", img: HotDog, price: 20 },
    { name: "Nachos", img: Nachos, price: 22 },
    { name: "Water", img: Water, price: 5 },
  ];

  const handleSelectFood = (foodName, foodPrice, action = "add") => {
    setSelectedFood((prev) => {
      const currentQuantity = prev[foodName]?.quantity || 0
      let newQuantity = currentQuantity

      if (action === "add") {
        newQuantity += 1
      } else if (action === "remove" && newQuantity > 0) {
        newQuantity -= 1
      }

      const updatedFood = { ...prev }

      if (newQuantity > 0) {
        updatedFood[foodName] = {
          quantity: newQuantity,
          price: foodPrice * newQuantity,
          name: foodName,
        }
      } else {
        delete updatedFood[foodName]
      }

      return updatedFood;
    })
  }

  const handleSubmit = async (ticketData) => {
    if (!userPayload) {
      console.error('user not logged in')
      return
    }

    const token = localStorage.getItem('token')

    if (!token) {
      console.error('No token found')
      return
    }

    try {
      const response = await createTicket(ticketData, token)
      if (response.status === 201) {
        navigate(`/my-tickets/${userId}`)
      }
    } catch (error) {
      console.error('Error creating ticket', error);
      
    }
  }

  return (
    <div
      className="modal fade"
      id="paymentModal"
      tabIndex={-1}
      aria-labelledby="modalLabel"
      aria-hidden="false"
    >
      <div className="modal-dialog" style={{ marginTop: "8.6rem" }}>
        {step === "food" && (
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
              <div className="container">
                <div className="row g-3">
                  {foodItems.map((item, index) => (
                    <div
                      key={index}
                      className="col-6 d-flex justify-content-center"
                    >
                      <div className="border border-primary border-2 rounded-3 ">
                        <div style={{ width: "10rem" }}>
                          <img
                            src={item.img}
                            className="card-img-top"
                            alt={item.name}
                          />
                          <p className="card-title fw-bold text-center">
                            {item.name} ${item.price}
                          </p>
                        </div>
                        {!selectedFood[item.name]?.quantity && (
                          <span
                            className="badge btn btn-primary rounded-pill"
                            type="button"
                            onClick={() =>
                              handleSelectFood(item.name, item.price, "add")
                            }
                          >
                            +
                          </span>
                        )}
                        {selectedFood[item.name]?.quantity > 0 && (
                          <>
                            <span className="badge bg-primary rounded-pill">
                              {selectedFood[item.name].quantity}
                            </span>

                            <span
                              className="badge btn btn-primary rounded-pill ms-1"
                              type="button"
                              onClick={() =>
                                handleSelectFood(item.name, item.price, "add")
                              }
                            >
                              +
                            </span>
                            <span
                              className="badge btn btn-danger rounded-pill ms-1"
                              type="button"
                              onClick={() =>
                                handleSelectFood(
                                  item.name,
                                  item.price,
                                  "remove"
                                )
                              }
                            >
                              -
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedFood([]), setStep("payment");
                }}
              >
                No, proceed to payment
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setStep("payment")}
              >
                Save food
              </button>
            </div>
          </div>
        )}

        {step === "payment" && (
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="modalLabel">
                please fill the required data.
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <Checkout ticketData={ticketData}/>

            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedFood([]), setStep("food");
                }}
              >
                Return to food list
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => {handleSubmit(ticketData)}}
              >
                Pay
              </button>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default FoodModal;
