import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const CarProblem = () => {
    const PROBLEM_URL = import.meta.env.VITE_API_URL + 'scrape/problem';

    const { state } = useContext(AppContext);
    const { make, model, year, category } = state
    const [ problems, setProblems ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetchProblem = () => {
        setIsLoading(true);
        setError(null);

        const data = {
            make,
            model,
            year,
            category
        }

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };


        fetch(PROBLEM_URL, requestOptions)
            .then((response) => {
                if (!response.ok) {
                throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProblems(data);
                setError(null);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Cannot find a problem");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }


    return (
        <div>
            <button onClick={handleFetchProblem}>Search for problem</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p> // Display the error message
            ) : (
                <ul style={{ width: '700px', margin: '0 auto'}}>
                    {problems && problems.map((data, index) => (
                        <div key={index}>
                            <li>{data}</li>
                            <br />
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
 
export default CarProblem;