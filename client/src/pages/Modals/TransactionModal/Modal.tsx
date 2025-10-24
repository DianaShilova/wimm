import React from 'react';
import './Modal.css';
import { useAddExpenseMutation } from '../../../api/transactions';
import { useGetCategoriesQuery } from '../../../api/categories';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [addExpense] = useAddExpenseMutation();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();
  const [formData, setFormData] = React.useState<{
    title: string;
    amount: string;
    date: string;
    category: string;
    description: string;
  }>({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });
  const [errors, setErrors] = React.useState<{
    title?: string;
    amount?: string;
    category?: string;
  }>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }
    const amountNum = Number(formData.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      newErrors.amount = 'Сумма должна быть положительным числом';
    }
    if (!formData.category) {
      newErrors.category = 'Категория обязательна';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await addExpense({
        ...formData,
        amount: Number(formData.amount),
      });
      onClose();
    } catch (err) {
      console.error('Ошибка при добавлении транзакции:', err);
    }
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>Добавить транзакцию</h2>
          <button className='close-button' onClick={onClose}>
            ×
          </button>
        </div>

        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='label'>Название</label>
            <input
              name='title'
              className='input'
              type='text'
              value={formData.title}
              onChange={handleChange}
              placeholder='Введите название'
            />
            {errors.title && <span className='error'>{errors.title}</span>}
          </div>

          <div className='form-group'>
            <label className='label'>Сумма</label>
            <input
              name='amount'
              className='input'
              type='number'
              value={formData.amount}
              onChange={handleChange}
              placeholder='Введите сумму'
            />
            {errors.amount && <span className='error'>{errors.amount}</span>}
          </div>

          <div className='form-group'>
            <label className='label'>Категория</label>
            <select
              name='category'
              className='input'
              value={formData.category}
              onChange={handleChange}
            >
              <option value=''>Выберите категорию</option>
              {!categoriesLoading &&
                categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
            {errors.category && (
              <span className='error'>{errors.category}</span>
            )}
            {categoriesLoading && <span>Загрузка категорий...</span>}
          </div>

          <div className='form-group'>
            <label className='label'>Дата</label>
            <input
              name='date'
              className='input'
              type='date'
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label className='label'>Описание</label>
            <textarea
              name='description'
              className='textarea'
              value={formData.description}
              onChange={handleChange}
              placeholder='Введите описание'
            />
          </div>

          <button className='submit-button' type='submit'>
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};
export default Modal;
