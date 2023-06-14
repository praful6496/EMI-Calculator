import { Box, Container, Grid, List, ListIcon, ListItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CalculatorForm from '../components/CalculatorForm'
import EMITable from '../components/EMITable'
import { addToHistory, getHistory } from '../utils/localStorage'
import History from '../components/History'
import { useNavigate } from 'react-router-dom'
import { FaAngellist } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('');
    const [emiData, setEmiData] = useState([{
        emi_amount: 0,
        principal: 0,
        interest: 0,
        balance_amount: 0
    }]);
    const [FormData, setFormData] = useState(null)
    const [history, setHistory] = useState([]);
    const [monthly_emi, setMonthly_Emi] = useState(0);
    const [total_interest_amount, setTotal_Interest_Amount] = useState(0);
    const [total_amount_payable, setTotal_Amount_Payable] = useState(0);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('loggedInUser'))
        const history = getHistory()

        setCurrentUser(user.userid)
        setHistory(history)
    }, [])

    const handleSubmit = (principal, interestRate, duration) => {
        const emi = calculateEMI(principal, interestRate, duration);
        const history = addToHistory(currentUser, emi, { principal, interestRate, duration });
        const sum = emi.reduce((prev, curr) => { return prev + curr.interestRate }, 0)
        setHistory(history)
        setEmiData(emi)

        setMonthly_Emi(emi[0].emi);
        setTotal_Interest_Amount(sum);
        setTotal_Amount_Payable(parseInt(principal) + parseInt(sum));


        console.log(principal);

    };

    const calculateEMI = (principal, interestRate, duration) => {
        const monthlyInterestRate = interestRate / 100 / 12;
        const totalMonths = duration;

        const emi =
            Math.ceil((principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
                (Math.pow(1 + monthlyInterestRate, totalMonths) - 1));

        const emiData = [];
        let balance = principal;

        for (let month = 1; month <= totalMonths; month++) {
            const interestComponent = Math.ceil(balance * monthlyInterestRate);
            const principalComponent = emi - interestComponent;
            balance -= principalComponent;

            emiData.push({
                month,
                emi: parseInt(emi),
                principal: Math.ceil(principalComponent),
                interestRate: ((emi) - Math.ceil(principalComponent)),
                balance: Math.ceil(balance) < 0 ? 0 : Math.ceil(balance)
            });
        }

        return emiData;
    };

    const handleSearch = (entry) => {
        setEmiData(entry.entries)
        setFormData({
            ...FormData,
            principal: entry.originalData.principal,
            interestRate: entry.originalData.interestRate,
            duration: entry.originalData.duration
        })

        const sum = entry.entries.reduce((prev, curr) => { return prev + curr.interestRate }, 0)
        setMonthly_Emi(entry.entries[0].emi);
        setTotal_Interest_Amount(sum);
        setTotal_Amount_Payable(parseInt(entry.originalData.principal) + parseInt(sum));
    };

    const handleLogout = () => {
        navigate("/login")
    };

    return (
        <Container maxW="xl" py={12}>
            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                <Grid>
                    <CalculatorForm history={history} onSubmit={handleSubmit} data={FormData !== null && FormData} />
                    <Box mt="15" mb="15">
                        <List spacing={3}>
                            <ListItem display="flex" justifyContent="space-between">
                                <div>
                                    <ListIcon as={FaAngellist} color='teal' />Monthly EMI :
                                </div>
                                <div>{monthly_emi} </div>
                            </ListItem>

                            <ListItem display="flex" justifyContent="space-between">
                                <div>
                                    <ListIcon as={FaAngellist} color='teal' />Total Interest Amount :
                                </div>
                                <div>{total_interest_amount} </div>
                            </ListItem>

                            <ListItem display="flex" justifyContent="space-between">
                                <div>
                                    <ListIcon as={FaAngellist} color='teal' />Total Amount Payable :
                                </div>
                                <div>{total_amount_payable} </div>
                            </ListItem>
                        </List>
                    </Box>
                    {
                        emiData.length > 1 && <EMITable emiData={emiData} />
                    }
                </Grid>
                {
                    history.length !== 0 && (
                        <Grid>
                            <History history={history} onSearch={handleSearch} onLogout={handleLogout} />
                        </Grid>
                    )
                }
            </Grid>
        </Container>
    )
}

export default Home