import React, { useState } from "react"
import Recipes from "./Recipes";
import '../App.css'

function Recipegrid(props) {

    const [recipeArray, setRecipeArray] = useState([])


    const getReceipe = () => {
        let ingredients = "";
        ingredients = props.pantryList.map((eachitem) => {
            return eachitem.name
        }).join(",+")
        console.log("ingredients", ingredients)
        const result = fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=24&ranking=2&apiKey=${props.apiKey}`)
            .then(data => data.json())
            .then(data => {
                console.log("receipeapidata", data)
                setRecipeArray(data);

            });

    }

    return (
        <div>
            {props.pantryList.length > 0 && <div><button className="searchButton" onClick={getReceipe}> Fetch Recipes</button></div>}

            <div className="cardContainer">
                {recipeArray.length > 0 && recipeArray.map(
                    function (eachRecipe, index) {
                        return (

                            <Recipes apiKey={props.apiKey} eachRecipe={eachRecipe} key={index} />


                        )
                    }
                )}
            </div>
        </div >
    )

}
export default Recipegrid;