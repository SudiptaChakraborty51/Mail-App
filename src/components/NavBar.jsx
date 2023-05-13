import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";

export const NavBar = () => {
  const { mailState, starredMails } = useContext(MailContext);

  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "darkBlue" : "black",
    fontWeight: isActive ? "bold" : "normal",
    backgroundColor: isActive ? "#d1d5db" : "",
    borderRadius: isActive ? "25px" : ""
  });

  return (
    <nav>
      <NavLink to="/" className="sidebar-navlink" style={getActiveStyle}>
        <i class="fa-solid fa-envelope-open"></i> Inbox (
        {mailState.mailData.length})
      </NavLink>
      <NavLink to="/starred" className="sidebar-navlink" style={getActiveStyle}>
        <i class="fa-solid fa-star"></i> Starred ({starredMails.length})
      </NavLink>
      <NavLink to="/spam" className="sidebar-navlink" style={getActiveStyle}>
        <i class="fa-solid fa-circle-exclamation"></i> Spam (
        {mailState.spammed.length})
      </NavLink>
      <NavLink to="/trash" className="sidebar-navlink" style={getActiveStyle}>
        <i class="fa-solid fa-trash"></i> Trash ({mailState.trashed.length})
      </NavLink>
    </nav>
  );
};
