import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import {
  findMostFrequest,
  sortByDate,
  findEmailSendReceived,
} from './reusable-functions';

export default {
  GET: {
    '/notifications': {
      handler: getNotifications,
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
    '/sendNotification': {
      handler: sendNotifications,
    },
    '/updateProfile': {
      handler: updateProfile,
    },
    '/changePassword': {
      handler: changePassword,
    },
    '/deleteNotification': {
      handler: deleteNotifications,
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
    const userNotifications = usersNotifications.find((x) => x.email === email);
    if (userNotifications !== undefined) {
      const tempArr = findMostFrequest(userNotifications.notifications);
      const results = findEmailSendReceived(tempArr, email);
      return of(
        new HttpResponse({
          status: 200,
          body: results,
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
 * @returns GET TOTAL MESSAGES SEND/RECEIVED
 */
function receivedSendMessages(params) {
  const email = params.get('email');
  const notifications = localStorage.getItem('users-notifications');
  if (notifications !== null) {
    const usersNotifications = JSON.parse(notifications);
    const userNotifications = usersNotifications.find((x) => x.email === email);
    if (userNotifications !== undefined) {
      const received = userNotifications.notifications.length;
      const send = usersNotifications.map((x) => {
        return x.notifications.filter((j) => {
          return j.from === email;
        });
      }); // mapping notifications and filtering notifications send from requested email
      const merged = [].concat.apply([], send); // we end up having an array of arrays,
      //  we use concat to merged and apply to pass (this) value (ie: array) and the target arr
      return of(
        new HttpResponse({
          status: 200,
          body: {
            send: merged.length,
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
      const latest = sortByDate(userNotifications.notifications);
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
 * @returns GET NOTIFICATIONS BY EMAIL
 */
function getNotifications(params) {
  const email = params.get('email');
  const notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const userNotifications = JSON.parse(notifications);
    const index = userNotifications.findIndex((x) => x.email === email);
    if (index > -1) {
      return of(
        new HttpResponse({
          status: 200,
          body: sortByDate(userNotifications[index].notifications),
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
 *
 * @returns SEND NOTIFICATION TO USER
 */
function sendNotifications(params) {
  const notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const userNotifications = JSON.parse(notifications);
    const index = userNotifications.findIndex((x) => x.email === params.to);
    if (index > -1) {
      const p = params;
      p.date = Date.now(); // date is always generated from server or db
      userNotifications[index].notifications.push(p);
    } else {
      userNotifications.push({
        email: params.to,
        notifications: [
          {
            from: params.from,
            subject: params.subject,
            message: params.message,
            date: Date.now(),
          },
        ],
      });
    }
    localStorage.setItem(
      'users-notifications',
      JSON.stringify(userNotifications)
    );
  } else {
    localStorage.setItem(
      'users-notifications',
      JSON.stringify([
        {
          email: params.to,
          notifications: [
            {
              from: params.from,
              subject: params.subject,
              message: params.message,
              date: Date.now(),
            },
          ],
        },
      ])
    );
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
 * @returns DELETE NOTIFICATION FROM USER
 */
function deleteNotifications(body) {
  const notifications = localStorage.getItem('users-notifications');
  if (notifications !== null) {
    const usersNotifications = JSON.parse(notifications);
    const userNotifications = usersNotifications.find(
      (x) => x.email === body.email
    );
    if (userNotifications.notifications.length > -1) {
      // user notifications if have something to delete
      const modifyUserNotifications = userNotifications.notifications.filter(
        (x) => {
          return x.date !== body.message.date;
        }
      );
      // I've use date as id for deleting the notification, usually we use a unique id
      userNotifications.notifications = modifyUserNotifications;
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
  const registeredUseres = localStorage.getItem('registered-users');
  const notifications = localStorage.getItem('users-notifications');
  if (registeredUseres !== null && notifications !== null) {
    const users = JSON.parse(registeredUseres);
    const existing = JSON.parse(notifications);
    if (users.findIndex((x) => x.email === body.email) === -1) {
      const notes = { email: body.email, notifications: [] };
      // check if user exist
      users.push(body);
      existing.push(notes);
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
    localStorage.setItem(
      'users-notifications',
      JSON.stringify([{ email: body.email, notifications: [] }])
    );
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
  if (localStorage.getItem('registered-users') != null) {
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
