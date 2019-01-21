import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { environment } from '@env/environment';
import * as crypto from 'crypto-js';

@Injectable()
export class DialogflowService {

  private baseURL = 'https://api.dialogflow.com/v1/query?v=20170712';
  private token: string;

  constructor(private http: Http) { }

  public getResponse(query: string, userName: string, agent: string) {

    switch (agent) {
      case 'extensao':
      {
        this.token = environment.agents.extensao.token;
        break;
      }
      case 'concurso':
      {
        this.token = environment.agents.concurso.token;
        break;
      }
      case 'eac':
      {
        this.token = environment.agents.eac.token;
        break;
      }
    }

    // const sessionId = crypto.AES.encrypt(userName, this.token);

    const data = {
      query: query,
      lang: 'pt-BR',
      sessionId: userName
    };

    return this.http
      .post(`${this.baseURL}`, data, { headers: this.getHeaders() })
      .map(res => {
        return res.json();
      });
  }

  public getHeaders() {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return headers;
  }
}
