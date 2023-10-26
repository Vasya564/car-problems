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
    <div>
      <label>Make:</label>
      <MakeSelect carData={carData}/>
      <br />
      <label>Model:</label>
      <ModelSelect carData={carData}/>
      <br />
      <label>Year:</label>
      <YearSelect carData={carData}/>
    </div>
  );
}
 
export default CarSelector;