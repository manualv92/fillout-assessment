import { useEffect, useState } from 'react';

export function useContextMenu(menuHeight = 224, offset = 6) {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: string | null } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    setIsOpen(!!contextMenu);
  }, [contextMenu]);

  const open = (item: string, el: HTMLElement) => {
    if (contextMenu?.item === item) {
      setContextMenu(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    setContextMenu({
      x: rect.left,
      y: rect.top + window.scrollY - menuHeight - offset,
      item
    });
  };

  return { contextMenu, isOpen, open, close: () => setContextMenu(null) };
}