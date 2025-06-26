import { useSensor, useSensors, PointerSensor, MouseSensor, TouchSensor, KeyboardSensor } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

export function useSortableNavItems(initialItems: string[]) {
  const [items, setItems] = useState(initialItems);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverDividerIndex, setHoverDividerIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
    useSensor(PointerSensor, { activationConstraint: { distance: 0.01 } })
  );

  const moveItem = (activeId: string, overId: string) => {
    const from = items.indexOf(activeId);
    const to = items.indexOf(overId);
    if (from !== to) setItems(arrayMove(items, from, to));
  };

  const addItem = (index: number) => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items.slice(0, index), newItem, ...items.slice(index)]);
    setHoverDividerIndex(null)
  };

  const appendItem = () => {
    const newItem = `Item ${items.length + 1}`;
    setItems([...items, newItem]);
  };

  return {
    items,
    setItems,
    isDragging,
    setIsDragging,
    hoverDividerIndex,
    setHoverDividerIndex,
    moveItem,
    addItem,
    appendItem,
    sensors
  };
}