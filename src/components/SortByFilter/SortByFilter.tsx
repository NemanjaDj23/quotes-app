import { SortBy } from '../../http-services/quotes';
import React from 'react';

type SortByFilterProps = {
  value: SortBy;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const labels = {
  [SortBy.AUTHOR]: 'Author name',
  [SortBy.CREATED_AT]: 'Created at',
  [SortBy.UPVOTES_COUNT]: 'Upvotes count',
};

export function SortByFilter({ name, value, onChange }: SortByFilterProps) {
  return (
    <div className='filterWrapper'>
      Sort By
      <div>
        {Object.values(SortBy).map((sortByValue) => (
          <label key={sortByValue} htmlFor={sortByValue}>
            <input
              type='radio'
              id={sortByValue}
              name={name}
              value={sortByValue}
              checked={value === sortByValue}
              onChange={onChange}
            />
            {labels[sortByValue]}
          </label>
        ))}
      </div>
    </div>
  );
}
