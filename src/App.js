import React, { useState, useEffect } from "react";
import { fetchDinners, addDinner, deleteDinner } from "./services/dynamodb"; // Import DynamoDB functions
import { getDinnerSuggestions } from "./services/openai"; // Import OpenAI functions
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [dinners, setDinners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [newDinner, setNewDinner] = useState({
    name: "",
    description: "",
    day: "", // Use day instead of time
  });

  // Fetch dinners from DynamoDB when component loads
  useEffect(() => {
    const loadDinners = async () => {
      const fetchedDinners = await fetchDinners();
      setDinners(fetchedDinners);
    };
    loadDinners();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDinner((prev) => ({ ...prev, [name]: value }));
  };

  // Handle saving a new dinner
  const handleSaveDinner = async () => {
    if (!newDinner.name || !newDinner.description || !newDinner.day) {
      alert("Please fill out all fields.");
      return;
    }
    await addDinner(newDinner);
    setShowModal(false);
    setNewDinner({ name: "", description: "", day: "" }); // Reset after save
    const updatedDinners = await fetchDinners();
    setDinners(updatedDinners);
  };

  // Get AI dinner suggestions
  const handleGetSuggestions = async () => {
    const aiSuggestion = await getDinnerSuggestions();
    setSuggestion(aiSuggestion);
  };

  // Handle deleting a dinner
  const handleDeleteDinner = async (pk, sk) => {
    await deleteDinner(pk, sk);
    const updatedDinners = await fetchDinners();
    setDinners(updatedDinners);
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h1>Dinners</h1>
        <button className="btn btn-primary" onClick={handleGetSuggestions}>
          Get AI Dinner Suggestions
        </button>
        {suggestion && <p className="mt-3">{suggestion}</p>}
      </div>

      <div>
        {dinners.length > 0 ? (
          <ul className="list-group">
            {dinners.map((dinner) => (
              <li key={dinner.pk} className="list-group-item">
                {/* Display the selected day correctly */}
                <strong>{dinner.time}</strong>: {dinner.description} - {dinner.sk}
                
                {/* Delete button */}
                <button
                  className="btn btn-danger btn-sm float-end ms-2"
                  onClick={() => handleDeleteDinner(dinner.pk, dinner.sk)}  // Ensure both pk and sk are passed
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No dinners scheduled.</p>
        )}
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          Add Dinner
        </button>
      </div>

      {/* Modal for adding a new dinner */}
      {showModal && (
        <div
          className="modal show"
          style={{ display: "block" }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Dinner</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Updated form to capture real values */}
                <form>
                  <div className="mb-3">
                    <label className="form-label">Dinner Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter dinner name"
                      value={newDinner.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dinner Description</label>
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Enter dinner description"
                      value={newDinner.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dinner Day</label>
                    <input
                      type="date"
                      name="day"
                      className="form-control"
                      value={newDinner.day}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveDinner}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
