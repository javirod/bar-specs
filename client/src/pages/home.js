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
                const response = await axios.get("https://bar-specs-be.onrender.com/specs");
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
            <div className="search-container">
                <input className="drink-search"
                    type="text"
                    value={searchItem}
                    onChange={handleInputChange}
                    placeholder="Search"
                />
            </div>
            {loading && <p className="loading">Loading...</p>}
            {error && <p className="loading">There was an error loading the specs</p>}
            {filteredSpecs.length === 0
                ? <h3 className="loading">No drinks found</h3>
                : <ul>
                    <div className="drink-container">
                        {filteredSpecs.map((spec) => (
                            <li key={spec._id} className="drink-card">
                                <div>
                                    <h2>{spec.name}</h2>
                                </div>
                                <div className="ings-card">
                                    <ul>
                                        {spec.ingredients.map((ings) => (
                                            <li className="ing-list">
                                                {ings}
                                            </li>
                                        ))}
                                    </ul>
                                    <details >
                                        <summary>Glassware/Garnish:</summary>
                                        <p>{spec.glassware}</p>
                                        {spec.garnish.map((garnish) => (<li className="ing-list">{garnish}</li>))}
                                    </details>
                                </div>
                                {/* <img src={spec.imageUrl} alt={spec.name}/> */}
                            </li>
                        ))}
                    </div>
                </ul>
            }
        </div>
    );
}