import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../../hooks/useFoodDataMutate';
import type { FoodData } from '../../../interface/FoodData';
import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    );
};

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isPending } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = { title, price, image };
        mutate(foodData);
    };

    useEffect(() => {
        if (isSuccess) closeModal();
    }, [isSuccess]);

    // 👉 Fecha ao clicar fora do modal
    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Título" value={title} updateValue={setTitle}/>
                    <Input label="Preço" value={price} updateValue={setPrice}/>
                    <Input label="Imagem" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'postando...' : 'Cadastrar'}
                </button>
            </div>
        </div>
    );
}
