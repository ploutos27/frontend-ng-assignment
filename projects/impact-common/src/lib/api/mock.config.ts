import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { sortByDate } from './reusable-functions';

export default {
  GET: {
    '/inbox': {
      handler: getInboxOutbox,
    },
    '/outbox': {
      handler: getInboxOutbox,
    },
    '/latestMessages': {
      handler: latestMessages,
    },
    '/receivedSendMessages': {
      handler: receivedSendMessages,
    },
    '/mostFrequestUsers': {
      handler: mostFrequestUsers,
    },
  },
  POST: {
    '/login': {
      handler: login,
    },
    '/register': {
      handler: register,
    },
    '/send': {
      handler: send,
    },
    '/updateProfile': {
      handler: updateProfile,
    },
    '/changePassword': {
      handler: changePassword,
    },
    '/inbox': {
      handler: deleteInboxOutbox,
    },
    '/outbox': {
      handler: deleteInboxOutbox,
    },
  },
};

/**
 * @returns GET MOST FREQUENT USERS
 */
function mostFrequestUsers(params) {
  const email = params.get('email');
  const notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const usersNotifications = JSON.parse(notifications);
    const user = usersNotifications.find((x) => x.email === email);
    const details = [];

    // Inbox
    for (const i of user.inbox) {
      if (details.find((x) => x.email === i.from) !== undefined) {
        details.find((x) => x.email === i.from).received += 1;
      } else {
        details.push({
          email: i.from,
          send: 0,
          received: 1,
        });
      }
    }
    // Outbox
    for (const i of user.outbox) {
      if (details.find((x) => x.email === i.to) !== undefined) {
        details.find((x) => x.email === i.to).send += 1;
      } else {
        details.push({
          email: i.to,
          send: 1,
          received: 0,
        });
      }
    }
    return of(
      new HttpResponse({
        status: 200,
        body: details.sort(
          (a, b) => b.send + b.received - (a.send + b.received)
        ), // sort by the sum of send/received
      })
    );
  }
  return of(
    new HttpResponse({
      status: 200,
      body: [],
    })
  );
}

/**
 * @returns GET TOTAL MESSAGES SEND/RECEIVED
 */
function receivedSendMessages(params) {
  const email = params.get('email');
  const notifications = localStorage.getItem('users-notifications');
  if (notifications !== null) {
    const usersNotifications = JSON.parse(notifications);
    const userNotifications = usersNotifications.find((x) => x.email === email);
    if (userNotifications !== undefined) {
      const received = userNotifications.inbox.length;
      const sent = userNotifications.outbox.length;
      return of(
        new HttpResponse({
          status: 200,
          body: {
            send: sent,
            received,
          },
        })
      );
    }
  }
  return of(
    new HttpResponse({
      status: 200,
      body: {
        send: 0,
        received: 0,
      },
    })
  );
}

/**
 *
 * @returns GET LATEST USER MESSAGES
 */
function latestMessages(params) {
  const email = params.get('email');
  const take = params.get('take');
  const notifications = localStorage.getItem('users-notifications');
  if (notifications !== null) {
    const userNotifications = JSON.parse(notifications).find(
      (x) => x.email === email
    );

    if (userNotifications !== undefined) {
      const latest = sortByDate(userNotifications.inbox);
      return of(
        new HttpResponse({
          status: 200,
          body: latest.filter((msg, idx) => idx <= take), // filtering result by the request that user set in front-end
          // take and skip is usually used in database querying.
        })
      );
    }
  }
  return of(
    new HttpResponse({
      status: 200,
      body: [],
    })
  );
}

/**
 * @returns GET INBOX BY EMAIL
 */
function getInboxOutbox(params) {
  const email = params.get('email');
  const type = params.get('type'); // get the type of request, e.g inbox/outbox
  const notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const userNotifications = JSON.parse(notifications);
    const index = userNotifications.findIndex((x) => x.email === email);
    if (index > -1) {
      return of(
        new HttpResponse({
          status: 200,
          body: sortByDate(userNotifications[index][type]),
        })
      );
    }
  }
  return of(
    new HttpResponse({
      status: 200,
      body: [],
    })
  );
}

/**
 * @returns SEND MESSAGE TO USER
 */
function send(params) {
  const notifications = localStorage.getItem('users-notifications');
  if (notifications !== null) {
    const userNotifications = JSON.parse(notifications);
    const indexTo = userNotifications.findIndex(
      (x) => x.email === params.message.to
    ); // TO
    const indeFrom = userNotifications.findIndex(
      (x) => x.email === params.message.from
    ); // FROM

    if (indexTo > -1 && indeFrom > -1) {
      const p = {
        from: params.message.from,
        message: params.message.message,
        subject: params.message.subject,
        to: params.message.to,
        date: Date.now(),
      };
      userNotifications[indexTo].inbox.push(p);
      userNotifications[indeFrom].outbox.push(p);
      localStorage.setItem(
        'users-notifications',
        JSON.stringify(userNotifications)
      );
    }
  }
  return of(
    new HttpResponse({
      status: 200,
      body: {
        status: 'SUCCESS',
        message: 'Notification Sent',
      },
    })
  );
}

/**
 *
 * @returns DELETE MESSAGE FROM USER
 */
function deleteInboxOutbox(body) {
  const notifications = localStorage.getItem('users-notifications');
  if (notifications !== null) {
    const usersNotifications = JSON.parse(notifications);
    const userNotifications = usersNotifications.find((x) => x.email === body.email);
    const type = body.type;

    if (userNotifications[type].length > -1) {
      const modifyUserNotifications = userNotifications[type].filter((x) => {
        return x.date !== body.message.date;
      });

      // I've use date as id for deleting the notification, usually we use a unique id
      userNotifications[type] = modifyUserNotifications;
      const modifyUsersNotifications = JSON.stringify(usersNotifications);
      localStorage.setItem('users-notifications', modifyUsersNotifications);
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'SUCCESS',
            message: 'Message Succesfully Deleted',
          },
        })
      );
    }


  }
  return of(
    new HttpResponse({
      status: 200,
      body: {
        status: 'FAILED',
        message: 'There are no nofication to delete',
      },
    })
  );
}

/**
 *
 * @returns REGISTER USER
 */
function register(body) {
  const registeredUsers = localStorage.getItem('registered-users');
  const notifications = localStorage.getItem('users-notifications');
  const details = {
    email: body.email,
    inbox: [],
    outbox: [],
  };

  if (registeredUsers !== null && notifications !== null) {
    const users = JSON.parse(registeredUsers);
    const existing = JSON.parse(notifications);
    if (users.findIndex((x) => x.email === body.email) === -1) {
      // check if user exist
      users.push(body);
      existing.push(details);
      localStorage.setItem('registered-users', JSON.stringify(users));
      localStorage.setItem('users-notifications', JSON.stringify(existing));
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'SUCCESS',
            message: 'User Registered Successfully',
          },
        })
      );
    } else {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'FAILED',
            message: 'Username Already Exists',
          },
        })
      );
    }
  } else {
    localStorage.setItem('registered-users', JSON.stringify([body]));
    localStorage.setItem('users-notifications', JSON.stringify([details]));
    return of(
      new HttpResponse({
        status: 200,
        body: {
          status: 'SUCCESS',
          message: 'User Registered Successfully',
        },
      })
    );
  }
}

/**
 *
 * @returns LOGIN USER
 */
function login(body) {
  let isAuthenticated = false;
  let userDetails: any = {};
  if (localStorage.getItem('registered-users') !== null) {
    const users = JSON.parse(localStorage.getItem('registered-users'));
    const index = users.findIndex(
      (x) => x.email === body.email && x.password === body.password
    );
    if (index > -1) {
      isAuthenticated = true;
      userDetails = users[index];
    }
  }
  return of(
    new HttpResponse({
      status: 200,
      body: {
        authenticated: isAuthenticated,
        userDetails,
      },
    })
  );
}

/**
 *
 * @returns CHANGE USER PASSWORD
 */
function changePassword(body) {
  const users = JSON.parse(localStorage.getItem('registered-users'));
  const index = users.findIndex((x) => x.email === body.toUpdate);
  const currentUser = users.find((x) => x.email === body.toUpdate);
  let authUser = JSON.parse(localStorage.getItem('currentUser'));
  if (
    authUser.authenticated &&
    authUser.userDetails.email === currentUser.email
  ) {
    if (
      body.data.currentPassword === currentUser.password &&
      body.data.currentPassword === authUser.userDetails.password
    ) {
      const newDetails = authUser.userDetails;
      newDetails.password = body.data.password;
      const newUser = {
        authenticated: true,
        userDetails: newDetails,
      };
      authUser = newUser;
      users[index] = newDetails;
      const modifyAuth = JSON.stringify(authUser);
      const modifyUser = JSON.stringify(users);
      localStorage.setItem('currentUser', modifyAuth);
      localStorage.setItem('registered-users', modifyUser);

      return of(
        new HttpResponse({
          status: 200,
          body: {
            status: 'SUCCESS',
            message: 'Profile Updated',
          },
        })
      );
    }
  } else {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          status: 'FAILED',
          message: 'Something went wrong',
        },
      })
    );
  }
}

/**
 * @returns UPDATE USER PROFILE
 */
function updateProfile(body) {
  const users = JSON.parse(localStorage.getItem('registered-users'));
  const index = users.findIndex((x) => x.email === body.toUpdate);
  const currentUser = users.find((x) => x.email === body.toUpdate);
  let authUser = JSON.parse(localStorage.getItem('currentUser'));
  if (
    authUser.authenticated &&
    authUser.userDetails.email === currentUser.email
  ) {
    const newDetails = body.data;
    newDetails.password = authUser.userDetails.password;
    const newUser = {
      authenticated: true,
      userDetails: newDetails,
    };
    authUser = newUser;
    users[index] = newDetails;
    const modifyAuth = JSON.stringify(authUser);
    const modifyUser = JSON.stringify(users);
    localStorage.setItem('currentUser', modifyAuth);
    localStorage.setItem('registered-users', modifyUser);

    return of(
      new HttpResponse({
        status: 200,
        body: {
          status: 'SUCCESS',
          message: 'Profile Updated',
        },
      })
    );
  } else {
    return of(
      new HttpResponse({
        status: 200,
        body: {
          status: 'FAILED',
          message: 'Something went wrong',
        },
      })
    );
  }
}
