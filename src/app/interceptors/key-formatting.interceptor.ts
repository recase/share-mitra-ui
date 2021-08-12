import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { KeyFormattingService } from '../services/key-formatting.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class KeyFormattingInterceptor implements HttpInterceptor {
  constructor(private keyFormatter: KeyFormattingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const snakeCaseObject = this.keyFormatter.convertKeys(
      request.body,
      'snake'
    );
    request = request.clone({
      body: snakeCaseObject,
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const camelCaseObject = this.keyFormatter.convertKeys(
            event.body,
            'camel'
          );
          event = event.clone({ body: camelCaseObject });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
