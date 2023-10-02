import React from 'react';

type TagsFilterProps = {
  currentTag: string;
  tags: string[];
  onChangeSelectedTag: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function TagsFilterControl({ currentTag, tags, onChangeSelectedTag }: TagsFilterProps) {
  return (
    <div className='dropdown-select'>
      Tags
      <select value={currentTag} name='tags' onChange={onChangeSelectedTag}>
        <option value=''>Select tag</option>
        {tags?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.memo(TagsFilterControl);
