import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";
import { NavLink } from "react-router-dom";

export const Trash = () => {
  const { mailState, dispatch } = useContext(MailContext);

  return (
    <>
      <h2 className="header">Trash Folder</h2>
      {mailState.trashed.length === 0 && (
        <h3 className="header">No mails in Trash!</h3>
      )}
      <>
        {mailState.trashed.map(({ mId, unread, subject, content }) => (
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
              <div className="mail-buttons">
                <button
                  style={{ color: "green" }}
                  onClick={() => dispatch({ type: "RESTORE", payload: mId })}
                >
                  Restore
                </button>
                <button
                  style={{ color: "red" }}
                  onClick={() =>
                    dispatch({ type: "DELETE-FOREVER", payload: mId })
                  }
                >
                  Delete Forever
                </button>
              </div>
            </div>
          </li>
        ))}
      </>
    </>
  );
};
