import React from 'react';
import { useDispatch } from 'react-redux';
import { completeTask, removeTask } from '../store/tasksSlice';
import { motion } from 'framer-motion';
import { formatRelativeDate } from '../utils/dateUtils';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    dueDate: string;
    priority: string;
  };
  index: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  const dispatch = useDispatch();
  const isOverdue = new Date(task.dueDate) < new Date();

  const handleComplete = () => {
    dispatch(completeTask(task.id));
  };

  const handleRemove = () => {
    dispatch(removeTask(index));
  };

  return (
    <motion.div
      className={`task-item ${isOverdue ? 'overdue' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="tags">
        {task.tags.map((tag, index) => (
          <div className='task-tag' key={index}>{tag}</div>
        ))}
      </div>
      <p>Срок: {formatRelativeDate(task.dueDate)}</p>
      <p>Приоритет: {task.priority}</p>
      <button onClick={handleComplete}>Выполнено</button>
      <button onClick={handleRemove}>Удалить</button>
    </motion.div>
  );
};