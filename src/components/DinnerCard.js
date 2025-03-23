export default function DinnerCard({ dinner, onEdit, onDelete }) {
    return (
      <div className="dinner-card">
        <h2>{dinner.name}</h2>
        <p>{dinner.description}</p>
        <p className="time">{dinner.time}</p>
        <div className="actions">
          <button onClick={onEdit}>Edit</button>
          <button className="delete" onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  }
  