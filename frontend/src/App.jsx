import React from 'react';
import './App.css';

const startingTasks = [
  { id: 1, title: 'Review project brief', completed: true },
  { id: 2, title: 'Create the first task list', completed: false },
  { id: 3, title: 'Take a short break', completed: false },
];

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item${task.completed ? ' is-completed' : ''}`}>
      <button
        className="task-check"
        type="button"
        aria-label={task.completed ? `Mark ${task.title} as not done` : `Mark ${task.title} as done`}
        aria-pressed={task.completed}
        onClick={() => onToggle(task.id)}
      >
        {task.completed && <span aria-hidden="true">✓</span>}
      </button>
      <span className="task-title">{task.title}</span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${task.title}`}
        onClick={() => onDelete(task.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = React.useState(startingTasks);
  const [newTaskTitle, setNewTaskTitle] = React.useState('');

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;

  function handleAddTask(event) {
    event.preventDefault();
    const title = newTaskTitle.trim();

    if (!title) return;

    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
    setNewTaskTitle('');
  }

  function handleToggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function handleDeleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId));
  }

  return (
    <main className="page-shell">
      <header className="top-bar">
        <a className="brand" href="#home" aria-label="Daylist home">
          <span className="brand-mark" aria-hidden="true">✓</span>
          <span>daylist</span>
        </a>
        <span className="local-label"><span className="status-dot" /> Saved in this session</span>
      </header>

      <section className="task-panel" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow">A little progress adds up</p>
          <h1 id="page-title">Your tasks</h1>
          <p className="subtitle">Make space for what matters today.</p>
        </div>

        <div className="progress-card" aria-live="polite">
          <div className="progress-copy">
            <span className="progress-number">{remainingCount}</span>
            <span className="progress-label">
              {remainingCount === 1 ? 'task left to do' : 'tasks left to do'}
            </span>
          </div>
          <div className="progress-track" aria-label={`${completedCount} of ${tasks.length} tasks completed`}>
            <span
              className="progress-fill"
              style={{ width: `${tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100}%` }}
            />
          </div>
          <span className="progress-caption">{completedCount} of {tasks.length} completed</span>
        </div>

        <form className="add-task-form" onSubmit={handleAddTask}>
          <label className="visually-hidden" htmlFor="new-task">Add a task</label>
          <span className="input-plus" aria-hidden="true">+</span>
          <input
            id="new-task"
            type="text"
            value={newTaskTitle}
            onChange={(event) => setNewTaskTitle(event.target.value)}
            placeholder="What needs to get done?"
            maxLength={100}
          />
          <button className="add-button" type="submit" disabled={!newTaskTitle.trim()}>
            Add task
          </button>
        </form>

        <div className="list-heading">
          <h2>Today</h2>
          <span>{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
        </div>

        {tasks.length > 0 ? (
          <ul className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">✦</span>
            <p>You’re all caught up.</p>
            <span>Add a task above whenever you’re ready.</span>
          </div>
        )}

        <footer className="panel-footer">
          <span>Small steps, steady progress.</span>
          <span>Daylist · Simple task manager</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
