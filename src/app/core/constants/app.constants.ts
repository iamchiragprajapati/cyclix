export const API_ROUTES = {
  cyclixSubmitApi: 'BikeRequestForm',
  bikeTypeApi: 'BikeType',
  bikeBrandApi: 'BikeBrand',
}

export enum MessageType {
  info = 'info',
  error = 'error',
  warning = 'warning',
  success = 'success',
}

export enum ErrorCode {
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  internalServer = 500,
}

export enum HttpMethod {
  post = 'POST',
  get = 'GET'
}
