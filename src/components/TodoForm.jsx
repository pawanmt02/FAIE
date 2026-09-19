import { Plus } from 'lucide-react';
import { useState } from 'react';

function TodoForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedText = taskText.trim();
    if (!trimmedText) return;
    onAddTask(trimmedText);
    setTaskText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">Add a task</label>
      <input
        id="new-task"
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        placeholder="What needs to be done?"
        maxLength={120}
        autoComplete="off"
      />
      <button className="add-button" type="submit" aria-label="Add task">
        <Plus size={20} />
        <span>Add task</span>
      </button>
    </form>
  );
}

export default TodoForm;
