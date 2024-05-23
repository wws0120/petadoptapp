import React from 'react';
import { Link } from 'react-router-dom';
import AdoptionSelectBox from './adoptionSelectBox';

function AdoptionListToolbar({ setStatusFilter }) {
  return (
    <div className="py-4">
      <AdoptionSelectBox setStatusFilter={setStatusFilter} />
    </div>
  );
}

export default AdoptionListToolbar;
