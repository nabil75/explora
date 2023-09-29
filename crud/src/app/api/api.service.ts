import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  delete(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  baseurl = "http://127.0.0.1:8000";
  httpHeaders_json = new HttpHeaders({'Content-Type':'application/json'});
  httpHeaders_text = new HttpHeaders({'Content-Type':'text/plain', 'Access-Control-Allow-Origin': '*'});

  getAllUsers(): Observable<any> {
    return this.http.get(this.baseurl+"/user", {headers: this.httpHeaders_json});
  }

  getAllQuestionnary(): Observable<any> {
    return this.http.get(this.baseurl+"/questionnary", {headers: this.httpHeaders_json});
  }

  deleteQuestionnary(idRow: string){
    let myObject: any;
    myObject =  this.getToken().subscribe((response: any) => {
      myObject = response
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': myObject.csrfToken
      });
      return (this.http.delete(this.baseurl+"/delete_questionnary/"+idRow+"/", { headers: headers }).subscribe((response: any) => {
        myObject = response
      }));
    });
  }

  getQuestionnary(idQuestionnary:any): Observable<any>{
    return(this.http.get(this.baseurl+"/get_questionnary/"+idQuestionnary+"/", { headers: this.httpHeaders_json }));
  }

  updateQuestionnary(id_questionnary: string, content: any ){
    console.log("api ok : id_questionnary = "+id_questionnary+" content = "+content)
    return (this.http.get(this.baseurl+"/update_questionnary/"+id_questionnary+"/"+content, {headers: this.httpHeaders_json} ))
    // const url = `${this.baseurl}/update_questionnary/${id_questionnary}/${content}`;
    // return this.http.post(url, {}, { headers: this.httpHeaders_json });
  }
  saveQuestionnary(content: any){
    return (this.http.get(this.baseurl+"/save_questionnary/"+content, {headers: this.httpHeaders_json} ))
  }

  getToken():any{
    return this.http.get(this.baseurl+"/api/get_csrf_token");
  }

  setCookie(cookieName: string, cookieValue: string){
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 21);
    this.cookieService.set(cookieName, cookieValue, expirationDate);
  }

  getCsrfToken():any {
    return this.http.get<any>(this.baseurl+'/api/get_csrf_token');
  }
}
