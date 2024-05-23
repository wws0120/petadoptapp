import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function AnimalListToolbar({ selectedItems, handleDeleteClick }) {
  return (
    <div className="py-4">
      <Link
        to="/dashboard/animalcreate"
        className="button-base button-quaternary "
      >
        Create
        <span>
          <Icon className="w-5 h-5 ml-1" icon="basil:add-outline" />
        </span>
      </Link>

      {selectedItems.length > 0 && (
        <button
          onClick={() => {
            handleDeleteClick(selectedItems);
          }}
          className="button-base button-danger ml-2"
        >
          <span className="flex items-center justify-center">
            <span className="ml-2">Batch Delete</span>
            <span>
              <Icon className="w-5 h-5 ml-1" icon="iconamoon:trash-duotone" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

export default AnimalListToolbar;
