import TodoItem from './TodoItem.jsx';

function TodoList({ tasks, onToggleTask, onEditTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return <div className="empty-state"><span className="empty-mark">✓</span><strong>No tasks available</strong><p>Add one above to get started.</p></div>;
  }

  return (
    <ul className="todo-list" aria-label="Tasks">
      {tasks.map((task) => (
          <li className={`todo-item task-enter ${task.completed ? 'is-complete' : ''}`} key={task.id}>
            <TodoItem task={task} onToggleTask={onToggleTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
          </li>
      ))}
    </ul>
  );
}

export default TodoList;
