// export default function getData = async () : Promise<any> => {
//   try {
//     const response = await fetch(`http://127.0.0.1:8000/api/organisationUser`); // Replace '/api/organisations' with your actual API endpoint
//     if (!response.ok) {
//       throw new Error('Failed to fetch organisations');
//     }
//     const data = await response.json();
//     setOrganisations(data);
//   } catch (error) {
//     console.error('Error fetching organisations:', error);
//   }
// }

import useSWR from "swr"
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface GetDataOptions {
  apiEndpoint: string;
}

export const getData = ({apiEndpoint}: GetDataOptions) => {
  const { data, error, isLoading } = useSWR(apiEndpoint, fetcher, {
    revalidateOnFocus: true, // Revalidate when the tab/window is focused
    revalidateOnReconnect: true, // Revalidate when the network reconnects
    refreshInterval: 3000, // Set your desired interval in milliseconds
  });

  return {data, error, isLoading}
}