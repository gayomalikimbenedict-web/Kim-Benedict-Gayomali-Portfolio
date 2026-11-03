import React from 'react';

export type IconName =
  | 'home'
  | 'folder'
  | 'briefcase'
  | 'chart'
  | 'trending'
  | 'user'
  | 'mail'
  | 'arrow-right'
  | 'arrow-up-right'
  | 'check'
  | 'play'
  | 'x'
  | 'send'
  | 'bolt'
  | 'globe'
  | 'shield'
  | 'gear'
  | 'code'
  | 'sheet'
  | 'wrench'
  | 'message'
  | 'expand';

export type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

const Icon: React.FC<IconProps> = ({ name, size = 20, className }) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className,
  };

  const renderPath = () => {
    switch (name) {
      case 'home':
        return (
          <>
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20h14V9.5" />
            <path d="M9 20v-6h6v6" />
          </>
        );
      case 'folder':
        return (
          <>
            <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4l2 2h7A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
          </>
        );
      case 'briefcase':
        return (
          <>
            <rect x="3" y="7" width="18" height="12" rx="2" />
            <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
            <path d="M3 12h18" />
          </>
        );
      case 'chart':
        return (
          <>
            <path d="M4 18h16" />
            <path d="M7 15V9" />
            <path d="M12 15V5" />
            <path d="M17 15v-7" />
          </>
        );
      case 'trending':
        return (
          <>
            <path d="M4 15l6-6 4 4 7-8" />
            <path d="M16 5h4v4" />
          </>
        );
      case 'user':
        return (
          <>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 19a7 7 0 0 1 14 0" />
          </>
        );
      case 'mail':
        return (
          <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m4 7 8 6 8-6" />
          </>
        );
      case 'arrow-right':
        return (
          <>
            <path d="M5 12h14" />
            <path d="m13 5 7 7-7 7" />
          </>
        );
      case 'arrow-up-right':
        return (
          <>
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </>
        );
      case 'check':
        return <path d="m5 12 4 4L19 2" />;
      case 'play':
        return <path d="M8 6v12l10-6z" />;
      case 'x':
        return (
          <>
            <path d="M6 6l12 12" />
            <path d="M18 6 6 18" />
          </>
        );
      case 'send':
        return (
          <>
            <path d="M3 11.5 20 4l-4.5 16-4.5-6.5L3 11.5Z" />
            <path d="M20 4 11 13" />
          </>
        );
      case 'bolt':
        return <path d="M13 2 5 12h5l-1 10 8-10h-5l1-10Z" />;
      case 'globe':
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18" />
            <path d="M12 3a15 15 0 0 1 0 18" />
            <path d="M12 3a15 15 0 0 0 0 18" />
          </>
        );
      case 'shield':
        return (
          <>
            <path d="M12 3 5 6v5c0 4.7 3 8.8 7 10 4-1.2 7-5.3 7-10V6l-7-3Z" />
            <path d="m9.5 12 1.8 1.8 3.7-4.2" />
          </>
        );
      case 'gear':
        return (
          <>
            <circle cx="12" cy="12" r="3" />
            <path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.5-2.4 1a7.5 7.5 0 0 0-1.8-1L14.3 3h-4.6l-.4 2.9a7.5 7.5 0 0 0-1.8 1l-2.4-1-2 3.5 2 1.6A7 7 0 0 0 5 12c0 .3 0 .7.1 1l-2 1.6 2 3.5 2.4-1c.6.4 1.2.7 1.8 1l.4 2.9h4.6l.4-2.9c.6-.3 1.2-.6 1.8-1l2.4 1 2-3.5-2-1.6c.1-.3.1-.7.1-1Z" />
          </>
        );
      case 'code':
        return (
          <>
            <path d="m8 8-4 4 4 4" />
            <path d="m16 8 4 4-4 4" />
            <path d="m14 5-4 14" />
          </>
        );
      case 'sheet':
        return (
          <>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="M8 4v16M16 4v16M4 9h16M4 15h16" />
          </>
        );
      case 'wrench':
        return (
          <>
            <path d="m15.9 6.1 2.7-2.7a2.4 2.4 0 0 1 3.4 3.4l-2.7 2.7" />
            <path d="M9 15l-6 6 2-6 3-3" />
            <path d="M14.6 9.8A5 5 0 0 1 6.2 18.2L2 22l3.8-4.2a5 5 0 0 1 8.8-8.1Z" />
          </>
        );
      case 'message':
        return (
          <>
            <path d="M6 18.5 3 21V6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v8A2.5 2.5 0 0 1 18.5 17H6Z" />
            <path d="M8 9h8M8 12h6" />
          </>
        );
      case 'expand':
        return (
          <>
            <path d="M8 3H3v5" />
            <path d="M16 3h5v5" />
            <path d="M8 21H3v-5" />
            <path d="M16 21h5v-5" />
            <path d="M3 8l7 7" />
            <path d="M21 8l-7 7" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg {...commonProps}>
      {renderPath()}
    </svg>
  );
};

export default Icon;
