import { Check, Pencil, Save, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

function TodoItem({ task, onToggleTask, onEditTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(task.text);

  useEffect(() => {
    setDraftText(task.text);
  }, [task.text]);

  const saveEdit = () => {
    const trimmedText = draftText.trim();
    if (trimmedText) {
      onEditTask(task.id, trimmedText);
      setIsEditing(false);
    }
  };

  const handleEditKeyDown = (event) => {
    if (event.key === 'Enter') saveEdit();
    if (event.key === 'Escape') setIsEditing(false);
  };

  return (
    <>
      <button className="complete-button" type="button" onClick={() => onToggleTask(task.id)} aria-label={task.completed ? `Mark ${task.text} active` : `Mark ${task.text} complete`}>
        {task.completed && <Check size={16} />}
      </button>
      {isEditing ? (
        <input className="edit-input" value={draftText} onChange={(event) => setDraftText(event.target.value)} onKeyDown={handleEditKeyDown} aria-label="Edit task" autoFocus />
      ) : (
        <span className="task-text">{task.text}</span>
      )}
      <div className="item-actions">
        {isEditing ? (
          <>
            <button className="item-button save" type="button" onClick={saveEdit} aria-label="Save task"><Save size={17} /></button>
            <button className="item-button" type="button" onClick={() => setIsEditing(false)} aria-label="Cancel editing"><X size={17} /></button>
          </>
        ) : (
          <>
            <button className="item-button" type="button" onClick={() => setIsEditing(true)} aria-label={`Edit ${task.text}`}><Pencil size={17} /></button>
            <button className="item-button delete" type="button" onClick={() => onDeleteTask(task.id)} aria-label={`Delete ${task.text}`}><Trash2 size={17} /></button>
          </>
        )}
      </div>
    </>
  );
}

export default TodoItem;
