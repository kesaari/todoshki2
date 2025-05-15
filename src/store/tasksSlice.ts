import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  priority: string;
}

interface TasksState {
  tasks: Task[];
  completedTasks: Task[];
  filters: {
    priority: string;
    tags: string[];
    dueDate: string;
    searchQuery: string;
  };
}

const initialState: TasksState = {
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  completedTasks: JSON.parse(localStorage.getItem('completedTasks') || '[]'),
  filters: {
    priority: '',
    tags: [],
    dueDate: '',
    searchQuery: '',
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex(task => task.id === action.payload);
      if (taskIndex !== -1) {
        const [completedTask] = state.tasks.splice(taskIndex, 1);
        state.completedTasks.push(completedTask);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
        localStorage.setItem('completedTasks', JSON.stringify(state.completedTasks));
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks.splice(action.payload, 1);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    reorderTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },
    setFilter: (state, action: PayloadAction<{ filterType: string; value: any }>) => {
      const { filterType, value } = action.payload;
      state.filters[filterType as keyof TasksState['filters']] = value;
    },
  },
});

export const { addTask, completeTask, removeTask, reorderTasks, setFilter } = tasksSlice.actions;

export const selectFilteredTasks = (state: RootState) => {
  return state.tasks.tasks.filter(task => {
    const matchesPriority = state.tasks.filters.priority ? task.priority === state.tasks.filters.priority : true;
    const matchesTags = state.tasks.filters.tags.length ? state.tasks.filters.tags.some(tag => task.tags.includes(tag)) : true;
    const matchesDueDate = state.tasks.filters.dueDate ?
      (state.tasks.filters.dueDate === 'overdue' ? new Date(task.dueDate) < new Date() :
       state.tasks.filters.dueDate === 'today' ? new Date(task.dueDate).toDateString() === new Date().toDateString() :
       state.tasks.filters.dueDate === 'future' ? new Date(task.dueDate) > new Date() : true) : true;
    const matchesSearchQuery = state.tasks.filters.searchQuery ?
      task.title.toLowerCase().includes(state.tasks.filters.searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(state.tasks.filters.searchQuery.toLowerCase()) : true;

    return matchesPriority && matchesTags && matchesDueDate && matchesSearchQuery;
  });
};

export default tasksSlice.reducer;