class ErrorData {
  requestId: string;
  code: string;
  status: number;
  message: string;
  method: string;
  path: string;
}

export class ErrorDto {
  error: ErrorData;
}
