import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const YearSelect = ({carData}) => {
    const { state, dispatch } = useContext(AppContext);
    const { make, model, year } = state;

    const handleYearChange = (event) => {
        const selectedYear = event.target.value;
        dispatch({ type: 'UPDATE_YEAR', payload: selectedYear });
    }

    return (
        <select
        value={year}
        onChange={handleYearChange}
        disabled={!make || !model} // Disable if "Make" or "Model" is not selected
        >
        <option value="">Select Year</option>
        {carData
            .find((car) => car.make === make)
            ?.models.find((m) => m.model === model)
            ?.years.map((y) => (
            <option key={y} value={y}>
                {y}
            </option>
            ))}
        </select>
    );
}
 
export default YearSelect;