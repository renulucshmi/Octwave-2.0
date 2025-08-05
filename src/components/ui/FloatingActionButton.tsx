// components/ui/FloatingActionButton.tsx
export function FloatingActionButton({ 
  onClick, 
  icon, 
  label,
  position = 'bottom-right' 
}: { 
  onClick: () => void;
  icon: React.ReactNode;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}) {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  return (
    <button
      onClick={onClick}
      className={`fixed ${positionClasses[position]} z-40 p-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group`}
      aria-label={label}
    >
      <div className="w-6 h-6 flex items-center justify-center">
        {icon}
      </div>
      {label && (
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {label}
        </span>
      )}
    </button>
  );
}
