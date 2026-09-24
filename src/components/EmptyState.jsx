// =============================================================================
// WORKSPACE OS — EmptyState Component
// Polished empty state with purple outline icon matching the preview
// =============================================================================

import { Plus } from 'lucide-react';

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  onAction,
  actionIcon: ActionIcon = Plus,
  customButton
}) {
  return (
    <div className="ws-empty-state" role="status">
      {Icon && (
        <div className="ws-empty-icon" aria-hidden="true">
          <Icon size={32} strokeWidth={1.5} />
        </div>
      )}
      <h3 className="ws-empty-title">{title}</h3>
      {description && <p className="ws-empty-desc">{description}</p>}

      {customButton ? (
        customButton
      ) : (
        action && onAction && (
          <button
            type="button"
            className="ws-btn ws-btn-primary"
            onClick={onAction}
          >
            {ActionIcon && <ActionIcon size={14} />}
            {action}
          </button>
        )
      )}
    </div>
  );
}
