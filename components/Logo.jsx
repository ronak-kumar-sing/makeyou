'use client';

const Logo = ({ className = '', size = 40, variant = 'full' }) => {
  // Icon only version
  if (variant === 'icon') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* M shape - modern geometric */}
        <rect x="10" y="10" width="80" height="80" rx="16" fill="currentColor" className="text-foreground" />
        <path
          d="M25 65 L25 35 L38 52 L50 35 L62 52 L75 35 L75 65"
          stroke="currentColor"
          className="text-background"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Dot accent */}
        <circle cx="75" cy="65" r="4" fill="#3B82F6" />
      </svg>
    );
  }

  // Full logo with text
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* M shape - modern geometric */}
        <rect x="10" y="10" width="80" height="80" rx="16" fill="currentColor" className="text-foreground" />
        <path
          d="M25 65 L25 35 L38 52 L50 35 L62 52 L75 35 L75 65"
          stroke="currentColor"
          className="text-background"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Dot accent */}
        <circle cx="75" cy="65" r="4" fill="#3B82F6" />
      </svg>
    </div>
  );
};

export default Logo;
