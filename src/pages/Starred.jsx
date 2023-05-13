import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Toaster } from "../components/Toaster";

export const Starred = () => {
  const { starredMails, dispatch } = useContext(MailContext);

  return (
    <>
      <h2 className="header">Starred Folder</h2>
      {starredMails.length === 0 && (
        <h3 className="header">No Starred Mails found!</h3>
      )}
      <>
        {starredMails.map(({ mId, unread, isStarred, subject, content }) => (
          <li
            key={mId}
            className="mail-card"
            style={{ backgroundColor: unread ? "#f2f5fb" : "#ffffff" }}
          >
            <div className="mail-header">
              <h4>Subject: {subject}</h4>
              <button onClick={() => dispatch({ type: "STAR", payload: mId })}>
                <i
                  class="fa-solid fa-star"
                  style={{ color: isStarred ? "#FFD93D" : "#808080" }}
                ></i>
              </button>
            </div>
            <p>{content}</p>
            <div className="mail-footer">
              <NavLink to={`/details/${mId}`} className="navlink">
                View Details
              </NavLink>
              <div className="mail-buttons">
                <button
                  onClick={() => {
                    dispatch({ type: "DELETE", payload: mId });
                    toast(<Toaster trash idPassed={mId} />);
                  }}
                >
                  <i class="fa-solid fa-trash" style={{ color: "red" }}></i>
                </button>
                <button
                  style={{ color: "orange" }}
                  onClick={() =>
                    dispatch({ type: "MARK-AS-READ", payload: mId })
                  }
                >
                  Mark as {unread ? "read" : "unread"}
                </button>
                <button
                  style={{ color: "green" }}
                  onClick={() => {
                    dispatch({ type: "REPORT-SPAM", payload: mId });
                    toast(<Toaster spam idPassed={mId} />);
                  }}
                >
                  Report Spam
                </button>
              </div>
            </div>
          </li>
        ))}
      </>
    </>
  );
};
