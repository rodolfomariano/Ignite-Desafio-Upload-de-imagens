import { Box, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  // TODO MODAL USEDISCLOSURE
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [image, setImage] = useState('')

  // TODO FUNCTION HANDLE VIEW IMAGE
  function handleViewImage(image: string) {
    setImage(image)
  }

  return (
    <SimpleGrid columns={3} spacing={10}>
      {cards.map(card => {
        return <Box onClick={onOpen}>
          <Card data={card} viewImage={() => handleViewImage(card.url)} />
        </Box>
      })}
      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={image} />

    </SimpleGrid>
  );
}
