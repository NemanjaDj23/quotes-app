import React from 'react';
import QuoteView from '../../components/QuoteView/QuoteView';

import styles from './Quotes.module.scss';
import { useQuotes } from '../../hooks/useQuotes';
import { SortBy, SortDirection } from '../../http-services/quotes';
import { useForm } from '../../hooks/useForm';

const quote = {
  id: '147dc7ad-e752-4f7c-9d4d-1bf41153001e',
  content: `You only live once, but if you do it right, once is enough.`,
  author: 'Mae West',
  tags: ['humor', 'life'],
  userId: '49d73d43-e1bc-46b4-88a6-d802d1cc9fe9',
  upvotesCount: 88,
  downvotesCount: 123,
  createdAt: '2020-07-12T10:55:35.090Z',
  upvotedBy: [],
  downvotedBy: ['3de3d9ff-60b1-4694-9e87-77aefea9ea0e', 'd964099a-1a2a-46f5-9782-e2601b5aac9e'],
  givenVote: 'none',
};

const defaultParams = {
  page: 1,
  pageSize: 8,
  sortBy: SortBy.CREATED_AT,
  sortDirection: SortDirection.DESC,
  tags: '',
};

function Quotes() {
  const { values, handleChange } = useForm(defaultParams);
  const { quotes, upvote, downvote, removeUpvote, removeDownvote } = useQuotes(values);

  return (
    <div className={styles.quotes}>
      <h1>Quotes</h1>

      <label>Sort By</label>
      <input type='radio' name='sortBy' value={SortBy.CREATED_AT} onChange={handleChange} />
      <input type='radio' name='sortBy' value={SortBy.AUTHOR} onChange={handleChange} />
      <input type='radio' name='sortBy' value={SortBy.UPVOTES_COUNT} onChange={handleChange} />

      <br />

      <label>Sort Direction</label>
      <input type='radio' name='sortDirection' value={SortDirection.DESC} onChange={handleChange} />
      <input type='radio' name='sortDirection' value={SortDirection.ASC} onChange={handleChange} />

      <br />

      <label>Page Size</label>
      <input type='text' name='pageSize' value={values.pageSize} onChange={handleChange} />

      <br />

      <label>Page</label>
      <input type='number' name='page' value={values.page} onChange={handleChange} />

      <br />

      <label>Tags</label>
      <input type='text' name='tags' value={values.tags} onChange={handleChange} />

      {quotes.map((quote) => (
        <QuoteView
          key={quote.id}
          quote={quote}
          onDownvote={downvote}
          onRemoveDownvote={removeDownvote}
          onRemoveUpvote={removeUpvote}
          onUpvote={upvote}
        />
      ))}
    </div>
  );
}

export default React.memo(Quotes);
