import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";
import { NavLink } from "react-router-dom";

export const Spam = () => {
  const { mailState, dispatch } = useContext(MailContext);

  return (
    <>
      <h2 className="header">Spam Folder</h2>
      {mailState.spammed.length === 0 && (
        <h3 className="header">No mail in Spam!</h3>
      )}
      <>
        {mailState.spammed.map(({ mId, unread, subject, content }) => (
          <li
            key={mId}
            className="mail-card"
            style={{ backgroundColor: unread ? "#f2f5fb" : "#ffffff" }}
          >
            <h4>Subject: {subject}</h4>
            <p>{content}</p>
            <div className="mail-footer">
              <NavLink to={`/details/${mId}`} className="navlink">
                View Details
              </NavLink>
              <button
                style={{ color: "green" }}
                onClick={() => dispatch({ type: "NOT-SPAM", payload: mId })}
              >
                Not Spam
              </button>
            </div>
          </li>
        ))}
      </>
    </>
  );
};
