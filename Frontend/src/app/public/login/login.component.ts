import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    userSystem: '',
    password: ''
  }

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      this.router.navigate(['clientes']);
    }
  }

  onLogin() {
    this.auth.access(this.user).subscribe(
      (res) => {
        if (res.code === 200) {
          localStorage.setItem('token', res.message.token);
          this.router.navigate(['clientes']);
        } else {
          alert(res.message);
        }

      }, (err) => {
        console.log(err);
      }
    );
  }
}
