import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";

export const Toaster = ({ trash, spam, idPassed }) => {
  const { dispatch } = useContext(MailContext);

  return (
    <>
      {trash && (
        <span>
          Conversation moved to trash!
          <button
            style={{
              border: "1px solid white",
              borderRadius: "5px",
              color: "white",
              padding: "5px",
              margin: "0 5px"
            }}
            onClick={() => dispatch({ type: "RESTORE", payload: idPassed })}
          >
            Undo
          </button>
        </span>
      )}
      {spam && (
        <span>
          Conversation moved to spam!
          <button
            style={{
              border: "1px solid white",
              borderRadius: "5px",
              color: "white",
              padding: "5px",
              margin: "0 5px"
            }}
            onClick={() => dispatch({ type: "NOT-SPAM", payload: idPassed })}
          >
            Undo
          </button>
        </span>
      )}
    </>
  );
};
