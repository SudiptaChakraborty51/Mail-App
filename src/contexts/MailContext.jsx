import { createContext, useReducer } from "react";
import { mails } from "../MailData";
import { mailReducer } from "../MailReducer";

export const MailContext = createContext();

export const MailProvider = ({ children }) => {
  const initial = {
    unread: false,
    starred: false,
    mailData: mails,
    originalData: mails,
    trashed: [],
    spammed: []
  };

  const [mailState, dispatch] = useReducer(mailReducer, initial);

  const filterHandler = () => {
    let data = [...mailState.mailData];
    if (mailState.unread) {
      data = data.filter(({ unread }) => unread);
    }
    if (mailState.starred) {
      data = data.filter(({ isStarred }) => isStarred);
    }
    return data;
  };

  const filteredMails = filterHandler();

  // const filteredMails = mailState.mailData.filter(
  //   (mail) =>
  //     (mailState.unread && mail.unread) ||
  //     (mailState.starred && mail.isStarred) ||
  //     (!mailState.unread && !mailState.starred)
  // );

  const unreadCount = filteredMails.reduce(
    (acc, curr) => (curr.unread ? acc + 1 : acc),
    0
  );

  const starredMails = mailState.mailData.filter(({ isStarred }) => isStarred);

  return (
    <MailContext.Provider
      value={{ mailState, dispatch, filteredMails, unreadCount, starredMails }}
    >
      {children}
    </MailContext.Provider>
  );
};
