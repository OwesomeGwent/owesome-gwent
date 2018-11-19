interface ICache {
  [key: string]: any;
}
class SimpleCache {
  public cache: ICache = {};
  public get(key: string) {
    return this.cache[key];
  }
  public set(key: string, value: any) {
    this.cache[key] = value;
  }
}

const useCache = (fn: (...args: any[]) => void) => {
  const cache = new SimpleCache();
  return (...args: any[]) => {
    const key: string = args.pop();
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }
    const result = fn.apply(null, [...args, cache]);
    cache.set(key, result);
    return result;
  };
};

export default useCache;
