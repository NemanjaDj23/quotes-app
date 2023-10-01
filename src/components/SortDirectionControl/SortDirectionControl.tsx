import { SortBy, SortDirection } from '../../http-services/quotes';
import React from 'react';

type SortDirectionControlProps = {
  name: string;
  value: SortDirection;
  sortBy: SortBy;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const labels = {
  [SortBy.AUTHOR]: {
    [SortDirection.ASC]: 'A - Z',
    [SortDirection.DESC]: 'Z - A',
  },
  [SortBy.CREATED_AT]: {
    [SortDirection.ASC]: 'Oldest first',
    [SortDirection.DESC]: 'Newest first',
  },
  [SortBy.UPVOTES_COUNT]: {
    [SortDirection.ASC]: 'Least upvotes',
    [SortDirection.DESC]: 'Most upvotes',
  },
};

export function SortDirectionControl({ name, value, sortBy, onChange }: SortDirectionControlProps) {
  return (
    <div className='filterWrapper'>
      Sort Direction
      <div className='flex'>
        {Object.values(SortDirection).map((sortDirectionValue) => (
          <label key={sortDirectionValue} htmlFor={sortDirectionValue}>
            <input
              type='radio'
              id={sortDirectionValue}
              name={name}
              value={sortDirectionValue}
              checked={value === sortDirectionValue}
              onChange={onChange}
            />
            {labels[sortBy][sortDirectionValue]}
          </label>
        ))}
      </div>
    </div>
  );
}
