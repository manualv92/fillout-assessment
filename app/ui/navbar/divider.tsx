import Icon from "./custom-icon";

export default function Divider({
  onInsert,
  index,
  onHoverChange,
  isDragging
}: {
  onInsert: (index: number) => void;
  index: number;
  onHoverChange?: (hovering: boolean, index: number) => void;
  isDragging?: boolean | false;
}) {

  return (
    <div
      className="group relative w-5 h-8 flex items-center justify-center"
      onClick={() => onInsert(index)}
      onMouseEnter={() => onHoverChange?.(true, index)}
      onMouseLeave={() => onHoverChange?.(false, index)}
    >
      <div className="w-5 border-t-2 border-dashed border-gray-300 absolute z-0" />
      {!isDragging && (

        <Icon name="plus-circle" strokeWidth={1.5} className="transition delay-50 duration-100 ease-in opacity-0 scale-0 flex items-center justify-center cursor-pointer z-10 fill-background hover:opacity-100 hover:scale-100" />
      )}
    </div>
  );
}