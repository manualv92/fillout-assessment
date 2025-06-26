import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Icon from './customIcon';
import { useRef } from 'react';

export default function SortableItem({
  id,
  isLeftOfHover,
  isRightOfHover,
  isActive,
  onClick,
  onContextMenu,
  onContextButtonClick
}: {
  id: string;
  isLeftOfHover: boolean;
  isRightOfHover: boolean;
  isActive: boolean;
  onClick: () => void;
  onContextMenu: (e: React.MouseEvent, targetRef: HTMLDivElement) => void;
  onContextButtonClick: (e: React.MouseEvent, targetRef: HTMLDivElement) => void;
}) {

  const itemRef = useRef<HTMLDivElement>(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    filter: isActive ? 'drop-shadow(var(--color-shadow))' : ''
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        itemRef.current = node;
      }}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu(e, itemRef.current!);
      }}

      className={`group z-20 relative flex items-center h-8 gap-2 px-4 py-2 rounded-lg cursor-pointer select-none whitespace-nowrap transition  text-default-label hover:bg-hover-button
        sortable-wrapper focus:bg-background focus:outline-blueAccent focus:text-primary
        ${isLeftOfHover ? 'push-left' : isRightOfHover ? 'push-right' : ''} 
        ${isDragging ? 'bg-gray-300' : 'bg-gray-100'} 
        ${isActive ? 'bg-white' : 'bg-default-button'} 
      `}
    >
      <Icon
        name={id}
        className={`
          ${isActive ? 'text-active-icon' : 'text-default-icon'}
          group-focus-within:text-active-icon
        `}
      />
      <span className={`text-sm ${isActive ? 'text-primary' : ''}`}>{id}</span>

      {isActive && (
        <button
          className="ml-2 text-secondary hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            onContextButtonClick(e, itemRef.current!);
          }}
        >
          ⋮
        </button>
      )}
    </div>
  );
}