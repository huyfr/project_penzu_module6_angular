// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: 'http://localhost:8080/api/sdu/login',
  signupUrl: 'http://localhost:8080/api/sdu/register',
  updateProfileUrl: 'http://localhost:8080/api/sdu/update-profile',
  updatePasswordUrl: 'http://localhost:8080/api/sdu/update-password',
  userAvatarUrl: 'http://localhost:8080/api/sdu/user-avatar/',
  userUrl: 'http://localhost:8080/api/sdu/user/',
  diaryUrl: 'http://localhost:8080/api/sdu/diary/',
  diaryUploadFileUrl: 'http://localhost:8080/api/sdu/diary-file/',
  tagUrl: 'http://localhost:8080/api/sdu/tag/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
