import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";
import { NavLink } from "react-router-dom";
import { Filters } from "../components/Filters";
import { toast } from "react-toastify";
import { Toaster } from "../components/Toaster";

export const Inbox = () => {
  const { dispatch, filteredMails, unreadCount } = useContext(MailContext);

  return (
    <>
      <Filters />
      <h3 style={{ padding: "10px 0px 30px 0" }}>
        <i class="fa-solid fa-bell"></i> You have {unreadCount} unread mails
      </h3>
      <>
        {filteredMails.map(({ mId, unread, isStarred, subject, content }) => (
          <li
            className="mail-card"
            key={mId}
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
