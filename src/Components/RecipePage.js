import { useHistory } from "react-router-dom";

function RecipePage() {
    let history = useHistory();
    console.log('history', history)
    const { location } = history;
    const { state } = location;

    return (
        <div className="mainBox">
            <div style={{ fontSize: "30px", paddingLeft: "20px", display: "flex", justifyContent: "space-between" }}>
                <span>{state[0].title}</span>
                <span style={{ display: "flex", justifyContent: "space-between" }}  >
                    <span style={{ paddingRight: "60px", fontSize: "22px" }}>Ready in {state[0].readyInMinutes} min</span>
                    <span style={{ paddingRight: "73px", fontSize: "22px" }}> Serves: {state[0].servings}</span>
                </span>
            </div>
            <div className="imgIngredients">

                <div className="forIngredients">
                    <h2 style={{ paddingLeft: "20px" }}>Ingredients</h2>
                    <ul>

                        {state[0].extendedIngredients.length > 0 && state[0].extendedIngredients.map(
                            function (ingredient, index) {
                                return (
                                    <li>
                                        {ingredient.name + "  (" + ingredient.original + ")"}
                                    </li>
                                )
                            }
                        )}

                    </ul>
                    <span>
                        {state[0].step}
                    </span>

                </div>

                <div> <img className="forRecipeImg" src={state[0].image} alt="recipe Image">
                </img>

                </div>
            </div>

            <div className="showSummary">
                <div>
                    <h2>Summary</h2>
                    <p dangerouslySetInnerHTML={{ __html: state[0].summary }}></p>
                </div>

            </div>

            <div className="showInstructions">
                <div>
                    {state[0].analyzedInstructions.length > 0 ? <h2>Instructions</h2> : <h2>Sorry no instructions found</h2>}

                    {state[0].analyzedInstructions.length > 0 && state[0].analyzedInstructions[0].steps.length > 0 && state[0].analyzedInstructions[0].steps.map(
                        function (instruction, index) {
                            return (

                                <li>
                                    {instruction.step}
                                </li>
                            )
                        }
                    )}


                </div>

            </div>



        </div>
    )

}






export default RecipePage;