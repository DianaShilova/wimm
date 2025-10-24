import React from 'react';
import './CategoryModal.css';
import {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../../../api/categories';
import { Category } from '../../../types/interfaces';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [formData, setFormData] = React.useState({
    name: '',
    plannedMonthlySum: 0,
  });
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(
    null
  );

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'plannedMonthlySum' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory({
          ...editingCategory,
          name: formData.name,
          plannedMonthlySum: formData.plannedMonthlySum,
        });
        setEditingCategory(null);
      } else {
        await addCategory(formData);
      }
      setFormData({ name: '', plannedMonthlySum: 0 });
    } catch (err) {
      console.error('Ошибка при сохранении категории:', err);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      plannedMonthlySum: category.plannedMonthlySum,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id);
    } catch (err) {
      console.error('Ошибка при удалении категории:', err);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', plannedMonthlySum: 0 });
    setEditingCategory(null);
  };

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h2>Управление категориями</h2>
          <button className='close-button' onClick={onClose}>
            ×
          </button>
        </div>

        <form className='form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label className='label'>Название категории</label>
            <input
              name='name'
              className='input'
              type='text'
              value={formData.name}
              onChange={handleChange}
              placeholder='Введите название категории'
              required
            />
          </div>

          <div className='form-group'>
            <label className='label'>Плановая сумма на месяц</label>
            <input
              name='plannedMonthlySum'
              className='input'
              type='number'
              value={formData.plannedMonthlySum}
              onChange={handleChange}
              placeholder='Введите плановую сумму'
              required
            />
          </div>

          <div className='form-buttons'>
            <button className='submit-button' type='submit'>
              {editingCategory ? 'Обновить' : 'Добавить'}
            </button>
            {editingCategory && (
              <button
                className='cancel-button'
                type='button'
                onClick={resetForm}
              >
                Отмена
              </button>
            )}
          </div>
        </form>

        <div className='categories-list'>
          <h3>Существующие категории</h3>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            categories?.map((category) => (
              <div key={category.id} className='category-item'>
                <div className='category-info'>
                  <span className='category-name'>{category.name}</span>
                  <span className='category-sum'>
                    План: {category.plannedMonthlySum}
                  </span>
                </div>
                <div className='category-actions'>
                  <button
                    className='edit-button'
                    onClick={() => handleEdit(category)}
                  >
                    ✏️
                  </button>
                  <button
                    className='delete-button'
                    onClick={() => handleDelete(category.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
          {!isLoading && categories?.length === 0 && (
            <p>Категории не найдены</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
