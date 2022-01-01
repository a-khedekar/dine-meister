import "../App.css";
import { useHistory } from "react-router-dom";

function Recipes(props) {
    let history = useHistory();
    function callRecipePageApi() {
        const result = fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${props.eachRecipe.id}&apiKey=${props.apiKey}`)
            .then(data => data.json())
            .then(data => {
                console.log("receipepageapidata", data)
                // setRecipeArray(data);
                history.push({
                    pathname: `/recipepage`,
                    state: data
                })

            });
    }

    return (
        <div className="card">
            <div className="card__body">
                <img src={props.eachRecipe.image} alt="" className="card__image" />
                <h2 className="card__title"> {props.eachRecipe.title}</h2>
                <p className="card__description"></p>
            </div>
            <button className="card__btn" onClick={callRecipePageApi}>View Recipe</button>
        </div>
    )
}

export default Recipes;