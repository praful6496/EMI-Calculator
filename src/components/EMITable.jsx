import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const EMITable = ({ emiData }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Month</Th>
          <Th>EMI Amount</Th>
          <Th>Principal</Th>
          <Th>Interest</Th>
          <Th>Balance Amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {emiData.length > 1 && emiData.map((emi, index) => (
          <Tr key={index}>
            <Td>{emi.month}</Td>
            <Td>{emi.emi}</Td>
            <Td>{emi.principal}</Td>
            <Td>{emi.interestRate}</Td>
            <Td>{emi.balance}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EMITable;
