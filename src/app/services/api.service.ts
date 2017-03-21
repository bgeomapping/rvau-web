import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { GetRequest } from '../shared';
import { APP_SETTINGS, IAppSettings } from '../app.settings';

@Injectable()
export class ApiService {
    constructor(
        private http: Http, 
        @Inject(APP_SETTINGS) private settings: IAppSettings) { }

    getData(fragment: string, query): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key of Object.keys(query)) {
            params.set(key, query[key]);
        }
        let requestUrl = `${this.settings.apiEndpoint}/${fragment}`;
        return this.http.get(requestUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getRequest(request: GetRequest): Observable<any> {
        let params = this.setParams(request.params);
        let requestUrl = `${this.settings.apiEndpoint}/${request.table}`;
        return this.http.get(requestUrl, { search: params })
            .map(this.extractData)
            .catch(this.handleError);

    }
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private setParams(query: {}): URLSearchParams {
        let params: URLSearchParams = new URLSearchParams();
        for (let key of Object.keys(query)) {
            params.set(key, query[key]);
        }
        return params;
    }
    private handleAuthenticationError(error: Response) {
        return Observable.throw(error || 'Server error');
    }


    private handleError(error: Response) {
        return Observable.throw(error || 'Server error');

    //     return Observable.throw(error.json().errors || 'Server error');
    }
}

