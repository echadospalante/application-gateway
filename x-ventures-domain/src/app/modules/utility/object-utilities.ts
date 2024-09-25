type BasicProperties<T> = {
  [K in keyof T]: T[K] extends boolean | number | string | Date ? T[K] : never;
};

type ComplexProperties<T> = {
  [K in keyof T]: T[K] extends object | any[]
    ? T[K] extends Date
      ? never
      : T[K]
    : never;
};

type NonNever<T> = {
  [K in keyof T as T[K] extends never ? never : K]: T[K];
};

export type BasicType<T> = NonNever<BasicProperties<T>>;
export type ComplexType<T> = NonNever<ComplexProperties<T>>;

type Booleanized<T> = {
  [K in keyof T]: boolean;
};

export type ComplexInclude<T> = Booleanized<ComplexType<T>>;
