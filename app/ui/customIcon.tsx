import {
  Info,
  CircleCheck,
  FileText,
  Flag,
  Plus,
  PlusCircle,
  PenLine,
  Clipboard,
  Copy as Duplicate,
  Trash2 as Trash,
  Annoyed as Default
} from 'lucide-react';

import React, { ComponentProps, JSX } from 'react';

type IconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

const iconMap: Record<string, React.ComponentType<ComponentProps<'svg'>>> = {
  info: Info,
  details: FileText,
  other: FileText,
  ending: CircleCheck,
  plus: Plus,
  'plus-circle': PlusCircle,
  flag: Flag,
  rename: PenLine,
  copy: Clipboard,
  duplicate: Duplicate,
  trash: Trash,
  default: Default,

};

export default function Icon({ name = 'Default', size = 16, strokeWidth, className = '' }: IconProps) {
  const LucideIcon = iconMap[name.toLowerCase()];

  return <LucideIcon width={size} height={size} strokeWidth={strokeWidth} className={className} />;
}