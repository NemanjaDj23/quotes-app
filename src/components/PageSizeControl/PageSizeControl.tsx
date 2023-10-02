import React from 'react';

type PageSizeControl = {
  currentPageSize: number;
  onChangePageSize: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const pageSizeOptions = [5, 10, 20, 50];
function PageSizeControl({ currentPageSize, onChangePageSize }: PageSizeControl) {
  return (
    <div className='dropdown-select'>
      Per page
      <select value={currentPageSize} name='pageSize' onChange={onChangePageSize}>
        {pageSizeOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.memo(PageSizeControl);
