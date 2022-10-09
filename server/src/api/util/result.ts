import LoggerInstance from "@/loaders/logger";

export class Result<T> {
  private isSuccess: boolean;
  private data: T;
  private error: string;

  private constructor(isSuccess: boolean, error?: string, value?: T) {
    if (isSuccess && error) {
      throw new Error(`InvalidOperation: A result cannot be 
      successful and contain an error`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: A failing result 
      needs to contain an error message`);
    }

    this.isSuccess = isSuccess;
    this.error = error;
    this.data = value;

    Object.freeze(this);
  }
  public getValue(): T {
    if (!this.isSuccess) {
      throw new Error(`Cant retrieve the value from a failed result.`);
    }
    return this.data;
  }

  public static success<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static error<U>(errorLog: any, error:string): Result<U> {
    LoggerInstance.error('🔥 error: %o', errorLog);
    return new Result<U>(false, error);
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (let result of results) {
      if (!result.isSuccess) return result;
    }
    return Result.success<any>();
  }
}
