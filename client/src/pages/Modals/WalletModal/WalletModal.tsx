import React from 'react';
import './WalletModal.css';
import { useAddToWalletMutation } from '../../../api/wallet';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
    const [addWallet] = useAddToWalletMutation();
    const [amount, setAmount] = React.useState(0);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addWallet(amount);
            setAmount(0);
            onClose();
        } catch (err) {
            console.error('Ошибка при пополнении кошелька:', err);
        }
    };

    const handleClose = () => {
        setAmount(0);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Пополнить кошелек</h2>
                    <button className="close-button" onClick={handleClose}>&times;</button>
                </div>
                
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Сумма</label>
                        <input 
                            className="input" 
                            type="number" 
                            value={amount}
                            onChange={handleChange}
                            placeholder="Введите сумму" 
                        />
                    </div>

                    <button className="submit-button" type="submit">OK</button>
                </form>
            </div>
        </div>
    );
};

export default WalletModal;
