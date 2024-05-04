import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getData = (apiEndpoint: string) => {
  const { data, error, isLoading } = useSWR(apiEndpoint, fetcher, {
    revalidateOnFocus: true, // Revalidate when the tab/window is focused
    revalidateOnReconnect: true, // Revalidate when the network reconnects
    refreshInterval: 3000, // Set your desired interval in milliseconds
  });
  return {data, error, isLoading}
}

export const getData2 = (apiEndpoint: string) => {
  const { data, error, isLoading } = useSWR(apiEndpoint, fetcher, {
    revalidateOnFocus: true, // Revalidate when the tab/window is focused
    revalidateOnReconnect: true, // Revalidate when the network reconnects
    refreshInterval: 3000, // Set your desired interval in milliseconds
  });

  return {data, error, isLoading}
}