import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ModelSelect = ({ carData }) => {
    const { state, dispatch } = useContext(AppContext);
    const { make, model } = state;

    const handleModelChange = (event) => {
        const selectedModel = event.target.value;
        dispatch({ type: 'UPDATE_MODEL', payload: selectedModel });
        dispatch({ type: 'UPDATE_YEAR', payload: '' }); // Reset year when model changes
    }
    return ( 
        <select
        value={model}
        onChange={handleModelChange}
        disabled={!make} // Disable if "Make" is not selected
        >
        <option value="">Select Model</option>
        {carData
            .find((car) => car.make === make)
            ?.models.map((m) => (
            <option key={m.model} value={m.model}>
                {m.model}
            </option>
            ))}
        </select>
    );
}
 
export default ModelSelect;