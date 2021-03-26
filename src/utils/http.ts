export enum HttpRequestStatus {
  null,
  loading,
  error,
  ready,
}

export const statusReady = (requestStatus: HttpRequestStatus) =>
  requestStatus === HttpRequestStatus.ready;
export const statusLoading = (requestStatus: HttpRequestStatus) =>
  requestStatus === HttpRequestStatus.loading;
export const statusError = (requestStatus: HttpRequestStatus) =>
  requestStatus === HttpRequestStatus.error;
export const statusNull = (requestStatus: HttpRequestStatus) =>
  requestStatus === HttpRequestStatus.null;
