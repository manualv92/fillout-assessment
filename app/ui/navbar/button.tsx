'use client';

import Icon from './custom-icon';

type AddPageButtonProps = {
    onAdd: () => void;
    className?: string;
};

export default function AddPageButton({ onAdd, className = '' }: AddPageButtonProps) {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <button
                onClick={onAdd}
                type="button"
                aria-label="Add new page"
                className={`
        flex items-center justify-center gap-1.5
        rounded-lg border border-border bg-background 
        text-sm font-medium text-default-label 
        transition hover:bg-hover-button
        w-[106.7px] h-8
        shadow-[var(--tw-shadow-add-button)]
        ${className}
      `}
            >
                <Icon name="plus" className="w-4 h-4 text-primary" />
                <span className="text-primary">Add page</span>
            </button>
        </div>

    );
}