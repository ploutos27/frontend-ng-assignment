import { HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
export default {
  GET: {
    '/notifications': {
      handler: getNotifications,
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
  },
};

function updateProfile(body) {
    let users = JSON.parse(localStorage.getItem('registered-users')),
        index = users.findIndex((x) => x.email === body.toUpdate),
        currentUser = users.find((x) => x.email === body.toUpdate),
        authUser = JSON.parse(localStorage.getItem('currentUser'));
    if (authUser.authenticated && authUser.userDetails.email === currentUser.email) {
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

        return of(new HttpResponse({
            status: 200, body: {
                status: 'SUCCESS',
                message: 'Profile Updated'
            }
        }));
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

function changePassword(body) {
 let users = JSON.parse(localStorage.getItem('registered-users')),
    index = users.findIndex((x) => x.email === body.toUpdate),
    currentUser = users.find((x) => x.email === body.toUpdate),
    authUser = JSON.parse(localStorage.getItem('currentUser'));

     if (authUser.authenticated && authUser.userDetails.email === currentUser.email) { 
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
     }
      else {
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

function sendNotifications(params) {
    let notifications = localStorage.getItem('users-notifications')
    if (notifications != null) {
        let userNotifications = JSON.parse(notifications);
        let index = userNotifications.findIndex(x => x.email === params.email);
        if (index > -1) {
            userNotifications[index].notifications.push(params.notification);
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

