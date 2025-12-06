'use client';

const Logo = ({ className = '', size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* M shape inspired by the icon */}
      <path
        d="M20 70 L20 30 L35 50 L50 30 L65 50 L80 30 L80 70"
        stroke="url(#logoGradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4C8EFF', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#6B9FFF', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#4C8EFF', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo;
