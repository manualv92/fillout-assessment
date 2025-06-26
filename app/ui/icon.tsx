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
  Trash2 as Trash
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
  trash: Trash
};

export default function Icon({ name, size = 16, strokeWidth, className = '' }: IconProps) {
  const LucideIcon = iconMap[name.toLowerCase()];
  if (!LucideIcon) return null;

  return <LucideIcon size={size} strokeWidth={strokeWidth} className={className} />;
}