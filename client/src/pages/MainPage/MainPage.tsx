import React, { useState } from 'react';
import Modal from '../Modals/TransactionModal/Modal';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './MainPage.css';
import { useGetExpensesQuery } from '../../api/transactions';
import { useGetWalletQuery } from '../../api/wallet';
import WalletModal from '../Modals/WalletModal/WalletModal';

const MainPage: React.FC = () => {
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
    const { data: expenses } = useGetExpensesQuery();
    const { data: wallet } = useGetWalletQuery();

  const handleOpenModal = () => {
    setIsTransactionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTransactionModalOpen(false);
    setIsWalletModalOpen(false);
  };

  const handleOpenWalletModal = () => {
    setIsWalletModalOpen(true);
  };

  return (
    <div className="main-container">
        <button className="wallet-button" onClick={handleOpenWalletModal}>
            + Пополнить кошелек
        </button>
        <div className="wallet-container">{wallet}</div>
        <h1>Транзакции</h1>
        <div className="transactions-container">
            { expenses && expenses.map(expense => (
                <div key={expense.id} className="transaction-item">
                    <div className="transaction-category">{expense.category}</div>
                    <div className="transaction-title">{expense.title}</div>
                    <div className="transaction-date">{format(new Date(expense.date!), 'dd MMMM', { locale: ru })}</div>
                    <div className="transaction-amount">{expense.amount}</div>
                </div>
            ))}
        </div>
      <button className="add-button" onClick={handleOpenModal}>
        + Добавить транзакцию
      </button>

      <Modal 
        isOpen={isTransactionModalOpen} 
        onClose={handleCloseModal}
      />
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MainPage;
