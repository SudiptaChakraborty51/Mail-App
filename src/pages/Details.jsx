import { useParams } from "react-router-dom";
import { mails } from "../MailData";

export const Details = () => {
  const { mailId } = useParams();
  const selectedMail = mails.find(({ mId }) => mId === mailId);

  return (
    <>
      <h2 className="header">Details</h2>
      <div className="mail-card">
        <h3>Subject: {selectedMail?.subject}</h3>
        <p>{selectedMail?.content}</p>
      </div>
    </>
  );
};
