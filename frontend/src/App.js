import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as categoryActions from "./store/category";
import * as productActions from "./store/product";
import { Route, Switch } from "react-router-dom";
// import LoginForm from "./components/LoginFormModal/LoginForm";
// import SignupFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import CategoryPage from "./components/CategoryPage";
import ProductPage from "./components/ProductPage";
import FadeSwiper from "./components/FadeSwiper.js";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.fetchCategories());
    dispatch(productActions.fetchProducts());
  }, [dispatch])

  return (
    // <h1>Hello from App</h1>
    <>
      <Navigation />
      <FadeSwiper />
      <Switch>
        <Route exact path={`/category/:category`} component={CategoryPage} />
        <Route exact path={`/:productId/`} component={ProductPage} />
        {/* <Route path="/login" component={LoginForm} /> */}
        {/* <Route path="/signup" component={SignupFormPage} /> */}
      </Switch>
    </>
  );
}

export default App;
