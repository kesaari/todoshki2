import React from 'react';
import { useSelector } from 'react-redux';
import { selectFilteredTasks } from '../store/tasksSlice';
import { TaskItem } from './TaskItem';

export const TaskList: React.FC = () => {
  const filteredTasks = useSelector(selectFilteredTasks);

  return (
    <div className='task-list'>
      {filteredTasks.map((task, index) => (
        <TaskItem key={index} task={task} index={index} />
      ))}
    </div>
  );
};