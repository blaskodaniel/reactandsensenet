import React, { useState, useContext } from "react";
import classNames from 'classnames';
import { IMenuContext } from "./contexts/menucontext";
import { NavLink } from "react-router-dom";

const Menu = (props:{data: IMenuContext}) => {
  const [togglemenu, settogglemenu] = useState(false)

  const toggleMenu = () => {
    console.log(togglemenu)
    settogglemenu(!togglemenu)
  }

  return (
    <>
      <nav className="mainmenu">
        <div className="logo">
          <h4>MKK</h4>
        </div>
        <ul className={classNames("nav-links", togglemenu ? "nav-active" : "")}>
          {props.data.menuresult.map((x, index)=>{
            if(!x.Isdisplay){
              return(
                <NavLink key={x.Id} to={x.Name}>{x.Menuname}</NavLink>
              )
            }
          })}
        </ul>
        <div className={classNames("burgermenu", togglemenu ? "toggle": "")} onClick={toggleMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>
    </>
  );
}

export default Menu
