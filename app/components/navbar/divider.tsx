import Icon from "./custom-icon";

type DividerProps = {
  index: number;
  isDragging: boolean;
  onInsert: (index: number) => void;
  onHoverChange: (hovering: boolean, index: number) => void;
};

export default function Divider({
  index,
  isDragging,
  onInsert,
  onHoverChange,
}: DividerProps) {
  return (
    <div
      onMouseEnter={() => !isDragging && onHoverChange(true, index)}
      onMouseLeave={() => !isDragging && onHoverChange(false, index)}
      onClick={() => onInsert(index)}
      className="group relative w-5 h-8 flex items-center justify-center"
    >
      <div className="w-5 border-t-2 border-dashed border-gray-300 absolute z-0" />
      {!isDragging && (
        <Icon name="plus-circle" strokeWidth={1.5} className="transition delay-50 duration-100 ease-in opacity-0 scale-0 flex items-center justify-center cursor-pointer z-10 fill-background group-hover:opacity-100 group-hover:scale-100" />
      )}
    </div>
  );
}