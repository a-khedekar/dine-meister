import React, { useState } from "react"
import AsyncSelect from 'react-select/async'
import '../App.css'
import { message } from "antd"
import "antd/dist/antd.css";
import Recipegrid from "./Recipegrid"

function Maincontainer(props) {
    const [pantryList, setPantryList] = useState([])
    const [selectedValue, setSelectedValue] = useState({})

    const handleChange = value => {
        console.log("handlechange", value)
        setSelectedValue(value)
        let tempArray = pantryList;
        let doesExist = tempArray.find(e => e.name === value.name)
        // doesExist === undefined ? tempArray.push(value) : error message
        if (doesExist === undefined) {
            tempArray.push(value)
        }
        else {
            message.warning('You have this ingredient in your pantry already!', 3);
        }

        setSelectedValue({})
        setPantryList(tempArray)
    }

    const deletePantryIngredients = (e) => {
        console.log("index", e.target.id)
        pantryList.length > 0 && pantryList.splice(e.target.id, 1)
        setPantryList([...pantryList])
    }


    const loadOptions = (inputValue) => {
        const result = fetch(`https://api.spoonacular.com/food/ingredients/autocomplete?query=${inputValue}&number=10&apiKey=${props.apiKey}`)
            .then(data => data.json())
            .then(data => {
                return data;
            });
        return result;
    }

    return (
        <div >
            <h1 style={{ textAlign: "center", fontWeight: "bold", paddingTop: "10px" }}>Welcome to DineMeister, my fellow Chef!</h1>
            <p className="forAsyncLabel">Type in your favorite ingredients below to fill your pantry, then click 'Fetch Recipes' to see what you can make!</p>
            <div className="forAsyncSelect" >
                <label>
                    <AsyncSelect
                        placeholder={""}
                        value={selectedValue}
                        getOptionLabel={e => e.name}
                        getOptionValue={e => e.name}
                        loadOptions={loadOptions}
                        onChange={handleChange}
                    />
                </label>
            </div>

            <div style={{ fontSize: "30px", display: "flex", justifyContent: "center", color: "#fff" }}>
                {pantryList.length > 0 && <span> Your Pantry</span>}
            </div>
            <div className="gallery">
                {pantryList.length > 0 && pantryList.map(
                    function (pantryItem, index) {
                        return (
                            <div className="gallery-item" key={index}>
                                <span style={{ fontSize: "20px", textTransform: "capitalize", padding: "5px" }}>
                                    {pantryItem.name}
                                </span>
                                <i id={index} onClick={deletePantryIngredients} className="fa fa-trash-o" style={{ fontSize: "20px", color: "red", float: "right", padding: "10px", }}></i>
                                <img className="gallery-image" src={`https://spoonacular.com/cdn/ingredients_250x250/${pantryItem.image}`} alt="an api-provided img for this ingredient" />
                            </div>
                        )
                    }
                )}
            </div>

            <Recipegrid pantryList={pantryList} apiKey={props.apiKey} />


        </div>

    )

}
export default Maincontainer;