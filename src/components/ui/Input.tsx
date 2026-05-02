import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      {label && <label htmlFor={props.id || props.name} style={{ fontSize: '0.9rem', color: '#d1d5db' }}>{label}</label>}
      <input 
        className={className}
        style={{ 
          padding: '12px', 
          borderRadius: '8px', 
          border: '1px solid var(--border-color)', 
          background: 'rgba(0,0,0,0.3)', 
          color: 'white',
          outline: 'none',
          width: '100%'
        }}
        id={props.id || props.name}
        {...props}
      />
    </div>
  );
}
