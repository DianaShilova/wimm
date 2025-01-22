import React from 'react';
import './Modal.css';
import { useAddExpenseMutation } from '../../../api/transactions';
import { useAddToWalletMutation, useGetWalletQuery } from '../../../api/wallet';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [addExpense] = useAddExpenseMutation();
    const [reductionOfWallet] = useAddToWalletMutation();
    const { data: wallets, isLoading } = useGetWalletQuery();
    const [formData, setFormData] = React.useState({
        title: '',
        amount: 0,
        date: '',
        category: '',
        description: '',
        account: '',
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addExpense({
                ...formData,
                amount: Number(formData.amount)
            });
            await reductionOfWallet({
                amount: Number(formData.amount) * -1,
                account: formData.account,
            });
            onClose();
        } catch (err) {
            console.error('Ошибка при добавлении транзакции:', err);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Добавить транзакцию</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="label">Название</label>
                        <input 
                            name="title"
                            className="input" 
                            type="text" 
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Введите название" 
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Сумма</label>
                        <input 
                            name="amount"
                            className="input" 
                            type="number" 
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Введите сумму" 
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Кошелек</label>
                        <select 
                            name="account"
                            className="input"
                            value={formData.account}
                            onChange={handleChange}
                        >
                            <option value="">Выберите кошелек</option>
                            {!isLoading && wallets && wallets.map((wallet, index) => (
                                <option key={index} value={wallet.account}>
                                    {wallet.account} (Баланс: {wallet.amount})
                                </option>
                            ))}
                        </select>
                        {isLoading && <span>Загрузка кошельков...</span>}
                    </div>

                    <div className="form-group">
                        <label className="label">Категория</label>
                        <input 
                            name="category"
                            className="input" 
                            type="text" 
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Выберите категорию" 
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Дата</label>
                        <input 
                            name="date"
                            className="input" 
                            type="date" 
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Описание</label>
                        <textarea 
                            name="description"
                            className="textarea" 
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Введите описание" 
                        />
                    </div>

                    <button className="submit-button" type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    );
};
export default Modal;
