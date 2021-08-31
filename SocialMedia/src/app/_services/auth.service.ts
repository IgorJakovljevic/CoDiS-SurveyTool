import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthToken } from '../_models/token';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    public isAuth = new BehaviorSubject<boolean>(false);

    constructor(private router: Router, private http: HttpClient) { }

    async checkAuthenticated() {
        const authenticated = this.isAuthenticated() || this.isParticipant();
        this.isAuth.next(authenticated);
        return authenticated;
    }

    async login(username: string, password: string, navigateUrl: string = "") {
        const headers = new HttpHeaders().set(
            'Content-Type',
            'application/x-www-form-urlencoded;'
        );
        const body = new HttpParams()
            .set('username', username)
            .set('password', password)
            .set('grant_type', '');
        return this.http.post<AuthToken>(`${environment.api_url}auth/token`, body, { headers: headers })
            .pipe(map(auth_token => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', auth_token.access_token);
                localStorage.setItem('user_id', auth_token.user_id.toString());
                this.isAuth.next(true);
                this.router.navigate([navigateUrl]);
                return auth_token;
            })).toPromise();
    }

    async loginParticipant(participant_hash: string) {
        localStorage.setItem('participant_hash', participant_hash);
        this.isAuth.next(true);
        this.router.navigate([""]);
    }

    async logout(redirect: string) {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('participant_hash');
            this.isAuth.next(false);
            this.router.navigate([redirect]);
        } catch (err) {
            console.error(err);
        }
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        // Check whether the token is expired and return
        // true or false

        //TODO: Add JWT Support -->
        // https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3

        return !!token;
    }

    public isParticipant(): boolean {
        const participant_hash = localStorage.getItem('participant_hash');
        return !!participant_hash;
    }
}
