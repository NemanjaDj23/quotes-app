import { useCallback, useEffect, useState } from 'react';
import {
  downvoteQuote,
  GetQuoteParams,
  GetQuoteResponse,
  getQuotes,
  getTags,
  postQuote,
  Quote,
  QuoteInput,
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

  const [tags, setTags] = useState<string[]>([]);

  const fetchQuotes = useCallback(async () => {
    const res = await getQuotes(params);
    setData(res.data);
  }, [params]);

  const fetchTags = useCallback(async () => {
    const res = await getTags();
    setTags(res.data);
  }, []);

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

  const addQuote = useCallback(
    async (formData: QuoteInput) => {
      await postQuote(formData);
      await Promise.all([fetchQuotes(), fetchTags()]);
    },
    [fetchQuotes, fetchTags],
  );

  useEffect(() => {
    fetchQuotes();
    fetchTags();
  }, [fetchQuotes, fetchTags]);

  return {
    ...data,
    tags,
    upvote,
    removeUpvote,
    downvote,
    removeDownvote,
    addQuote,
  };
}
