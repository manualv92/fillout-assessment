import Icon from "./icon";

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
      className="divider-container"
      onClick={() => onInsert(index)}
      onMouseEnter={() => onHoverChange?.(true, index)}
      onMouseLeave={() => onHoverChange?.(false, index)}
    >
      <div className="dashed-line" />
      {!isDragging && (
        <Icon name="plus-circle" strokeWidth={1.5} className="plus-button fill-background" />
      )}
    </div>
  );
}