import { useLocation } from 'react-router';

export const useGetSearchParams = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search);
  const searchParams = Object.fromEntries(query.entries());
  return searchParams;
};