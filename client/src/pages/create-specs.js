import axios from "axios";
import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const CreateSpecs = () => {
    const userID = useGetUserID();

    const [spec, setSpec] = useState({
        name: "",
        ingredients: [],
        garnish: [],
        glassware: "",
        imageUrl: "",
        userOwner: userID,
    });

    const navigate = useNavigate();
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSpec({...spec, [name]: value });
    };

    const handleIngredientChange = (event, idx) => {
        const {value} = event.target;
        const ingredients = [...spec.ingredients];
        ingredients[idx] = value;
        setSpec({...spec, ingredients });
    };

    const handleGarnishChange = (event, idx) => {
        const {value} = event.target;
        const garnish = [...spec.garnish];
        garnish[idx] = value;
        setSpec({...spec, garnish });
    };

    const addIngredient = () => {
        setSpec({ ...spec, ingredients: [...spec.ingredients, ""] });
    };

    const addGarnish = () => {
        setSpec({ ...spec, garnish: [...spec.garnish, ""] });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("bar-specs-be.javirod09.workers.dev/specs", {...spec});
            alert("Spec created");
            navigate("/");
        } catch(err) {
            console.error(err);
        }
    };
    return (
        <div className="create-spec">
            <h2>Create Spec</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name"> Name</label>
                <input type="text" id="name" name="name" onChange={handleChange}/>
                
                <label htmlFor="ingredients"> Ingredients</label>
                {/* input for ingredients here */}
                {spec.ingredients.map((ingredient, idx) => (
                    <input
                    key={idx}
                    type="text"
                    name="ingredients"
                    value={ingredient}
                    onChange={(event) => handleIngredientChange(event, idx)}
                    />
                ))}
                <button onClick={addIngredient} type="button"> Add Ingredient</button>
                
                <label htmlFor="garnish"> Garnish</label>
                {/* input for garnish here */}
                {spec.garnish.map((garnish, idx) => (
                    <input
                    key={idx}
                    type="text"
                    name="garnish"
                    value={garnish}
                    onChange={(event) => handleGarnishChange(event, idx)}
                    />
                ))}
                <button onClick={addGarnish} type="button"> Add Garnish</button>
                
                <label htmlFor="glassware"> Glassware</label>
                <input type="text" id="glassware" name="glassware"  onChange={handleChange}/>
                <label htmlFor="imageUrl"> Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl"  onChange={handleChange}/>
                <button type="submit"> Create Spec</button>

            </form>
        </div>
    );
};