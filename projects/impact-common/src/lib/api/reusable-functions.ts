// sort by date
export const sortByDate = (arr) => {
  return arr.slice().sort((a, b) => b.date - a.date);
  // sort() it also sorts the original array.
  // we use slice() to create a copy of the array
};

// most frequest emails
export const findMostFrequest = (arr) => {
  return [...new Set(arr.map((item) => item.from))]; // new Set let us store unique values
};


// extra dashboard details, get the total message send and received for each frequent user
export const findEmailSendReceived = (arr, email) => {
  const notifications = localStorage.getItem('users-notifications');
  if (notifications !== null) {
    const usersNotifications = JSON.parse(notifications);
    const sendReceivedEachUser = [];
    const selectedUser = usersNotifications.find((x) => x.email === email);
    for (const u of arr) {
      sendReceivedEachUser.push({
        email: usersNotifications.find((x) => x.email === u).email,
        send: usersNotifications
          .find((x) => x.email === u)
          .notifications.filter((j) => j.from === email).length,
        received: selectedUser.notifications.filter((x) => x.from === u).length,
      });
    }
    return sendReceivedEachUser;
  }
};
