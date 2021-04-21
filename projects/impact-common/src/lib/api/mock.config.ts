import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

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
 * 
 * @param params 
 * @returns GET TOTAL MESSAGES SEND/RECEIVED
 */
function receivedSendMessages(params) {
  let email = params.get('email'),
      notifications = localStorage.getItem('users-notifications');
    if (notifications != null) {  
      let usersNotifications = JSON.parse(notifications),
        userNotifications = usersNotifications.find((x) => x.email === email),
        received = userNotifications.notifications.length,
        send = usersNotifications.map((x) => { 
           return x.notifications.filter((j) => { return j.from === email })
        }),
        merged = [].concat.apply([], send).length;
      return of(
        new HttpResponse({
          status: 200,
          body: {
            send: merged,
            received,
          },
        })
      );
    }
    return of(
      new HttpResponse({
        status: 200,
        body: {
          send: 0,
          received: 0
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
     let latest = userNotifications.notifications
       .slice()
       .sort((a, b) => b.date - a.date);
    return of(
      new HttpResponse({
        status: 200,
        body: latest.filter((msg, idx) => idx <= take),
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
            return of(new HttpResponse({
                status: 200, body:userNotifications[index].notifications
            }));
        } 
    }

    return of(new HttpResponse({
        status: 200, body:[]
    }));
}

/**
 * 
 * @param params 
 * @returns SEND NOTIFICATION TO USER
 */
function sendNotifications(params) {
    let notifications = localStorage.getItem('users-notifications')
    if (notifications != null) {
        let userNotifications = JSON.parse(notifications);
        let index = userNotifications.findIndex((x) => x.email === params.to);
        if (index > -1) {
          let p = params;
              p.date = Date.now();
              userNotifications[index].notifications.push(p);
        } else {
            userNotifications.push({
              email: params.to,
              notifications: [{
                  from: params.from,
                  subject: params.subject,
                  message: params.message,
                  date: Date.now(),
                },
              ],
            });
        }
        localStorage.setItem('users-notifications', JSON.stringify(userNotifications));
    } else {
        localStorage.setItem('users-notifications', JSON.stringify([{
            email: params.to,
            notifications: [{ 
                from: params.from, 
                subject: params.subject, 
                message: params.message ,
                date: Date.now()
            }]
        }]));
    }

    return of(new HttpResponse({
        status: 200, body: {
            status: 'SUCCESS',
            message: 'Notification Sent'
        }
    }));
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
            user_notifications = users_notifications.find((x) => x.email === body.email);
      if (user_notifications.notifications.length > -1) {
        let modify_user_notifications = user_notifications.notifications.filter(x => {return x.date !== body.message.date; });
            user_notifications.notifications = modify_user_notifications;
        const modifyUsersNotifications = JSON.stringify(users_notifications);;
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
        status: 200, body: {
          status: 'FAILED',
          message: 'There are no nofication to delete'
        }
    }));
}


/**
 * 
 * @param body 
 * @returns REGISTER USER
 */
function register(body) {
    let registeredUseres = localStorage.getItem('registered-users')
    if (registeredUseres != null) {
        let users = JSON.parse(registeredUseres);
        if (users.findIndex(x => x.email === body.email) === -1) {
            users.push(body);
            localStorage.setItem('registered-users', JSON.stringify(users));
            return of(new HttpResponse({
                status: 200, body:
                {
                    status: 'SUCCESS',
                    message: 'User Registered Successfully'
                }
            }));
        } else {
            return of(new HttpResponse({
                status: 200, body:
                {
                    status: 'FAILED',
                    message: 'Username Already Exists'
                }
            }));
        }
    } else {
        localStorage.setItem('registered-users', JSON.stringify([body]));
        return of(new HttpResponse({
            status: 200, body:
            {
                status: 'SUCCESS',
                message: 'User Registered Successfully'
            }
        }));
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
        let index = users.findIndex(x => x.email === body.email && x.password === body.password);
        if (index > -1) {
            isAuthenticated = true;
            userDetails = users[index];
        }
    }
    return of(new HttpResponse({
        status: 200, body:
        {
            authenticated: isAuthenticated,
            userDetails: userDetails
        }
    }));

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


