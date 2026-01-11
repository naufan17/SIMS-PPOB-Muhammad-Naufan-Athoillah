import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  status?: 'success' | 'error' | 'info';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  icon,
  status = 'info',
  showCloseButton = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'text-green-500 bg-green-50';
      case 'error': return 'text-red-500 bg-red-50';
      default: return 'text-blue-500 bg-blue-50';
    }
  };

  return createPortal(
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}
    >
      <div 
        className={`relative w-full max-w-sm bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex flex-col items-center text-center">
          {icon && (
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-sm ${getStatusColor()}`}>
              {icon}
            </div>
          )}
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          <div className="text-gray-500 font-medium mb-2 whitespace-pre-wrap leading-relaxed">
            {children}
          </div>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="w-full py-3 px-4 text-red-600 font-bold hover:text-red-700 transition-colors focus:outline-none"
            >
              Kembali ke Beranda
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
