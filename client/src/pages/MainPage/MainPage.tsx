import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './MainPage.css';
import { useGetExpensesQuery } from '../../api/transactions';

const MainPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: expenses } = useGetExpensesQuery();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="main-container">
        <h1>Транзакции</h1>
        <div className="transactions-container">
            { expenses && expenses.map(expense => (
                <div key={expense.id} className="transaction-item">
                    <div className="transaction-category">{expense.category}</div>
                    <div className="transaction-title">{expense.title}</div>
                    <div className="transaction-date">{format(new Date(expense.date), 'dd MMMM', { locale: ru })}</div>
                    <div className="transaction-amount">{expense.amount}</div>
                </div>
            ))}
        </div>
      <button className="add-button" onClick={handleOpenModal}>
        + Добавить транзакцию
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MainPage;
