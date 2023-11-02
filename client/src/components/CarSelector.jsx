import { useState, useEffect } from 'react';
import MakeSelect from './MakeSelect';
import ModelSelect from './ModelSelect';
import YearSelect from './YearSelect';

const CarSelector = () => {
  const CARS_URL = import.meta.env.VITE_API_URL + 'cars';

  const [carData, setCarData] = useState([]);

  useEffect(() => {
    fetch(CARS_URL)
      .then((response) => response.json())
      .then((data) => {
        setCarData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
    
  return (
    <fieldset className='car-form'>
      <legend>Select car:</legend>
      <MakeSelect carData={carData}/>
      <ModelSelect carData={carData}/>
      <YearSelect carData={carData}/>
    </fieldset>
  );
}
 
export default CarSelector;