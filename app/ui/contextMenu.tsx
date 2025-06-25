'use client'

import Icon from "./icon";

export default function ContextMenu({
  x,
  y,
  onSelect,
  isOpen
}: {
  x: number;
  y: number;
  onSelect: (action: string) => void;
  isOpen: boolean;
}) {
  return (
    <div 
    //   className="absolute w-60 bg-white border border-gray-200 shadow-xl rounded-lg z-50" box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px -1px; filter: drop-shadow(0px 1px 3px rgb(0, 0, 0, 0.4)); shadow-[0_1px_6px_-3px_rgba(0,0,0,0.1)]
    // --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
    // --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
    // box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    className={`absolute w-60 bg-white border border-gray-200 rounded-lg z-50
    origin-top-left transform transition-all duration-150 ease-out
    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
  `}
      style={{ top: y, left: x , filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.05))' } }
    >
      <div className="px-4 py-3 border-b border-gray-100 text-gray-700 font-semibold text-sm">
        Settings
      </div>
      <ul className="text-sm text-gray-700">
        <MenuItem icon={<Icon name="flag" className="w-4 h-4" />} label="Set as first page" onClick={() => onSelect('Set as first page')} />
        <MenuItem icon={<Icon name="rename" className="w-4 h-4" />} label="Rename" onClick={() => onSelect('Rename')} />
        <MenuItem icon={<Icon name="copy" className="w-4 h-4" />} label="Copy" onClick={() => onSelect('Copy')} />
        <MenuItem icon={<Icon name="duplicate" className="w-4 h-4" />} label="Duplicate" onClick={() => onSelect('Duplicate')} />
        <hr className="my-1 border-t border-gray-100" />
        <MenuItem
          icon={<Icon name="trash" className="w-4 h-4 text-red-500" />}
          label="Delete"
          onClick={() => onSelect('Delete')}
          className="text-red-600 hover:bg-red-50"
        />
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
      className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 cursor-pointer ${className}`}
    >
      <span className="w-4 h-4">{icon}</span>
      <span>{label}</span>
    </li>
  );
}