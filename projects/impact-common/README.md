# ImpactCommon

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

## Mock API

The mock API module provides an HTTP interceptor that intercepts specific API calls. It can be used by imporint the ApiModule into the AppModule of the application. The below API calls will be intercepted:

GET:
`https://localhost:42000/notifications`
Expects: Query Parameter *username* 
Returns: Table of user notifications *any[]*

POST:
`https://localhost:42000/login`
Expects: Object {usename:string, password:string}
Returns: Object {isAuthenticated: boolean, userDetails: any}

POST:
`https://localhost:42000/register`
Expects: Object {usename:string, password:string, ...} The object can include any field you seem necessary. It should at leaset contain a username field.
Returns: Object {status: string, message: string}

POST:
`https://localhost:42000/sendNotification`
Expects: Object {recepient:string, notification:any}
Returns: Object {status: string, message: string}

The mock API uses the browser local host to store the provided data. The above APIs should suffice for the implementation of the basic functionality of this excersise. You can extend the API as needed to implement different more advanced functionality.

## Code scaffolding

Run `ng generate component component-name --project impact-common` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project impact-common`.
> Note: Don't forget to add `--project impact-common` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build impact-common` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build impact-common`, go to the dist folder `cd dist/impact-common` and run `npm publish`.

## Running unit tests

Run `ng test impact-common` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
