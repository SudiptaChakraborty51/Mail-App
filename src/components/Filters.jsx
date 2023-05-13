import { useContext } from "react";
import { MailContext } from "../contexts/MailContext";

export const Filters = () => {
  const { dispatch } = useContext(MailContext);

  return (
    <>
      <fieldset>
        <legend>Filters</legend>
        <label>
          <input
            type="checkbox"
            name="filterMail"
            onChange={() => dispatch({ type: "UNREAD" })}
          />
          Show unread mails
        </label>
        <label>
          <input
            type="checkbox"
            name="filterMail"
            onChange={() => dispatch({ type: "STARRED" })}
          />
          Show starred mails
        </label>
      </fieldset>
    </>
  );
};
