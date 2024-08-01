import axios from 'axios';
export const fetchData = async (city: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      );
    //   setWeatherData(response.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };