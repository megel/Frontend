import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Axios from "axios";
import Start from "./pages/Start";
import Correct from "./pages/Correct";
import Recipes from "./pages/Recipes";
import Detail from "./pages/Detail";
import Splash from "./pages/Splash";

export default function App() {
  const [items, setItems] = useState(null);
  const [recipes, setRecipes] = useState(null);

  const [splash, setSplash] = useState(true);

  setTimeout(() => {
    setSplash(false);
  }, 3000);

  function getItems(picture) {
    setItems(null);
    setRecipes(null);

    Axios.post(
      "https://fooddetectionfunction.azurewebsites.net/api/HttpTrigger1?code=DhJiN9OpE3bNuxkdvCPIKgB4/80pTxQLDOvchiUwziNTEJ8fjZf6xw==",
      picture
    ).then(response => {
      setItems(response.data);
    });
  }

  function getRecipes() {
    setRecipes(null);
    Axios.post(
      "https://foodrecipesearch2.azurewebsites.net/api/HttpTrigger1?code=NhQM5XrZtyruksuhZ8CVxMSLxxekeZoQa7qvkB1MNTMcgBnzXCgpOg==",
      {
        ingredients: items.map(item => item.tagName)
      }
    ).then(response => {
      setRecipes(response.data.recipes);
    });
  }

  return splash ? (
    <Splash />
  ) : (
    <>
      <Router>
        <Route path="/" exact render={() => <Start queryItems={getItems} />} />
        <Route
          path="/correct"
          render={() => (
            <Correct
              queryRecipes={getRecipes}
              items={items}
              setItems={setItems}
            />
          )}
        />
        <Route path="/recipes" render={() => <Recipes recipes={recipes} />} />
        <Route
          path="/detail/:index"
          render={() => <Detail recipes={recipes} />}
        />
      </Router>
      <div className="footer">
        <p>
          made with{" "}
          <img
            src="images/icon_heart.svg"
            className=""
            height="15px"
            width="15px"
          />{" "}
          in dresden
        </p>
      </div>
    </>
  );
}
