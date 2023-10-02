import React, { useState } from 'react';
import QuoteView from '../../components/QuoteView/QuoteView';

import styles from './Quotes.module.scss';
import { useQuotes } from '../../hooks/useQuotes';
import { QuoteInput, SortBy, SortDirection } from '../../http-services/quotes';
import { useForm } from '../../hooks/useForm';
import AddQuoteModal from '../../components/AddQuoteModal/AddQuoteModal';
import { SortByFilter } from '../../components/SortByFilter/SortByFilter';
import { SortDirectionControl } from '../../components/SortDirectionControl/SortDirectionControl';
import Pagination from '../../components/Pagination/Pagination';
import PageSizeControl from '../../components/PageSizeControl/PageSizeControl';
import TagsFilterControl from '../../components/TagsFilterControl/TagsFilterControl';

const defaultParams = {
  page: 1,
  pageSize: 5,
  sortBy: SortBy.CREATED_AT,
  sortDirection: SortDirection.DESC,
  tags: '',
};

function Quotes() {
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);
  const { values, handleChange } = useForm(defaultParams);
  const { quotes, quotesCount, tags, upvote, downvote, removeUpvote, removeDownvote, addQuote } =
    useQuotes(values);

  const handleOpenModal = () => {
    setShowAddQuoteModal(true);
  };

  const handleCloseModal = () => {
    setShowAddQuoteModal(false);
  };

  const handleSubmitModalForm = (formData: QuoteInput) => {
    addQuote(formData);
    handleCloseModal();
  };

  return (
    <div className={styles.quotes}>
      <h1>Quotes</h1>
      <button onClick={handleOpenModal} className={styles.btnGreen}>
        Add Quote
      </button>
      <div className={styles.container}>
        <div className={styles.filtersWrapper}>
          <SortByFilter value={values.sortBy} name='sortBy' onChange={handleChange} />

          <SortDirectionControl
            name='sortDirection'
            value={values.sortDirection}
            sortBy={values.sortBy}
            onChange={handleChange}
          />

          <TagsFilterControl
            tags={tags}
            currentTag={values.tags}
            onChangeSelectedTag={handleChange}
          />
        </div>

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
        <div className={styles.pageControlsWrapper}>
          <PageSizeControl
            currentPageSize={values.pageSize}
            onChangePageSize={handleChange}
          ></PageSizeControl>
          <Pagination
            currentPage={values.page}
            pageSize={values.pageSize}
            totalItems={quotesCount}
            onPageChange={handleChange as any}
          />
        </div>
        {showAddQuoteModal && (
          <AddQuoteModal onClose={handleCloseModal} onSubmit={handleSubmitModalForm} />
        )}
      </div>
    </div>
  );
}

export default React.memo(Quotes);
