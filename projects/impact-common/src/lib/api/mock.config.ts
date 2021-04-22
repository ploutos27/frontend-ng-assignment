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

function mostFrequestUsers(params) {
  let email = params.get('email'),
    notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    const usersNotifications = JSON.parse(notifications),
      userNotifications = usersNotifications.find((x) => x.email === email);
      if (userNotifications !== undefined) {
        const tempArr = findMostFrequest(userNotifications.notifications),
          results = findEmailSendReceived(tempArr, email);
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
 *
 * @param params
 * @returns GET TOTAL MESSAGES SEND/RECEIVED
 */
function receivedSendMessages(params) {
  let email = params.get('email'),
    notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    let usersNotifications = JSON.parse(notifications),
      userNotifications = usersNotifications.find((x) => x.email === email);
    if (userNotifications != undefined) {
    
      let received = userNotifications.notifications.length,
        send = usersNotifications.map((x) => {
          return x.notifications.filter((j) => {
            return j.from === email;
          });
        }), // mapping notifications and filtering notifications send from requested email
        merged = [].concat.apply([], send); // we end up having an array of arrays,
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
 * @param params
 * @returns GET LATEST USER MESSAGES
 */
function latestMessages(params) {
  let email = params.get('email'),
    take = params.get('take'),
    notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    let userNotifications = JSON.parse(notifications).find(
      (x) => x.email === email
    );

    if (userNotifications !== undefined) {
      let latest = sortByDate(userNotifications.notifications);
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
 * @param params
 * @returns GET NOTIFICATIONS BY EMAIL
 */
function getNotifications(params) {
  let email = params.get('email');
  let notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    let userNotifications = JSON.parse(notifications);
    let index = userNotifications.findIndex((x) => x.email === email);
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
 * @param params
 * @returns SEND NOTIFICATION TO USER
 */
function sendNotifications(params) {
  let notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    let userNotifications = JSON.parse(notifications);
    let index = userNotifications.findIndex((x) => x.email === params.to);
    if (index > -1) {
      let p = params;
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
 * @param body
 * @returns DELETE NOTIFICATION FROM USER
 */
function deleteNotifications(body) {
  let notifications = localStorage.getItem('users-notifications');
  if (notifications != null) {
    let users_notifications = JSON.parse(notifications),
      user_notifications = users_notifications.find(
        (x) => x.email === body.email
      );
    if (user_notifications.notifications.length > -1) {
      // user notifications if have something to delete
      let modify_user_notifications = user_notifications.notifications.filter(
        (x) => {
          return x.date !== body.message.date;
        }
      );
      // I've use date as id for deleting the notification, usually we use a unique id
      user_notifications.notifications = modify_user_notifications;
      const modifyUsersNotifications = JSON.stringify(users_notifications);
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
 * @param body
 * @returns REGISTER USER
 */
function register(body) {
  let registeredUseres = localStorage.getItem('registered-users');
  let notifications = localStorage.getItem('users-notifications');
    if (registeredUseres != null && notifications != null) {
      let users = JSON.parse(registeredUseres);
      let existing = JSON.parse(notifications);
        if (users.findIndex((x) => x.email === body.email) === -1) {
          let notes = { email: body.email, notifications: [] };
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
      localStorage.setItem('users-notifications', JSON.stringify([{ email:body.email, notifications: [] }]));
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
 * @param body LOGIN USER
 * @returns
 */
function login(body) {
  let isAuthenticated: boolean = false;
  let userDetails: any = {};
  if (localStorage.getItem('registered-users') != null) {
    let users = JSON.parse(localStorage.getItem('registered-users'));
    let index = users.findIndex(
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
        userDetails: userDetails,
      },
    })
  );
}

/**
 *
 * @param body
 * @returns CHANGE USER PASSWORD
 */
function changePassword(body) {
  let users = JSON.parse(localStorage.getItem('registered-users')),
    index = users.findIndex((x) => x.email === body.toUpdate),
    currentUser = users.find((x) => x.email === body.toUpdate),
    authUser = JSON.parse(localStorage.getItem('currentUser'));

  if (
    authUser.authenticated &&
    authUser.userDetails.email === currentUser.email
  ) {
    if (
      body.data.currentPassword === currentUser.password &&
      body.data.currentPassword === authUser.userDetails.password
    ) {
      let newDetails = authUser.userDetails;
      newDetails.password = body.data.password;
      let newUser = {
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
 *
 * @param body
 * @returns UPDATE USER PROFILE
 */
function updateProfile(body) {
  let users = JSON.parse(localStorage.getItem('registered-users')),
    index = users.findIndex((x) => x.email === body.toUpdate),
    currentUser = users.find((x) => x.email === body.toUpdate),
    authUser = JSON.parse(localStorage.getItem('currentUser'));
  if (
    authUser.authenticated &&
    authUser.userDetails.email === currentUser.email
  ) {
    let newDetails = body.data;
    newDetails.password = authUser.userDetails.password;
    let newUser = {
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
