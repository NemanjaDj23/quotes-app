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
function QuoteView({
  quote,
  onUpvote,
  onRemoveUpvote,
  onDownvote,
  onRemoveDownvote,
}: QuoteViewProps) {
  const votePercentage = Math.round(
    (quote.upvotesCount / (quote.upvotesCount + quote.downvotesCount)) * 100,
  );

  const handleUpvoteClick = () => {
    const { id } = quote;
    quote.givenVote === GivenVote.UPVOTE ? onRemoveUpvote(id) : onUpvote(id);
  };

  const handleDownvoteClick = () => {
    const { id } = quote;
    quote.givenVote === GivenVote.DOWNVOTE ? onRemoveDownvote(id) : onDownvote(id);
  };

  return (
    <div className={styles.quoteView}>
      <div className={styles.votes}>
        <button onClick={handleUpvoteClick}>
          <FontAwesomeIcon icon={faSortUp} />
        </button>
        <div>{votePercentage}%</div>
        <div>
          {quote.upvotesCount} / {quote.downvotesCount}
        </div>
        <button onClick={handleDownvoteClick}>
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
