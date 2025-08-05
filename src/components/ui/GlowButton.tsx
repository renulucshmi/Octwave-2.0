// components/ui/GlowButton.tsx
export function GlowButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: { 
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  [key: string]: any;
}) {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 overflow-hidden group";
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/25',
    secondary: 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg',
    ghost: 'bg-transparent border-2 border-purple-400/50 text-purple-400 hover:bg-purple-400/10 hover:border-purple-400'
  };

  return (
    <button 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/50 to-purple-700/50 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
      )}
    </button>
  );
}