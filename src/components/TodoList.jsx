import { AnimatePresence, motion } from 'framer-motion';
import TodoItem from './TodoItem.jsx';

function TodoList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <div className="empty-state"><span className="empty-mark">✓</span><strong>No tasks available</strong><p>Add one above to get started.</p></div>;
  }

  return (
    <ul className="todo-list" aria-label="Tasks">
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <motion.li className={`todo-item ${task.completed ? 'is-complete' : ''}`} key={task.id} layout initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.2 }}>
            <TodoItem task={task} onToggleTask={onToggleTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export default TodoList;
