type SyncOrAsync<T> = T | Promise<T>;
export abstract class Usecase<Param, Response> {
  abstract execute(params: Param): SyncOrAsync<Response>;
}
