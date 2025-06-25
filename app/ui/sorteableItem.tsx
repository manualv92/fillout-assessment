import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Icon from './icon';
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
    transition
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

      className={`relative flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer select-none whitespace-nowrap transition 
        sortable-wrapper ${isLeftOfHover ? 'push-left' : isRightOfHover ? 'push-right' : ''}
        ${isDragging ? 'bg-gray-300 z-20' : 'bg-gray-100 z-10'} 
        ${isActive ? 'font-bold text-black' : 'text-gray-800'}
      `}
    >
      <Icon
        name={id}
        className={`${isActive ? 'text-yellow-500' : 'text-gray-500'}`}
      />
      <span>{id}</span>

      {isActive && (
        <button
          className="ml-2 text-gray-400 hover:text-black"
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