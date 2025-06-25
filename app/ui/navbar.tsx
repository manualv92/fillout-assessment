'use client';

import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import './navbar.css';
import SortableItem from './sorteableItem';
import Icon from './icon';
import Divider from './divider';
// import SettingsModal from './settingsMenu';
import ContextMenu from './contextMenu';

const navItemsInitial = ['Info', 'Details', 'Other', 'Ending'];

function AddPageButton({ onAdd, className }: { onAdd: () => void; className?: string }) {
  return (
    <button className={`add-page-button${className ? ' ' + className : ''}`} onClick={onAdd}>
      <Icon name={"plus"} />
      Add page
    </button>
  );
}

export default function Navbar() {
  const [items, setItems] = useState(navItemsInitial);
  const [hoverDividerIndex, setHoverDividerIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [settingsOpenFor, setSettingsOpenFor] = useState<string | null>(null);
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
  
// al abrir el menú
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

    const MENU_HEIGHT = 240; // ajustar según el tamaño real de tu menú
    const GAP = 6; // espacio visual entre el ítem y el menú

    setContextMenu({
      x: rect.left,
      y: rect.top + scrollY - MENU_HEIGHT - GAP,
      item: itemId
    });
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <nav className="navbar">
          {items.map((item, index) => {
            const isRightOfHover = hoverDividerIndex === index;
            const isLeftOfHover = hoverDividerIndex === index + 1;

            return (
              <div key={item + index} className="nav-with-divider">
                {index > 0 && (
                  <Divider
                    index={index}
                    onInsert={handleInsert}
                    onHoverChange={handleDividerHover}
                    isDragging={isDragging}
                  />
                )}
                {/* <div
                  className={`sortable-wrapper ${isLeftOfHover ? 'push-left' : isRightOfHover ? 'push-right' : ''
                    }`}
                > */}
                <SortableItem
                  id={item}
                  isLeftOfHover={isLeftOfHover}
                  isRightOfHover={isRightOfHover}
                  isActive={item === activeItem}
                  onClick={() => setActiveItem(item)}
                  onContextMenu={(e, el) => {
                    // setActiveItem(item);
                    openContextMenuAtItem(item, el);
                  }}
                  onContextButtonClick={(e, el) => {
                    //setActiveItem(item);
                    openContextMenuAtItem(item, el);
                  }}
                />
                {/* </div> */}
              </div>
            );
          })}
          {/* Add-page button at the end */}
          <div className='flex'>
            <Divider index={items.length} onInsert={handleInsert} onHoverChange={handleDividerHover} isDragging={isDragging} />
            <AddPageButton onAdd={handleAddPage} className="drop-shadow-[0_25px_25px_#000]"/>
          </div>
          {contextMenu && (


            <ContextMenu
              isOpen={isOpen}
              x={contextMenu.x}
              y={contextMenu.y}
              // item={contextMenu.item}
              onSelect={(action) => {
                console.log(`Action "${action}" on ${contextMenu.item}`);
                setContextMenu(null); // cerrar el menú
              }}
            />

          )}







          {/* <ul
              className="absolute bg-white border border-gray-200 rounded-md shadow-lg w-240px z-50"
              style={{ top: contextMenu.y, left: contextMenu.x }}
              onClick={(e) => e.stopPropagation()}
            >
              {['Set as first Page', 'Rename', 'Copy', 'Duplicate', 'Delete'].map(
                (action) => (
                  <li
                    key={action}
                    onClick={() => {
                      console.log(`Action "${action}" on ${contextMenu.item}`);
                      setContextMenu(null); // cerrar el menú
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {action}
                  </li>
                )
              )}
            </ul>
          )} */}




        </nav>
      </SortableContext>
    </DndContext>
  );
}