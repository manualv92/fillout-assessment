import Icon from "./icon";

type ContextMenuProps = {
  x: number;
  y: number;
  isOpen: boolean;
  onSelect: (action: string) => void;
};

const MENU_ITEMS = [
  { name: 'Set as first page', icon: 'flag', className: 'text-primary', iconColor: 'text-blueAccent fill-blueAccent' },
  { name: 'Rename', icon: 'rename', className: 'text-primary', iconColor: 'text-secondary' },
  { name: 'Copy', icon: 'copy', className: 'text-primary', iconColor: 'text-secondary' },
  { name: 'Duplicate', icon: 'duplicate', className: 'text-primary', iconColor: 'text-secondary' },
  { divider: true },
  { name: 'Delete', icon: 'trash', className: 'text-danger hover:bg-red-50 pb-0', iconColor: 'text-danger' }
];

export default function ContextMenu({ x, y, onSelect, isOpen }: ContextMenuProps) {
  return (
    <div
      className={`absolute w-60 bg-white border border-border rounded-lg z-50
    origin-top-left transform transition-all duration-150 ease-out
    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
  `}
      style={{ top: y, left: x, filter: 'drop-shadow(var(--color-shadow))' }}
    >
      <div className="p-2.5 border-b bg-menu-header-background border-border  font-semibold text-sm rounded-t-lg">
        Settings
      </div>
      <ul className="text-sm p-3 pt-1.5">
        {MENU_ITEMS.map((item, index) =>
          item.divider ? (
            <hr key={`divider-${index}`} className="my-1 border-t border-border" />
          ) : (
            <MenuItem
              key={index}
              icon={<Icon name={item.icon ?? ''} className={`w-4 h-4 ${item.iconColor}`} />}
              label={item.name ?? ''}
              className={item.className}
              onClick={() => onSelect(item.name!)}
            />
          )
        )}

      </ul>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  className = ''
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-2 py-1.5 hover:bg-gray-50 cursor-pointer ${className}`}
    >
      <span className="w-4 h-4">{icon}</span>
      <span>{label}</span>
    </li>
  );
}