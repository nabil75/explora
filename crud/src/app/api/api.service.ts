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
  httpHeaders_text = new HttpHeaders({'Content-Type':'text/plain'});

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

  getQuestionnary(idQuestionnary:string): Observable<any>{
    return(this.http.get(this.baseurl+"/get_questionnary/"+idQuestionnary+"/", { headers: this.httpHeaders_json }));
  }

  updateQuestionnary(id_questionnary: string, content: any ){
    return (this.http.get(this.baseurl+"/update_questionnary/"+id_questionnary+"/"+content, {headers: this.httpHeaders_json} ))
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

  insertResult(content: any, idQuestionnary: number ): Observable<any>{
    return (this.http.get(this.baseurl+"/insert_result/"+content+"/"+idQuestionnary, {headers: this.httpHeaders_json} ))
  }
  // updateResult(id_questionnary: string, content: any ){
  //   return (this.http.get(this.baseurl+"/update_result/"+id_questionnary+"/"+content, {headers: this.httpHeaders_json} ))
  // }

  getResultsFermee(id_questionnary: number, i: string){
    return(this.http.get(this.baseurl+"/get_results_fermee/"+id_questionnary+"/"+i));
  }
 
  getQuestionFromLmstudio(){
    return this.http.get<any>(this.baseurl+'/get_libelle_question');
  }

  getModalitesFromLmstudio(libelle_question:string){
    return this.http.get<any>(this.baseurl+'/get_modalites_question/'+libelle_question);
  }
}
