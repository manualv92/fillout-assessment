'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { useState } from 'react';
import './navbar.css';
import { SortableItem } from './sorteableItem';
import Icon from './icon';

const navItemsInitial = ['Info', 'Details', 'Other', 'Ending'];

function Divider({
  onInsert,
  index,
  onHoverChange
}: {
  onInsert: (index: number) => void;
  index: number;
  onHoverChange?: (hovering: boolean, index: number) => void;
}) {
  return (
    <div
      className="divider-container"
      onClick={() => onInsert(index)}
      onMouseEnter={() => onHoverChange?.(true, index)}
      onMouseLeave={() => onHoverChange?.(false, index)}
    >
      <div className="dashed-line" />
      <div className="plus-button">+</div>
    </div>
  );
}

function AddPageButton({ onAdd }: { onAdd: () => void }) {
  return (
      <button className="add-page-button" onClick={onAdd}>
        <Icon name={"add"} />
        Add page
      </button>
  );
}

export default function Navbar() {
  const [items, setItems] = useState(navItemsInitial);
  const [hoverDividerIndex, setHoverDividerIndex] = useState<number | null>(null);

  function handleDividerHover(hovering: boolean, index: number) {
    console.log(`Divider ${index} hovering: ${hovering}`);
    setHoverDividerIndex(hovering ? index : null);
  }

  function handleDragEnd(event: any) {
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

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <nav className="navbar">
          {items.map((item, index) => {
            console.log(`Rendering item: ${item} at index: ${index}`);
            const isRightOfHover = hoverDividerIndex === index;
            const isLeftOfHover = hoverDividerIndex === index + 1;

            return (
              <div key={item + index} className="nav-with-divider">
                {index > 0 && (
                  <Divider
                    index={index}
                    onInsert={handleInsert}
                    onHoverChange={handleDividerHover}
                  />
                )}
                <div
                  className={`sortable-wrapper ${
                    isLeftOfHover ? 'push-left' : isRightOfHover ? 'push-right' : ''
                  }`}
                >
                  <SortableItem id={item} />
                </div>
              </div>
            );
          })}
          {/* Add-page button at the end */}
          <Divider index={items.length} onInsert={handleInsert} onHoverChange={handleDividerHover} />
          <AddPageButton onAdd={handleAddPage} />
        </nav>
      </SortableContext>
    </DndContext>
  );
}