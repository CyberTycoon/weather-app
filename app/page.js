"use client";
import { useState } from 'react';
import axios from 'axios';



export default function Home() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3f420190590cb3679a8d8fb9d93288d7&units=metric`);
      setWeather(response.data);
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen pt-40 text-white"  style={{ backgroundImage: `url("/sunny.png")`, backgroundSize: 'cover'}}>
      <h1 className="text-4xl mb-4 w-50 m-auto">Weather Watch</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <label className="w-50 m-auto font-extrabold text-xl md:text-4xl mb-4">
          Enter Current Location:
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block h-10 w-40 md:w-50 text-black mt-1 px-2 py-1 m-auto border border-gray-600 rounded"
          />
        </label>
        <button
          type="submit"
          className="px-8 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>
      {loading && <p className="mt-4">Loading...........</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {weather && (
        <div className="mt-4">
          <h2 className="text-2xl">{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
      <footer className="pt-40 text-white py-4 md:flex items-end">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div>
          <p className="text-sm">© {new Date().getFullYear()} Silas Okanlawon. All rights reserved.</p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>
    </div>
    
  );
}
