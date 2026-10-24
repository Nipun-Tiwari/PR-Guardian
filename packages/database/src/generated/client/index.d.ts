/**
 * Client
 **/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Session
 *
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>;
/**
 * Model Repository
 *
 */
export type Repository = $Result.DefaultSelection<Prisma.$RepositoryPayload>;
/**
 * Model RepositoryInstallation
 *
 */
export type RepositoryInstallation =
  $Result.DefaultSelection<Prisma.$RepositoryInstallationPayload>;

/**
 * Enums
 */
export namespace $Enums {
  export const InstallationStatus: {
    active: 'active';
    removed: 'removed';
  };

  export type InstallationStatus = (typeof InstallationStatus)[keyof typeof InstallationStatus];
}

export type InstallationStatus = $Enums.InstallationStatus;

export const InstallationStatus: typeof $Enums.InstallationStatus;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions
    ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions['log']>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(
    eventType: V,
    callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void,
  ): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Sessions
   * const sessions = await prisma.session.findMany()
   * ```
   */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.repository`: Exposes CRUD operations for the **Repository** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Repositories
   * const repositories = await prisma.repository.findMany()
   * ```
   */
  get repository(): Prisma.RepositoryDelegate<ExtArgs>;

  /**
   * `prisma.repositoryInstallation`: Exposes CRUD operations for the **RepositoryInstallation** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more RepositoryInstallations
   * const repositoryInstallations = await prisma.repositoryInstallation.findMany()
   * ```
   */
  get repositoryInstallation(): Prisma.RepositoryInstallationDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<
    ReturnType<T>
  >;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? 'Please either choose `select` or `include`.'
    : T extends SelectAndOmit
      ? 'Please either choose `select` or `omit`.'
      : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (
    k: infer I,
  ) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
        | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> =
    IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<
    T,
    MaybeTupleToUnion<K>
  >;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: 'User';
    Session: 'Session';
    Repository: 'Repository';
    RepositoryInstallation: 'RepositoryInstallation';
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb extends $Utils.Fn<
    { extArgs: $Extensions.InternalArgs; clientOptions: PrismaClientOptions },
    $Utils.Record<string, any>
  > {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    ClientOptions = {},
  > = {
    meta: {
      modelProps: 'user' | 'session' | 'repository' | 'repositoryInstallation';
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>;
        fields: Prisma.SessionFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[];
          };
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>;
          };
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateSession>;
          };
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<SessionGroupByOutputType>[];
          };
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>;
            result: $Utils.Optional<SessionCountAggregateOutputType> | number;
          };
        };
      };
      Repository: {
        payload: Prisma.$RepositoryPayload<ExtArgs>;
        fields: Prisma.RepositoryFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RepositoryFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RepositoryFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>;
          };
          findFirst: {
            args: Prisma.RepositoryFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RepositoryFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>;
          };
          findMany: {
            args: Prisma.RepositoryFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[];
          };
          create: {
            args: Prisma.RepositoryCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>;
          };
          createMany: {
            args: Prisma.RepositoryCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RepositoryCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>[];
          };
          delete: {
            args: Prisma.RepositoryDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>;
          };
          update: {
            args: Prisma.RepositoryUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>;
          };
          deleteMany: {
            args: Prisma.RepositoryDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RepositoryUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.RepositoryUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryPayload>;
          };
          aggregate: {
            args: Prisma.RepositoryAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRepository>;
          };
          groupBy: {
            args: Prisma.RepositoryGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RepositoryGroupByOutputType>[];
          };
          count: {
            args: Prisma.RepositoryCountArgs<ExtArgs>;
            result: $Utils.Optional<RepositoryCountAggregateOutputType> | number;
          };
        };
      };
      RepositoryInstallation: {
        payload: Prisma.$RepositoryInstallationPayload<ExtArgs>;
        fields: Prisma.RepositoryInstallationFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.RepositoryInstallationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.RepositoryInstallationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>;
          };
          findFirst: {
            args: Prisma.RepositoryInstallationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.RepositoryInstallationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>;
          };
          findMany: {
            args: Prisma.RepositoryInstallationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>[];
          };
          create: {
            args: Prisma.RepositoryInstallationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>;
          };
          createMany: {
            args: Prisma.RepositoryInstallationCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.RepositoryInstallationCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>[];
          };
          delete: {
            args: Prisma.RepositoryInstallationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>;
          };
          update: {
            args: Prisma.RepositoryInstallationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>;
          };
          deleteMany: {
            args: Prisma.RepositoryInstallationDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.RepositoryInstallationUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          upsert: {
            args: Prisma.RepositoryInstallationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$RepositoryInstallationPayload>;
          };
          aggregate: {
            args: Prisma.RepositoryInstallationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateRepositoryInstallation>;
          };
          groupBy: {
            args: Prisma.RepositoryInstallationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<RepositoryInstallationGroupByOutputType>[];
          };
          count: {
            args: Prisma.RepositoryInstallationCountArgs<ExtArgs>;
            result: $Utils.Optional<RepositoryInstallationCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    'define',
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error';
  export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T['emit'] extends 'event'
      ? T['level']
      : never
    : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy';

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number;
    repositories: number;
    repositoryInstallations: number;
  };

  export type UserCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs;
    repositories?: boolean | UserCountOutputTypeCountRepositoriesArgs;
    repositoryInstallations?: boolean | UserCountOutputTypeCountRepositoryInstallationsArgs;
  };

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRepositoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RepositoryWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRepositoryInstallationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RepositoryInstallationWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserAvgAggregateOutputType = {
    githubUserId: number | null;
  };

  export type UserSumAggregateOutputType = {
    githubUserId: bigint | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    githubUserId: bigint | null;
    githubUsername: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    githubUserId: bigint | null;
    githubUsername: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    githubUserId: number;
    githubUsername: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserAvgAggregateInputType = {
    githubUserId?: true;
  };

  export type UserSumAggregateInputType = {
    githubUserId?: true;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    githubUserId?: true;
    githubUsername?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    githubUserId?: true;
    githubUsername?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    githubUserId?: true;
    githubUsername?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      where?: UserWhereInput;
      orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[];
      by: UserScalarFieldEnum[] | UserScalarFieldEnum;
      having?: UserScalarWhereWithAggregatesInput;
      take?: number;
      skip?: number;
      _count?: UserCountAggregateInputType | true;
      _avg?: UserAvgAggregateInputType;
      _sum?: UserSumAggregateInputType;
      _min?: UserMinAggregateInputType;
      _max?: UserMaxAggregateInputType;
    };

  export type UserGroupByOutputType = {
    id: string;
    githubUserId: bigint;
    githubUsername: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        githubUserId?: boolean;
        githubUsername?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        sessions?: boolean | User$sessionsArgs<ExtArgs>;
        repositories?: boolean | User$repositoriesArgs<ExtArgs>;
        repositoryInstallations?: boolean | User$repositoryInstallationsArgs<ExtArgs>;
        _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['user']
    >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      githubUserId?: boolean;
      githubUsername?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs['result']['user']
  >;

  export type UserSelectScalar = {
    id?: boolean;
    githubUserId?: boolean;
    githubUsername?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>;
    repositories?: boolean | User$repositoriesArgs<ExtArgs>;
    repositoryInstallations?: boolean | User$repositoryInstallationsArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type UserIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {};

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: 'User';
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[];
      repositories: Prisma.$RepositoryPayload<ExtArgs>[];
      repositoryInstallations: Prisma.$RepositoryInstallationPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        githubUserId: bigint;
        githubUsername: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['user']
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<
    Prisma.$UserPayload,
    S
  >;

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    UserFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User']; meta: { name: 'User' } };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$sessionsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    repositories<T extends User$repositoriesArgs<ExtArgs> = {}>(
      args?: Subset<T, User$repositoriesArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    repositoryInstallations<T extends User$repositoryInstallationsArgs<ExtArgs> = {}>(
      args?: Subset<T, User$repositoryInstallationsArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'findMany'> | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<'User', 'String'>;
    readonly githubUserId: FieldRef<'User', 'BigInt'>;
    readonly githubUsername: FieldRef<'User', 'String'>;
    readonly createdAt: FieldRef<'User', 'DateTime'>;
    readonly updatedAt: FieldRef<'User', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
      /**
       * Filter, which Users to fetch.
       */
      where?: UserWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of Users to fetch.
       */
      orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the position for listing Users.
       */
      cursor?: UserWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` Users from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` Users.
       */
      skip?: number;
      distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
    };

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
  };

  /**
   * User.sessions
   */
  export type User$sessionsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    where?: SessionWhereInput;
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    cursor?: SessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * User.repositories
   */
  export type User$repositoriesArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    where?: RepositoryWhereInput;
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[];
    cursor?: RepositoryWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[];
  };

  /**
   * User.repositoryInstallations
   */
  export type User$repositoryInstallationsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    where?: RepositoryInstallationWhereInput;
    orderBy?:
      | RepositoryInstallationOrderByWithRelationInput
      | RepositoryInstallationOrderByWithRelationInput[];
    cursor?: RepositoryInstallationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: RepositoryInstallationScalarFieldEnum | RepositoryInstallationScalarFieldEnum[];
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      /**
       * Select specific fields to fetch from the User
       */
      select?: UserSelect<ExtArgs> | null;
      /**
       * Choose, which related nodes to fetch as well
       */
      include?: UserInclude<ExtArgs> | null;
    };

  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  export type SessionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
  };

  export type SessionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    expiresAt: Date | null;
    createdAt: Date | null;
  };

  export type SessionCountAggregateOutputType = {
    id: number;
    userId: number;
    data: number;
    expiresAt: number;
    createdAt: number;
    _all: number;
  };

  export type SessionMinAggregateInputType = {
    id?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
  };

  export type SessionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    expiresAt?: true;
    createdAt?: true;
  };

  export type SessionCountAggregateInputType = {
    id?: true;
    userId?: true;
    data?: true;
    expiresAt?: true;
    createdAt?: true;
    _all?: true;
  };

  export type SessionAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Sessions
     **/
    _count?: true | SessionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: SessionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: SessionMaxAggregateInputType;
  };

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
    [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>;
  };

  export type SessionGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: SessionWhereInput;
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[];
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum;
    having?: SessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionCountAggregateInputType | true;
    _min?: SessionMinAggregateInputType;
    _max?: SessionMaxAggregateInputType;
  };

  export type SessionGroupByOutputType = {
    id: string;
    userId: string;
    data: JsonValue;
    expiresAt: Date;
    createdAt: Date;
    _count: SessionCountAggregateOutputType | null;
    _min: SessionMinAggregateOutputType | null;
    _max: SessionMaxAggregateOutputType | null;
  };

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> & {
        [P in keyof T & keyof SessionGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
          : GetScalarType<T[P], SessionGroupByOutputType[P]>;
      }
    >
  >;

  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        userId?: boolean;
        data?: boolean;
        expiresAt?: boolean;
        createdAt?: boolean;
        user?: boolean | UserDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['session']
    >;

  export type SessionSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      userId?: boolean;
      data?: boolean;
      expiresAt?: boolean;
      createdAt?: boolean;
      user?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['session']
  >;

  export type SessionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    data?: boolean;
    expiresAt?: boolean;
    createdAt?: boolean;
  };

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type SessionIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    user?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    {
      name: 'Session';
      objects: {
        user: Prisma.$UserPayload<ExtArgs>;
      };
      scalars: $Extensions.GetPayloadResult<
        {
          id: string;
          userId: string;
          data: Prisma.JsonValue;
          expiresAt: Date;
          createdAt: Date;
        },
        ExtArgs['result']['session']
      >;
      composites: {};
    };

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> =
    $Result.GetResult<Prisma.$SessionPayload, S>;

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = Omit<
    SessionFindManyArgs,
    'select' | 'include' | 'distinct'
  > & {
    select?: SessionCountAggregateInputType | true;
  };

  export interface SessionDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session']; meta: { name: 'Session' } };
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(
      args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(
      args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(
      args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(
      args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     *
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SessionFindManyArgs>(
      args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     *
     */
    create<T extends SessionCreateArgs>(
      args: SelectSubset<T, SessionCreateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SessionCreateManyArgs>(
      args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(
      args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     *
     */
    delete<T extends SessionDeleteArgs>(
      args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SessionUpdateArgs>(
      args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SessionDeleteManyArgs>(
      args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SessionUpdateManyArgs>(
      args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(
      args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>,
    ): Prisma__SessionClient<
      $Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
     **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends SessionAggregateArgs>(
      args: Subset<T, SessionAggregateArgs>,
    ): Prisma.PrismaPromise<GetSessionAggregateType<T>>;

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Session model
     */
    readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    user<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<'Session', 'String'>;
    readonly userId: FieldRef<'Session', 'String'>;
    readonly data: FieldRef<'Session', 'Json'>;
    readonly expiresAt: FieldRef<'Session', 'DateTime'>;
    readonly createdAt: FieldRef<'Session', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Sessions.
     */
    skip?: number;
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[];
  };

  /**
   * Session create
   */
  export type SessionCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
  };

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Session update
   */
  export type SessionUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>;
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput;
  };

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput;
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>;
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>;
  };

  /**
   * Session delete
   */
  export type SessionDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput;
  };

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput;
  };

  /**
   * Session without action
   */
  export type SessionDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null;
  };

  /**
   * Model Repository
   */

  export type AggregateRepository = {
    _count: RepositoryCountAggregateOutputType | null;
    _avg: RepositoryAvgAggregateOutputType | null;
    _sum: RepositorySumAggregateOutputType | null;
    _min: RepositoryMinAggregateOutputType | null;
    _max: RepositoryMaxAggregateOutputType | null;
  };

  export type RepositoryAvgAggregateOutputType = {
    githubRepositoryId: number | null;
    githubInstallationId: number | null;
  };

  export type RepositorySumAggregateOutputType = {
    githubRepositoryId: bigint | null;
    githubInstallationId: bigint | null;
  };

  export type RepositoryMinAggregateOutputType = {
    id: string | null;
    githubRepositoryId: bigint | null;
    githubInstallationId: bigint | null;
    owner: string | null;
    name: string | null;
    fullName: string | null;
    isActive: boolean | null;
    ownedByUserId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RepositoryMaxAggregateOutputType = {
    id: string | null;
    githubRepositoryId: bigint | null;
    githubInstallationId: bigint | null;
    owner: string | null;
    name: string | null;
    fullName: string | null;
    isActive: boolean | null;
    ownedByUserId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RepositoryCountAggregateOutputType = {
    id: number;
    githubRepositoryId: number;
    githubInstallationId: number;
    owner: number;
    name: number;
    fullName: number;
    isActive: number;
    ownedByUserId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type RepositoryAvgAggregateInputType = {
    githubRepositoryId?: true;
    githubInstallationId?: true;
  };

  export type RepositorySumAggregateInputType = {
    githubRepositoryId?: true;
    githubInstallationId?: true;
  };

  export type RepositoryMinAggregateInputType = {
    id?: true;
    githubRepositoryId?: true;
    githubInstallationId?: true;
    owner?: true;
    name?: true;
    fullName?: true;
    isActive?: true;
    ownedByUserId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RepositoryMaxAggregateInputType = {
    id?: true;
    githubRepositoryId?: true;
    githubInstallationId?: true;
    owner?: true;
    name?: true;
    fullName?: true;
    isActive?: true;
    ownedByUserId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RepositoryCountAggregateInputType = {
    id?: true;
    githubRepositoryId?: true;
    githubInstallationId?: true;
    owner?: true;
    name?: true;
    fullName?: true;
    isActive?: true;
    ownedByUserId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type RepositoryAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Repository to aggregate.
     */
    where?: RepositoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RepositoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repositories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Repositories
     **/
    _count?: true | RepositoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RepositoryAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RepositorySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RepositoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RepositoryMaxAggregateInputType;
  };

  export type GetRepositoryAggregateType<T extends RepositoryAggregateArgs> = {
    [P in keyof T & keyof AggregateRepository]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepository[P]>
      : GetScalarType<T[P], AggregateRepository[P]>;
  };

  export type RepositoryGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RepositoryWhereInput;
    orderBy?: RepositoryOrderByWithAggregationInput | RepositoryOrderByWithAggregationInput[];
    by: RepositoryScalarFieldEnum[] | RepositoryScalarFieldEnum;
    having?: RepositoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RepositoryCountAggregateInputType | true;
    _avg?: RepositoryAvgAggregateInputType;
    _sum?: RepositorySumAggregateInputType;
    _min?: RepositoryMinAggregateInputType;
    _max?: RepositoryMaxAggregateInputType;
  };

  export type RepositoryGroupByOutputType = {
    id: string;
    githubRepositoryId: bigint;
    githubInstallationId: bigint;
    owner: string;
    name: string;
    fullName: string;
    isActive: boolean;
    ownedByUserId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: RepositoryCountAggregateOutputType | null;
    _avg: RepositoryAvgAggregateOutputType | null;
    _sum: RepositorySumAggregateOutputType | null;
    _min: RepositoryMinAggregateOutputType | null;
    _max: RepositoryMaxAggregateOutputType | null;
  };

  type GetRepositoryGroupByPayload<T extends RepositoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RepositoryGroupByOutputType, T['by']> & {
        [P in keyof T & keyof RepositoryGroupByOutputType]: P extends '_count'
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], RepositoryGroupByOutputType[P]>
          : GetScalarType<T[P], RepositoryGroupByOutputType[P]>;
      }
    >
  >;

  export type RepositorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        githubRepositoryId?: boolean;
        githubInstallationId?: boolean;
        owner?: boolean;
        name?: boolean;
        fullName?: boolean;
        isActive?: boolean;
        ownedByUserId?: boolean;
        createdAt?: boolean;
        updatedAt?: boolean;
        ownerUser?: boolean | UserDefaultArgs<ExtArgs>;
      },
      ExtArgs['result']['repository']
    >;

  export type RepositorySelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      githubRepositoryId?: boolean;
      githubInstallationId?: boolean;
      owner?: boolean;
      name?: boolean;
      fullName?: boolean;
      isActive?: boolean;
      ownedByUserId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      ownerUser?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['repository']
  >;

  export type RepositorySelectScalar = {
    id?: boolean;
    githubRepositoryId?: boolean;
    githubInstallationId?: boolean;
    owner?: boolean;
    name?: boolean;
    fullName?: boolean;
    isActive?: boolean;
    ownedByUserId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type RepositoryInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ownerUser?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RepositoryIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    ownerUser?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $RepositoryPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'Repository';
    objects: {
      ownerUser: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        githubRepositoryId: bigint;
        githubInstallationId: bigint;
        owner: string;
        name: string;
        fullName: string;
        isActive: boolean;
        ownedByUserId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['repository']
    >;
    composites: {};
  };

  type RepositoryGetPayload<S extends boolean | null | undefined | RepositoryDefaultArgs> =
    $Result.GetResult<Prisma.$RepositoryPayload, S>;

  type RepositoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RepositoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RepositoryCountAggregateInputType | true;
    };

  export interface RepositoryDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['Repository'];
      meta: { name: 'Repository' };
    };
    /**
     * Find zero or one Repository that matches the filter.
     * @param {RepositoryFindUniqueArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepositoryFindUniqueArgs>(
      args: SelectSubset<T, RepositoryFindUniqueArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one Repository that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepositoryFindUniqueOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepositoryFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RepositoryFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Repository that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepositoryFindFirstArgs>(
      args?: SelectSubset<T, RepositoryFindFirstArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first Repository that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindFirstOrThrowArgs} args - Arguments to find a Repository
     * @example
     * // Get one Repository
     * const repository = await prisma.repository.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepositoryFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RepositoryFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Repositories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Repositories
     * const repositories = await prisma.repository.findMany()
     *
     * // Get first 10 Repositories
     * const repositories = await prisma.repository.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const repositoryWithIdOnly = await prisma.repository.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RepositoryFindManyArgs>(
      args?: SelectSubset<T, RepositoryFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'findMany'>>;

    /**
     * Create a Repository.
     * @param {RepositoryCreateArgs} args - Arguments to create a Repository.
     * @example
     * // Create one Repository
     * const Repository = await prisma.repository.create({
     *   data: {
     *     // ... data to create a Repository
     *   }
     * })
     *
     */
    create<T extends RepositoryCreateArgs>(
      args: SelectSubset<T, RepositoryCreateArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many Repositories.
     * @param {RepositoryCreateManyArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RepositoryCreateManyArgs>(
      args?: SelectSubset<T, RepositoryCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Repositories and returns the data saved in the database.
     * @param {RepositoryCreateManyAndReturnArgs} args - Arguments to create many Repositories.
     * @example
     * // Create many Repositories
     * const repository = await prisma.repository.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Repositories and only return the `id`
     * const repositoryWithIdOnly = await prisma.repository.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RepositoryCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RepositoryCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a Repository.
     * @param {RepositoryDeleteArgs} args - Arguments to delete one Repository.
     * @example
     * // Delete one Repository
     * const Repository = await prisma.repository.delete({
     *   where: {
     *     // ... filter to delete one Repository
     *   }
     * })
     *
     */
    delete<T extends RepositoryDeleteArgs>(
      args: SelectSubset<T, RepositoryDeleteArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one Repository.
     * @param {RepositoryUpdateArgs} args - Arguments to update one Repository.
     * @example
     * // Update one Repository
     * const repository = await prisma.repository.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RepositoryUpdateArgs>(
      args: SelectSubset<T, RepositoryUpdateArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more Repositories.
     * @param {RepositoryDeleteManyArgs} args - Arguments to filter Repositories to delete.
     * @example
     * // Delete a few Repositories
     * const { count } = await prisma.repository.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RepositoryDeleteManyArgs>(
      args?: SelectSubset<T, RepositoryDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Repositories
     * const repository = await prisma.repository.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RepositoryUpdateManyArgs>(
      args: SelectSubset<T, RepositoryUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Repository.
     * @param {RepositoryUpsertArgs} args - Arguments to update or create a Repository.
     * @example
     * // Update or create a Repository
     * const repository = await prisma.repository.upsert({
     *   create: {
     *     // ... data to create a Repository
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Repository we want to update
     *   }
     * })
     */
    upsert<T extends RepositoryUpsertArgs>(
      args: SelectSubset<T, RepositoryUpsertArgs<ExtArgs>>,
    ): Prisma__RepositoryClient<
      $Result.GetResult<Prisma.$RepositoryPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of Repositories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryCountArgs} args - Arguments to filter Repositories to count.
     * @example
     * // Count the number of Repositories
     * const count = await prisma.repository.count({
     *   where: {
     *     // ... the filter for the Repositories we want to count
     *   }
     * })
     **/
    count<T extends RepositoryCountArgs>(
      args?: Subset<T, RepositoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepositoryCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RepositoryAggregateArgs>(
      args: Subset<T, RepositoryAggregateArgs>,
    ): Prisma.PrismaPromise<GetRepositoryAggregateType<T>>;

    /**
     * Group by Repository.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RepositoryGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: RepositoryGroupByArgs['orderBy'] }
        : { orderBy?: RepositoryGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, RepositoryGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetRepositoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Repository model
     */
    readonly fields: RepositoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Repository.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepositoryClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    ownerUser<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Repository model
   */
  interface RepositoryFieldRefs {
    readonly id: FieldRef<'Repository', 'String'>;
    readonly githubRepositoryId: FieldRef<'Repository', 'BigInt'>;
    readonly githubInstallationId: FieldRef<'Repository', 'BigInt'>;
    readonly owner: FieldRef<'Repository', 'String'>;
    readonly name: FieldRef<'Repository', 'String'>;
    readonly fullName: FieldRef<'Repository', 'String'>;
    readonly isActive: FieldRef<'Repository', 'Boolean'>;
    readonly ownedByUserId: FieldRef<'Repository', 'String'>;
    readonly createdAt: FieldRef<'Repository', 'DateTime'>;
    readonly updatedAt: FieldRef<'Repository', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * Repository findUnique
   */
  export type RepositoryFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput;
  };

  /**
   * Repository findUniqueOrThrow
   */
  export type RepositoryFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * Filter, which Repository to fetch.
     */
    where: RepositoryWhereUniqueInput;
  };

  /**
   * Repository findFirst
   */
  export type RepositoryFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repositories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[];
  };

  /**
   * Repository findFirstOrThrow
   */
  export type RepositoryFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * Filter, which Repository to fetch.
     */
    where?: RepositoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Repositories.
     */
    cursor?: RepositoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repositories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Repositories.
     */
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[];
  };

  /**
   * Repository findMany
   */
  export type RepositoryFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * Filter, which Repositories to fetch.
     */
    where?: RepositoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Repositories to fetch.
     */
    orderBy?: RepositoryOrderByWithRelationInput | RepositoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Repositories.
     */
    cursor?: RepositoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Repositories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Repositories.
     */
    skip?: number;
    distinct?: RepositoryScalarFieldEnum | RepositoryScalarFieldEnum[];
  };

  /**
   * Repository create
   */
  export type RepositoryCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a Repository.
     */
    data: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>;
  };

  /**
   * Repository createMany
   */
  export type RepositoryCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Repository createManyAndReturn
   */
  export type RepositoryCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many Repositories.
     */
    data: RepositoryCreateManyInput | RepositoryCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Repository update
   */
  export type RepositoryUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a Repository.
     */
    data: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>;
    /**
     * Choose, which Repository to update.
     */
    where: RepositoryWhereUniqueInput;
  };

  /**
   * Repository updateMany
   */
  export type RepositoryUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update Repositories.
     */
    data: XOR<RepositoryUpdateManyMutationInput, RepositoryUncheckedUpdateManyInput>;
    /**
     * Filter which Repositories to update
     */
    where?: RepositoryWhereInput;
  };

  /**
   * Repository upsert
   */
  export type RepositoryUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the Repository to update in case it exists.
     */
    where: RepositoryWhereUniqueInput;
    /**
     * In case the Repository found by the `where` argument doesn't exist, create a new Repository with this data.
     */
    create: XOR<RepositoryCreateInput, RepositoryUncheckedCreateInput>;
    /**
     * In case the Repository was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepositoryUpdateInput, RepositoryUncheckedUpdateInput>;
  };

  /**
   * Repository delete
   */
  export type RepositoryDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
    /**
     * Filter which Repository to delete.
     */
    where: RepositoryWhereUniqueInput;
  };

  /**
   * Repository deleteMany
   */
  export type RepositoryDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which Repositories to delete
     */
    where?: RepositoryWhereInput;
  };

  /**
   * Repository without action
   */
  export type RepositoryDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the Repository
     */
    select?: RepositorySelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInclude<ExtArgs> | null;
  };

  /**
   * Model RepositoryInstallation
   */

  export type AggregateRepositoryInstallation = {
    _count: RepositoryInstallationCountAggregateOutputType | null;
    _avg: RepositoryInstallationAvgAggregateOutputType | null;
    _sum: RepositoryInstallationSumAggregateOutputType | null;
    _min: RepositoryInstallationMinAggregateOutputType | null;
    _max: RepositoryInstallationMaxAggregateOutputType | null;
  };

  export type RepositoryInstallationAvgAggregateOutputType = {
    githubInstallationId: number | null;
    githubAccountId: number | null;
  };

  export type RepositoryInstallationSumAggregateOutputType = {
    githubInstallationId: bigint | null;
    githubAccountId: bigint | null;
  };

  export type RepositoryInstallationMinAggregateOutputType = {
    id: string | null;
    githubInstallationId: bigint | null;
    githubAccountId: bigint | null;
    githubAccountLogin: string | null;
    createdByUserId: string | null;
    status: $Enums.InstallationStatus | null;
    installedAt: Date | null;
    removedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RepositoryInstallationMaxAggregateOutputType = {
    id: string | null;
    githubInstallationId: bigint | null;
    githubAccountId: bigint | null;
    githubAccountLogin: string | null;
    createdByUserId: string | null;
    status: $Enums.InstallationStatus | null;
    installedAt: Date | null;
    removedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type RepositoryInstallationCountAggregateOutputType = {
    id: number;
    githubInstallationId: number;
    githubAccountId: number;
    githubAccountLogin: number;
    createdByUserId: number;
    status: number;
    installedAt: number;
    removedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type RepositoryInstallationAvgAggregateInputType = {
    githubInstallationId?: true;
    githubAccountId?: true;
  };

  export type RepositoryInstallationSumAggregateInputType = {
    githubInstallationId?: true;
    githubAccountId?: true;
  };

  export type RepositoryInstallationMinAggregateInputType = {
    id?: true;
    githubInstallationId?: true;
    githubAccountId?: true;
    githubAccountLogin?: true;
    createdByUserId?: true;
    status?: true;
    installedAt?: true;
    removedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RepositoryInstallationMaxAggregateInputType = {
    id?: true;
    githubInstallationId?: true;
    githubAccountId?: true;
    githubAccountLogin?: true;
    createdByUserId?: true;
    status?: true;
    installedAt?: true;
    removedAt?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type RepositoryInstallationCountAggregateInputType = {
    id?: true;
    githubInstallationId?: true;
    githubAccountId?: true;
    githubAccountLogin?: true;
    createdByUserId?: true;
    status?: true;
    installedAt?: true;
    removedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type RepositoryInstallationAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RepositoryInstallation to aggregate.
     */
    where?: RepositoryInstallationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepositoryInstallations to fetch.
     */
    orderBy?:
      | RepositoryInstallationOrderByWithRelationInput
      | RepositoryInstallationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: RepositoryInstallationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepositoryInstallations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepositoryInstallations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned RepositoryInstallations
     **/
    _count?: true | RepositoryInstallationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: RepositoryInstallationAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: RepositoryInstallationSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: RepositoryInstallationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: RepositoryInstallationMaxAggregateInputType;
  };

  export type GetRepositoryInstallationAggregateType<
    T extends RepositoryInstallationAggregateArgs,
  > = {
    [P in keyof T & keyof AggregateRepositoryInstallation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRepositoryInstallation[P]>
      : GetScalarType<T[P], AggregateRepositoryInstallation[P]>;
  };

  export type RepositoryInstallationGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    where?: RepositoryInstallationWhereInput;
    orderBy?:
      | RepositoryInstallationOrderByWithAggregationInput
      | RepositoryInstallationOrderByWithAggregationInput[];
    by: RepositoryInstallationScalarFieldEnum[] | RepositoryInstallationScalarFieldEnum;
    having?: RepositoryInstallationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RepositoryInstallationCountAggregateInputType | true;
    _avg?: RepositoryInstallationAvgAggregateInputType;
    _sum?: RepositoryInstallationSumAggregateInputType;
    _min?: RepositoryInstallationMinAggregateInputType;
    _max?: RepositoryInstallationMaxAggregateInputType;
  };

  export type RepositoryInstallationGroupByOutputType = {
    id: string;
    githubInstallationId: bigint;
    githubAccountId: bigint;
    githubAccountLogin: string;
    createdByUserId: string;
    status: $Enums.InstallationStatus;
    installedAt: Date;
    removedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: RepositoryInstallationCountAggregateOutputType | null;
    _avg: RepositoryInstallationAvgAggregateOutputType | null;
    _sum: RepositoryInstallationSumAggregateOutputType | null;
    _min: RepositoryInstallationMinAggregateOutputType | null;
    _max: RepositoryInstallationMaxAggregateOutputType | null;
  };

  type GetRepositoryInstallationGroupByPayload<T extends RepositoryInstallationGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<RepositoryInstallationGroupByOutputType, T['by']> & {
          [P in keyof T & keyof RepositoryInstallationGroupByOutputType]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RepositoryInstallationGroupByOutputType[P]>
            : GetScalarType<T[P], RepositoryInstallationGroupByOutputType[P]>;
        }
      >
    >;

  export type RepositoryInstallationSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      githubInstallationId?: boolean;
      githubAccountId?: boolean;
      githubAccountLogin?: boolean;
      createdByUserId?: boolean;
      status?: boolean;
      installedAt?: boolean;
      removedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      createdByUser?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['repositoryInstallation']
  >;

  export type RepositoryInstallationSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      githubInstallationId?: boolean;
      githubAccountId?: boolean;
      githubAccountLogin?: boolean;
      createdByUserId?: boolean;
      status?: boolean;
      installedAt?: boolean;
      removedAt?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      createdByUser?: boolean | UserDefaultArgs<ExtArgs>;
    },
    ExtArgs['result']['repositoryInstallation']
  >;

  export type RepositoryInstallationSelectScalar = {
    id?: boolean;
    githubInstallationId?: boolean;
    githubAccountId?: boolean;
    githubAccountLogin?: boolean;
    createdByUserId?: boolean;
    status?: boolean;
    installedAt?: boolean;
    removedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type RepositoryInstallationInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    createdByUser?: boolean | UserDefaultArgs<ExtArgs>;
  };
  export type RepositoryInstallationIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    createdByUser?: boolean | UserDefaultArgs<ExtArgs>;
  };

  export type $RepositoryInstallationPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    name: 'RepositoryInstallation';
    objects: {
      createdByUser: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        githubInstallationId: bigint;
        githubAccountId: bigint;
        githubAccountLogin: string;
        createdByUserId: string;
        status: $Enums.InstallationStatus;
        installedAt: Date;
        removedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs['result']['repositoryInstallation']
    >;
    composites: {};
  };

  type RepositoryInstallationGetPayload<
    S extends boolean | null | undefined | RepositoryInstallationDefaultArgs,
  > = $Result.GetResult<Prisma.$RepositoryInstallationPayload, S>;

  type RepositoryInstallationCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = Omit<RepositoryInstallationFindManyArgs, 'select' | 'include' | 'distinct'> & {
    select?: RepositoryInstallationCountAggregateInputType | true;
  };

  export interface RepositoryInstallationDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>['model']['RepositoryInstallation'];
      meta: { name: 'RepositoryInstallation' };
    };
    /**
     * Find zero or one RepositoryInstallation that matches the filter.
     * @param {RepositoryInstallationFindUniqueArgs} args - Arguments to find a RepositoryInstallation
     * @example
     * // Get one RepositoryInstallation
     * const repositoryInstallation = await prisma.repositoryInstallation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RepositoryInstallationFindUniqueArgs>(
      args: SelectSubset<T, RepositoryInstallationFindUniqueArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'findUnique'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find one RepositoryInstallation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RepositoryInstallationFindUniqueOrThrowArgs} args - Arguments to find a RepositoryInstallation
     * @example
     * // Get one RepositoryInstallation
     * const repositoryInstallation = await prisma.repositoryInstallation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RepositoryInstallationFindUniqueOrThrowArgs>(
      args: SelectSubset<T, RepositoryInstallationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'findUniqueOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find the first RepositoryInstallation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryInstallationFindFirstArgs} args - Arguments to find a RepositoryInstallation
     * @example
     * // Get one RepositoryInstallation
     * const repositoryInstallation = await prisma.repositoryInstallation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RepositoryInstallationFindFirstArgs>(
      args?: SelectSubset<T, RepositoryInstallationFindFirstArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'findFirst'> | null,
      null,
      ExtArgs
    >;

    /**
     * Find the first RepositoryInstallation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryInstallationFindFirstOrThrowArgs} args - Arguments to find a RepositoryInstallation
     * @example
     * // Get one RepositoryInstallation
     * const repositoryInstallation = await prisma.repositoryInstallation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RepositoryInstallationFindFirstOrThrowArgs>(
      args?: SelectSubset<T, RepositoryInstallationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'findFirstOrThrow'>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more RepositoryInstallations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryInstallationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RepositoryInstallations
     * const repositoryInstallations = await prisma.repositoryInstallation.findMany()
     *
     * // Get first 10 RepositoryInstallations
     * const repositoryInstallations = await prisma.repositoryInstallation.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const repositoryInstallationWithIdOnly = await prisma.repositoryInstallation.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RepositoryInstallationFindManyArgs>(
      args?: SelectSubset<T, RepositoryInstallationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'findMany'>
    >;

    /**
     * Create a RepositoryInstallation.
     * @param {RepositoryInstallationCreateArgs} args - Arguments to create a RepositoryInstallation.
     * @example
     * // Create one RepositoryInstallation
     * const RepositoryInstallation = await prisma.repositoryInstallation.create({
     *   data: {
     *     // ... data to create a RepositoryInstallation
     *   }
     * })
     *
     */
    create<T extends RepositoryInstallationCreateArgs>(
      args: SelectSubset<T, RepositoryInstallationCreateArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'create'>,
      never,
      ExtArgs
    >;

    /**
     * Create many RepositoryInstallations.
     * @param {RepositoryInstallationCreateManyArgs} args - Arguments to create many RepositoryInstallations.
     * @example
     * // Create many RepositoryInstallations
     * const repositoryInstallation = await prisma.repositoryInstallation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RepositoryInstallationCreateManyArgs>(
      args?: SelectSubset<T, RepositoryInstallationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many RepositoryInstallations and returns the data saved in the database.
     * @param {RepositoryInstallationCreateManyAndReturnArgs} args - Arguments to create many RepositoryInstallations.
     * @example
     * // Create many RepositoryInstallations
     * const repositoryInstallation = await prisma.repositoryInstallation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many RepositoryInstallations and only return the `id`
     * const repositoryInstallationWithIdOnly = await prisma.repositoryInstallation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RepositoryInstallationCreateManyAndReturnArgs>(
      args?: SelectSubset<T, RepositoryInstallationCreateManyAndReturnArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'createManyAndReturn'>
    >;

    /**
     * Delete a RepositoryInstallation.
     * @param {RepositoryInstallationDeleteArgs} args - Arguments to delete one RepositoryInstallation.
     * @example
     * // Delete one RepositoryInstallation
     * const RepositoryInstallation = await prisma.repositoryInstallation.delete({
     *   where: {
     *     // ... filter to delete one RepositoryInstallation
     *   }
     * })
     *
     */
    delete<T extends RepositoryInstallationDeleteArgs>(
      args: SelectSubset<T, RepositoryInstallationDeleteArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'delete'>,
      never,
      ExtArgs
    >;

    /**
     * Update one RepositoryInstallation.
     * @param {RepositoryInstallationUpdateArgs} args - Arguments to update one RepositoryInstallation.
     * @example
     * // Update one RepositoryInstallation
     * const repositoryInstallation = await prisma.repositoryInstallation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RepositoryInstallationUpdateArgs>(
      args: SelectSubset<T, RepositoryInstallationUpdateArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'update'>,
      never,
      ExtArgs
    >;

    /**
     * Delete zero or more RepositoryInstallations.
     * @param {RepositoryInstallationDeleteManyArgs} args - Arguments to filter RepositoryInstallations to delete.
     * @example
     * // Delete a few RepositoryInstallations
     * const { count } = await prisma.repositoryInstallation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RepositoryInstallationDeleteManyArgs>(
      args?: SelectSubset<T, RepositoryInstallationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more RepositoryInstallations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryInstallationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RepositoryInstallations
     * const repositoryInstallation = await prisma.repositoryInstallation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RepositoryInstallationUpdateManyArgs>(
      args: SelectSubset<T, RepositoryInstallationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one RepositoryInstallation.
     * @param {RepositoryInstallationUpsertArgs} args - Arguments to update or create a RepositoryInstallation.
     * @example
     * // Update or create a RepositoryInstallation
     * const repositoryInstallation = await prisma.repositoryInstallation.upsert({
     *   create: {
     *     // ... data to create a RepositoryInstallation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RepositoryInstallation we want to update
     *   }
     * })
     */
    upsert<T extends RepositoryInstallationUpsertArgs>(
      args: SelectSubset<T, RepositoryInstallationUpsertArgs<ExtArgs>>,
    ): Prisma__RepositoryInstallationClient<
      $Result.GetResult<Prisma.$RepositoryInstallationPayload<ExtArgs>, T, 'upsert'>,
      never,
      ExtArgs
    >;

    /**
     * Count the number of RepositoryInstallations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryInstallationCountArgs} args - Arguments to filter RepositoryInstallations to count.
     * @example
     * // Count the number of RepositoryInstallations
     * const count = await prisma.repositoryInstallation.count({
     *   where: {
     *     // ... the filter for the RepositoryInstallations we want to count
     *   }
     * })
     **/
    count<T extends RepositoryInstallationCountArgs>(
      args?: Subset<T, RepositoryInstallationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RepositoryInstallationCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a RepositoryInstallation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryInstallationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends RepositoryInstallationAggregateArgs>(
      args: Subset<T, RepositoryInstallationAggregateArgs>,
    ): Prisma.PrismaPromise<GetRepositoryInstallationAggregateType<T>>;

    /**
     * Group by RepositoryInstallation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RepositoryInstallationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends RepositoryInstallationGroupByArgs,
      HasSelectOrTake extends Or<Extends<'skip', Keys<T>>, Extends<'take', Keys<T>>>,
      OrderByArg extends (True extends HasSelectOrTake
        ? { orderBy: RepositoryInstallationGroupByArgs['orderBy'] }
        : { orderBy?: RepositoryInstallationGroupByArgs['orderBy'] }),
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends (T['by'] extends never[] ? True : False),
      InputErrors extends (ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, 'Field ', P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]),
    >(
      args: SubsetIntersection<T, RepositoryInstallationGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors
      ? GetRepositoryInstallationGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the RepositoryInstallation model
     */
    readonly fields: RepositoryInstallationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RepositoryInstallation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RepositoryInstallationClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    createdByUser<T extends UserDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, UserDefaultArgs<ExtArgs>>,
    ): Prisma__UserClient<
      $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null,
      Null,
      ExtArgs
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the RepositoryInstallation model
   */
  interface RepositoryInstallationFieldRefs {
    readonly id: FieldRef<'RepositoryInstallation', 'String'>;
    readonly githubInstallationId: FieldRef<'RepositoryInstallation', 'BigInt'>;
    readonly githubAccountId: FieldRef<'RepositoryInstallation', 'BigInt'>;
    readonly githubAccountLogin: FieldRef<'RepositoryInstallation', 'String'>;
    readonly createdByUserId: FieldRef<'RepositoryInstallation', 'String'>;
    readonly status: FieldRef<'RepositoryInstallation', 'InstallationStatus'>;
    readonly installedAt: FieldRef<'RepositoryInstallation', 'DateTime'>;
    readonly removedAt: FieldRef<'RepositoryInstallation', 'DateTime'>;
    readonly createdAt: FieldRef<'RepositoryInstallation', 'DateTime'>;
    readonly updatedAt: FieldRef<'RepositoryInstallation', 'DateTime'>;
  }

  // Custom InputTypes
  /**
   * RepositoryInstallation findUnique
   */
  export type RepositoryInstallationFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * Filter, which RepositoryInstallation to fetch.
     */
    where: RepositoryInstallationWhereUniqueInput;
  };

  /**
   * RepositoryInstallation findUniqueOrThrow
   */
  export type RepositoryInstallationFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * Filter, which RepositoryInstallation to fetch.
     */
    where: RepositoryInstallationWhereUniqueInput;
  };

  /**
   * RepositoryInstallation findFirst
   */
  export type RepositoryInstallationFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * Filter, which RepositoryInstallation to fetch.
     */
    where?: RepositoryInstallationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepositoryInstallations to fetch.
     */
    orderBy?:
      | RepositoryInstallationOrderByWithRelationInput
      | RepositoryInstallationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RepositoryInstallations.
     */
    cursor?: RepositoryInstallationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepositoryInstallations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepositoryInstallations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RepositoryInstallations.
     */
    distinct?: RepositoryInstallationScalarFieldEnum | RepositoryInstallationScalarFieldEnum[];
  };

  /**
   * RepositoryInstallation findFirstOrThrow
   */
  export type RepositoryInstallationFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * Filter, which RepositoryInstallation to fetch.
     */
    where?: RepositoryInstallationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepositoryInstallations to fetch.
     */
    orderBy?:
      | RepositoryInstallationOrderByWithRelationInput
      | RepositoryInstallationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for RepositoryInstallations.
     */
    cursor?: RepositoryInstallationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepositoryInstallations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepositoryInstallations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of RepositoryInstallations.
     */
    distinct?: RepositoryInstallationScalarFieldEnum | RepositoryInstallationScalarFieldEnum[];
  };

  /**
   * RepositoryInstallation findMany
   */
  export type RepositoryInstallationFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * Filter, which RepositoryInstallations to fetch.
     */
    where?: RepositoryInstallationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of RepositoryInstallations to fetch.
     */
    orderBy?:
      | RepositoryInstallationOrderByWithRelationInput
      | RepositoryInstallationOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing RepositoryInstallations.
     */
    cursor?: RepositoryInstallationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` RepositoryInstallations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` RepositoryInstallations.
     */
    skip?: number;
    distinct?: RepositoryInstallationScalarFieldEnum | RepositoryInstallationScalarFieldEnum[];
  };

  /**
   * RepositoryInstallation create
   */
  export type RepositoryInstallationCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * The data needed to create a RepositoryInstallation.
     */
    data: XOR<RepositoryInstallationCreateInput, RepositoryInstallationUncheckedCreateInput>;
  };

  /**
   * RepositoryInstallation createMany
   */
  export type RepositoryInstallationCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to create many RepositoryInstallations.
     */
    data: RepositoryInstallationCreateManyInput | RepositoryInstallationCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * RepositoryInstallation createManyAndReturn
   */
  export type RepositoryInstallationCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * The data used to create many RepositoryInstallations.
     */
    data: RepositoryInstallationCreateManyInput | RepositoryInstallationCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * RepositoryInstallation update
   */
  export type RepositoryInstallationUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * The data needed to update a RepositoryInstallation.
     */
    data: XOR<RepositoryInstallationUpdateInput, RepositoryInstallationUncheckedUpdateInput>;
    /**
     * Choose, which RepositoryInstallation to update.
     */
    where: RepositoryInstallationWhereUniqueInput;
  };

  /**
   * RepositoryInstallation updateMany
   */
  export type RepositoryInstallationUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * The data used to update RepositoryInstallations.
     */
    data: XOR<
      RepositoryInstallationUpdateManyMutationInput,
      RepositoryInstallationUncheckedUpdateManyInput
    >;
    /**
     * Filter which RepositoryInstallations to update
     */
    where?: RepositoryInstallationWhereInput;
  };

  /**
   * RepositoryInstallation upsert
   */
  export type RepositoryInstallationUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * The filter to search for the RepositoryInstallation to update in case it exists.
     */
    where: RepositoryInstallationWhereUniqueInput;
    /**
     * In case the RepositoryInstallation found by the `where` argument doesn't exist, create a new RepositoryInstallation with this data.
     */
    create: XOR<RepositoryInstallationCreateInput, RepositoryInstallationUncheckedCreateInput>;
    /**
     * In case the RepositoryInstallation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RepositoryInstallationUpdateInput, RepositoryInstallationUncheckedUpdateInput>;
  };

  /**
   * RepositoryInstallation delete
   */
  export type RepositoryInstallationDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
    /**
     * Filter which RepositoryInstallation to delete.
     */
    where: RepositoryInstallationWhereUniqueInput;
  };

  /**
   * RepositoryInstallation deleteMany
   */
  export type RepositoryInstallationDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Filter which RepositoryInstallations to delete
     */
    where?: RepositoryInstallationWhereInput;
  };

  /**
   * RepositoryInstallation without action
   */
  export type RepositoryInstallationDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the RepositoryInstallation
     */
    select?: RepositoryInstallationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RepositoryInstallationInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted';
    ReadCommitted: 'ReadCommitted';
    RepeatableRead: 'RepeatableRead';
    Serializable: 'Serializable';
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: 'id';
    githubUserId: 'githubUserId';
    githubUsername: 'githubUsername';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const SessionScalarFieldEnum: {
    id: 'id';
    userId: 'userId';
    data: 'data';
    expiresAt: 'expiresAt';
    createdAt: 'createdAt';
  };

  export type SessionScalarFieldEnum =
    (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];

  export const RepositoryScalarFieldEnum: {
    id: 'id';
    githubRepositoryId: 'githubRepositoryId';
    githubInstallationId: 'githubInstallationId';
    owner: 'owner';
    name: 'name';
    fullName: 'fullName';
    isActive: 'isActive';
    ownedByUserId: 'ownedByUserId';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type RepositoryScalarFieldEnum =
    (typeof RepositoryScalarFieldEnum)[keyof typeof RepositoryScalarFieldEnum];

  export const RepositoryInstallationScalarFieldEnum: {
    id: 'id';
    githubInstallationId: 'githubInstallationId';
    githubAccountId: 'githubAccountId';
    githubAccountLogin: 'githubAccountLogin';
    createdByUserId: 'createdByUserId';
    status: 'status';
    installedAt: 'installedAt';
    removedAt: 'removedAt';
    createdAt: 'createdAt';
    updatedAt: 'updatedAt';
  };

  export type RepositoryInstallationScalarFieldEnum =
    (typeof RepositoryInstallationScalarFieldEnum)[keyof typeof RepositoryInstallationScalarFieldEnum];

  export const SortOrder: {
    asc: 'asc';
    desc: 'desc';
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull;
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];

  export const QueryMode: {
    default: 'default';
    insensitive: 'insensitive';
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const JsonNullValueFilter: {
    DbNull: typeof DbNull;
    JsonNull: typeof JsonNull;
    AnyNull: typeof AnyNull;
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];

  export const NullsOrder: {
    first: 'first';
    last: 'last';
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;

  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;

  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'DateTime[]'
  >;

  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;

  /**
   * Reference to a field of type 'InstallationStatus'
   */
  export type EnumInstallationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'InstallationStatus'
  >;

  /**
   * Reference to a field of type 'InstallationStatus[]'
   */
  export type ListEnumInstallationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    'InstallationStatus[]'
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<'User'> | string;
    githubUserId?: BigIntFilter<'User'> | bigint | number;
    githubUsername?: StringFilter<'User'> | string;
    createdAt?: DateTimeFilter<'User'> | Date | string;
    updatedAt?: DateTimeFilter<'User'> | Date | string;
    sessions?: SessionListRelationFilter;
    repositories?: RepositoryListRelationFilter;
    repositoryInstallations?: RepositoryInstallationListRelationFilter;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    githubUserId?: SortOrder;
    githubUsername?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    sessions?: SessionOrderByRelationAggregateInput;
    repositories?: RepositoryOrderByRelationAggregateInput;
    repositoryInstallations?: RepositoryInstallationOrderByRelationAggregateInput;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      githubUserId?: bigint | number;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      githubUsername?: StringFilter<'User'> | string;
      createdAt?: DateTimeFilter<'User'> | Date | string;
      updatedAt?: DateTimeFilter<'User'> | Date | string;
      sessions?: SessionListRelationFilter;
      repositories?: RepositoryListRelationFilter;
      repositoryInstallations?: RepositoryInstallationListRelationFilter;
    },
    'id' | 'githubUserId'
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    githubUserId?: SortOrder;
    githubUsername?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _avg?: UserAvgOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
    _sum?: UserSumOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'User'> | string;
    githubUserId?: BigIntWithAggregatesFilter<'User'> | bigint | number;
    githubUsername?: StringWithAggregatesFilter<'User'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'User'> | Date | string;
  };

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[];
    OR?: SessionWhereInput[];
    NOT?: SessionWhereInput | SessionWhereInput[];
    id?: StringFilter<'Session'> | string;
    userId?: StringFilter<'Session'> | string;
    data?: JsonFilter<'Session'>;
    expiresAt?: DateTimeFilter<'Session'> | Date | string;
    createdAt?: DateTimeFilter<'Session'> | Date | string;
    user?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    data?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    user?: UserOrderByWithRelationInput;
  };

  export type SessionWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: SessionWhereInput | SessionWhereInput[];
      OR?: SessionWhereInput[];
      NOT?: SessionWhereInput | SessionWhereInput[];
      userId?: StringFilter<'Session'> | string;
      data?: JsonFilter<'Session'>;
      expiresAt?: DateTimeFilter<'Session'> | Date | string;
      createdAt?: DateTimeFilter<'Session'> | Date | string;
      user?: XOR<UserRelationFilter, UserWhereInput>;
    },
    'id'
  >;

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder;
    userId?: SortOrder;
    data?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
    _count?: SessionCountOrderByAggregateInput;
    _max?: SessionMaxOrderByAggregateInput;
    _min?: SessionMinOrderByAggregateInput;
  };

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
    OR?: SessionScalarWhereWithAggregatesInput[];
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Session'> | string;
    userId?: StringWithAggregatesFilter<'Session'> | string;
    data?: JsonWithAggregatesFilter<'Session'>;
    expiresAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
    createdAt?: DateTimeWithAggregatesFilter<'Session'> | Date | string;
  };

  export type RepositoryWhereInput = {
    AND?: RepositoryWhereInput | RepositoryWhereInput[];
    OR?: RepositoryWhereInput[];
    NOT?: RepositoryWhereInput | RepositoryWhereInput[];
    id?: StringFilter<'Repository'> | string;
    githubRepositoryId?: BigIntFilter<'Repository'> | bigint | number;
    githubInstallationId?: BigIntFilter<'Repository'> | bigint | number;
    owner?: StringFilter<'Repository'> | string;
    name?: StringFilter<'Repository'> | string;
    fullName?: StringFilter<'Repository'> | string;
    isActive?: BoolFilter<'Repository'> | boolean;
    ownedByUserId?: StringFilter<'Repository'> | string;
    createdAt?: DateTimeFilter<'Repository'> | Date | string;
    updatedAt?: DateTimeFilter<'Repository'> | Date | string;
    ownerUser?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type RepositoryOrderByWithRelationInput = {
    id?: SortOrder;
    githubRepositoryId?: SortOrder;
    githubInstallationId?: SortOrder;
    owner?: SortOrder;
    name?: SortOrder;
    fullName?: SortOrder;
    isActive?: SortOrder;
    ownedByUserId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    ownerUser?: UserOrderByWithRelationInput;
  };

  export type RepositoryWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      githubRepositoryId?: bigint | number;
      AND?: RepositoryWhereInput | RepositoryWhereInput[];
      OR?: RepositoryWhereInput[];
      NOT?: RepositoryWhereInput | RepositoryWhereInput[];
      githubInstallationId?: BigIntFilter<'Repository'> | bigint | number;
      owner?: StringFilter<'Repository'> | string;
      name?: StringFilter<'Repository'> | string;
      fullName?: StringFilter<'Repository'> | string;
      isActive?: BoolFilter<'Repository'> | boolean;
      ownedByUserId?: StringFilter<'Repository'> | string;
      createdAt?: DateTimeFilter<'Repository'> | Date | string;
      updatedAt?: DateTimeFilter<'Repository'> | Date | string;
      ownerUser?: XOR<UserRelationFilter, UserWhereInput>;
    },
    'id' | 'githubRepositoryId'
  >;

  export type RepositoryOrderByWithAggregationInput = {
    id?: SortOrder;
    githubRepositoryId?: SortOrder;
    githubInstallationId?: SortOrder;
    owner?: SortOrder;
    name?: SortOrder;
    fullName?: SortOrder;
    isActive?: SortOrder;
    ownedByUserId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: RepositoryCountOrderByAggregateInput;
    _avg?: RepositoryAvgOrderByAggregateInput;
    _max?: RepositoryMaxOrderByAggregateInput;
    _min?: RepositoryMinOrderByAggregateInput;
    _sum?: RepositorySumOrderByAggregateInput;
  };

  export type RepositoryScalarWhereWithAggregatesInput = {
    AND?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[];
    OR?: RepositoryScalarWhereWithAggregatesInput[];
    NOT?: RepositoryScalarWhereWithAggregatesInput | RepositoryScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'Repository'> | string;
    githubRepositoryId?: BigIntWithAggregatesFilter<'Repository'> | bigint | number;
    githubInstallationId?: BigIntWithAggregatesFilter<'Repository'> | bigint | number;
    owner?: StringWithAggregatesFilter<'Repository'> | string;
    name?: StringWithAggregatesFilter<'Repository'> | string;
    fullName?: StringWithAggregatesFilter<'Repository'> | string;
    isActive?: BoolWithAggregatesFilter<'Repository'> | boolean;
    ownedByUserId?: StringWithAggregatesFilter<'Repository'> | string;
    createdAt?: DateTimeWithAggregatesFilter<'Repository'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'Repository'> | Date | string;
  };

  export type RepositoryInstallationWhereInput = {
    AND?: RepositoryInstallationWhereInput | RepositoryInstallationWhereInput[];
    OR?: RepositoryInstallationWhereInput[];
    NOT?: RepositoryInstallationWhereInput | RepositoryInstallationWhereInput[];
    id?: StringFilter<'RepositoryInstallation'> | string;
    githubInstallationId?: BigIntFilter<'RepositoryInstallation'> | bigint | number;
    githubAccountId?: BigIntFilter<'RepositoryInstallation'> | bigint | number;
    githubAccountLogin?: StringFilter<'RepositoryInstallation'> | string;
    createdByUserId?: StringFilter<'RepositoryInstallation'> | string;
    status?: EnumInstallationStatusFilter<'RepositoryInstallation'> | $Enums.InstallationStatus;
    installedAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
    removedAt?: DateTimeNullableFilter<'RepositoryInstallation'> | Date | string | null;
    createdAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
    updatedAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
    createdByUser?: XOR<UserRelationFilter, UserWhereInput>;
  };

  export type RepositoryInstallationOrderByWithRelationInput = {
    id?: SortOrder;
    githubInstallationId?: SortOrder;
    githubAccountId?: SortOrder;
    githubAccountLogin?: SortOrder;
    createdByUserId?: SortOrder;
    status?: SortOrder;
    installedAt?: SortOrder;
    removedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    createdByUser?: UserOrderByWithRelationInput;
  };

  export type RepositoryInstallationWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      githubInstallationId?: bigint | number;
      AND?: RepositoryInstallationWhereInput | RepositoryInstallationWhereInput[];
      OR?: RepositoryInstallationWhereInput[];
      NOT?: RepositoryInstallationWhereInput | RepositoryInstallationWhereInput[];
      githubAccountId?: BigIntFilter<'RepositoryInstallation'> | bigint | number;
      githubAccountLogin?: StringFilter<'RepositoryInstallation'> | string;
      createdByUserId?: StringFilter<'RepositoryInstallation'> | string;
      status?: EnumInstallationStatusFilter<'RepositoryInstallation'> | $Enums.InstallationStatus;
      installedAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
      removedAt?: DateTimeNullableFilter<'RepositoryInstallation'> | Date | string | null;
      createdAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
      updatedAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
      createdByUser?: XOR<UserRelationFilter, UserWhereInput>;
    },
    'id' | 'githubInstallationId'
  >;

  export type RepositoryInstallationOrderByWithAggregationInput = {
    id?: SortOrder;
    githubInstallationId?: SortOrder;
    githubAccountId?: SortOrder;
    githubAccountLogin?: SortOrder;
    createdByUserId?: SortOrder;
    status?: SortOrder;
    installedAt?: SortOrder;
    removedAt?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: RepositoryInstallationCountOrderByAggregateInput;
    _avg?: RepositoryInstallationAvgOrderByAggregateInput;
    _max?: RepositoryInstallationMaxOrderByAggregateInput;
    _min?: RepositoryInstallationMinOrderByAggregateInput;
    _sum?: RepositoryInstallationSumOrderByAggregateInput;
  };

  export type RepositoryInstallationScalarWhereWithAggregatesInput = {
    AND?:
      | RepositoryInstallationScalarWhereWithAggregatesInput
      | RepositoryInstallationScalarWhereWithAggregatesInput[];
    OR?: RepositoryInstallationScalarWhereWithAggregatesInput[];
    NOT?:
      | RepositoryInstallationScalarWhereWithAggregatesInput
      | RepositoryInstallationScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<'RepositoryInstallation'> | string;
    githubInstallationId?: BigIntWithAggregatesFilter<'RepositoryInstallation'> | bigint | number;
    githubAccountId?: BigIntWithAggregatesFilter<'RepositoryInstallation'> | bigint | number;
    githubAccountLogin?: StringWithAggregatesFilter<'RepositoryInstallation'> | string;
    createdByUserId?: StringWithAggregatesFilter<'RepositoryInstallation'> | string;
    status?:
      | EnumInstallationStatusWithAggregatesFilter<'RepositoryInstallation'>
      | $Enums.InstallationStatus;
    installedAt?: DateTimeWithAggregatesFilter<'RepositoryInstallation'> | Date | string;
    removedAt?:
      DateTimeNullableWithAggregatesFilter<'RepositoryInstallation'> | Date | string | null;
    createdAt?: DateTimeWithAggregatesFilter<'RepositoryInstallation'> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<'RepositoryInstallation'> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    repositories?: RepositoryCreateNestedManyWithoutOwnerUserInput;
    repositoryInstallations?: RepositoryInstallationCreateNestedManyWithoutCreatedByUserInput;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    repositories?: RepositoryUncheckedCreateNestedManyWithoutOwnerUserInput;
    repositoryInstallations?: RepositoryInstallationUncheckedCreateNestedManyWithoutCreatedByUserInput;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    repositories?: RepositoryUpdateManyWithoutOwnerUserNestedInput;
    repositoryInstallations?: RepositoryInstallationUpdateManyWithoutCreatedByUserNestedInput;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    repositories?: RepositoryUncheckedUpdateManyWithoutOwnerUserNestedInput;
    repositoryInstallations?: RepositoryInstallationUncheckedUpdateManyWithoutCreatedByUserNestedInput;
  };

  export type UserCreateManyInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateInput = {
    id: string;
    data: JsonNullValueInput | InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
    user: UserCreateNestedOneWithoutSessionsInput;
  };

  export type SessionUncheckedCreateInput = {
    id: string;
    userId: string;
    data: JsonNullValueInput | InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    data?: JsonNullValueInput | InputJsonValue;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput;
  };

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    data?: JsonNullValueInput | InputJsonValue;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionCreateManyInput = {
    id: string;
    userId: string;
    data: JsonNullValueInput | InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    data?: JsonNullValueInput | InputJsonValue;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    userId?: StringFieldUpdateOperationsInput | string;
    data?: JsonNullValueInput | InputJsonValue;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryCreateInput = {
    id?: string;
    githubRepositoryId: bigint | number;
    githubInstallationId: bigint | number;
    owner: string;
    name: string;
    fullName: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ownerUser: UserCreateNestedOneWithoutRepositoriesInput;
  };

  export type RepositoryUncheckedCreateInput = {
    id?: string;
    githubRepositoryId: bigint | number;
    githubInstallationId: bigint | number;
    owner: string;
    name: string;
    fullName: string;
    isActive?: boolean;
    ownedByUserId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubRepositoryId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    owner?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ownerUser?: UserUpdateOneRequiredWithoutRepositoriesNestedInput;
  };

  export type RepositoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubRepositoryId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    owner?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    ownedByUserId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryCreateManyInput = {
    id?: string;
    githubRepositoryId: bigint | number;
    githubInstallationId: bigint | number;
    owner: string;
    name: string;
    fullName: string;
    isActive?: boolean;
    ownedByUserId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubRepositoryId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    owner?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubRepositoryId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    owner?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    ownedByUserId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryInstallationCreateInput = {
    id?: string;
    githubInstallationId: bigint | number;
    githubAccountId: bigint | number;
    githubAccountLogin: string;
    status?: $Enums.InstallationStatus;
    installedAt: Date | string;
    removedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdByUser: UserCreateNestedOneWithoutRepositoryInstallationsInput;
  };

  export type RepositoryInstallationUncheckedCreateInput = {
    id?: string;
    githubInstallationId: bigint | number;
    githubAccountId: bigint | number;
    githubAccountLogin: string;
    createdByUserId: string;
    status?: $Enums.InstallationStatus;
    installedAt: Date | string;
    removedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryInstallationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountLogin?: StringFieldUpdateOperationsInput | string;
    status?: EnumInstallationStatusFieldUpdateOperationsInput | $Enums.InstallationStatus;
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdByUser?: UserUpdateOneRequiredWithoutRepositoryInstallationsNestedInput;
  };

  export type RepositoryInstallationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountLogin?: StringFieldUpdateOperationsInput | string;
    createdByUserId?: StringFieldUpdateOperationsInput | string;
    status?: EnumInstallationStatusFieldUpdateOperationsInput | $Enums.InstallationStatus;
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryInstallationCreateManyInput = {
    id?: string;
    githubInstallationId: bigint | number;
    githubAccountId: bigint | number;
    githubAccountLogin: string;
    createdByUserId: string;
    status?: $Enums.InstallationStatus;
    installedAt: Date | string;
    removedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryInstallationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountLogin?: StringFieldUpdateOperationsInput | string;
    status?: EnumInstallationStatusFieldUpdateOperationsInput | $Enums.InstallationStatus;
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryInstallationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountLogin?: StringFieldUpdateOperationsInput | string;
    createdByUserId?: StringFieldUpdateOperationsInput | string;
    status?: EnumInstallationStatusFieldUpdateOperationsInput | $Enums.InstallationStatus;
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type SessionListRelationFilter = {
    every?: SessionWhereInput;
    some?: SessionWhereInput;
    none?: SessionWhereInput;
  };

  export type RepositoryListRelationFilter = {
    every?: RepositoryWhereInput;
    some?: RepositoryWhereInput;
    none?: RepositoryWhereInput;
  };

  export type RepositoryInstallationListRelationFilter = {
    every?: RepositoryInstallationWhereInput;
    some?: RepositoryInstallationWhereInput;
    none?: RepositoryInstallationWhereInput;
  };

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type RepositoryOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type RepositoryInstallationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    githubUserId?: SortOrder;
    githubUsername?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserAvgOrderByAggregateInput = {
    githubUserId?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    githubUserId?: SortOrder;
    githubUsername?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    githubUserId?: SortOrder;
    githubUsername?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserSumOrderByAggregateInput = {
    githubUserId?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedBigIntFilter<$PrismaModel>;
    _min?: NestedBigIntFilter<$PrismaModel>;
    _max?: NestedBigIntFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type UserRelationFilter = {
    is?: UserWhereInput;
    isNot?: UserWhereInput;
  };

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    data?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
  };

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder;
    userId?: SortOrder;
    expiresAt?: SortOrder;
    createdAt?: SortOrder;
  };
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<JsonWithAggregatesFilterBase<$PrismaModel>>,
          Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedJsonFilter<$PrismaModel>;
    _max?: NestedJsonFilter<$PrismaModel>;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type RepositoryCountOrderByAggregateInput = {
    id?: SortOrder;
    githubRepositoryId?: SortOrder;
    githubInstallationId?: SortOrder;
    owner?: SortOrder;
    name?: SortOrder;
    fullName?: SortOrder;
    isActive?: SortOrder;
    ownedByUserId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RepositoryAvgOrderByAggregateInput = {
    githubRepositoryId?: SortOrder;
    githubInstallationId?: SortOrder;
  };

  export type RepositoryMaxOrderByAggregateInput = {
    id?: SortOrder;
    githubRepositoryId?: SortOrder;
    githubInstallationId?: SortOrder;
    owner?: SortOrder;
    name?: SortOrder;
    fullName?: SortOrder;
    isActive?: SortOrder;
    ownedByUserId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RepositoryMinOrderByAggregateInput = {
    id?: SortOrder;
    githubRepositoryId?: SortOrder;
    githubInstallationId?: SortOrder;
    owner?: SortOrder;
    name?: SortOrder;
    fullName?: SortOrder;
    isActive?: SortOrder;
    ownedByUserId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RepositorySumOrderByAggregateInput = {
    githubRepositoryId?: SortOrder;
    githubInstallationId?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type EnumInstallationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallationStatus | EnumInstallationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumInstallationStatusFilter<$PrismaModel> | $Enums.InstallationStatus;
  };

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type RepositoryInstallationCountOrderByAggregateInput = {
    id?: SortOrder;
    githubInstallationId?: SortOrder;
    githubAccountId?: SortOrder;
    githubAccountLogin?: SortOrder;
    createdByUserId?: SortOrder;
    status?: SortOrder;
    installedAt?: SortOrder;
    removedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RepositoryInstallationAvgOrderByAggregateInput = {
    githubInstallationId?: SortOrder;
    githubAccountId?: SortOrder;
  };

  export type RepositoryInstallationMaxOrderByAggregateInput = {
    id?: SortOrder;
    githubInstallationId?: SortOrder;
    githubAccountId?: SortOrder;
    githubAccountLogin?: SortOrder;
    createdByUserId?: SortOrder;
    status?: SortOrder;
    installedAt?: SortOrder;
    removedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RepositoryInstallationMinOrderByAggregateInput = {
    id?: SortOrder;
    githubInstallationId?: SortOrder;
    githubAccountId?: SortOrder;
    githubAccountLogin?: SortOrder;
    createdByUserId?: SortOrder;
    status?: SortOrder;
    installedAt?: SortOrder;
    removedAt?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type RepositoryInstallationSumOrderByAggregateInput = {
    githubInstallationId?: SortOrder;
    githubAccountId?: SortOrder;
  };

  export type EnumInstallationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallationStatus | EnumInstallationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    not?:
      NestedEnumInstallationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallationStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumInstallationStatusFilter<$PrismaModel>;
    _max?: NestedEnumInstallationStatusFilter<$PrismaModel>;
  };

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type SessionCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type RepositoryCreateNestedManyWithoutOwnerUserInput = {
    create?:
      | XOR<RepositoryCreateWithoutOwnerUserInput, RepositoryUncheckedCreateWithoutOwnerUserInput>
      | RepositoryCreateWithoutOwnerUserInput[]
      | RepositoryUncheckedCreateWithoutOwnerUserInput[];
    connectOrCreate?:
      | RepositoryCreateOrConnectWithoutOwnerUserInput
      | RepositoryCreateOrConnectWithoutOwnerUserInput[];
    createMany?: RepositoryCreateManyOwnerUserInputEnvelope;
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
  };

  export type RepositoryInstallationCreateNestedManyWithoutCreatedByUserInput = {
    create?:
      | XOR<
          RepositoryInstallationCreateWithoutCreatedByUserInput,
          RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput
        >
      | RepositoryInstallationCreateWithoutCreatedByUserInput[]
      | RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?:
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput[];
    createMany?: RepositoryInstallationCreateManyCreatedByUserInputEnvelope;
    connect?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
  };

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
  };

  export type RepositoryUncheckedCreateNestedManyWithoutOwnerUserInput = {
    create?:
      | XOR<RepositoryCreateWithoutOwnerUserInput, RepositoryUncheckedCreateWithoutOwnerUserInput>
      | RepositoryCreateWithoutOwnerUserInput[]
      | RepositoryUncheckedCreateWithoutOwnerUserInput[];
    connectOrCreate?:
      | RepositoryCreateOrConnectWithoutOwnerUserInput
      | RepositoryCreateOrConnectWithoutOwnerUserInput[];
    createMany?: RepositoryCreateManyOwnerUserInputEnvelope;
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
  };

  export type RepositoryInstallationUncheckedCreateNestedManyWithoutCreatedByUserInput = {
    create?:
      | XOR<
          RepositoryInstallationCreateWithoutCreatedByUserInput,
          RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput
        >
      | RepositoryInstallationCreateWithoutCreatedByUserInput[]
      | RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?:
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput[];
    createMany?: RepositoryInstallationCreateManyCreatedByUserInputEnvelope;
    connect?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type RepositoryUpdateManyWithoutOwnerUserNestedInput = {
    create?:
      | XOR<RepositoryCreateWithoutOwnerUserInput, RepositoryUncheckedCreateWithoutOwnerUserInput>
      | RepositoryCreateWithoutOwnerUserInput[]
      | RepositoryUncheckedCreateWithoutOwnerUserInput[];
    connectOrCreate?:
      | RepositoryCreateOrConnectWithoutOwnerUserInput
      | RepositoryCreateOrConnectWithoutOwnerUserInput[];
    upsert?:
      | RepositoryUpsertWithWhereUniqueWithoutOwnerUserInput
      | RepositoryUpsertWithWhereUniqueWithoutOwnerUserInput[];
    createMany?: RepositoryCreateManyOwnerUserInputEnvelope;
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    update?:
      | RepositoryUpdateWithWhereUniqueWithoutOwnerUserInput
      | RepositoryUpdateWithWhereUniqueWithoutOwnerUserInput[];
    updateMany?:
      | RepositoryUpdateManyWithWhereWithoutOwnerUserInput
      | RepositoryUpdateManyWithWhereWithoutOwnerUserInput[];
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[];
  };

  export type RepositoryInstallationUpdateManyWithoutCreatedByUserNestedInput = {
    create?:
      | XOR<
          RepositoryInstallationCreateWithoutCreatedByUserInput,
          RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput
        >
      | RepositoryInstallationCreateWithoutCreatedByUserInput[]
      | RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?:
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput[];
    upsert?:
      | RepositoryInstallationUpsertWithWhereUniqueWithoutCreatedByUserInput
      | RepositoryInstallationUpsertWithWhereUniqueWithoutCreatedByUserInput[];
    createMany?: RepositoryInstallationCreateManyCreatedByUserInputEnvelope;
    set?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    disconnect?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    delete?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    connect?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    update?:
      | RepositoryInstallationUpdateWithWhereUniqueWithoutCreatedByUserInput
      | RepositoryInstallationUpdateWithWhereUniqueWithoutCreatedByUserInput[];
    updateMany?:
      | RepositoryInstallationUpdateManyWithWhereWithoutCreatedByUserInput
      | RepositoryInstallationUpdateManyWithWhereWithoutCreatedByUserInput[];
    deleteMany?: RepositoryInstallationScalarWhereInput | RepositoryInstallationScalarWhereInput[];
  };

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?:
      | XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
      | SessionCreateWithoutUserInput[]
      | SessionUncheckedCreateWithoutUserInput[];
    connectOrCreate?:
      SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[];
    upsert?:
      SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: SessionCreateManyUserInputEnvelope;
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[];
    update?:
      SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?:
      SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[];
  };

  export type RepositoryUncheckedUpdateManyWithoutOwnerUserNestedInput = {
    create?:
      | XOR<RepositoryCreateWithoutOwnerUserInput, RepositoryUncheckedCreateWithoutOwnerUserInput>
      | RepositoryCreateWithoutOwnerUserInput[]
      | RepositoryUncheckedCreateWithoutOwnerUserInput[];
    connectOrCreate?:
      | RepositoryCreateOrConnectWithoutOwnerUserInput
      | RepositoryCreateOrConnectWithoutOwnerUserInput[];
    upsert?:
      | RepositoryUpsertWithWhereUniqueWithoutOwnerUserInput
      | RepositoryUpsertWithWhereUniqueWithoutOwnerUserInput[];
    createMany?: RepositoryCreateManyOwnerUserInputEnvelope;
    set?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    disconnect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    delete?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    connect?: RepositoryWhereUniqueInput | RepositoryWhereUniqueInput[];
    update?:
      | RepositoryUpdateWithWhereUniqueWithoutOwnerUserInput
      | RepositoryUpdateWithWhereUniqueWithoutOwnerUserInput[];
    updateMany?:
      | RepositoryUpdateManyWithWhereWithoutOwnerUserInput
      | RepositoryUpdateManyWithWhereWithoutOwnerUserInput[];
    deleteMany?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[];
  };

  export type RepositoryInstallationUncheckedUpdateManyWithoutCreatedByUserNestedInput = {
    create?:
      | XOR<
          RepositoryInstallationCreateWithoutCreatedByUserInput,
          RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput
        >
      | RepositoryInstallationCreateWithoutCreatedByUserInput[]
      | RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput[];
    connectOrCreate?:
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput
      | RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput[];
    upsert?:
      | RepositoryInstallationUpsertWithWhereUniqueWithoutCreatedByUserInput
      | RepositoryInstallationUpsertWithWhereUniqueWithoutCreatedByUserInput[];
    createMany?: RepositoryInstallationCreateManyCreatedByUserInputEnvelope;
    set?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    disconnect?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    delete?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    connect?: RepositoryInstallationWhereUniqueInput | RepositoryInstallationWhereUniqueInput[];
    update?:
      | RepositoryInstallationUpdateWithWhereUniqueWithoutCreatedByUserInput
      | RepositoryInstallationUpdateWithWhereUniqueWithoutCreatedByUserInput[];
    updateMany?:
      | RepositoryInstallationUpdateManyWithWhereWithoutCreatedByUserInput
      | RepositoryInstallationUpdateManyWithWhereWithoutCreatedByUserInput[];
    deleteMany?: RepositoryInstallationScalarWhereInput | RepositoryInstallationScalarWhereInput[];
  };

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
  };

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput;
    upsert?: UserUpsertWithoutSessionsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>,
      UserUncheckedUpdateWithoutSessionsInput
    >;
  };

  export type UserCreateNestedOneWithoutRepositoriesInput = {
    create?: XOR<UserCreateWithoutRepositoriesInput, UserUncheckedCreateWithoutRepositoriesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutRepositoriesInput;
    connect?: UserWhereUniqueInput;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type UserUpdateOneRequiredWithoutRepositoriesNestedInput = {
    create?: XOR<UserCreateWithoutRepositoriesInput, UserUncheckedCreateWithoutRepositoriesInput>;
    connectOrCreate?: UserCreateOrConnectWithoutRepositoriesInput;
    upsert?: UserUpsertWithoutRepositoriesInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<UserUpdateToOneWithWhereWithoutRepositoriesInput, UserUpdateWithoutRepositoriesInput>,
      UserUncheckedUpdateWithoutRepositoriesInput
    >;
  };

  export type UserCreateNestedOneWithoutRepositoryInstallationsInput = {
    create?: XOR<
      UserCreateWithoutRepositoryInstallationsInput,
      UserUncheckedCreateWithoutRepositoryInstallationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRepositoryInstallationsInput;
    connect?: UserWhereUniqueInput;
  };

  export type EnumInstallationStatusFieldUpdateOperationsInput = {
    set?: $Enums.InstallationStatus;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type UserUpdateOneRequiredWithoutRepositoryInstallationsNestedInput = {
    create?: XOR<
      UserCreateWithoutRepositoryInstallationsInput,
      UserUncheckedCreateWithoutRepositoryInstallationsInput
    >;
    connectOrCreate?: UserCreateOrConnectWithoutRepositoryInstallationsInput;
    upsert?: UserUpsertWithoutRepositoryInstallationsInput;
    connect?: UserWhereUniqueInput;
    update?: XOR<
      XOR<
        UserUpdateToOneWithWhereWithoutRepositoryInstallationsInput,
        UserUpdateWithoutRepositoryInstallationsInput
      >,
      UserUncheckedUpdateWithoutRepositoryInstallationsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>;
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>;
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedBigIntFilter<$PrismaModel>;
    _min?: NestedBigIntFilter<$PrismaModel>;
    _max?: NestedBigIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<
          Required<NestedJsonFilterBase<$PrismaModel>>,
          Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>
        >,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
    path?: string[];
    string_contains?: string | StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>;
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null;
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>;
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedEnumInstallationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallationStatus | EnumInstallationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    not?: NestedEnumInstallationStatusFilter<$PrismaModel> | $Enums.InstallationStatus;
  };

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
  };

  export type NestedEnumInstallationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InstallationStatus | EnumInstallationStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InstallationStatus[] | ListEnumInstallationStatusFieldRefInput<$PrismaModel>;
    not?:
      NestedEnumInstallationStatusWithAggregatesFilter<$PrismaModel> | $Enums.InstallationStatus;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedEnumInstallationStatusFilter<$PrismaModel>;
    _max?: NestedEnumInstallationStatusFilter<$PrismaModel>;
  };

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: NestedDateTimeNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type SessionCreateWithoutUserInput = {
    id: string;
    data: JsonNullValueInput | InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string;
    data: JsonNullValueInput | InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput;
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>;
  };

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[];
    skipDuplicates?: boolean;
  };

  export type RepositoryCreateWithoutOwnerUserInput = {
    id?: string;
    githubRepositoryId: bigint | number;
    githubInstallationId: bigint | number;
    owner: string;
    name: string;
    fullName: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryUncheckedCreateWithoutOwnerUserInput = {
    id?: string;
    githubRepositoryId: bigint | number;
    githubInstallationId: bigint | number;
    owner: string;
    name: string;
    fullName: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryCreateOrConnectWithoutOwnerUserInput = {
    where: RepositoryWhereUniqueInput;
    create: XOR<
      RepositoryCreateWithoutOwnerUserInput,
      RepositoryUncheckedCreateWithoutOwnerUserInput
    >;
  };

  export type RepositoryCreateManyOwnerUserInputEnvelope = {
    data: RepositoryCreateManyOwnerUserInput | RepositoryCreateManyOwnerUserInput[];
    skipDuplicates?: boolean;
  };

  export type RepositoryInstallationCreateWithoutCreatedByUserInput = {
    id?: string;
    githubInstallationId: bigint | number;
    githubAccountId: bigint | number;
    githubAccountLogin: string;
    status?: $Enums.InstallationStatus;
    installedAt: Date | string;
    removedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput = {
    id?: string;
    githubInstallationId: bigint | number;
    githubAccountId: bigint | number;
    githubAccountLogin: string;
    status?: $Enums.InstallationStatus;
    installedAt: Date | string;
    removedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryInstallationCreateOrConnectWithoutCreatedByUserInput = {
    where: RepositoryInstallationWhereUniqueInput;
    create: XOR<
      RepositoryInstallationCreateWithoutCreatedByUserInput,
      RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput
    >;
  };

  export type RepositoryInstallationCreateManyCreatedByUserInputEnvelope = {
    data:
      | RepositoryInstallationCreateManyCreatedByUserInput
      | RepositoryInstallationCreateManyCreatedByUserInput[];
    skipDuplicates?: boolean;
  };

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>;
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>;
  };

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput;
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>;
  };

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput;
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>;
  };

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[];
    OR?: SessionScalarWhereInput[];
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[];
    id?: StringFilter<'Session'> | string;
    userId?: StringFilter<'Session'> | string;
    data?: JsonFilter<'Session'>;
    expiresAt?: DateTimeFilter<'Session'> | Date | string;
    createdAt?: DateTimeFilter<'Session'> | Date | string;
  };

  export type RepositoryUpsertWithWhereUniqueWithoutOwnerUserInput = {
    where: RepositoryWhereUniqueInput;
    update: XOR<
      RepositoryUpdateWithoutOwnerUserInput,
      RepositoryUncheckedUpdateWithoutOwnerUserInput
    >;
    create: XOR<
      RepositoryCreateWithoutOwnerUserInput,
      RepositoryUncheckedCreateWithoutOwnerUserInput
    >;
  };

  export type RepositoryUpdateWithWhereUniqueWithoutOwnerUserInput = {
    where: RepositoryWhereUniqueInput;
    data: XOR<
      RepositoryUpdateWithoutOwnerUserInput,
      RepositoryUncheckedUpdateWithoutOwnerUserInput
    >;
  };

  export type RepositoryUpdateManyWithWhereWithoutOwnerUserInput = {
    where: RepositoryScalarWhereInput;
    data: XOR<
      RepositoryUpdateManyMutationInput,
      RepositoryUncheckedUpdateManyWithoutOwnerUserInput
    >;
  };

  export type RepositoryScalarWhereInput = {
    AND?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[];
    OR?: RepositoryScalarWhereInput[];
    NOT?: RepositoryScalarWhereInput | RepositoryScalarWhereInput[];
    id?: StringFilter<'Repository'> | string;
    githubRepositoryId?: BigIntFilter<'Repository'> | bigint | number;
    githubInstallationId?: BigIntFilter<'Repository'> | bigint | number;
    owner?: StringFilter<'Repository'> | string;
    name?: StringFilter<'Repository'> | string;
    fullName?: StringFilter<'Repository'> | string;
    isActive?: BoolFilter<'Repository'> | boolean;
    ownedByUserId?: StringFilter<'Repository'> | string;
    createdAt?: DateTimeFilter<'Repository'> | Date | string;
    updatedAt?: DateTimeFilter<'Repository'> | Date | string;
  };

  export type RepositoryInstallationUpsertWithWhereUniqueWithoutCreatedByUserInput = {
    where: RepositoryInstallationWhereUniqueInput;
    update: XOR<
      RepositoryInstallationUpdateWithoutCreatedByUserInput,
      RepositoryInstallationUncheckedUpdateWithoutCreatedByUserInput
    >;
    create: XOR<
      RepositoryInstallationCreateWithoutCreatedByUserInput,
      RepositoryInstallationUncheckedCreateWithoutCreatedByUserInput
    >;
  };

  export type RepositoryInstallationUpdateWithWhereUniqueWithoutCreatedByUserInput = {
    where: RepositoryInstallationWhereUniqueInput;
    data: XOR<
      RepositoryInstallationUpdateWithoutCreatedByUserInput,
      RepositoryInstallationUncheckedUpdateWithoutCreatedByUserInput
    >;
  };

  export type RepositoryInstallationUpdateManyWithWhereWithoutCreatedByUserInput = {
    where: RepositoryInstallationScalarWhereInput;
    data: XOR<
      RepositoryInstallationUpdateManyMutationInput,
      RepositoryInstallationUncheckedUpdateManyWithoutCreatedByUserInput
    >;
  };

  export type RepositoryInstallationScalarWhereInput = {
    AND?: RepositoryInstallationScalarWhereInput | RepositoryInstallationScalarWhereInput[];
    OR?: RepositoryInstallationScalarWhereInput[];
    NOT?: RepositoryInstallationScalarWhereInput | RepositoryInstallationScalarWhereInput[];
    id?: StringFilter<'RepositoryInstallation'> | string;
    githubInstallationId?: BigIntFilter<'RepositoryInstallation'> | bigint | number;
    githubAccountId?: BigIntFilter<'RepositoryInstallation'> | bigint | number;
    githubAccountLogin?: StringFilter<'RepositoryInstallation'> | string;
    createdByUserId?: StringFilter<'RepositoryInstallation'> | string;
    status?: EnumInstallationStatusFilter<'RepositoryInstallation'> | $Enums.InstallationStatus;
    installedAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
    removedAt?: DateTimeNullableFilter<'RepositoryInstallation'> | Date | string | null;
    createdAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
    updatedAt?: DateTimeFilter<'RepositoryInstallation'> | Date | string;
  };

  export type UserCreateWithoutSessionsInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    repositories?: RepositoryCreateNestedManyWithoutOwnerUserInput;
    repositoryInstallations?: RepositoryInstallationCreateNestedManyWithoutCreatedByUserInput;
  };

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    repositories?: RepositoryUncheckedCreateNestedManyWithoutOwnerUserInput;
    repositoryInstallations?: RepositoryInstallationUncheckedCreateNestedManyWithoutCreatedByUserInput;
  };

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
  };

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>;
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>;
  };

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    repositories?: RepositoryUpdateManyWithoutOwnerUserNestedInput;
    repositoryInstallations?: RepositoryInstallationUpdateManyWithoutCreatedByUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    repositories?: RepositoryUncheckedUpdateManyWithoutOwnerUserNestedInput;
    repositoryInstallations?: RepositoryInstallationUncheckedUpdateManyWithoutCreatedByUserNestedInput;
  };

  export type UserCreateWithoutRepositoriesInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    repositoryInstallations?: RepositoryInstallationCreateNestedManyWithoutCreatedByUserInput;
  };

  export type UserUncheckedCreateWithoutRepositoriesInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    repositoryInstallations?: RepositoryInstallationUncheckedCreateNestedManyWithoutCreatedByUserInput;
  };

  export type UserCreateOrConnectWithoutRepositoriesInput = {
    where: UserWhereUniqueInput;
    create: XOR<UserCreateWithoutRepositoriesInput, UserUncheckedCreateWithoutRepositoriesInput>;
  };

  export type UserUpsertWithoutRepositoriesInput = {
    update: XOR<UserUpdateWithoutRepositoriesInput, UserUncheckedUpdateWithoutRepositoriesInput>;
    create: XOR<UserCreateWithoutRepositoriesInput, UserUncheckedCreateWithoutRepositoriesInput>;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutRepositoriesInput = {
    where?: UserWhereInput;
    data: XOR<UserUpdateWithoutRepositoriesInput, UserUncheckedUpdateWithoutRepositoriesInput>;
  };

  export type UserUpdateWithoutRepositoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    repositoryInstallations?: RepositoryInstallationUpdateManyWithoutCreatedByUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutRepositoriesInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    repositoryInstallations?: RepositoryInstallationUncheckedUpdateManyWithoutCreatedByUserNestedInput;
  };

  export type UserCreateWithoutRepositoryInstallationsInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionCreateNestedManyWithoutUserInput;
    repositories?: RepositoryCreateNestedManyWithoutOwnerUserInput;
  };

  export type UserUncheckedCreateWithoutRepositoryInstallationsInput = {
    id?: string;
    githubUserId: bigint | number;
    githubUsername: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput;
    repositories?: RepositoryUncheckedCreateNestedManyWithoutOwnerUserInput;
  };

  export type UserCreateOrConnectWithoutRepositoryInstallationsInput = {
    where: UserWhereUniqueInput;
    create: XOR<
      UserCreateWithoutRepositoryInstallationsInput,
      UserUncheckedCreateWithoutRepositoryInstallationsInput
    >;
  };

  export type UserUpsertWithoutRepositoryInstallationsInput = {
    update: XOR<
      UserUpdateWithoutRepositoryInstallationsInput,
      UserUncheckedUpdateWithoutRepositoryInstallationsInput
    >;
    create: XOR<
      UserCreateWithoutRepositoryInstallationsInput,
      UserUncheckedCreateWithoutRepositoryInstallationsInput
    >;
    where?: UserWhereInput;
  };

  export type UserUpdateToOneWithWhereWithoutRepositoryInstallationsInput = {
    where?: UserWhereInput;
    data: XOR<
      UserUpdateWithoutRepositoryInstallationsInput,
      UserUncheckedUpdateWithoutRepositoryInstallationsInput
    >;
  };

  export type UserUpdateWithoutRepositoryInstallationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUpdateManyWithoutUserNestedInput;
    repositories?: RepositoryUpdateManyWithoutOwnerUserNestedInput;
  };

  export type UserUncheckedUpdateWithoutRepositoryInstallationsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubUserId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubUsername?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput;
    repositories?: RepositoryUncheckedUpdateManyWithoutOwnerUserNestedInput;
  };

  export type SessionCreateManyUserInput = {
    id: string;
    data: JsonNullValueInput | InputJsonValue;
    expiresAt: Date | string;
    createdAt?: Date | string;
  };

  export type RepositoryCreateManyOwnerUserInput = {
    id?: string;
    githubRepositoryId: bigint | number;
    githubInstallationId: bigint | number;
    owner: string;
    name: string;
    fullName: string;
    isActive?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type RepositoryInstallationCreateManyCreatedByUserInput = {
    id?: string;
    githubInstallationId: bigint | number;
    githubAccountId: bigint | number;
    githubAccountLogin: string;
    status?: $Enums.InstallationStatus;
    installedAt: Date | string;
    removedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    data?: JsonNullValueInput | InputJsonValue;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    data?: JsonNullValueInput | InputJsonValue;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    data?: JsonNullValueInput | InputJsonValue;
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryUpdateWithoutOwnerUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubRepositoryId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    owner?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryUncheckedUpdateWithoutOwnerUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubRepositoryId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    owner?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryUncheckedUpdateManyWithoutOwnerUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubRepositoryId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    owner?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    fullName?: StringFieldUpdateOperationsInput | string;
    isActive?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryInstallationUpdateWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountLogin?: StringFieldUpdateOperationsInput | string;
    status?: EnumInstallationStatusFieldUpdateOperationsInput | $Enums.InstallationStatus;
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryInstallationUncheckedUpdateWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountLogin?: StringFieldUpdateOperationsInput | string;
    status?: EnumInstallationStatusFieldUpdateOperationsInput | $Enums.InstallationStatus;
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type RepositoryInstallationUncheckedUpdateManyWithoutCreatedByUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    githubInstallationId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountId?: BigIntFieldUpdateOperationsInput | bigint | number;
    githubAccountLogin?: StringFieldUpdateOperationsInput | string;
    status?: EnumInstallationStatusFieldUpdateOperationsInput | $Enums.InstallationStatus;
    installedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    removedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Aliases for legacy arg types
   */
  /**
   * @deprecated Use UserCountOutputTypeDefaultArgs instead
   */
  export type UserCountOutputTypeArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = UserCountOutputTypeDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use UserDefaultArgs instead
   */
  export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    UserDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use SessionDefaultArgs instead
   */
  export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    SessionDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use RepositoryDefaultArgs instead
   */
  export type RepositoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    RepositoryDefaultArgs<ExtArgs>;
  /**
   * @deprecated Use RepositoryInstallationDefaultArgs instead
   */
  export type RepositoryInstallationArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  > = RepositoryInstallationDefaultArgs<ExtArgs>;

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
