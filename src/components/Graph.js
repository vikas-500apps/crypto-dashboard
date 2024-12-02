import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = ({ data, theme }) => {
  const [chartType, setChartType] = useState('line');
  const [dataType, setDataType] = useState('price');

  const chartData = data.map(coin => ({
    name: coin.symbol,
    price: coin.current_price,
    marketCap: coin.market_cap,
    volume: coin.total_volume,
    priceChange: coin.price_change_percentage_24h
  }));

  const getColor = (theme, type) => {
    const colors = {
      light: {
        price: '#8884d8',
        marketCap: '#82ca9d',
        volume: '#ffc658',
        priceChange: '#ff7300'
      },
      dark: {
        price: '#8884d8',
        marketCap: '#82ca9d',
        volume: '#ffc658',
        priceChange: '#ff7300'
      }
    };
    return colors[theme][type];
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className={`mt-1 block w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
          className={`mt-1 block w-1/3 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        >
          <option value="price">Price</option>
          <option value="marketCap">Market Cap</option>
          <option value="volume">Volume</option>
          <option value="priceChange">24h Price Change</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {chartType === 'line' ? (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
            <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                color: theme === 'dark' ? '#FFFFFF' : '#000000',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataType} stroke={getColor(theme, dataType)} activeDot={{ r: 8 }} />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
            <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#4B5563'} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                borderColor: theme === 'dark' ? '#374151' : '#E5E7EB',
                color: theme === 'dark' ? '#FFFFFF' : '#000000',
              }}
            />
            <Legend />
            <Bar dataKey={dataType} fill={getColor(theme, dataType)} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;

