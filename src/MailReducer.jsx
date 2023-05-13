export const mailReducer = (state, action) => {
  switch (action.type) {
    case "UNREAD":
      return { ...state, unread: !state.unread };
    case "MARK-AS-READ":
      return {
        ...state,
        mailData: state.mailData.map((mail) =>
          mail.mId === action.payload ? { ...mail, unread: !mail.unread } : mail
        ),
        originalData: state.originalData.map((mail) =>
          mail.mId === action.payload ? { ...mail, unread: !mail.unread } : mail
        )
      };
    case "CHECK-UNREAD":
      return {
        ...state,
        mailData: state.mailData.filter((mail) =>
          !state.unread ? mail.unread : mail
        )
      };
    case "STARRED":
      return { ...state, starred: !state.starred };
    case "STAR":
      return {
        ...state,
        mailData: state.mailData.map((mail) =>
          mail.mId === action.payload
            ? { ...mail, isStarred: !mail.isStarred }
            : mail
        ),
        originalData: state.originalData.map((mail) =>
          mail.mId === action.payload
            ? { ...mail, isStarred: !mail.isStarred }
            : mail
        )
      };
    case "CHECK-STARRED":
      return {
        ...state,
        mailData: state.mailData.filter((mail) =>
          state.starred ? mail.isStarred : mail
        )
      };
    case "DELETE":
      return {
        ...state,
        mailData: state.mailData.filter((mail) => mail.mId !== action.payload),
        trashed: [
          ...state.trashed,
          state.mailData.find((mail) => mail.mId === action.payload)
        ]
      };
    case "REPORT-SPAM":
      return {
        ...state,
        mailData: state.mailData.filter((mail) => mail.mId !== action.payload),
        spammed: [
          ...state.spammed,
          state.mailData.find((mail) => mail.mId === action.payload)
        ]
      };
    case "NOT-SPAM": {
      const updatedData = [
        ...state.mailData,
        state.spammed.find((mail) => mail.mId === action.payload)
      ];
      const findInUpdatedData = (mailToCheck) =>
        updatedData.find(({ mId }) => mId === mailToCheck.mId);
      return {
        ...state,
        mailData: state.originalData.filter((mail) => findInUpdatedData(mail)),
        spammed: state.spammed.filter((mail) => mail.mId !== action.payload)
      };
      // return {
      //   ...state,
      //   mailData: [
      //     ...state.mailData,
      //     state.spammed.find((mail) => mail.mId === action.payload)
      //   ],
      //   spammed: state.spammed.filter((mail) => mail.mId !== action.payload)
      // };
    }
    case "RESTORE": {
      const data = [
        ...state.mailData,
        state.trashed.find((mail) => mail.mId === action.payload)
      ];
      const findInData = (mailToCheck) =>
        data.find(({ mId }) => mId === mailToCheck.mId);
      return {
        ...state,
        mailData: state.originalData.filter((mail) => findInData(mail)),
        trashed: state.trashed.filter((mail) => mail.mId !== action.payload)
      };
      // return {
      //   ...state,
      //   mailData: [
      //     ...state.mailData,
      //     state.trashed.find((mail) => mail.mId === action.payload)
      //   ],
      //   trashed: state.trashed.filter((mail) => mail.mId !== action.payload)
      // };
    }
    case "DELETE-FOREVER":
      return {
        ...state,
        trashed: state.trashed.filter((mail) => mail.mId !== action.payload)
      };
    default:
      return state;
  }
};
