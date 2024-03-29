import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoaderService} from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private _loaderService: LoaderService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.incrementInterceptCount();

    return next.handle(req).pipe(
      finalize(() => {
        this._loaderService.decrementInterceptCount();
      })
    );
  }
}
