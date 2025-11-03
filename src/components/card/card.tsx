import { TrashIcon } from "lucide-react";
import "./card.css";

import { useFoodDeleteMutate } from "../../hooks/useFoodDelete";

interface CardProps {
  id: number;
  price: number;
  title: string;
  image: string;
}

export function Card({ id, price, image, title }: CardProps) {
  const { mutate, isPending } = useFoodDeleteMutate();

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <div className="card">
      <button 
        className="delete-btn" 
        onClick={handleDelete}
        disabled={isPending}>
        <TrashIcon />
      </button>
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>R$ {price}</p>
    </div>
  );
}