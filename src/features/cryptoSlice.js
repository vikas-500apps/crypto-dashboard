import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch data with retry logic
const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  let attempt = 0;

  // Define a function that will handle the retry delay
  const retryDelay = (attempt) => new Promise((resolve) => setTimeout(resolve, delay * attempt));

  // Retry loop
  while (attempt < retries) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // If the error is due to rate limiting, retry with exponential backoff
        attempt++;
        console.warn(`Rate limit hit, retrying attempt ${attempt}...`);
        await retryDelay(attempt); // Call the delay function outside of the loop
      } else {
        throw error; // Rethrow other errors
      }
    }
  }
  throw new Error('API request failed after retries');
};

// Async Thunk to fetch data
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const response = await fetchWithRetry('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    return response;
  }
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
