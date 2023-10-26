import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CarCategory = () => {
    const { state, dispatch } = useContext(AppContext);
    const { category } = state
    
    const carCategories = [
        'Engine And Engine Cooling',
        'Electrical System',
        'Power Train',
        'Air Bag',
        'Service Brakes',
        'Steering',
        'Equipment',
        'Structure',
        'Suspension',
        'Vehicle Speed Control',
        'Other Fuel System',
        'Visibility',
        'Exterior Lighting',
        'Gasoline Fuel System',
        'Tire',
    ];

    const handleOptionChange = (event) => {
        const selectedCategory = event.target.value;
        dispatch({ type: 'UPDATE_CATEGORY', payload: selectedCategory})
    };

    return (
        <div>
            <form>
                {carCategories.map((option, index) => (
                <div key={index}>
                    <label>
                        <input
                        type="radio"
                        name="radioGroup"
                        value={option}
                        checked={category === option}
                        onChange={handleOptionChange}
                        />
                        {option}
                    </label>
                    <br />
                </div>
                ))}
            </form>
        </div>
    );
}
 
export default CarCategory;