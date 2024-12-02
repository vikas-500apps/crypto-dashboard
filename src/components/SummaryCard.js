import React from 'react';

const SummaryCard = ({ data, theme }) => {
  const highestPrice = Math.max(...data.map(coin => coin.current_price));
  const lowestPrice = Math.min(...data.map(coin => coin.current_price));
  const averageMarketCap = data.reduce((sum, coin) => sum + coin.market_cap, 0) / data.length;
  const totalVolume = data.reduce((sum, coin) => sum + coin.total_volume, 0);
  const averagePriceChange = data.reduce((sum, coin) => sum + coin.price_change_percentage_24h, 0) / data.length;

  return (
    <div className={`rounded-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Highest Price</p>
          <p className={`mt-1 text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${highestPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Lowest Price</p>
          <p className={`mt-1 text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${lowestPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Average Market Cap</p>
          <p className={`mt-1 text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${averageMarketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Total Volume</p>
          <p className={`mt-1 text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>${totalVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div>
          <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Average 24h Price Change</p>
          <p className={`mt-1 text-2xl font-semibold ${averagePriceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>{averagePriceChange.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;

