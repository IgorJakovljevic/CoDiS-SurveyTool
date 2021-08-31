import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class StudentAuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) { }
    canActivate(): boolean {
        console.log("TEST")
        console.log(this.auth.isParticipant());
        if (!this.auth.isParticipant()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
