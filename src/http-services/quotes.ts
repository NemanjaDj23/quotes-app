import { request } from './request';
import { API_ROUTES } from './routes';
import { addSearchUrlParams, replaceUrlParamsWithValues } from '../helpers/urlHelpers';

export enum GivenVote {
  DOWNVOTE = 'downvote',
  UPVOTE = 'upvote',
  NONE = 'none',
}

export type Quote = {
  id: string;
  content: string;
  author: string;
  tags: string[];
  upvotesCount: number;
  downvotesCount: number;
  createdAt: string;
  givenVote: GivenVote;
};

export enum SortBy {
  CREATED_AT = 'createdAt',
  AUTHOR = 'author',
  UPVOTES_COUNT = 'upvotesCount',
}
export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export type GetQuoteParams = {
  pageSize: number;
  page: number;
  sortBy: SortBy;
  sortDirection: SortDirection;
  tags: string;
};

export type GetQuoteResponse = {
  quotesCount: number;
  quotes: Quote[];
};

export async function getQuotes(params: GetQuoteParams) {
  const url = addSearchUrlParams(API_ROUTES.QUOTES, params);
  return await request<GetQuoteResponse>({
    url,
    method: 'GET',
    useToken: true,
  });
}

export type QuoteInput = {
  content: string;
  author: string;
  tags: string[];
};

export async function postQuote(quoteInput: QuoteInput) {
  return await request<Quote>({
    url: API_ROUTES.QUOTES,
    method: 'POST',
    body: quoteInput,
    useToken: true,
  });
}

export async function upvoteQuote(id: string) {
  const url = replaceUrlParamsWithValues(API_ROUTES.QUOTE_UPVOTE, { id });
  return await request<Quote>({
    url,
    method: 'POST',
    useToken: true,
  });
}

export async function removeUpvoteQuote(id: string) {
  const url = replaceUrlParamsWithValues(API_ROUTES.QUOTE_UPVOTE, { id });
  return await request<Quote>({
    url,
    method: 'DELETE',
    useToken: true,
  });
}

export async function downvoteQuote(id: string) {
  const url = replaceUrlParamsWithValues(API_ROUTES.QUOTE_DOWNVOTE, { id });
  return await request<Quote>({
    url,
    method: 'POST',
    useToken: true,
  });
}

export async function removeDownvoteQuote(id: string) {
  const url = replaceUrlParamsWithValues(API_ROUTES.QUOTE_DOWNVOTE, { id });
  return await request<Quote>({
    url,
    method: 'DELETE',
    useToken: true,
  });
}
