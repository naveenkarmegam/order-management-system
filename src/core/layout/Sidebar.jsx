import React, { useEffect } from "react";
import Logo from "../vendors/Icons/Logo";
import BarIcon from "../vendors/Icons/BarIcon";
import DashIcon from "../vendors/Icons/DashIcon";
import OrdeIcon from "../vendors/Icons/OrdeIcon";
import ListIcon from "../vendors/Icons/ListIcon";
import AdminIcon from "../vendors/Icons/AdminIcon";
import SettingIcon from "../vendors/Icons/SettingIcon";
import CommunityIcon from "../vendors/Icons/CommunityIcon";
import TutoIcon from "../vendors/Icons/TutoIcon";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSideBarToggle } from "../../features/FunctionalReducer";
import "./styles/navbar.css";
const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sideBarToggle = useSelector((state) => state.funactionality.sideBarToggle);
  const user = JSON.parse(localStorage.getItem("user-info"))
  
  const handleSidebar = () => {
    dispatch(setSideBarToggle(!sideBarToggle));
  };

  let sidebarClasses = "";
  sidebarClasses += sideBarToggle
    ? "navbar-nav  sidebar accordion "
    : "navbar-nav sidebar accordion toggled ";

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth < 496) {
        dispatch(setSideBarToggle(true));
      } else {
        dispatch(setSideBarToggle(false));
      }
    });
  }, [dispatch]);


  const navItems = [
    { path: "/dashboard", icon: <DashIcon />, text: "Dashboard" },
    { path: "/order", icon: <OrdeIcon />, text: "Order" },
    { path: "/listing", icon: <ListIcon />, text: "Listing" },
    // { path: "/admin", icon: <AdminIcon />, text: "Admin" },
    ...(user.role  ? [
      { path: "/admin", icon: <AdminIcon />, text: "Admin" },
    ] : []),
    { path: "/settings", icon: <SettingIcon />, text: "Setting" },
    { path: "/community", icon: <CommunityIcon />, text: "Community" },
    { path: "/support", icon: <TutoIcon />, text: "Support" },
  ];

  return (
    <main
      className={sidebarClasses}
      id="accordionSidebar"
      style={{
        backgroundColor: "#F9FAFB",
      }}
    >
      <hgroup className="sidebar-brand d-flex align-items-center justify-content-around">
        <section className="d-flex">
          <div className="sidebar-brand-icon ">
            <Logo width={31.16} height={24} className="me-2 fill-orange" />
          </div>
        </section>
        <section className="sidebar-brand-icon text-center d-none d-md-block">
          <button
            className="border-0 "
            style={{ background: "none" }}
            onClick={handleSidebar}
          >
            <BarIcon />
          </button>
        </section>
      </hgroup>
      <hr className="bg-black m-0 mb-1" />

      <nav className="mx-3">
        <ul
          className="navbar-nav me-auto mb-2 mb-lg-2"
          style={{ cursor: "pointer" }}
        >
          {navItems.map((item) => (
            <li
              key={item.path}
              className={`nav-item m-0 p-0 bg-grey-h p-md-1 py-sm-2 mb-1 ${location.pathname === item.path ? "bg-grey" : ""
                } ${sideBarToggle ? "" : "mt-4"}`}
            >
              <Link to={item.path} className="nav-link p-0 w-100 p-2">
                {item.icon}
                <span
                  className={`text-black ml-2 ${sideBarToggle ? "" : "d-none"
                    }`}
                >
                  {item.text}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="text-center d-none d-md-block"></div>

    </main>
  );
};

export default Sidebar;
