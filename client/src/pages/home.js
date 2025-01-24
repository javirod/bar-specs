import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
    const [specs, setSpecs] = useState([]);

    useEffect(() => {
        const fetchSpec = async () => {
            try {
                const response = await axios.get("http://localhost:3001/specs");
                setSpecs(response.data);
            } catch(err) {
                console.error(err);
            }
        };
        fetchSpec();        
    }, []);

    return (
        <div>
            <h1>Drink Specs</h1>
            <ul>
                {specs.map((spec) => (
                    <li key={spec._id}>
                        <div>
                            <h2>{spec.name}</h2>
                        </div>
                        <ul>
                            {spec.ingredients.map((ings) => (
                                <li className="ing-list">
                                    {ings}
                                </li>
                            ))}
                        </ul>
                        <img src={spec.imageUrl} alt={spec.name}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}