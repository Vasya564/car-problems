import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MakeSelect = ({ carData }) => {
    const { state, dispatch } = useContext(AppContext)
    const { make } = state

    const handleMakeChange = (event) => {
        const selectedMake = event.target.value;
        dispatch({ type: 'UPDATE_MAKE', payload: selectedMake });
        dispatch({ type: 'UPDATE_MODEL', payload: '' }); // Reset model and year when make changes
        dispatch({ type: 'UPDATE_YEAR', payload: '' });
    }

    return (
        <select
        value={make}
        onChange={handleMakeChange}
        >
        <option value="">Select Make</option>
        {carData.map((car) => (
            <option key={car.make} value={car.make}>
            {car.make}
            </option>
        ))}
        </select>
    );
}
 
export default MakeSelect;