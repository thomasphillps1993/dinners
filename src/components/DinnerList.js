import DinnerCard from "./DinnerCard";

export default function DinnerList({ dinners, onEditDinner, onDeleteDinner }) {
  return (
    <div className="container">
      {dinners.map((dinner) => (
        <DinnerCard 
          key={dinner.id} 
          dinner={dinner} 
          onEdit={() => onEditDinner(dinner)} 
          onDelete={() => onDeleteDinner(dinner.id)} 
        />
      ))}
    </div>
  );
}
