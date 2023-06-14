import React from 'react';
import { Box, Button, List, ListItem } from '@chakra-ui/react';

const History = ({ history, onSearch }) => {
  return (
    <Box p={4} bg="gray.100">
      <List spacing={2}>
        {history.map((entry, index) => (
          <ListItem key={index}>
            <Button variant="outline" onClick={() => onSearch(entry)}>
              Calculation {index + 1}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default History;
