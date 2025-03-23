export default function AddDinnerModal({ showModal, onClose, onSave, dinner }) {
    if (!showModal) return null;
  
    return (
      <div className="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>{dinner ? 'Edit Dinner' : 'Add Dinner'}</h2>
          <input 
            type="text" 
            defaultValue={dinner ? dinner.name : ''} 
            placeholder="Dinner Name" 
          />
          <textarea 
            defaultValue={dinner ? dinner.description : ''} 
            placeholder="Description" 
          />
          <input 
            type="time" 
            defaultValue={dinner ? dinner.time : ''} 
          />
          <button onClick={onSave}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }
  