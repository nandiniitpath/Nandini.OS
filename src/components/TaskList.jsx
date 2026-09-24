// =============================================================================
// WORKSPACE OS — TaskList Component
// Focus & priority task list with interactive toggle
// =============================================================================

import { Check } from 'lucide-react';

export default function TaskList({ tasks = [], onToggleTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div style={{ padding: 16, color: 'var(--text-faint)', fontSize: '0.8rem' }}>
        No focus tasks scheduled.
      </div>
    );
  }

  return (
    <div className="ws-tasks">
      {tasks.map((task) => {
        const isCompleted = task.status === 'DONE';

        return (
          <div
            key={task.id}
            className={`ws-task-row ${isCompleted ? 'completed' : ''}`}
            onClick={() => onToggleTask && onToggleTask(task.id)}
            role="checkbox"
            aria-checked={isCompleted}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                if (onToggleTask) {
                  onToggleTask(task.id);
                }
              }
            }}
          >
            <div className="ws-task-checkbox" aria-hidden="true">
              {isCompleted && <Check size={10} color="#FFFFFF" strokeWidth={3} />}
            </div>
            <span className="ws-task-text">{task.title}</span>
            {task.priority && (
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: task.priority === 'HIGH' ? 'var(--status-red)' : 'var(--text-faint)'
                }}
              >
                {task.priority}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
