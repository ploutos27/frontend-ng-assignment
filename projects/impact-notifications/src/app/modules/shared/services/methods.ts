import { Observable } from 'rxjs';
import { IGetDashboard, IPostInbox, IPostProfile } from '../interfaces/methods.interface';


export abstract class Methods {
  constructor(private http) {}

  protected get<T>(data: IGetDashboard): Observable<any> {
    return this.http.get(data.url, { params: data.params });
  }

  protected post<T>(data: IPostInbox | IPostProfile): Observable<any> {
    return this.http.post(data.url, data.body);
  }
}
