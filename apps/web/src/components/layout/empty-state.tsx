import React from 'react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ title, description, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed rounded-lg">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>
      {actionText && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md font-medium"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
