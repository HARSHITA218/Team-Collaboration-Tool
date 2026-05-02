import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseStyles = 'btn';
  const variantStyles = variant === 'primary' ? 'btn-primary' : '';
  const customStyles = variant === 'secondary' ? { background: 'var(--secondary)', color: 'white' } : 
                       variant === 'accent' ? { background: 'var(--accent)', color: 'white' } : 
                       variant === 'ghost' ? { background: 'rgba(255,255,255,0.05)', color: 'white', border: 'none' } : {};

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${className}`} 
      style={customStyles}
      {...props}
    >
      {children}
    </button>
  );
}
