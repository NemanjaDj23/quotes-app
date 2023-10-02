import React from 'react';
import { GivenVote, Quote } from '../../http-services/quotes';
import styles from './QuoteView.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

type QuoteViewProps = {
  quote: Quote;
  onUpvote: (id: string) => void;
  onRemoveUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  onRemoveDownvote: (id: string) => void;
};

function getColorFromPercentage(percentage: number) {
  if (percentage < 20) {
    return '#d3673e';
  } else if (percentage < 40) {
    return '#c28150';
  } else if (percentage < 60) {
    return '#eaba33';
  } else if (percentage < 80) {
    return '#c9f12a';
  } else {
    return '#7fd329';
  }
}

function QuoteView({
  quote,
  onUpvote,
  onRemoveUpvote,
  onDownvote,
  onRemoveDownvote,
}: QuoteViewProps) {
  const votePercentage =
    quote.upvotesCount + quote.downvotesCount > 0
      ? Math.round((quote.upvotesCount / (quote.upvotesCount + quote.downvotesCount)) * 100)
      : 0;

  const isUpvoted = quote.givenVote === GivenVote.UPVOTE;
  const isDownvoted = quote.givenVote === GivenVote.DOWNVOTE;

  const handleUpvoteClick = () => {
    const { id } = quote;
    isUpvoted ? onRemoveUpvote(id) : onUpvote(id);
  };

  const handleDownvoteClick = () => {
    const { id } = quote;
    isDownvoted ? onRemoveDownvote(id) : onDownvote(id);
  };

  return (
    <div className={styles.quoteView}>
      <div className={styles.votes}>
        <button data-active={isUpvoted} disabled={isDownvoted} onClick={handleUpvoteClick}>
          <FontAwesomeIcon icon={faSortUp} />
        </button>
        <div
          className={styles.percentage}
          style={{ color: getColorFromPercentage(votePercentage) }}
        >
          {votePercentage}%
        </div>
        <div>
          {quote.upvotesCount} / {quote.downvotesCount}
        </div>
        <button data-active={isDownvoted} disabled={isUpvoted} onClick={handleDownvoteClick}>
          <FontAwesomeIcon icon={faSortDown} />
        </button>
      </div>
      <div className={styles.content}>
        <div>{quote.content}</div>
        <span>{quote.author}</span>
      </div>
    </div>
  );
}

export default React.memo(QuoteView);
