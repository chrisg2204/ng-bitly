import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
// RxJs required methods
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// Custom
import {Config} from '../config/dev';
// Angular Material
import { MatSnackBar, MatList, MatListItem } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {

  Title = Config.TITLE;
  Url = {
    shorted: '',
    origin: ''
  };
  message = {
    success: true,
    content: ''
  };

  hideLinkShorted: boolean = true;
  listShortenLink: Array<any>;

  Headers: Headers;
  ReqOptions: RequestOptions;

  /**
   * Constructor
   */
  constructor(private http:Http, public snackBar:MatSnackBar) {
    this.Headers = new Headers({'Content-Type': 'application/json'});
    this.ReqOptions = new RequestOptions({headers: this.Headers});

  }

  /**
   * Maneja el evento click del boton 'Shorten'
   * @method sendForm
   */
  sendForm() {
    let self = this;
    if (self.Url.origin != '') {
      self.httpPostHandler(Config.SERVICE_URL.SHORTEN, {url: self.Url.origin});
      
    } else{
      self.message.success = false;
      self.message.content = 'Inserte un Link para continuar.';
      
      self.openSnackBar(self.message);
    }
  }

  /**
   * Maneja las solicitudes POST.
   * @method httpPostHandler
   * @param {String} service Nombre del servicio
   * @param {Any} body Cuerpo del contenido POST
   * @return Promise solved
   */
  httpPostHandler(service: string, body: any) : Promise<any> {
    return this.http
            .post(Config.SERVICE_BASE+service, body, this.ReqOptions)
            .toPromise()
            .then(this.solvedPostThen.bind(this))
            .catch(this.solvedPostCatch.bind(this));
  }

  /**
   * Resuelve 'then' de promise.
   * @method solvedPostThen
   * @param {Response} response Respuesta de promise
   */
  solvedPostThen(response: Response) {
    let toJson = response.json();

    this.Url.shorted = toJson.data;
    this.hideLinkShorted = false;

  }

  /**
   * Resuelve 'catch' de promise.
   * @method solvedPostCatch
   * @param {Any} error Respuesta de promise
   * @return promise error
   */
  solvedPostCatch(error: any) {
    let toJson = error.json();

    this.message.success = false;
    this.message.content = toJson.data;
    
    this.openSnackBar(this.message);
  }

  /**
   * Método para manejar el control de los mensajes.
   * @method openSnackBar
   * @param {any} message Objeto con estados de mensaje 
   */
  openSnackBar(message: any) {
    let action = (message.success == false) ? 'Error' : 'Ok';

    this.snackBar.open(message.content, action, {
      duration: 2000,
    });
  }

}
