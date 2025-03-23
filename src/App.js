import React, { useState, useEffect } from "react";
import { fetchDinners, addDinner } from './services/dynamodb'; // Import DynamoDB functions
import { getDinnerSuggestions } from './services/openai'; // Import OpenAI functions
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [dinners, setDinners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDinner, setCurrentDinner] = useState(null);
  const [suggestion, setSuggestion] = useState("");

  // Fetch dinners from DynamoDB when component loads
  useEffect(() => {
    const loadDinners = async () => {
      const fetchedDinners = await fetchDinners();
      setDinners(fetchedDinners);
    };
    loadDinners();
  }, []);

  // Handle saving a new dinner to DynamoDB
  const handleSaveDinner = async (newDinner) => {
    await addDinner(newDinner);
    setShowModal(false);
    const updatedDinners = await fetchDinners();
    setDinners(updatedDinners);
  };

  // Get AI dinner suggestions
  const handleGetSuggestions = async () => {
    const aiSuggestion = await getDinnerSuggestions();
    setSuggestion(aiSuggestion);
  };

  return (
    <div>
      <button onClick={handleGetSuggestions}>Get AI Dinner Suggestions</button>
      {suggestion && <p>{suggestion}</p>}

      <h1>Dinners</h1>
      <button onClick={() => setShowModal(true)}>Add Dinner</button>
      
      {dinners.length > 0 ? (
        <ul>
          {dinners.map((dinner) => (
            <li key={dinner.pk}>
              {dinner.sk} - {dinner.description} at {dinner.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No dinners scheduled.</p>
      )}

      {showModal && (
        <div>
          <h2>Add Dinner</h2>
          {/* Add your form for adding a new dinner here */}
          <button onClick={() => handleSaveDinner({ name: "Spaghetti", description: "Pasta with tomato sauce", time: "7:00 PM" })}>
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
