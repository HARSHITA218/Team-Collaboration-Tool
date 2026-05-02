import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', style = {} }: CardProps) {
  return (
    <article className={`glass-panel ${className}`} style={style}>
      {children}
    </article>
  );
}
