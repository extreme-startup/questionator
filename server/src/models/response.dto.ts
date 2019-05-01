export interface ResponseDto<T> {
  error?: string;
  data: T;
}
