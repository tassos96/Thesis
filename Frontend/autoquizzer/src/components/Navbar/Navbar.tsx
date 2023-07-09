import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { AppRoutes, ImagesUrl } from "../../helpers/AppConstants";
//import CartMenuButton from "./CartMenuButton";
//import * as _ from "lodash";
import "./navbar.css";

const Navbar = () => {
  const currentUserContext = useUserContext();
  const [showMenu, setShowMenu] = useState(false);
  const [menuClasses, setMenuClasses] = useState("c_nav-menu c_nav-nav-menu ");
  const isUserLogedIn = currentUserContext.isUserLoggedIn();
  const userName = currentUserContext?.getCurrentUser()?.username;
  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    if(window.innerWidth > 768){
      return;
    }
    setShowMenu(!showMenu);
  };

  const openCart = () => {
    toggleMobileMenu();
  };

  useEffect(() => {
    let classes = "c_nav-menu c_nav-nav-menu ";
    if (showMenu) {
      classes = classes + "c_nav-nav-menu-show";
    }
    setMenuClasses(classes);
  }, [showMenu]);

  return (
    <>
      <nav className="c_nav-navbar">
        <div className="c_nav-logo">
          <span>
            <img onClick={() => navigate("/")} src={ImagesUrl + "/AutoQuizzer_logo.png"} alt="AutoQuizzer" style={{ "height": "5%", "width": "35%"}}></img>  
          </span>
        </div>
        <div className="c_nav-push-left">
          <button
            id="menu-toggler"
            data-class={"c_nav-menu-active"}
            className="c_nav-hamburger"
            onClick={() => {
              toggleMobileMenu();
            }}
          >
            <span className="c_nav-hamburger-line c_nav-hamburger-line-top"></span>
            <span className="c_nav-hamburger-line c_nav-hamburger-line-middle"></span>
            <span className="c_nav-hamburger-line c_nav-hamburger-line-bottom"></span>
          </button>

          <ul id="primary-menu" className={menuClasses}>
            <li className="c_nav-menu-item c_nav-current-menu-item">
              <Link
                to="/home"
                className="c_nav-nav__link"
                onClick={() => toggleMobileMenu()}
              >
                Αρχική
              </Link>
            </li>
            <li className="c_nav-menu-item c_nav-current-menu-item">
              <Link
                to="/products"
                className="c_nav-nav__link"
                onClick={() => toggleMobileMenu()}
              >
                Προϊόντα
              </Link>
            </li>
            {isUserLogedIn && (
            <li className="c_nav-menu-item c_nav-dropdown">
              <Link to={{}} className="c_nav-nav__link">
                Παραγγελίες
              </Link>
              <ul className="c_nav-sub-nav">
                <li>
                  <Link
                    to={AppRoutes.FavoriteProducts}
                    className="c_nav-sub-nav__link"
                    onClick={() => toggleMobileMenu()}
                  >
                    Αγαπημένες Παραγγελίες
                  </Link>
                </li>
                <li>
                  <Link
                    to={AppRoutes.HistoryProducts}
                    className="c_nav-sub-nav__link"
                    onClick={() => toggleMobileMenu()}
                  >
                    Ιστορικό παραγελιών
                  </Link>
                </li>
              </ul>
            </li>)}
            <li className="c_nav-menu-item c_nav-dropdown">
              <Link to={{}} className="c_nav-nav__link">
                Λογαριασμός
              </Link>
              <ul className="c_nav-sub-nav">
              {!isUserLogedIn && (
              <li>
                  <Link
                    to={AppRoutes.Login}
                    className="c_nav-sub-nav__link"
                    onClick={() => toggleMobileMenu()}
                  >
                    Σύνδεση
                  </Link>
                </li>)}
                {!isUserLogedIn && (
                <li>
                  <Link
                    to={AppRoutes.Signup}
                    className="c_nav-sub-nav__link"
                    onClick={() => toggleMobileMenu()}
                  >
                    Εγγραφή
                  </Link>
                </li>)}
                {isUserLogedIn && 
                (<li>
                  <Link
                    to={AppRoutes.AccountInfo}
                    className="c_nav-sub-nav__link"
                    onClick={() => toggleMobileMenu()}
                  >
                    Πληροφορίες Λογαριασμού
                  </Link>
                </li>)}
                {isUserLogedIn && 
                (<li>
                  <Link
                    to={AppRoutes.Logout}
                    className="c_nav-sub-nav__link"
                    onClick={() => toggleMobileMenu()}
                  >
                    Αποσύνδεση
                  </Link>
                </li>)}
              </ul>
            </li>
            <li className="c_nav-menu-item c_nav-current-menu-item">
              <Link
                to={AppRoutes.Cart}
                className="c_nav-nav__link"
                onClick={() =>{openCart();}}
              >
                {/* <CartMenuButton /> */}
              </Link>
            </li>
            {isUserLogedIn && (<li className="c_nav-menu-item c_nav-current-menu-item">
              <span><FontAwesomeIcon icon={faUser}/> {userName}</span>
            </li>)}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
