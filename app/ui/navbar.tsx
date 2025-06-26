"use client"

import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { useEffect, useId, useRef, useState } from 'react';
import './navbar.css';
import SortableItem from './sorteableItem';
import Icon from "./customIcon";
import Divider from './divider';
import ContextMenu from './contextMenu';

const navItemsInitial = ['Info', 'Details', 'Other', 'Ending'];

function AddPageButton({ onAdd, className }: { onAdd: () => void; className?: string }) {
  return (
    <button className={`bg-background border border-border rounded-lg w-[106.7px] flex justify-center items-center gap-1.5 ${className ? ' ' + className : ''}`} onClick={onAdd} style={{ filter: 'drop-shadow(var(--color-shadow))' }}>
      <Icon name={"plus"} />
      <span className='text-sm'>Add page</span>
    </button>
  );
}

export default function Navbar() {
  const [items, setItems] = useState(navItemsInitial);
  const [hoverDividerIndex, setHoverDividerIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    item: string | null;
  } | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setContextMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);


  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0.01
    }
  })

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  )

  function handleDividerHover(hovering: boolean, index: number) {
    setHoverDividerIndex(hovering ? index : null);
  }

  function handleDragEnd(event: any) {
    setIsDragging(false);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  }

  function handleInsert(index: number) {
    const newItem = `Item ${items.length + 1}`;
    const updated = [...items.slice(0, index), newItem, ...items.slice(index)];
    setItems(updated);
    setHoverDividerIndex(null);
  }

  function handleAddPage() {
    const newItem = `Item ${items.length + 1}`;
    setItems((prev) => [...prev, newItem]);
  }

  function handleDragStart() {
    setIsDragging(true);
    setContextMenu(null);
  }

  useEffect(() => {
    if (contextMenu) {
      setTimeout(() => setIsOpen(true), 10); // delay mínimo para permitir animación
    } else {
      setIsOpen(false);
    }
  }, [contextMenu]);

  function openContextMenuAtItem(itemId: string, targetEl: HTMLElement) {

    const rect = targetEl.getBoundingClientRect();
    const scrollY = window.scrollY;

    const MENU_HEIGHT = 224;
    const GAP = 6;

    setContextMenu({
      x: rect.left,
      y: rect.top + scrollY - MENU_HEIGHT - GAP,
      item: itemId
    });
  }

  const id = useId()

  return (
    <DndContext id={id} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <nav className="flex p-3 items-center justify-center bg-body-background">
          {items.map((item, index) => {
            const isRightOfHover = hoverDividerIndex === index;
            const isLeftOfHover = hoverDividerIndex === index + 1;
            return (
              <div key={item + index} className="flex items-center relative">
                {index > 0 && (
                  <Divider
                    index={index}
                    onInsert={handleInsert}
                    onHoverChange={handleDividerHover}
                    isDragging={isDragging}
                  />
                )}
                <SortableItem
                  id={item}
                  isLeftOfHover={isLeftOfHover}
                  isRightOfHover={isRightOfHover}
                  isActive={item === activeItem}
                  onClick={() => setActiveItem(item)}
                  onContextMenu={(e, el) => {
                    openContextMenuAtItem(item, el);
                  }}
                  onContextButtonClick={(e, el) => {
                    openContextMenuAtItem(item, el);
                  }}
                />
              </div>
            );
          })}
          <div className='flex items-center'>
            <Divider index={items.length} onInsert={handleInsert} onHoverChange={handleDividerHover} isDragging={isDragging} />
            <AddPageButton onAdd={handleAddPage} className='h-8' />
          </div>
          {contextMenu && (
            <ContextMenu
              isOpen={isOpen}
              x={contextMenu.x}
              y={contextMenu.y}
              onSelect={(action) => {
                setContextMenu(null);
              }}
            />
          )}
        </nav>
      </SortableContext>
    </DndContext>
  );
}