import { useCallback, useEffect, useState } from 'react';
import {
  downvoteQuote,
  GetQuoteParams,
  GetQuoteResponse,
  getQuotes,
  Quote,
  removeDownvoteQuote,
  removeUpvoteQuote,
  upvoteQuote,
} from '../http-services/quotes';

type UseQuotesParams = GetQuoteParams;
export function useQuotes(params: UseQuotesParams) {
  const [data, setData] = useState<GetQuoteResponse>({
    quotes: [],
    quotesCount: 0,
  });

  const updateQuote = useCallback(
    (quote: Quote) => {
      setData((prevData) => {
        const newQuotes = [...prevData.quotes];
        const index = newQuotes.findIndex((q) => q.id === quote.id);
        newQuotes[index] = quote;
        return {
          quotes: newQuotes,
          quotesCount: prevData.quotesCount,
        };
      });
    },
    [setData],
  );

  const upvote = useCallback(
    async (id: string) => {
      const { data } = await upvoteQuote(id);
      updateQuote(data);
    },
    [updateQuote],
  );

  const downvote = useCallback(
    async (id: string) => {
      const { data } = await downvoteQuote(id);
      updateQuote(data);
    },
    [updateQuote],
  );

  const removeUpvote = useCallback(
    async (id: string) => {
      const { data } = await removeUpvoteQuote(id);
      updateQuote(data);
    },
    [updateQuote],
  );

  const removeDownvote = useCallback(
    async (id: string) => {
      const { data } = await removeDownvoteQuote(id);
      updateQuote(data);
    },
    [updateQuote],
  );

  useEffect(() => {
    getQuotes(params).then((res) => {
      setData(res.data);
    });
  }, [params]);

  return {
    ...data,
    upvote,
    removeUpvote,
    downvote,
    removeDownvote,
  };
}
