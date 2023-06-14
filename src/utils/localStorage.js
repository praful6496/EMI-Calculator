const CREDENTIALS_KEY = 'userCredentials';

const getHistory = () => {
  let user = JSON.parse(localStorage.getItem('loggedInUser'))
  if ( user !== null && user !== undefined ) {
    const userHistory = localStorage.getItem(`calculationHistory_${user.userid}`);
    return userHistory ? JSON.parse(userHistory) : [];
  }
};

const addToHistory = (username, entry, originalData) => {
  entry = {
    originalData,
    entries: entry
  }
  const userHistory = getHistory();
  const updatedHistory = [...userHistory, entry];
  localStorage.setItem(`calculationHistory_${username}`, JSON.stringify(updatedHistory));
  return updatedHistory;
};

const setUserCredentials = (credentials) => {
  localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
};

const getUserCredentials = () => {
  const storedCredentials = localStorage.getItem(CREDENTIALS_KEY);
  return storedCredentials ? JSON.parse(storedCredentials) : null;
};

export { getHistory, addToHistory, setUserCredentials, getUserCredentials };