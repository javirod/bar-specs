import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
    const [specs, setSpecs] = useState([]);
    const [searchItem, setSearchItem] = useState('')
    const [filteredSpecs, setFilteredSpecs] = useState(specs)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchSpec = async () => {
            try {
                const response = await axios.get("http://localhost:3001/specs");
                setSpecs(response.data);
                setFilteredSpecs(response.data);
            } catch(err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSpec();        
    }, []);

    const handleInputChange = (e) => { 
        const searchTerm = e.target.value;
        setSearchItem(searchTerm)

        const filteredItems = specs.filter((spec) => 
            spec.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
            setFilteredSpecs(filteredItems);
        
    };

    return (
        <div>
            <h1>Drink Specs</h1>
            <input className="drink-search"
                type="text"
                value={searchItem}
                onChange={handleInputChange}
                placeholder="Search"
            />
            {loading && <p>Loading...</p>}
            {error && <p>There was an error loading the specs</p>}
            {filteredSpecs.length === 0
                ? <h3>No drinks found</h3>
                : <ul>
                    {filteredSpecs.map((spec) => (
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
            }
        </div>
    );
}