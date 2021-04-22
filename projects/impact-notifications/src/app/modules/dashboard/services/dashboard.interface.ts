import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

interface IData {
    params: {
        email: string;
        take?: string;
    },
    url: string;
}

export class Methods {
  constructor(private readonly http: HttpClient) {}

  paramsMethod(data: IData): Observable<Object> {
    return this.http.get(data.url, { params: data.params });
  }
}