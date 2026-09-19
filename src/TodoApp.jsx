import { CheckCircle2, ListFilter, Moon, RotateCcw, Sun, Trash2 } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

const filters = ['All', 'Active', 'Completed'];

function TodoApp() {
  const [tasks, setTasks] = useLocalStorage('faie-tasks', []);
  const [activeFilter, setActiveFilter] = useState('All');
  const [darkMode, setDarkMode] = useLocalStorage('faie-todo-theme', false);

  const visibleTasks = useMemo(() => {
    if (activeFilter === 'Active') return tasks.filter((task) => !task.completed);
    if (activeFilter === 'Completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [activeFilter, tasks]);

  const addTask = useCallback((text) => {
    setTasks((currentTasks) => [{ id: crypto.randomUUID(), text, completed: false }, ...currentTasks]);
  }, [setTasks]);

  const toggleTask = useCallback((id) => {
    setTasks((currentTasks) => currentTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }, [setTasks]);

  const editTask = useCallback((id, text) => {
    setTasks((currentTasks) => currentTasks.map((task) => (task.id === id ? { ...task, text } : task)));
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }, [setTasks]);

  const clearCompleted = useCallback(() => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
  }, [setTasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  return (
    <div className={`todo-app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="todo-header">
        <div className="header-inner"><div className="logo"><span className="logo-mark"><CheckCircle2 size={21} /></span><span>daymark</span></div><button className="theme-button" type="button" onClick={() => setDarkMode((current) => !current)} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button></div>
      </header>
      <main className="todo-container">
        <section className="intro"><p className="kicker">Personal focus</p><h1>Make space for<br /><em>what matters.</em></h1><p className="intro-copy">A quiet place for your tasks, one clear step at a time.</p></section>
        <TodoForm onAddTask={addTask} />
        <section className="task-panel" aria-labelledby="task-list-heading"><div className="panel-top"><div><h2 id="task-list-heading">Your tasks</h2><span className="task-count">{remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining</span></div><div className="panel-icon"><ListFilter size={18} /></div></div><div className="filter-bar" role="group" aria-label="Filter tasks">{filters.map((filter) => <button key={filter} type="button" className={activeFilter === filter ? 'active' : ''} onClick={() => setActiveFilter(filter)}>{filter}{filter === 'All' && <span>{tasks.length}</span>}</button>)}</div><TodoList tasks={visibleTasks} onToggleTask={toggleTask} onEditTask={editTask} onDeleteTask={deleteTask} /><div className="panel-footer"><span><span className="progress-dot" />{completedCount} completed</span>{completedCount > 0 && <button className="clear-button" type="button" onClick={clearCompleted}><Trash2 size={14} />Clear completed</button>}</div></section>
        <p className="privacy-note"><RotateCcw size={13} />Your tasks are saved automatically in this browser.</p>
      </main>
    </div>
  );
}

export default TodoApp;
