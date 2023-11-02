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

    const handleSaveData = () => { 
        const textData = `${problems.join("\n")}`;
        const blob = new Blob([textData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${make.replace('/', '')}-${model.replace('/', '')}-${year.replace('/', '')}-${category}.txt`;

        a.click();

        URL.revokeObjectURL(url);
    };


    return (
        <div>
            <button onClick={handleFetchProblem}>Search for problem</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p> // Display the error message
            ) : (
                problems.length > 0 && (
                <div className="problem">
                    <ul className="problem-list">
                        {problems.map((data, index) => (
                            <div className="problem-list-item" key={index}>
                                <h4>{category} №{index + 1}</h4>
                                <li>{data}</li>
                            </div>
                        ))}
                    </ul>
                    <button onClick={handleSaveData}>Save results</button>
                </div>
                )
            )}
        </div>
    );
}
 
export default CarProblem;