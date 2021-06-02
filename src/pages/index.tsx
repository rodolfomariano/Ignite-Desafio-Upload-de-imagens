import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  
  async function findImages({ pageParam = null }) {
    if (pageParam) {
      const { data } = await api.get('/api/images', {
        params: {
          after: pageParam,
        }
      } as any)

      return data
    }
    const { data } = await api.get('/api/images')
    return data

  } 
  

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    findImages, {
      getNextPageParam: lastPage => lastPage.after ?? null
    }
  );

  const formattedData = useMemo(() => {
    let newArray = []
    const dataItems = data?.pages

    dataItems?.map(item => {
      return newArray = [...newArray, ...item.data]
    })

    return newArray
    
  }, [data]);

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error />
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {! isLoading && hasNextPage && <Button
          mt={30}
          onClick={() => fetchNextPage()}
        >{
          isFetchingNextPage ? 'Carregando...' : 'Carregar mais'
        }</Button>}
      </Box>
    </>
  );
}
