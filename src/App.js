import React from "react"
import Maincontainer from "./Components/Maincontainer";
import { Switch, Route } from "react-router-dom";
import RecipePage from "./Components/RecipePage"

function App() {
  const apiKey = "f9ec686028f346bfb6673ac6c0544f49"
  return (
    <div className="">
      <Switch>
        <Route exact path="/">
          <Maincontainer apiKey={apiKey} />
        </Route>
        <Route path="/recipepage">
          <RecipePage />
        </Route>
      </Switch>
    </div>
  )

}

export default App;
