import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';


const CalculatorForm = ({ onSubmit, data }) => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [duration, setDuration] = useState(0);
  const [active, setActive] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(true)
    onSubmit(principal, interestRate, duration);
  };

  useEffect(() => {
    if (data) {
      setPrincipal(data.principal)
      setInterestRate(data.interestRate)
      setDuration(data.duration)
    }
  }, [data])

  useEffect(() => {
    setActive(false)
  }, [principal, interestRate, duration])

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Principal Amount</FormLabel>
          <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Rate of Interest</FormLabel>
          <Input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Duration (in months)</FormLabel>
          <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" isDisabled={active}>Submit</Button>
      </form>
    </Box>
  );
};

export default CalculatorForm;
