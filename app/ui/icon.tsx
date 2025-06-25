// components/Icon.tsx
import Image from 'next/image';

type IconProps = {
  name: string;
  size?: number;
  alt?: string;
  className?: string;
};

const iconMap: Record<string, string> = {
  info: '/icons/info.svg',
  details: '/icons/details.svg',
  other: '/icons/other.svg',
  ending: '/icons/ending.svg',
  plus: '/icons/plus.svg',
  'plus-circle': '/icons/plus-circle.svg',
  flag: '/icons/flag.svg',
  rename: '/icons/rename.svg',
  copy: '/icons/copy.svg',
  duplicate: '/icons/duplicate.svg',
  trash: '/icons/trash.svg',

};

export default function Icon({ name, size = 16, alt = '', className }: IconProps) {
  const src = iconMap[name.toLowerCase()];

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || `${name} icon`}
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}