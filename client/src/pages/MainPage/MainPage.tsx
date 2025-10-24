import React, { useState } from 'react';
import Modal from '../Modals/TransactionModal/Modal';
import './MainPage.css';
import { useGetExpensesQuery } from '../../api/transactions';
import { useGetCategoriesQuery } from '../../api/categories';
import CategoryModal from '../Modals/CategoryModal/CategoryModal';

const MainPage: React.FC = () => {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { data: expenses } = useGetExpensesQuery();
  const { data: categories } = useGetCategoriesQuery();

  const handleOpenModal = () => {
    setIsTransactionModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsTransactionModalOpen(false);
    setIsCategoryModalOpen(false);
  };

  const handleOpenCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  // Calculate actual spending by category
  const getActualSpendingByCategory = (categoryName: string) => {
    if (!expenses) return 0;
    return expenses
      .filter((expense) => expense.category === categoryName)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  // Check if categories and expenses are loaded
  const categoryData =
    categories?.map((category) => ({
      name: category.name,
      actual: getActualSpendingByCategory(category.name),
      planned: category.plannedMonthlySum,
    })) || [];

  // Function to get color based on spending percentage
  const getBudgetColor = (actual: number, planned: number) => {
    if (planned <= 0) return '#333'; // default color if planned is 0 or less
    const percentage = (actual / planned) * 100;
    if (percentage < 20) return '#4caf50'; // green
    if (percentage < 50) return '#d7c73e'; // yellow
    if (percentage < 80) return '#ff9800'; // orange
    return '#f44336'; // red
  };

  return (
    <div className='main-container'>
      <div className='center-section'>
        <div className='balance-display'>
          {expenses ? expenses.reduce((sum, exp) => sum + exp.amount, 0) : 0} /{' '}
          {categoryData?.reduce(
            (total, category) => total + category.planned,
            0
          ) || 0}
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className='add-expense-button' onClick={handleOpenModal}>
            Потрачено
          </button>
          <button
            className='add-category-button'
            onClick={handleOpenCategoryModal}
          >
            +
          </button>
        </div>
      </div>
      <div className='categories-container'>
        {categoryData.map((category, index) => (
          <div key={index} className='category-item'>
            <div className='category-name'>{category.name}</div>
            <div className='category-spending'>
              <p
                className='category-actual'
                style={{
                  color: getBudgetColor(category.actual, category.planned),
                }}
              >
                {category.actual}
                {'  '}
              </p>
              <p className='category-planned'>/{category.planned}</p>
            </div>
          </div>
        ))}
        {categoryData.length === 0 && (
          <div className='no-categories'>
            Категории не найдены. Создайте категории с помощью кнопки
            "Категории".
          </div>
        )}
      </div>

      <Modal isOpen={isTransactionModalOpen} onClose={handleCloseModal} />
      <CategoryModal isOpen={isCategoryModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default MainPage;
