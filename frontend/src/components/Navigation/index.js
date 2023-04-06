// import { useDispatch, useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import './Navigation.css'
import * as categoryActions from "../../store/category";
import { useSelector } from "react-redux";

const Navigation = () => {
    // const currentUser = useSelector(state => state.session.user);

    // let links;
    // currentUser ? links = <ProfileButton user={ currentUser } />
    //             : links = (
    //                 <>
    //                     <NavLink to="/login">Log In</NavLink>
    //                     <NavLink to="/signup">Sign Up</NavLink>
    //                 </>
    //             )

    const categories = useSelector(state => Object.keys(state.category));
    console.log("cats:", categories);

    return (
        <>
            {/* <div className="top-slider"></div> */}
            <ul className="mid-nav-bar">
                <ProfileButton />
            </ul>
            <ul>
                <NavLink exact to="/">Barnes &#38; Noble</NavLink>
            </ul>
            <ul className="cat-nav-bar">{categories.map(cat => <NavLink to={`/category/${cat}`}>{cat}</NavLink>)}</ul>
        </>
    )
}

export default Navigation;