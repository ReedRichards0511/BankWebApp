import { DotsVerticalIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';

interface MoreActionsComponentProps {
  row: any; 
  handleOpenModalDelete: (row: any) => void;
  handleOpenModalEdit: (row: any) => void;
}

export const MoreActionsComponent: FC<MoreActionsComponentProps> = ({ row, handleOpenModalDelete, handleOpenModalEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className="px-6 py-4 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <DotsVerticalIcon />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={() => {
                handleOpenModalEdit(row);
                setIsOpen(false);
              }}
            >
              Editar
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
              onClick={() => {
                handleOpenModalDelete(row);
                setIsOpen(false);
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
