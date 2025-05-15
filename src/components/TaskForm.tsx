import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { v4 as uuidv4 } from 'uuid';
import { CustomSelect } from './CustomSelect';

interface Option {
  value: string;
  label: string;
}

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('низкий');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const availableTags: Option[] = [
    { value: 'работа', label: 'Работа' },
    { value: 'дом', label: 'Дом' },
    { value: 'учеба', label: 'Учеба' },
    { value: 'спорт', label: 'Спорт' },
    { value: 'отдых', label: 'Отдых' },
  ];

  const priorityOptions: Option[] = [
    { value: 'низкий', label: 'Низкий' },
    { value: 'средний', label: 'Средний' },
    { value: 'высокий', label: 'Высокий' },
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Название обязательно для заполнения';
    }

    if (selectedTags.length === 0) {
      newErrors.tags = 'Необходимо выбрать хотя бы один тег';
    }

    const isDuplicate = tasks.some(task =>
      task.title === title && task.dueDate === dueDate
    );

    if (isDuplicate) {
      newErrors.duplicate = 'Задача с таким названием и сроком уже существует';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const task = {
        id: uuidv4(),
        title,
        description,
        tags: selectedTags,
        dueDate,
        priority,
      };
      dispatch(addTask(task));
      setTitle('');
      setDescription('');
      setSelectedTags([]);
      setDueDate('');
      setPriority('низкий');
      setErrors({});
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название"
          required
        />
        
      </div>
      <div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Описание"
        ></input>
      </div>
      <div>
        <CustomSelect
          options={availableTags}
          value={selectedTags}
          onChange={setSelectedTags}
          isMulti
          placeholder="Выберите теги"
        />
        
      </div>
      <div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <CustomSelect
          options={priorityOptions}
          value={priority}
          onChange={setPriority}
          placeholder="Выберите приоритет"
        />
      </div>
      <button type="submit">Добавить задачу</button>
      
    </form>
    {errors.title && <p className='error'>{errors.title}</p>}
    {errors.duplicate && <p className='error'>{errors.duplicate}</p>}
    {errors.tags && <p className='error'>{errors.tags}</p>}
    </>
  );
};