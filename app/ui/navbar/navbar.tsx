"use client";

import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import { useSortableNavItems } from "../../lib/hooks/useSortableNavItems";
import { useContextMenu } from "../../lib/hooks/useContextMenu";
import AddPageButton from "./button";
import Divider from "./divider";
import SortableItem from "./sorteable-item";
import ContextMenu from "./context-menu";
import { useState, useId } from "react";
import './navbar.css';


const navItemsInitial = ["Info", "Details", "Other", "Ending"];

export default function Navbar() {
  const {
    items,
    isDragging,
    setIsDragging,
    moveItem,
    addItem,
    setHoverDividerIndex,
    hoverDividerIndex,
    appendItem,
    sensors
  } = useSortableNavItems(navItemsInitial);

  const [activeItem, setActiveItem] = useState<string | null>(null);

  const { contextMenu, isOpen, open, close } = useContextMenu();

  const handleDragEnd = ({ active, over }: any) => {
    setIsDragging(false);
    if (active.id !== over?.id) moveItem(active.id, over.id);
  };

  const handleDividerHover = (hovering: boolean, index: number) => {
    setHoverDividerIndex(hovering ? index : null);
  };

  const id = useId();

  return (
    <DndContext id={id} collisionDetection={closestCenter} onDragStart={() => { setIsDragging(true); close(); }} onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <nav className="flex p-3 items-center justify-center bg-body-background">
          {items.map((item, index) => {
            const isRightOfHover = hoverDividerIndex === index;
            const isLeftOfHover = hoverDividerIndex === index + 1;

            return (
              <div key={item + index} className="flex items-center relative">
                {index > 0 && (
                  <Divider index={index} onInsert={addItem} onHoverChange={handleDividerHover} isDragging={isDragging} />
                )}
                <SortableItem
                  id={item}
                  isLeftOfHover={isLeftOfHover}
                  isRightOfHover={isRightOfHover}
                  isActive={item === activeItem}
                  onClick={() => {
                    setActiveItem(item);
                    setHoverDividerIndex(null);
                  }}
                  onContextMenu={(e, el) => open(item, el)}
                  onContextButtonClick={(e, el) => open(item, el)}
                />
              </div>
            );
          })}
          <div className="flex items-center">
            <Divider index={items.length} onInsert={addItem} onHoverChange={handleDividerHover} isDragging={isDragging} />
            <AddPageButton onAdd={appendItem} className="h-8" />
          </div>
          {contextMenu && (
            <ContextMenu
              isOpen={isOpen}
              x={contextMenu.x}
              y={contextMenu.y}
              onSelect={() => close()}
            />
          )}
        </nav>
      </SortableContext>
    </DndContext>
  );
}
