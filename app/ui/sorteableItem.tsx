import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import  Icon  from './icon';


export function SortableItem({ id }: { id: string }) {
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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-grab select-none whitespace-nowrap 
      ${isDragging ? 'bg-gray-300' : 'bg-gray-100'} transition`}
    >
      <Icon name={id} />
      {id}
    </div>
  );
}