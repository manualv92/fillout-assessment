type ContextMenuButtonProps = {
  onClick: (e: React.MouseEvent) => void;
};

export default function ContextMenuButton({ onClick }: ContextMenuButtonProps) {
  return (
    <button
      type="button"
      aria-label="Open context menu"
      className="ml-2 text-secondary hover:text-black"
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      ⋮
    </button>
  );
}