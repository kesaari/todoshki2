import React from 'react';
import { TaskForm } from './components/TaskForm';
import { FilterControls } from './components/FilterControls';
import { TaskList } from './components/TaskList';
import './styles.css';

export const App = () => {
  return (
    <div>
      <header>ВАЖНЫЕ <span>ДЕЛИШКИ</span></header>
      <TaskForm />
      <h2>Поиск задач по:</h2>
      <FilterControls />
      <TaskList />
    </div>
  );
};