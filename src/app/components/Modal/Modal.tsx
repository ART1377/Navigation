import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  header?: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children, header }: ModalProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.5]"
        >
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
              e.stopPropagation()
            }
            className={`bg-light rounded-2xl w-11/12 max-w-lg mx-auto relative max-h-[80%] overflow-x-hidden overflow-y-auto ${
              isOpen && "animate-slideIn"
            } ${!isOpen && "animate-slideOut"}`}
          >
            {header && header}
            <div className="m-auto p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
