// components/ui/LoadingSpinner.tsx
"use client"

import { useState, useEffect } from 'react';

export function LoadingSpinner({ size = 'md', text = '' }: { size?: 'sm' | 'md' | 'lg', text?: string }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10', 
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-pink-500 border-r-purple-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border border-transparent border-t-purple-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
      </div>
      {text && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">{text}</p>
      )}
    </div>
  );
}