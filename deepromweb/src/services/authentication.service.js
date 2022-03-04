import { BehaviorSubject } from 'rxjs';
/*import {
    useMutation,
    //useQuery,
    gql,
} from "@apollo/client";*/

//const swal = withReactContent(Swal);
/*const USER_LOGIN = gql`
    mutation Login($data: LoginInput!) {
    login(data: $data) {
      member {
        UserID, 
        GroupID,
        FirstnameTH,
        LastnameTH,
        FirstnameEN,
        LastnameEN,
        MemberType,
        Avatar,
        LastToken
      }
    }
  }
  `;*/

//import config from 'config';
//import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));

export const authenticationService = {
    setuserprofile,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function setuserprofile(profile) {
    //console.log(profile);
    //let data = JSON.parse(profile)
    currentUserSubject.next(profile);
    /* const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, password })
     };
 
     return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
         .then(handleResponse)
         .then(user => {
             // store user details and jwt token in local storage to keep user logged in between page refreshes
             localStorage.setItem('currentUser', JSON.stringify(user));
             currentUserSubject.next(user);
 
             return user;
         });*/
         /*useMutation(USER_LOGIN, {
            update: (proxy, mutationResult) => {
                //console.log('mutationResult: ', mutationResult.data.login);
                if (mutationResult.data.login) {
                    localStorage.setItem('currentUser', JSON.stringify(mutationResult.data.login.member));
                    currentUserSubject.next(JSON.stringify(mutationResult.data.login.member));
                    return Promise.resolve().then(function () {
                        return JSON.stringify(mutationResult.data.login.member);
                    });
                }
                else {
                    //console.log(mutationResult.error.message);   
                    return Promise.reject(mutationResult.error.message);     
                }
            }
        
        });*/
    /*return LoginbyType({ // this is the function returned by useMutation
        variables: {
            logintype,
            username,
            password
        }
    })*/

}

function logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}