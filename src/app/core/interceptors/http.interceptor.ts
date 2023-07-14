import {
  HttpErrorResponse,
  HttpEvent, HttpInterceptorFn, HttpRequest, HttpResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { ErrorCode, HttpMethod, MessageType } from '../constants/app.constants';
import { AlertToastrService } from '../services/alert-toastr.service';
import { LoggerService } from '../services/logger.service';

export const HttpTokenInterceptor: HttpInterceptorFn = (request, next) => {

  return next(request).pipe(map((event: HttpEvent<any>) => {
    if (event instanceof HttpResponse) {
      return event.clone({
        body: event.body.data
      });
    }
    return event;
  }));;
}

export const HttpErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next) => {
  const toasterService = inject(AlertToastrService);
  const router = inject(Router);

  return next(request).pipe(catchError((error: HttpErrorResponse) => {
    let errorToastInInterceptor = true;
    if (
      ['POST', 'PATCH'].includes(request.method) &&
      request.body?.error_toast_in_interceptor != null &&
      !request.body?.error_toast_in_interceptor
    ) {
      errorToastInInterceptor = false;
      delete request.body.error_toast_in_interceptor
    }

    if (
      request.method === HttpMethod.get &&
      request.headers?.get('X-CP-BIT') != null &&
      request.headers?.get('X-CP-BIT') === 'false'
    ) {
      errorToastInInterceptor = false;
    }

    if (request.url.includes('/auth/login')) {
      switch(error.error.status) {
        case ErrorCode.unauthorized:
          toasterService.displaySnackBarWithoutTranslation('toasterMessage.loginUnsuccessful', MessageType.error);
          break;
        case ErrorCode.notFound:
          toasterService.displaySnackBarWithoutTranslation('toasterMessage.userNotFound', MessageType.error);
          break;
        case ErrorCode.internalServer:
          toasterService.displaySnackBarWithoutTranslation('toasterMessage.internalServerError', MessageType.error);
          break;
      }
    } else if (error.error.status === ErrorCode.unauthorized) {
      toasterService.displaySnackBarWithoutTranslation('toasterMessage.tokenExpired', MessageType.error);
      router.navigate(['/auth/logout']);
    } else if (request.url.includes('forgotPassword')) {
      toasterService.displaySnackBarWithoutTranslation('toasterMessage.forgotPasswordSuccessful', MessageType.success);
      router.navigate(['/auth/login']);
    } else if (errorToastInInterceptor) {
      toasterService.displaySnackBarWithoutTranslation(error.error.message, MessageType.error);
    }
    const err = new HttpErrorResponse({
      error: error.error,
      statusText: error.message,
      status: error.status
    })
    LoggerService.error(err);
    throw err;
  })
  )
}
