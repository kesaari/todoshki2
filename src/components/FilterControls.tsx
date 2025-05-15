import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../store/tasksSlice';
import { CustomSelect } from './CustomSelect';

interface Option {
  value: string;
  label: string;
}

export const FilterControls: React.FC = () => {
  const dispatch = useDispatch();

  const availableTags: Option[] = [
    { value: 'работа', label: 'Работа' },
    { value: 'дом', label: 'Дом' },
    { value: 'учеба', label: 'Учеба' },
    { value: 'спорт', label: 'Спорт' },
    { value: 'отдых', label: 'Отдых' },
  ];

  const priorityOptions: Option[] = [
    { value: '', label: 'Все приоритеты' },
    { value: 'низкий', label: 'Низкий' },
    { value: 'средний', label: 'Средний' },
    { value: 'высокий', label: 'Высокий' },
  ];

  const dueDateOptions: Option[] = [
    { value: '', label: 'Все сроки' },
    { value: 'overdue', label: 'Просроченные' },
    { value: 'today', label: 'Сегодня' },
    { value: 'future', label: 'Будущие' },
  ];

  const handleFilterChange = (filterType: string, value: any) => {
    dispatch(setFilter({ filterType, value }));
  };

  return (
    <div className='filters-cont'>
      <CustomSelect
        options={priorityOptions}
        onChange={(value) => handleFilterChange('priority', value)}
        placeholder="Выберите приоритет"
      />

      <CustomSelect
        options={availableTags}
        onChange={(selectedOptions) => handleFilterChange('tags', selectedOptions)}
        isMulti
        placeholder="Выберите теги"
      />

      <CustomSelect
        options={dueDateOptions}
        onChange={(value) => handleFilterChange('dueDate', value)}
        placeholder="Выберите срок"
      />

      <input onChange={(e) => handleFilterChange('searchQuery', e.target.value)} placeholder="Поиск" />
    </div>
  );
};