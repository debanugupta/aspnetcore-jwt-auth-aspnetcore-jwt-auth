import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient) { }

  login(form: NgForm) {
    const credentials = {
      'username': form.value.username,
      'password': form.value.password
    }

    this.http.post("https://localhost:5001/api/auth/login", credentials)
      .subscribe({
      next: (response: any) => 
      {
        const token = (<any>response).token;
        localStorage.setItem("jwt", token);
        this.invalidLogin = false;
        this.router.navigate(["/"]);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.invalidLogin = true;
      }
    })
  }
}
