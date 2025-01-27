import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/v1';

export const fetchGames = async (filterType: string, searchTerm: string) => {
  try {
    console.log('filterType:', filterType);
    console.log('searchTerm:', searchTerm);
    const response = await axios.get(`${API_BASE}/games/search?${filterType}=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar jogos:', error);
    return [];
  }
};

export const fetchAllGames = async (): Promise<any[]> => {
  const response = await axios.get(`${API_BASE}/games`);
  return Array.isArray(response.data) ? response.data : [];
};

export const spinSlotMachine = async (balance: number): Promise<{ reels: string[], balance: number, reward: number }> => {
  const response = await axios.post(`${API_BASE}/slot-machine/spin`, { balance });
  return response.data;
};

export const convertBalance = async (amount: number, from: string, to: string): Promise<number> => {
  const response = await axios.post(`${API_BASE}/slot-machine/convert-currency`, { amount, from, to });
  return response.data;
};
