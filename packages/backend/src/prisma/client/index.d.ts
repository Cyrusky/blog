
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model bor_config
 * 
 */
export type bor_config = $Result.DefaultSelection<Prisma.$bor_configPayload>
/**
 * Model bor_leetcode_question_topic_tags
 * 
 */
export type bor_leetcode_question_topic_tags = $Result.DefaultSelection<Prisma.$bor_leetcode_question_topic_tagsPayload>
/**
 * Model bor_leetcode_questions
 * 
 */
export type bor_leetcode_questions = $Result.DefaultSelection<Prisma.$bor_leetcode_questionsPayload>
/**
 * Model bor_leetcode_topic_tags
 * 
 */
export type bor_leetcode_topic_tags = $Result.DefaultSelection<Prisma.$bor_leetcode_topic_tagsPayload>
/**
 * Model bor_user
 * 
 */
export type bor_user = $Result.DefaultSelection<Prisma.$bor_userPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Bor_configs
 * const bor_configs = await prisma.bor_config.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Bor_configs
   * const bor_configs = await prisma.bor_config.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

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
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.bor_config`: Exposes CRUD operations for the **bor_config** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bor_configs
    * const bor_configs = await prisma.bor_config.findMany()
    * ```
    */
  get bor_config(): Prisma.bor_configDelegate<ExtArgs>;

  /**
   * `prisma.bor_leetcode_question_topic_tags`: Exposes CRUD operations for the **bor_leetcode_question_topic_tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bor_leetcode_question_topic_tags
    * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.findMany()
    * ```
    */
  get bor_leetcode_question_topic_tags(): Prisma.bor_leetcode_question_topic_tagsDelegate<ExtArgs>;

  /**
   * `prisma.bor_leetcode_questions`: Exposes CRUD operations for the **bor_leetcode_questions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bor_leetcode_questions
    * const bor_leetcode_questions = await prisma.bor_leetcode_questions.findMany()
    * ```
    */
  get bor_leetcode_questions(): Prisma.bor_leetcode_questionsDelegate<ExtArgs>;

  /**
   * `prisma.bor_leetcode_topic_tags`: Exposes CRUD operations for the **bor_leetcode_topic_tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bor_leetcode_topic_tags
    * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.findMany()
    * ```
    */
  get bor_leetcode_topic_tags(): Prisma.bor_leetcode_topic_tagsDelegate<ExtArgs>;

  /**
   * `prisma.bor_user`: Exposes CRUD operations for the **bor_user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bor_users
    * const bor_users = await prisma.bor_user.findMany()
    * ```
    */
  get bor_user(): Prisma.bor_userDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.20.0
   * Query Engine version: 06fc58a368dc7be9fbbbe894adf8d445d208c284
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

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
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    bor_config: 'bor_config',
    bor_leetcode_question_topic_tags: 'bor_leetcode_question_topic_tags',
    bor_leetcode_questions: 'bor_leetcode_questions',
    bor_leetcode_topic_tags: 'bor_leetcode_topic_tags',
    bor_user: 'bor_user'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "bor_config" | "bor_leetcode_question_topic_tags" | "bor_leetcode_questions" | "bor_leetcode_topic_tags" | "bor_user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      bor_config: {
        payload: Prisma.$bor_configPayload<ExtArgs>
        fields: Prisma.bor_configFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bor_configFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bor_configFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>
          }
          findFirst: {
            args: Prisma.bor_configFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bor_configFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>
          }
          findMany: {
            args: Prisma.bor_configFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>[]
          }
          create: {
            args: Prisma.bor_configCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>
          }
          createMany: {
            args: Prisma.bor_configCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bor_configCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>[]
          }
          delete: {
            args: Prisma.bor_configDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>
          }
          update: {
            args: Prisma.bor_configUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>
          }
          deleteMany: {
            args: Prisma.bor_configDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bor_configUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bor_configUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_configPayload>
          }
          aggregate: {
            args: Prisma.Bor_configAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBor_config>
          }
          groupBy: {
            args: Prisma.bor_configGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bor_configGroupByOutputType>[]
          }
          count: {
            args: Prisma.bor_configCountArgs<ExtArgs>
            result: $Utils.Optional<Bor_configCountAggregateOutputType> | number
          }
        }
      }
      bor_leetcode_question_topic_tags: {
        payload: Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>
        fields: Prisma.bor_leetcode_question_topic_tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bor_leetcode_question_topic_tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bor_leetcode_question_topic_tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>
          }
          findFirst: {
            args: Prisma.bor_leetcode_question_topic_tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bor_leetcode_question_topic_tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>
          }
          findMany: {
            args: Prisma.bor_leetcode_question_topic_tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>[]
          }
          create: {
            args: Prisma.bor_leetcode_question_topic_tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>
          }
          createMany: {
            args: Prisma.bor_leetcode_question_topic_tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bor_leetcode_question_topic_tagsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>[]
          }
          delete: {
            args: Prisma.bor_leetcode_question_topic_tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>
          }
          update: {
            args: Prisma.bor_leetcode_question_topic_tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>
          }
          deleteMany: {
            args: Prisma.bor_leetcode_question_topic_tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bor_leetcode_question_topic_tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bor_leetcode_question_topic_tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_question_topic_tagsPayload>
          }
          aggregate: {
            args: Prisma.Bor_leetcode_question_topic_tagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBor_leetcode_question_topic_tags>
          }
          groupBy: {
            args: Prisma.bor_leetcode_question_topic_tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bor_leetcode_question_topic_tagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bor_leetcode_question_topic_tagsCountArgs<ExtArgs>
            result: $Utils.Optional<Bor_leetcode_question_topic_tagsCountAggregateOutputType> | number
          }
        }
      }
      bor_leetcode_questions: {
        payload: Prisma.$bor_leetcode_questionsPayload<ExtArgs>
        fields: Prisma.bor_leetcode_questionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bor_leetcode_questionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bor_leetcode_questionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>
          }
          findFirst: {
            args: Prisma.bor_leetcode_questionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bor_leetcode_questionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>
          }
          findMany: {
            args: Prisma.bor_leetcode_questionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>[]
          }
          create: {
            args: Prisma.bor_leetcode_questionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>
          }
          createMany: {
            args: Prisma.bor_leetcode_questionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bor_leetcode_questionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>[]
          }
          delete: {
            args: Prisma.bor_leetcode_questionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>
          }
          update: {
            args: Prisma.bor_leetcode_questionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>
          }
          deleteMany: {
            args: Prisma.bor_leetcode_questionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bor_leetcode_questionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bor_leetcode_questionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_questionsPayload>
          }
          aggregate: {
            args: Prisma.Bor_leetcode_questionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBor_leetcode_questions>
          }
          groupBy: {
            args: Prisma.bor_leetcode_questionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bor_leetcode_questionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bor_leetcode_questionsCountArgs<ExtArgs>
            result: $Utils.Optional<Bor_leetcode_questionsCountAggregateOutputType> | number
          }
        }
      }
      bor_leetcode_topic_tags: {
        payload: Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>
        fields: Prisma.bor_leetcode_topic_tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bor_leetcode_topic_tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bor_leetcode_topic_tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>
          }
          findFirst: {
            args: Prisma.bor_leetcode_topic_tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bor_leetcode_topic_tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>
          }
          findMany: {
            args: Prisma.bor_leetcode_topic_tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>[]
          }
          create: {
            args: Prisma.bor_leetcode_topic_tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>
          }
          createMany: {
            args: Prisma.bor_leetcode_topic_tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bor_leetcode_topic_tagsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>[]
          }
          delete: {
            args: Prisma.bor_leetcode_topic_tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>
          }
          update: {
            args: Prisma.bor_leetcode_topic_tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>
          }
          deleteMany: {
            args: Prisma.bor_leetcode_topic_tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bor_leetcode_topic_tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bor_leetcode_topic_tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_leetcode_topic_tagsPayload>
          }
          aggregate: {
            args: Prisma.Bor_leetcode_topic_tagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBor_leetcode_topic_tags>
          }
          groupBy: {
            args: Prisma.bor_leetcode_topic_tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bor_leetcode_topic_tagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.bor_leetcode_topic_tagsCountArgs<ExtArgs>
            result: $Utils.Optional<Bor_leetcode_topic_tagsCountAggregateOutputType> | number
          }
        }
      }
      bor_user: {
        payload: Prisma.$bor_userPayload<ExtArgs>
        fields: Prisma.bor_userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bor_userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bor_userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>
          }
          findFirst: {
            args: Prisma.bor_userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bor_userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>
          }
          findMany: {
            args: Prisma.bor_userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>[]
          }
          create: {
            args: Prisma.bor_userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>
          }
          createMany: {
            args: Prisma.bor_userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bor_userCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>[]
          }
          delete: {
            args: Prisma.bor_userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>
          }
          update: {
            args: Prisma.bor_userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>
          }
          deleteMany: {
            args: Prisma.bor_userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bor_userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.bor_userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bor_userPayload>
          }
          aggregate: {
            args: Prisma.Bor_userAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBor_user>
          }
          groupBy: {
            args: Prisma.bor_userGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bor_userGroupByOutputType>[]
          }
          count: {
            args: Prisma.bor_userCountArgs<ExtArgs>
            result: $Utils.Optional<Bor_userCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
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
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
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
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model bor_config
   */

  export type AggregateBor_config = {
    _count: Bor_configCountAggregateOutputType | null
    _avg: Bor_configAvgAggregateOutputType | null
    _sum: Bor_configSumAggregateOutputType | null
    _min: Bor_configMinAggregateOutputType | null
    _max: Bor_configMaxAggregateOutputType | null
  }

  export type Bor_configAvgAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_configSumAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_configMinAggregateOutputType = {
    id_auto: number | null
    key: string | null
    value: string | null
  }

  export type Bor_configMaxAggregateOutputType = {
    id_auto: number | null
    key: string | null
    value: string | null
  }

  export type Bor_configCountAggregateOutputType = {
    id_auto: number
    key: number
    value: number
    _all: number
  }


  export type Bor_configAvgAggregateInputType = {
    id_auto?: true
  }

  export type Bor_configSumAggregateInputType = {
    id_auto?: true
  }

  export type Bor_configMinAggregateInputType = {
    id_auto?: true
    key?: true
    value?: true
  }

  export type Bor_configMaxAggregateInputType = {
    id_auto?: true
    key?: true
    value?: true
  }

  export type Bor_configCountAggregateInputType = {
    id_auto?: true
    key?: true
    value?: true
    _all?: true
  }

  export type Bor_configAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_config to aggregate.
     */
    where?: bor_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_configs to fetch.
     */
    orderBy?: bor_configOrderByWithRelationInput | bor_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bor_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bor_configs
    **/
    _count?: true | Bor_configCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bor_configAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bor_configSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bor_configMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bor_configMaxAggregateInputType
  }

  export type GetBor_configAggregateType<T extends Bor_configAggregateArgs> = {
        [P in keyof T & keyof AggregateBor_config]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBor_config[P]>
      : GetScalarType<T[P], AggregateBor_config[P]>
  }




  export type bor_configGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bor_configWhereInput
    orderBy?: bor_configOrderByWithAggregationInput | bor_configOrderByWithAggregationInput[]
    by: Bor_configScalarFieldEnum[] | Bor_configScalarFieldEnum
    having?: bor_configScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bor_configCountAggregateInputType | true
    _avg?: Bor_configAvgAggregateInputType
    _sum?: Bor_configSumAggregateInputType
    _min?: Bor_configMinAggregateInputType
    _max?: Bor_configMaxAggregateInputType
  }

  export type Bor_configGroupByOutputType = {
    id_auto: number
    key: string | null
    value: string | null
    _count: Bor_configCountAggregateOutputType | null
    _avg: Bor_configAvgAggregateOutputType | null
    _sum: Bor_configSumAggregateOutputType | null
    _min: Bor_configMinAggregateOutputType | null
    _max: Bor_configMaxAggregateOutputType | null
  }

  type GetBor_configGroupByPayload<T extends bor_configGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bor_configGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bor_configGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bor_configGroupByOutputType[P]>
            : GetScalarType<T[P], Bor_configGroupByOutputType[P]>
        }
      >
    >


  export type bor_configSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["bor_config"]>

  export type bor_configSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["bor_config"]>

  export type bor_configSelectScalar = {
    id_auto?: boolean
    key?: boolean
    value?: boolean
  }


  export type $bor_configPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bor_config"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_auto: number
      key: string | null
      value: string | null
    }, ExtArgs["result"]["bor_config"]>
    composites: {}
  }

  type bor_configGetPayload<S extends boolean | null | undefined | bor_configDefaultArgs> = $Result.GetResult<Prisma.$bor_configPayload, S>

  type bor_configCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<bor_configFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Bor_configCountAggregateInputType | true
    }

  export interface bor_configDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bor_config'], meta: { name: 'bor_config' } }
    /**
     * Find zero or one Bor_config that matches the filter.
     * @param {bor_configFindUniqueArgs} args - Arguments to find a Bor_config
     * @example
     * // Get one Bor_config
     * const bor_config = await prisma.bor_config.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bor_configFindUniqueArgs>(args: SelectSubset<T, bor_configFindUniqueArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bor_config that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {bor_configFindUniqueOrThrowArgs} args - Arguments to find a Bor_config
     * @example
     * // Get one Bor_config
     * const bor_config = await prisma.bor_config.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bor_configFindUniqueOrThrowArgs>(args: SelectSubset<T, bor_configFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bor_config that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_configFindFirstArgs} args - Arguments to find a Bor_config
     * @example
     * // Get one Bor_config
     * const bor_config = await prisma.bor_config.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bor_configFindFirstArgs>(args?: SelectSubset<T, bor_configFindFirstArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bor_config that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_configFindFirstOrThrowArgs} args - Arguments to find a Bor_config
     * @example
     * // Get one Bor_config
     * const bor_config = await prisma.bor_config.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bor_configFindFirstOrThrowArgs>(args?: SelectSubset<T, bor_configFindFirstOrThrowArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bor_configs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_configFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bor_configs
     * const bor_configs = await prisma.bor_config.findMany()
     * 
     * // Get first 10 Bor_configs
     * const bor_configs = await prisma.bor_config.findMany({ take: 10 })
     * 
     * // Only select the `id_auto`
     * const bor_configWithId_autoOnly = await prisma.bor_config.findMany({ select: { id_auto: true } })
     * 
     */
    findMany<T extends bor_configFindManyArgs>(args?: SelectSubset<T, bor_configFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bor_config.
     * @param {bor_configCreateArgs} args - Arguments to create a Bor_config.
     * @example
     * // Create one Bor_config
     * const Bor_config = await prisma.bor_config.create({
     *   data: {
     *     // ... data to create a Bor_config
     *   }
     * })
     * 
     */
    create<T extends bor_configCreateArgs>(args: SelectSubset<T, bor_configCreateArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bor_configs.
     * @param {bor_configCreateManyArgs} args - Arguments to create many Bor_configs.
     * @example
     * // Create many Bor_configs
     * const bor_config = await prisma.bor_config.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bor_configCreateManyArgs>(args?: SelectSubset<T, bor_configCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bor_configs and returns the data saved in the database.
     * @param {bor_configCreateManyAndReturnArgs} args - Arguments to create many Bor_configs.
     * @example
     * // Create many Bor_configs
     * const bor_config = await prisma.bor_config.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bor_configs and only return the `id_auto`
     * const bor_configWithId_autoOnly = await prisma.bor_config.createManyAndReturn({ 
     *   select: { id_auto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bor_configCreateManyAndReturnArgs>(args?: SelectSubset<T, bor_configCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bor_config.
     * @param {bor_configDeleteArgs} args - Arguments to delete one Bor_config.
     * @example
     * // Delete one Bor_config
     * const Bor_config = await prisma.bor_config.delete({
     *   where: {
     *     // ... filter to delete one Bor_config
     *   }
     * })
     * 
     */
    delete<T extends bor_configDeleteArgs>(args: SelectSubset<T, bor_configDeleteArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bor_config.
     * @param {bor_configUpdateArgs} args - Arguments to update one Bor_config.
     * @example
     * // Update one Bor_config
     * const bor_config = await prisma.bor_config.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bor_configUpdateArgs>(args: SelectSubset<T, bor_configUpdateArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bor_configs.
     * @param {bor_configDeleteManyArgs} args - Arguments to filter Bor_configs to delete.
     * @example
     * // Delete a few Bor_configs
     * const { count } = await prisma.bor_config.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bor_configDeleteManyArgs>(args?: SelectSubset<T, bor_configDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bor_configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_configUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bor_configs
     * const bor_config = await prisma.bor_config.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bor_configUpdateManyArgs>(args: SelectSubset<T, bor_configUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bor_config.
     * @param {bor_configUpsertArgs} args - Arguments to update or create a Bor_config.
     * @example
     * // Update or create a Bor_config
     * const bor_config = await prisma.bor_config.upsert({
     *   create: {
     *     // ... data to create a Bor_config
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bor_config we want to update
     *   }
     * })
     */
    upsert<T extends bor_configUpsertArgs>(args: SelectSubset<T, bor_configUpsertArgs<ExtArgs>>): Prisma__bor_configClient<$Result.GetResult<Prisma.$bor_configPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bor_configs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_configCountArgs} args - Arguments to filter Bor_configs to count.
     * @example
     * // Count the number of Bor_configs
     * const count = await prisma.bor_config.count({
     *   where: {
     *     // ... the filter for the Bor_configs we want to count
     *   }
     * })
    **/
    count<T extends bor_configCountArgs>(
      args?: Subset<T, bor_configCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bor_configCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bor_config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bor_configAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Bor_configAggregateArgs>(args: Subset<T, Bor_configAggregateArgs>): Prisma.PrismaPromise<GetBor_configAggregateType<T>>

    /**
     * Group by Bor_config.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_configGroupByArgs} args - Group by arguments.
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
      T extends bor_configGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bor_configGroupByArgs['orderBy'] }
        : { orderBy?: bor_configGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bor_configGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBor_configGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bor_config model
   */
  readonly fields: bor_configFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bor_config.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bor_configClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bor_config model
   */ 
  interface bor_configFieldRefs {
    readonly id_auto: FieldRef<"bor_config", 'Int'>
    readonly key: FieldRef<"bor_config", 'String'>
    readonly value: FieldRef<"bor_config", 'String'>
  }
    

  // Custom InputTypes
  /**
   * bor_config findUnique
   */
  export type bor_configFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * Filter, which bor_config to fetch.
     */
    where: bor_configWhereUniqueInput
  }

  /**
   * bor_config findUniqueOrThrow
   */
  export type bor_configFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * Filter, which bor_config to fetch.
     */
    where: bor_configWhereUniqueInput
  }

  /**
   * bor_config findFirst
   */
  export type bor_configFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * Filter, which bor_config to fetch.
     */
    where?: bor_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_configs to fetch.
     */
    orderBy?: bor_configOrderByWithRelationInput | bor_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_configs.
     */
    cursor?: bor_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_configs.
     */
    distinct?: Bor_configScalarFieldEnum | Bor_configScalarFieldEnum[]
  }

  /**
   * bor_config findFirstOrThrow
   */
  export type bor_configFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * Filter, which bor_config to fetch.
     */
    where?: bor_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_configs to fetch.
     */
    orderBy?: bor_configOrderByWithRelationInput | bor_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_configs.
     */
    cursor?: bor_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_configs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_configs.
     */
    distinct?: Bor_configScalarFieldEnum | Bor_configScalarFieldEnum[]
  }

  /**
   * bor_config findMany
   */
  export type bor_configFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * Filter, which bor_configs to fetch.
     */
    where?: bor_configWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_configs to fetch.
     */
    orderBy?: bor_configOrderByWithRelationInput | bor_configOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bor_configs.
     */
    cursor?: bor_configWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_configs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_configs.
     */
    skip?: number
    distinct?: Bor_configScalarFieldEnum | Bor_configScalarFieldEnum[]
  }

  /**
   * bor_config create
   */
  export type bor_configCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * The data needed to create a bor_config.
     */
    data?: XOR<bor_configCreateInput, bor_configUncheckedCreateInput>
  }

  /**
   * bor_config createMany
   */
  export type bor_configCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bor_configs.
     */
    data: bor_configCreateManyInput | bor_configCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_config createManyAndReturn
   */
  export type bor_configCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many bor_configs.
     */
    data: bor_configCreateManyInput | bor_configCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_config update
   */
  export type bor_configUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * The data needed to update a bor_config.
     */
    data: XOR<bor_configUpdateInput, bor_configUncheckedUpdateInput>
    /**
     * Choose, which bor_config to update.
     */
    where: bor_configWhereUniqueInput
  }

  /**
   * bor_config updateMany
   */
  export type bor_configUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bor_configs.
     */
    data: XOR<bor_configUpdateManyMutationInput, bor_configUncheckedUpdateManyInput>
    /**
     * Filter which bor_configs to update
     */
    where?: bor_configWhereInput
  }

  /**
   * bor_config upsert
   */
  export type bor_configUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * The filter to search for the bor_config to update in case it exists.
     */
    where: bor_configWhereUniqueInput
    /**
     * In case the bor_config found by the `where` argument doesn't exist, create a new bor_config with this data.
     */
    create: XOR<bor_configCreateInput, bor_configUncheckedCreateInput>
    /**
     * In case the bor_config was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bor_configUpdateInput, bor_configUncheckedUpdateInput>
  }

  /**
   * bor_config delete
   */
  export type bor_configDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
    /**
     * Filter which bor_config to delete.
     */
    where: bor_configWhereUniqueInput
  }

  /**
   * bor_config deleteMany
   */
  export type bor_configDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_configs to delete
     */
    where?: bor_configWhereInput
  }

  /**
   * bor_config without action
   */
  export type bor_configDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_config
     */
    select?: bor_configSelect<ExtArgs> | null
  }


  /**
   * Model bor_leetcode_question_topic_tags
   */

  export type AggregateBor_leetcode_question_topic_tags = {
    _count: Bor_leetcode_question_topic_tagsCountAggregateOutputType | null
    _avg: Bor_leetcode_question_topic_tagsAvgAggregateOutputType | null
    _sum: Bor_leetcode_question_topic_tagsSumAggregateOutputType | null
    _min: Bor_leetcode_question_topic_tagsMinAggregateOutputType | null
    _max: Bor_leetcode_question_topic_tagsMaxAggregateOutputType | null
  }

  export type Bor_leetcode_question_topic_tagsAvgAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_leetcode_question_topic_tagsSumAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_leetcode_question_topic_tagsMinAggregateOutputType = {
    question_id: string | null
    tag_id: string | null
    id_auto: number | null
  }

  export type Bor_leetcode_question_topic_tagsMaxAggregateOutputType = {
    question_id: string | null
    tag_id: string | null
    id_auto: number | null
  }

  export type Bor_leetcode_question_topic_tagsCountAggregateOutputType = {
    question_id: number
    tag_id: number
    id_auto: number
    _all: number
  }


  export type Bor_leetcode_question_topic_tagsAvgAggregateInputType = {
    id_auto?: true
  }

  export type Bor_leetcode_question_topic_tagsSumAggregateInputType = {
    id_auto?: true
  }

  export type Bor_leetcode_question_topic_tagsMinAggregateInputType = {
    question_id?: true
    tag_id?: true
    id_auto?: true
  }

  export type Bor_leetcode_question_topic_tagsMaxAggregateInputType = {
    question_id?: true
    tag_id?: true
    id_auto?: true
  }

  export type Bor_leetcode_question_topic_tagsCountAggregateInputType = {
    question_id?: true
    tag_id?: true
    id_auto?: true
    _all?: true
  }

  export type Bor_leetcode_question_topic_tagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_leetcode_question_topic_tags to aggregate.
     */
    where?: bor_leetcode_question_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_question_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_question_topic_tagsOrderByWithRelationInput | bor_leetcode_question_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bor_leetcode_question_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_question_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_question_topic_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bor_leetcode_question_topic_tags
    **/
    _count?: true | Bor_leetcode_question_topic_tagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bor_leetcode_question_topic_tagsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bor_leetcode_question_topic_tagsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bor_leetcode_question_topic_tagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bor_leetcode_question_topic_tagsMaxAggregateInputType
  }

  export type GetBor_leetcode_question_topic_tagsAggregateType<T extends Bor_leetcode_question_topic_tagsAggregateArgs> = {
        [P in keyof T & keyof AggregateBor_leetcode_question_topic_tags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBor_leetcode_question_topic_tags[P]>
      : GetScalarType<T[P], AggregateBor_leetcode_question_topic_tags[P]>
  }




  export type bor_leetcode_question_topic_tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bor_leetcode_question_topic_tagsWhereInput
    orderBy?: bor_leetcode_question_topic_tagsOrderByWithAggregationInput | bor_leetcode_question_topic_tagsOrderByWithAggregationInput[]
    by: Bor_leetcode_question_topic_tagsScalarFieldEnum[] | Bor_leetcode_question_topic_tagsScalarFieldEnum
    having?: bor_leetcode_question_topic_tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bor_leetcode_question_topic_tagsCountAggregateInputType | true
    _avg?: Bor_leetcode_question_topic_tagsAvgAggregateInputType
    _sum?: Bor_leetcode_question_topic_tagsSumAggregateInputType
    _min?: Bor_leetcode_question_topic_tagsMinAggregateInputType
    _max?: Bor_leetcode_question_topic_tagsMaxAggregateInputType
  }

  export type Bor_leetcode_question_topic_tagsGroupByOutputType = {
    question_id: string | null
    tag_id: string | null
    id_auto: number
    _count: Bor_leetcode_question_topic_tagsCountAggregateOutputType | null
    _avg: Bor_leetcode_question_topic_tagsAvgAggregateOutputType | null
    _sum: Bor_leetcode_question_topic_tagsSumAggregateOutputType | null
    _min: Bor_leetcode_question_topic_tagsMinAggregateOutputType | null
    _max: Bor_leetcode_question_topic_tagsMaxAggregateOutputType | null
  }

  type GetBor_leetcode_question_topic_tagsGroupByPayload<T extends bor_leetcode_question_topic_tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bor_leetcode_question_topic_tagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bor_leetcode_question_topic_tagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bor_leetcode_question_topic_tagsGroupByOutputType[P]>
            : GetScalarType<T[P], Bor_leetcode_question_topic_tagsGroupByOutputType[P]>
        }
      >
    >


  export type bor_leetcode_question_topic_tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    question_id?: boolean
    tag_id?: boolean
    id_auto?: boolean
  }, ExtArgs["result"]["bor_leetcode_question_topic_tags"]>

  export type bor_leetcode_question_topic_tagsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    question_id?: boolean
    tag_id?: boolean
    id_auto?: boolean
  }, ExtArgs["result"]["bor_leetcode_question_topic_tags"]>

  export type bor_leetcode_question_topic_tagsSelectScalar = {
    question_id?: boolean
    tag_id?: boolean
    id_auto?: boolean
  }


  export type $bor_leetcode_question_topic_tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bor_leetcode_question_topic_tags"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      question_id: string | null
      tag_id: string | null
      id_auto: number
    }, ExtArgs["result"]["bor_leetcode_question_topic_tags"]>
    composites: {}
  }

  type bor_leetcode_question_topic_tagsGetPayload<S extends boolean | null | undefined | bor_leetcode_question_topic_tagsDefaultArgs> = $Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload, S>

  type bor_leetcode_question_topic_tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<bor_leetcode_question_topic_tagsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Bor_leetcode_question_topic_tagsCountAggregateInputType | true
    }

  export interface bor_leetcode_question_topic_tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bor_leetcode_question_topic_tags'], meta: { name: 'bor_leetcode_question_topic_tags' } }
    /**
     * Find zero or one Bor_leetcode_question_topic_tags that matches the filter.
     * @param {bor_leetcode_question_topic_tagsFindUniqueArgs} args - Arguments to find a Bor_leetcode_question_topic_tags
     * @example
     * // Get one Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bor_leetcode_question_topic_tagsFindUniqueArgs>(args: SelectSubset<T, bor_leetcode_question_topic_tagsFindUniqueArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bor_leetcode_question_topic_tags that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {bor_leetcode_question_topic_tagsFindUniqueOrThrowArgs} args - Arguments to find a Bor_leetcode_question_topic_tags
     * @example
     * // Get one Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bor_leetcode_question_topic_tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, bor_leetcode_question_topic_tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bor_leetcode_question_topic_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_question_topic_tagsFindFirstArgs} args - Arguments to find a Bor_leetcode_question_topic_tags
     * @example
     * // Get one Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bor_leetcode_question_topic_tagsFindFirstArgs>(args?: SelectSubset<T, bor_leetcode_question_topic_tagsFindFirstArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bor_leetcode_question_topic_tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_question_topic_tagsFindFirstOrThrowArgs} args - Arguments to find a Bor_leetcode_question_topic_tags
     * @example
     * // Get one Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bor_leetcode_question_topic_tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, bor_leetcode_question_topic_tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bor_leetcode_question_topic_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_question_topic_tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.findMany()
     * 
     * // Get first 10 Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.findMany({ take: 10 })
     * 
     * // Only select the `question_id`
     * const bor_leetcode_question_topic_tagsWithQuestion_idOnly = await prisma.bor_leetcode_question_topic_tags.findMany({ select: { question_id: true } })
     * 
     */
    findMany<T extends bor_leetcode_question_topic_tagsFindManyArgs>(args?: SelectSubset<T, bor_leetcode_question_topic_tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bor_leetcode_question_topic_tags.
     * @param {bor_leetcode_question_topic_tagsCreateArgs} args - Arguments to create a Bor_leetcode_question_topic_tags.
     * @example
     * // Create one Bor_leetcode_question_topic_tags
     * const Bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.create({
     *   data: {
     *     // ... data to create a Bor_leetcode_question_topic_tags
     *   }
     * })
     * 
     */
    create<T extends bor_leetcode_question_topic_tagsCreateArgs>(args: SelectSubset<T, bor_leetcode_question_topic_tagsCreateArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bor_leetcode_question_topic_tags.
     * @param {bor_leetcode_question_topic_tagsCreateManyArgs} args - Arguments to create many Bor_leetcode_question_topic_tags.
     * @example
     * // Create many Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bor_leetcode_question_topic_tagsCreateManyArgs>(args?: SelectSubset<T, bor_leetcode_question_topic_tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bor_leetcode_question_topic_tags and returns the data saved in the database.
     * @param {bor_leetcode_question_topic_tagsCreateManyAndReturnArgs} args - Arguments to create many Bor_leetcode_question_topic_tags.
     * @example
     * // Create many Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bor_leetcode_question_topic_tags and only return the `question_id`
     * const bor_leetcode_question_topic_tagsWithQuestion_idOnly = await prisma.bor_leetcode_question_topic_tags.createManyAndReturn({ 
     *   select: { question_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bor_leetcode_question_topic_tagsCreateManyAndReturnArgs>(args?: SelectSubset<T, bor_leetcode_question_topic_tagsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bor_leetcode_question_topic_tags.
     * @param {bor_leetcode_question_topic_tagsDeleteArgs} args - Arguments to delete one Bor_leetcode_question_topic_tags.
     * @example
     * // Delete one Bor_leetcode_question_topic_tags
     * const Bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.delete({
     *   where: {
     *     // ... filter to delete one Bor_leetcode_question_topic_tags
     *   }
     * })
     * 
     */
    delete<T extends bor_leetcode_question_topic_tagsDeleteArgs>(args: SelectSubset<T, bor_leetcode_question_topic_tagsDeleteArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bor_leetcode_question_topic_tags.
     * @param {bor_leetcode_question_topic_tagsUpdateArgs} args - Arguments to update one Bor_leetcode_question_topic_tags.
     * @example
     * // Update one Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bor_leetcode_question_topic_tagsUpdateArgs>(args: SelectSubset<T, bor_leetcode_question_topic_tagsUpdateArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bor_leetcode_question_topic_tags.
     * @param {bor_leetcode_question_topic_tagsDeleteManyArgs} args - Arguments to filter Bor_leetcode_question_topic_tags to delete.
     * @example
     * // Delete a few Bor_leetcode_question_topic_tags
     * const { count } = await prisma.bor_leetcode_question_topic_tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bor_leetcode_question_topic_tagsDeleteManyArgs>(args?: SelectSubset<T, bor_leetcode_question_topic_tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bor_leetcode_question_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_question_topic_tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bor_leetcode_question_topic_tagsUpdateManyArgs>(args: SelectSubset<T, bor_leetcode_question_topic_tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bor_leetcode_question_topic_tags.
     * @param {bor_leetcode_question_topic_tagsUpsertArgs} args - Arguments to update or create a Bor_leetcode_question_topic_tags.
     * @example
     * // Update or create a Bor_leetcode_question_topic_tags
     * const bor_leetcode_question_topic_tags = await prisma.bor_leetcode_question_topic_tags.upsert({
     *   create: {
     *     // ... data to create a Bor_leetcode_question_topic_tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bor_leetcode_question_topic_tags we want to update
     *   }
     * })
     */
    upsert<T extends bor_leetcode_question_topic_tagsUpsertArgs>(args: SelectSubset<T, bor_leetcode_question_topic_tagsUpsertArgs<ExtArgs>>): Prisma__bor_leetcode_question_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_question_topic_tagsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bor_leetcode_question_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_question_topic_tagsCountArgs} args - Arguments to filter Bor_leetcode_question_topic_tags to count.
     * @example
     * // Count the number of Bor_leetcode_question_topic_tags
     * const count = await prisma.bor_leetcode_question_topic_tags.count({
     *   where: {
     *     // ... the filter for the Bor_leetcode_question_topic_tags we want to count
     *   }
     * })
    **/
    count<T extends bor_leetcode_question_topic_tagsCountArgs>(
      args?: Subset<T, bor_leetcode_question_topic_tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bor_leetcode_question_topic_tagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bor_leetcode_question_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bor_leetcode_question_topic_tagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Bor_leetcode_question_topic_tagsAggregateArgs>(args: Subset<T, Bor_leetcode_question_topic_tagsAggregateArgs>): Prisma.PrismaPromise<GetBor_leetcode_question_topic_tagsAggregateType<T>>

    /**
     * Group by Bor_leetcode_question_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_question_topic_tagsGroupByArgs} args - Group by arguments.
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
      T extends bor_leetcode_question_topic_tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bor_leetcode_question_topic_tagsGroupByArgs['orderBy'] }
        : { orderBy?: bor_leetcode_question_topic_tagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bor_leetcode_question_topic_tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBor_leetcode_question_topic_tagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bor_leetcode_question_topic_tags model
   */
  readonly fields: bor_leetcode_question_topic_tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bor_leetcode_question_topic_tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bor_leetcode_question_topic_tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bor_leetcode_question_topic_tags model
   */ 
  interface bor_leetcode_question_topic_tagsFieldRefs {
    readonly question_id: FieldRef<"bor_leetcode_question_topic_tags", 'String'>
    readonly tag_id: FieldRef<"bor_leetcode_question_topic_tags", 'String'>
    readonly id_auto: FieldRef<"bor_leetcode_question_topic_tags", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * bor_leetcode_question_topic_tags findUnique
   */
  export type bor_leetcode_question_topic_tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_question_topic_tags to fetch.
     */
    where: bor_leetcode_question_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_question_topic_tags findUniqueOrThrow
   */
  export type bor_leetcode_question_topic_tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_question_topic_tags to fetch.
     */
    where: bor_leetcode_question_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_question_topic_tags findFirst
   */
  export type bor_leetcode_question_topic_tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_question_topic_tags to fetch.
     */
    where?: bor_leetcode_question_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_question_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_question_topic_tagsOrderByWithRelationInput | bor_leetcode_question_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_leetcode_question_topic_tags.
     */
    cursor?: bor_leetcode_question_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_question_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_question_topic_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_leetcode_question_topic_tags.
     */
    distinct?: Bor_leetcode_question_topic_tagsScalarFieldEnum | Bor_leetcode_question_topic_tagsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_question_topic_tags findFirstOrThrow
   */
  export type bor_leetcode_question_topic_tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_question_topic_tags to fetch.
     */
    where?: bor_leetcode_question_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_question_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_question_topic_tagsOrderByWithRelationInput | bor_leetcode_question_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_leetcode_question_topic_tags.
     */
    cursor?: bor_leetcode_question_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_question_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_question_topic_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_leetcode_question_topic_tags.
     */
    distinct?: Bor_leetcode_question_topic_tagsScalarFieldEnum | Bor_leetcode_question_topic_tagsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_question_topic_tags findMany
   */
  export type bor_leetcode_question_topic_tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_question_topic_tags to fetch.
     */
    where?: bor_leetcode_question_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_question_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_question_topic_tagsOrderByWithRelationInput | bor_leetcode_question_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bor_leetcode_question_topic_tags.
     */
    cursor?: bor_leetcode_question_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_question_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_question_topic_tags.
     */
    skip?: number
    distinct?: Bor_leetcode_question_topic_tagsScalarFieldEnum | Bor_leetcode_question_topic_tagsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_question_topic_tags create
   */
  export type bor_leetcode_question_topic_tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * The data needed to create a bor_leetcode_question_topic_tags.
     */
    data?: XOR<bor_leetcode_question_topic_tagsCreateInput, bor_leetcode_question_topic_tagsUncheckedCreateInput>
  }

  /**
   * bor_leetcode_question_topic_tags createMany
   */
  export type bor_leetcode_question_topic_tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bor_leetcode_question_topic_tags.
     */
    data: bor_leetcode_question_topic_tagsCreateManyInput | bor_leetcode_question_topic_tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_leetcode_question_topic_tags createManyAndReturn
   */
  export type bor_leetcode_question_topic_tagsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many bor_leetcode_question_topic_tags.
     */
    data: bor_leetcode_question_topic_tagsCreateManyInput | bor_leetcode_question_topic_tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_leetcode_question_topic_tags update
   */
  export type bor_leetcode_question_topic_tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * The data needed to update a bor_leetcode_question_topic_tags.
     */
    data: XOR<bor_leetcode_question_topic_tagsUpdateInput, bor_leetcode_question_topic_tagsUncheckedUpdateInput>
    /**
     * Choose, which bor_leetcode_question_topic_tags to update.
     */
    where: bor_leetcode_question_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_question_topic_tags updateMany
   */
  export type bor_leetcode_question_topic_tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bor_leetcode_question_topic_tags.
     */
    data: XOR<bor_leetcode_question_topic_tagsUpdateManyMutationInput, bor_leetcode_question_topic_tagsUncheckedUpdateManyInput>
    /**
     * Filter which bor_leetcode_question_topic_tags to update
     */
    where?: bor_leetcode_question_topic_tagsWhereInput
  }

  /**
   * bor_leetcode_question_topic_tags upsert
   */
  export type bor_leetcode_question_topic_tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * The filter to search for the bor_leetcode_question_topic_tags to update in case it exists.
     */
    where: bor_leetcode_question_topic_tagsWhereUniqueInput
    /**
     * In case the bor_leetcode_question_topic_tags found by the `where` argument doesn't exist, create a new bor_leetcode_question_topic_tags with this data.
     */
    create: XOR<bor_leetcode_question_topic_tagsCreateInput, bor_leetcode_question_topic_tagsUncheckedCreateInput>
    /**
     * In case the bor_leetcode_question_topic_tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bor_leetcode_question_topic_tagsUpdateInput, bor_leetcode_question_topic_tagsUncheckedUpdateInput>
  }

  /**
   * bor_leetcode_question_topic_tags delete
   */
  export type bor_leetcode_question_topic_tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter which bor_leetcode_question_topic_tags to delete.
     */
    where: bor_leetcode_question_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_question_topic_tags deleteMany
   */
  export type bor_leetcode_question_topic_tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_leetcode_question_topic_tags to delete
     */
    where?: bor_leetcode_question_topic_tagsWhereInput
  }

  /**
   * bor_leetcode_question_topic_tags without action
   */
  export type bor_leetcode_question_topic_tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_question_topic_tags
     */
    select?: bor_leetcode_question_topic_tagsSelect<ExtArgs> | null
  }


  /**
   * Model bor_leetcode_questions
   */

  export type AggregateBor_leetcode_questions = {
    _count: Bor_leetcode_questionsCountAggregateOutputType | null
    _avg: Bor_leetcode_questionsAvgAggregateOutputType | null
    _sum: Bor_leetcode_questionsSumAggregateOutputType | null
    _min: Bor_leetcode_questionsMinAggregateOutputType | null
    _max: Bor_leetcode_questionsMaxAggregateOutputType | null
  }

  export type Bor_leetcode_questionsAvgAggregateOutputType = {
    id_auto: number | null
    ac_rate: number | null
    status: number | null
  }

  export type Bor_leetcode_questionsSumAggregateOutputType = {
    id_auto: number | null
    ac_rate: number | null
    status: number | null
  }

  export type Bor_leetcode_questionsMinAggregateOutputType = {
    id_auto: number | null
    id: string | null
    ac_rate: number | null
    difficulty: string | null
    question_frontend_id: string | null
    is_paid_only: boolean | null
    title: string | null
    title_slug: string | null
    status: number | null
    title_cn: string | null
    finished_at: Date | null
    start_at: Date | null
  }

  export type Bor_leetcode_questionsMaxAggregateOutputType = {
    id_auto: number | null
    id: string | null
    ac_rate: number | null
    difficulty: string | null
    question_frontend_id: string | null
    is_paid_only: boolean | null
    title: string | null
    title_slug: string | null
    status: number | null
    title_cn: string | null
    finished_at: Date | null
    start_at: Date | null
  }

  export type Bor_leetcode_questionsCountAggregateOutputType = {
    id_auto: number
    id: number
    ac_rate: number
    difficulty: number
    question_frontend_id: number
    is_paid_only: number
    title: number
    title_slug: number
    status: number
    title_cn: number
    finished_at: number
    start_at: number
    _all: number
  }


  export type Bor_leetcode_questionsAvgAggregateInputType = {
    id_auto?: true
    ac_rate?: true
    status?: true
  }

  export type Bor_leetcode_questionsSumAggregateInputType = {
    id_auto?: true
    ac_rate?: true
    status?: true
  }

  export type Bor_leetcode_questionsMinAggregateInputType = {
    id_auto?: true
    id?: true
    ac_rate?: true
    difficulty?: true
    question_frontend_id?: true
    is_paid_only?: true
    title?: true
    title_slug?: true
    status?: true
    title_cn?: true
    finished_at?: true
    start_at?: true
  }

  export type Bor_leetcode_questionsMaxAggregateInputType = {
    id_auto?: true
    id?: true
    ac_rate?: true
    difficulty?: true
    question_frontend_id?: true
    is_paid_only?: true
    title?: true
    title_slug?: true
    status?: true
    title_cn?: true
    finished_at?: true
    start_at?: true
  }

  export type Bor_leetcode_questionsCountAggregateInputType = {
    id_auto?: true
    id?: true
    ac_rate?: true
    difficulty?: true
    question_frontend_id?: true
    is_paid_only?: true
    title?: true
    title_slug?: true
    status?: true
    title_cn?: true
    finished_at?: true
    start_at?: true
    _all?: true
  }

  export type Bor_leetcode_questionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_leetcode_questions to aggregate.
     */
    where?: bor_leetcode_questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_questions to fetch.
     */
    orderBy?: bor_leetcode_questionsOrderByWithRelationInput | bor_leetcode_questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bor_leetcode_questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bor_leetcode_questions
    **/
    _count?: true | Bor_leetcode_questionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bor_leetcode_questionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bor_leetcode_questionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bor_leetcode_questionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bor_leetcode_questionsMaxAggregateInputType
  }

  export type GetBor_leetcode_questionsAggregateType<T extends Bor_leetcode_questionsAggregateArgs> = {
        [P in keyof T & keyof AggregateBor_leetcode_questions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBor_leetcode_questions[P]>
      : GetScalarType<T[P], AggregateBor_leetcode_questions[P]>
  }




  export type bor_leetcode_questionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bor_leetcode_questionsWhereInput
    orderBy?: bor_leetcode_questionsOrderByWithAggregationInput | bor_leetcode_questionsOrderByWithAggregationInput[]
    by: Bor_leetcode_questionsScalarFieldEnum[] | Bor_leetcode_questionsScalarFieldEnum
    having?: bor_leetcode_questionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bor_leetcode_questionsCountAggregateInputType | true
    _avg?: Bor_leetcode_questionsAvgAggregateInputType
    _sum?: Bor_leetcode_questionsSumAggregateInputType
    _min?: Bor_leetcode_questionsMinAggregateInputType
    _max?: Bor_leetcode_questionsMaxAggregateInputType
  }

  export type Bor_leetcode_questionsGroupByOutputType = {
    id_auto: number
    id: string | null
    ac_rate: number | null
    difficulty: string | null
    question_frontend_id: string | null
    is_paid_only: boolean | null
    title: string | null
    title_slug: string | null
    status: number | null
    title_cn: string | null
    finished_at: Date | null
    start_at: Date | null
    _count: Bor_leetcode_questionsCountAggregateOutputType | null
    _avg: Bor_leetcode_questionsAvgAggregateOutputType | null
    _sum: Bor_leetcode_questionsSumAggregateOutputType | null
    _min: Bor_leetcode_questionsMinAggregateOutputType | null
    _max: Bor_leetcode_questionsMaxAggregateOutputType | null
  }

  type GetBor_leetcode_questionsGroupByPayload<T extends bor_leetcode_questionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bor_leetcode_questionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bor_leetcode_questionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bor_leetcode_questionsGroupByOutputType[P]>
            : GetScalarType<T[P], Bor_leetcode_questionsGroupByOutputType[P]>
        }
      >
    >


  export type bor_leetcode_questionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    id?: boolean
    ac_rate?: boolean
    difficulty?: boolean
    question_frontend_id?: boolean
    is_paid_only?: boolean
    title?: boolean
    title_slug?: boolean
    status?: boolean
    title_cn?: boolean
    finished_at?: boolean
    start_at?: boolean
  }, ExtArgs["result"]["bor_leetcode_questions"]>

  export type bor_leetcode_questionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    id?: boolean
    ac_rate?: boolean
    difficulty?: boolean
    question_frontend_id?: boolean
    is_paid_only?: boolean
    title?: boolean
    title_slug?: boolean
    status?: boolean
    title_cn?: boolean
    finished_at?: boolean
    start_at?: boolean
  }, ExtArgs["result"]["bor_leetcode_questions"]>

  export type bor_leetcode_questionsSelectScalar = {
    id_auto?: boolean
    id?: boolean
    ac_rate?: boolean
    difficulty?: boolean
    question_frontend_id?: boolean
    is_paid_only?: boolean
    title?: boolean
    title_slug?: boolean
    status?: boolean
    title_cn?: boolean
    finished_at?: boolean
    start_at?: boolean
  }


  export type $bor_leetcode_questionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bor_leetcode_questions"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_auto: number
      id: string | null
      ac_rate: number | null
      difficulty: string | null
      question_frontend_id: string | null
      is_paid_only: boolean | null
      title: string | null
      title_slug: string | null
      status: number | null
      title_cn: string | null
      finished_at: Date | null
      start_at: Date | null
    }, ExtArgs["result"]["bor_leetcode_questions"]>
    composites: {}
  }

  type bor_leetcode_questionsGetPayload<S extends boolean | null | undefined | bor_leetcode_questionsDefaultArgs> = $Result.GetResult<Prisma.$bor_leetcode_questionsPayload, S>

  type bor_leetcode_questionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<bor_leetcode_questionsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Bor_leetcode_questionsCountAggregateInputType | true
    }

  export interface bor_leetcode_questionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bor_leetcode_questions'], meta: { name: 'bor_leetcode_questions' } }
    /**
     * Find zero or one Bor_leetcode_questions that matches the filter.
     * @param {bor_leetcode_questionsFindUniqueArgs} args - Arguments to find a Bor_leetcode_questions
     * @example
     * // Get one Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bor_leetcode_questionsFindUniqueArgs>(args: SelectSubset<T, bor_leetcode_questionsFindUniqueArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bor_leetcode_questions that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {bor_leetcode_questionsFindUniqueOrThrowArgs} args - Arguments to find a Bor_leetcode_questions
     * @example
     * // Get one Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bor_leetcode_questionsFindUniqueOrThrowArgs>(args: SelectSubset<T, bor_leetcode_questionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bor_leetcode_questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_questionsFindFirstArgs} args - Arguments to find a Bor_leetcode_questions
     * @example
     * // Get one Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bor_leetcode_questionsFindFirstArgs>(args?: SelectSubset<T, bor_leetcode_questionsFindFirstArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bor_leetcode_questions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_questionsFindFirstOrThrowArgs} args - Arguments to find a Bor_leetcode_questions
     * @example
     * // Get one Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bor_leetcode_questionsFindFirstOrThrowArgs>(args?: SelectSubset<T, bor_leetcode_questionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bor_leetcode_questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_questionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.findMany()
     * 
     * // Get first 10 Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.findMany({ take: 10 })
     * 
     * // Only select the `id_auto`
     * const bor_leetcode_questionsWithId_autoOnly = await prisma.bor_leetcode_questions.findMany({ select: { id_auto: true } })
     * 
     */
    findMany<T extends bor_leetcode_questionsFindManyArgs>(args?: SelectSubset<T, bor_leetcode_questionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bor_leetcode_questions.
     * @param {bor_leetcode_questionsCreateArgs} args - Arguments to create a Bor_leetcode_questions.
     * @example
     * // Create one Bor_leetcode_questions
     * const Bor_leetcode_questions = await prisma.bor_leetcode_questions.create({
     *   data: {
     *     // ... data to create a Bor_leetcode_questions
     *   }
     * })
     * 
     */
    create<T extends bor_leetcode_questionsCreateArgs>(args: SelectSubset<T, bor_leetcode_questionsCreateArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bor_leetcode_questions.
     * @param {bor_leetcode_questionsCreateManyArgs} args - Arguments to create many Bor_leetcode_questions.
     * @example
     * // Create many Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bor_leetcode_questionsCreateManyArgs>(args?: SelectSubset<T, bor_leetcode_questionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bor_leetcode_questions and returns the data saved in the database.
     * @param {bor_leetcode_questionsCreateManyAndReturnArgs} args - Arguments to create many Bor_leetcode_questions.
     * @example
     * // Create many Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bor_leetcode_questions and only return the `id_auto`
     * const bor_leetcode_questionsWithId_autoOnly = await prisma.bor_leetcode_questions.createManyAndReturn({ 
     *   select: { id_auto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bor_leetcode_questionsCreateManyAndReturnArgs>(args?: SelectSubset<T, bor_leetcode_questionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bor_leetcode_questions.
     * @param {bor_leetcode_questionsDeleteArgs} args - Arguments to delete one Bor_leetcode_questions.
     * @example
     * // Delete one Bor_leetcode_questions
     * const Bor_leetcode_questions = await prisma.bor_leetcode_questions.delete({
     *   where: {
     *     // ... filter to delete one Bor_leetcode_questions
     *   }
     * })
     * 
     */
    delete<T extends bor_leetcode_questionsDeleteArgs>(args: SelectSubset<T, bor_leetcode_questionsDeleteArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bor_leetcode_questions.
     * @param {bor_leetcode_questionsUpdateArgs} args - Arguments to update one Bor_leetcode_questions.
     * @example
     * // Update one Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bor_leetcode_questionsUpdateArgs>(args: SelectSubset<T, bor_leetcode_questionsUpdateArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bor_leetcode_questions.
     * @param {bor_leetcode_questionsDeleteManyArgs} args - Arguments to filter Bor_leetcode_questions to delete.
     * @example
     * // Delete a few Bor_leetcode_questions
     * const { count } = await prisma.bor_leetcode_questions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bor_leetcode_questionsDeleteManyArgs>(args?: SelectSubset<T, bor_leetcode_questionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bor_leetcode_questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_questionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bor_leetcode_questionsUpdateManyArgs>(args: SelectSubset<T, bor_leetcode_questionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bor_leetcode_questions.
     * @param {bor_leetcode_questionsUpsertArgs} args - Arguments to update or create a Bor_leetcode_questions.
     * @example
     * // Update or create a Bor_leetcode_questions
     * const bor_leetcode_questions = await prisma.bor_leetcode_questions.upsert({
     *   create: {
     *     // ... data to create a Bor_leetcode_questions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bor_leetcode_questions we want to update
     *   }
     * })
     */
    upsert<T extends bor_leetcode_questionsUpsertArgs>(args: SelectSubset<T, bor_leetcode_questionsUpsertArgs<ExtArgs>>): Prisma__bor_leetcode_questionsClient<$Result.GetResult<Prisma.$bor_leetcode_questionsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bor_leetcode_questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_questionsCountArgs} args - Arguments to filter Bor_leetcode_questions to count.
     * @example
     * // Count the number of Bor_leetcode_questions
     * const count = await prisma.bor_leetcode_questions.count({
     *   where: {
     *     // ... the filter for the Bor_leetcode_questions we want to count
     *   }
     * })
    **/
    count<T extends bor_leetcode_questionsCountArgs>(
      args?: Subset<T, bor_leetcode_questionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bor_leetcode_questionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bor_leetcode_questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bor_leetcode_questionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Bor_leetcode_questionsAggregateArgs>(args: Subset<T, Bor_leetcode_questionsAggregateArgs>): Prisma.PrismaPromise<GetBor_leetcode_questionsAggregateType<T>>

    /**
     * Group by Bor_leetcode_questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_questionsGroupByArgs} args - Group by arguments.
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
      T extends bor_leetcode_questionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bor_leetcode_questionsGroupByArgs['orderBy'] }
        : { orderBy?: bor_leetcode_questionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bor_leetcode_questionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBor_leetcode_questionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bor_leetcode_questions model
   */
  readonly fields: bor_leetcode_questionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bor_leetcode_questions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bor_leetcode_questionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bor_leetcode_questions model
   */ 
  interface bor_leetcode_questionsFieldRefs {
    readonly id_auto: FieldRef<"bor_leetcode_questions", 'Int'>
    readonly id: FieldRef<"bor_leetcode_questions", 'String'>
    readonly ac_rate: FieldRef<"bor_leetcode_questions", 'Float'>
    readonly difficulty: FieldRef<"bor_leetcode_questions", 'String'>
    readonly question_frontend_id: FieldRef<"bor_leetcode_questions", 'String'>
    readonly is_paid_only: FieldRef<"bor_leetcode_questions", 'Boolean'>
    readonly title: FieldRef<"bor_leetcode_questions", 'String'>
    readonly title_slug: FieldRef<"bor_leetcode_questions", 'String'>
    readonly status: FieldRef<"bor_leetcode_questions", 'Int'>
    readonly title_cn: FieldRef<"bor_leetcode_questions", 'String'>
    readonly finished_at: FieldRef<"bor_leetcode_questions", 'DateTime'>
    readonly start_at: FieldRef<"bor_leetcode_questions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bor_leetcode_questions findUnique
   */
  export type bor_leetcode_questionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_questions to fetch.
     */
    where: bor_leetcode_questionsWhereUniqueInput
  }

  /**
   * bor_leetcode_questions findUniqueOrThrow
   */
  export type bor_leetcode_questionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_questions to fetch.
     */
    where: bor_leetcode_questionsWhereUniqueInput
  }

  /**
   * bor_leetcode_questions findFirst
   */
  export type bor_leetcode_questionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_questions to fetch.
     */
    where?: bor_leetcode_questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_questions to fetch.
     */
    orderBy?: bor_leetcode_questionsOrderByWithRelationInput | bor_leetcode_questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_leetcode_questions.
     */
    cursor?: bor_leetcode_questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_leetcode_questions.
     */
    distinct?: Bor_leetcode_questionsScalarFieldEnum | Bor_leetcode_questionsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_questions findFirstOrThrow
   */
  export type bor_leetcode_questionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_questions to fetch.
     */
    where?: bor_leetcode_questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_questions to fetch.
     */
    orderBy?: bor_leetcode_questionsOrderByWithRelationInput | bor_leetcode_questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_leetcode_questions.
     */
    cursor?: bor_leetcode_questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_leetcode_questions.
     */
    distinct?: Bor_leetcode_questionsScalarFieldEnum | Bor_leetcode_questionsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_questions findMany
   */
  export type bor_leetcode_questionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_questions to fetch.
     */
    where?: bor_leetcode_questionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_questions to fetch.
     */
    orderBy?: bor_leetcode_questionsOrderByWithRelationInput | bor_leetcode_questionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bor_leetcode_questions.
     */
    cursor?: bor_leetcode_questionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_questions.
     */
    skip?: number
    distinct?: Bor_leetcode_questionsScalarFieldEnum | Bor_leetcode_questionsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_questions create
   */
  export type bor_leetcode_questionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * The data needed to create a bor_leetcode_questions.
     */
    data?: XOR<bor_leetcode_questionsCreateInput, bor_leetcode_questionsUncheckedCreateInput>
  }

  /**
   * bor_leetcode_questions createMany
   */
  export type bor_leetcode_questionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bor_leetcode_questions.
     */
    data: bor_leetcode_questionsCreateManyInput | bor_leetcode_questionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_leetcode_questions createManyAndReturn
   */
  export type bor_leetcode_questionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many bor_leetcode_questions.
     */
    data: bor_leetcode_questionsCreateManyInput | bor_leetcode_questionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_leetcode_questions update
   */
  export type bor_leetcode_questionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * The data needed to update a bor_leetcode_questions.
     */
    data: XOR<bor_leetcode_questionsUpdateInput, bor_leetcode_questionsUncheckedUpdateInput>
    /**
     * Choose, which bor_leetcode_questions to update.
     */
    where: bor_leetcode_questionsWhereUniqueInput
  }

  /**
   * bor_leetcode_questions updateMany
   */
  export type bor_leetcode_questionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bor_leetcode_questions.
     */
    data: XOR<bor_leetcode_questionsUpdateManyMutationInput, bor_leetcode_questionsUncheckedUpdateManyInput>
    /**
     * Filter which bor_leetcode_questions to update
     */
    where?: bor_leetcode_questionsWhereInput
  }

  /**
   * bor_leetcode_questions upsert
   */
  export type bor_leetcode_questionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * The filter to search for the bor_leetcode_questions to update in case it exists.
     */
    where: bor_leetcode_questionsWhereUniqueInput
    /**
     * In case the bor_leetcode_questions found by the `where` argument doesn't exist, create a new bor_leetcode_questions with this data.
     */
    create: XOR<bor_leetcode_questionsCreateInput, bor_leetcode_questionsUncheckedCreateInput>
    /**
     * In case the bor_leetcode_questions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bor_leetcode_questionsUpdateInput, bor_leetcode_questionsUncheckedUpdateInput>
  }

  /**
   * bor_leetcode_questions delete
   */
  export type bor_leetcode_questionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
    /**
     * Filter which bor_leetcode_questions to delete.
     */
    where: bor_leetcode_questionsWhereUniqueInput
  }

  /**
   * bor_leetcode_questions deleteMany
   */
  export type bor_leetcode_questionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_leetcode_questions to delete
     */
    where?: bor_leetcode_questionsWhereInput
  }

  /**
   * bor_leetcode_questions without action
   */
  export type bor_leetcode_questionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_questions
     */
    select?: bor_leetcode_questionsSelect<ExtArgs> | null
  }


  /**
   * Model bor_leetcode_topic_tags
   */

  export type AggregateBor_leetcode_topic_tags = {
    _count: Bor_leetcode_topic_tagsCountAggregateOutputType | null
    _avg: Bor_leetcode_topic_tagsAvgAggregateOutputType | null
    _sum: Bor_leetcode_topic_tagsSumAggregateOutputType | null
    _min: Bor_leetcode_topic_tagsMinAggregateOutputType | null
    _max: Bor_leetcode_topic_tagsMaxAggregateOutputType | null
  }

  export type Bor_leetcode_topic_tagsAvgAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_leetcode_topic_tagsSumAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_leetcode_topic_tagsMinAggregateOutputType = {
    id_auto: number | null
    tag_id: string | null
    name: string | null
    slug: string | null
    id: string | null
  }

  export type Bor_leetcode_topic_tagsMaxAggregateOutputType = {
    id_auto: number | null
    tag_id: string | null
    name: string | null
    slug: string | null
    id: string | null
  }

  export type Bor_leetcode_topic_tagsCountAggregateOutputType = {
    id_auto: number
    tag_id: number
    name: number
    slug: number
    id: number
    _all: number
  }


  export type Bor_leetcode_topic_tagsAvgAggregateInputType = {
    id_auto?: true
  }

  export type Bor_leetcode_topic_tagsSumAggregateInputType = {
    id_auto?: true
  }

  export type Bor_leetcode_topic_tagsMinAggregateInputType = {
    id_auto?: true
    tag_id?: true
    name?: true
    slug?: true
    id?: true
  }

  export type Bor_leetcode_topic_tagsMaxAggregateInputType = {
    id_auto?: true
    tag_id?: true
    name?: true
    slug?: true
    id?: true
  }

  export type Bor_leetcode_topic_tagsCountAggregateInputType = {
    id_auto?: true
    tag_id?: true
    name?: true
    slug?: true
    id?: true
    _all?: true
  }

  export type Bor_leetcode_topic_tagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_leetcode_topic_tags to aggregate.
     */
    where?: bor_leetcode_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_topic_tagsOrderByWithRelationInput | bor_leetcode_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bor_leetcode_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_topic_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bor_leetcode_topic_tags
    **/
    _count?: true | Bor_leetcode_topic_tagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bor_leetcode_topic_tagsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bor_leetcode_topic_tagsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bor_leetcode_topic_tagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bor_leetcode_topic_tagsMaxAggregateInputType
  }

  export type GetBor_leetcode_topic_tagsAggregateType<T extends Bor_leetcode_topic_tagsAggregateArgs> = {
        [P in keyof T & keyof AggregateBor_leetcode_topic_tags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBor_leetcode_topic_tags[P]>
      : GetScalarType<T[P], AggregateBor_leetcode_topic_tags[P]>
  }




  export type bor_leetcode_topic_tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bor_leetcode_topic_tagsWhereInput
    orderBy?: bor_leetcode_topic_tagsOrderByWithAggregationInput | bor_leetcode_topic_tagsOrderByWithAggregationInput[]
    by: Bor_leetcode_topic_tagsScalarFieldEnum[] | Bor_leetcode_topic_tagsScalarFieldEnum
    having?: bor_leetcode_topic_tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bor_leetcode_topic_tagsCountAggregateInputType | true
    _avg?: Bor_leetcode_topic_tagsAvgAggregateInputType
    _sum?: Bor_leetcode_topic_tagsSumAggregateInputType
    _min?: Bor_leetcode_topic_tagsMinAggregateInputType
    _max?: Bor_leetcode_topic_tagsMaxAggregateInputType
  }

  export type Bor_leetcode_topic_tagsGroupByOutputType = {
    id_auto: number
    tag_id: string | null
    name: string | null
    slug: string | null
    id: string | null
    _count: Bor_leetcode_topic_tagsCountAggregateOutputType | null
    _avg: Bor_leetcode_topic_tagsAvgAggregateOutputType | null
    _sum: Bor_leetcode_topic_tagsSumAggregateOutputType | null
    _min: Bor_leetcode_topic_tagsMinAggregateOutputType | null
    _max: Bor_leetcode_topic_tagsMaxAggregateOutputType | null
  }

  type GetBor_leetcode_topic_tagsGroupByPayload<T extends bor_leetcode_topic_tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bor_leetcode_topic_tagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bor_leetcode_topic_tagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bor_leetcode_topic_tagsGroupByOutputType[P]>
            : GetScalarType<T[P], Bor_leetcode_topic_tagsGroupByOutputType[P]>
        }
      >
    >


  export type bor_leetcode_topic_tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    tag_id?: boolean
    name?: boolean
    slug?: boolean
    id?: boolean
  }, ExtArgs["result"]["bor_leetcode_topic_tags"]>

  export type bor_leetcode_topic_tagsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    tag_id?: boolean
    name?: boolean
    slug?: boolean
    id?: boolean
  }, ExtArgs["result"]["bor_leetcode_topic_tags"]>

  export type bor_leetcode_topic_tagsSelectScalar = {
    id_auto?: boolean
    tag_id?: boolean
    name?: boolean
    slug?: boolean
    id?: boolean
  }


  export type $bor_leetcode_topic_tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bor_leetcode_topic_tags"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_auto: number
      tag_id: string | null
      name: string | null
      slug: string | null
      id: string | null
    }, ExtArgs["result"]["bor_leetcode_topic_tags"]>
    composites: {}
  }

  type bor_leetcode_topic_tagsGetPayload<S extends boolean | null | undefined | bor_leetcode_topic_tagsDefaultArgs> = $Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload, S>

  type bor_leetcode_topic_tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<bor_leetcode_topic_tagsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Bor_leetcode_topic_tagsCountAggregateInputType | true
    }

  export interface bor_leetcode_topic_tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bor_leetcode_topic_tags'], meta: { name: 'bor_leetcode_topic_tags' } }
    /**
     * Find zero or one Bor_leetcode_topic_tags that matches the filter.
     * @param {bor_leetcode_topic_tagsFindUniqueArgs} args - Arguments to find a Bor_leetcode_topic_tags
     * @example
     * // Get one Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bor_leetcode_topic_tagsFindUniqueArgs>(args: SelectSubset<T, bor_leetcode_topic_tagsFindUniqueArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bor_leetcode_topic_tags that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {bor_leetcode_topic_tagsFindUniqueOrThrowArgs} args - Arguments to find a Bor_leetcode_topic_tags
     * @example
     * // Get one Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bor_leetcode_topic_tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, bor_leetcode_topic_tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bor_leetcode_topic_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_topic_tagsFindFirstArgs} args - Arguments to find a Bor_leetcode_topic_tags
     * @example
     * // Get one Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bor_leetcode_topic_tagsFindFirstArgs>(args?: SelectSubset<T, bor_leetcode_topic_tagsFindFirstArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bor_leetcode_topic_tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_topic_tagsFindFirstOrThrowArgs} args - Arguments to find a Bor_leetcode_topic_tags
     * @example
     * // Get one Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bor_leetcode_topic_tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, bor_leetcode_topic_tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bor_leetcode_topic_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_topic_tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.findMany()
     * 
     * // Get first 10 Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.findMany({ take: 10 })
     * 
     * // Only select the `id_auto`
     * const bor_leetcode_topic_tagsWithId_autoOnly = await prisma.bor_leetcode_topic_tags.findMany({ select: { id_auto: true } })
     * 
     */
    findMany<T extends bor_leetcode_topic_tagsFindManyArgs>(args?: SelectSubset<T, bor_leetcode_topic_tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bor_leetcode_topic_tags.
     * @param {bor_leetcode_topic_tagsCreateArgs} args - Arguments to create a Bor_leetcode_topic_tags.
     * @example
     * // Create one Bor_leetcode_topic_tags
     * const Bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.create({
     *   data: {
     *     // ... data to create a Bor_leetcode_topic_tags
     *   }
     * })
     * 
     */
    create<T extends bor_leetcode_topic_tagsCreateArgs>(args: SelectSubset<T, bor_leetcode_topic_tagsCreateArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bor_leetcode_topic_tags.
     * @param {bor_leetcode_topic_tagsCreateManyArgs} args - Arguments to create many Bor_leetcode_topic_tags.
     * @example
     * // Create many Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bor_leetcode_topic_tagsCreateManyArgs>(args?: SelectSubset<T, bor_leetcode_topic_tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bor_leetcode_topic_tags and returns the data saved in the database.
     * @param {bor_leetcode_topic_tagsCreateManyAndReturnArgs} args - Arguments to create many Bor_leetcode_topic_tags.
     * @example
     * // Create many Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bor_leetcode_topic_tags and only return the `id_auto`
     * const bor_leetcode_topic_tagsWithId_autoOnly = await prisma.bor_leetcode_topic_tags.createManyAndReturn({ 
     *   select: { id_auto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bor_leetcode_topic_tagsCreateManyAndReturnArgs>(args?: SelectSubset<T, bor_leetcode_topic_tagsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bor_leetcode_topic_tags.
     * @param {bor_leetcode_topic_tagsDeleteArgs} args - Arguments to delete one Bor_leetcode_topic_tags.
     * @example
     * // Delete one Bor_leetcode_topic_tags
     * const Bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.delete({
     *   where: {
     *     // ... filter to delete one Bor_leetcode_topic_tags
     *   }
     * })
     * 
     */
    delete<T extends bor_leetcode_topic_tagsDeleteArgs>(args: SelectSubset<T, bor_leetcode_topic_tagsDeleteArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bor_leetcode_topic_tags.
     * @param {bor_leetcode_topic_tagsUpdateArgs} args - Arguments to update one Bor_leetcode_topic_tags.
     * @example
     * // Update one Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bor_leetcode_topic_tagsUpdateArgs>(args: SelectSubset<T, bor_leetcode_topic_tagsUpdateArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bor_leetcode_topic_tags.
     * @param {bor_leetcode_topic_tagsDeleteManyArgs} args - Arguments to filter Bor_leetcode_topic_tags to delete.
     * @example
     * // Delete a few Bor_leetcode_topic_tags
     * const { count } = await prisma.bor_leetcode_topic_tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bor_leetcode_topic_tagsDeleteManyArgs>(args?: SelectSubset<T, bor_leetcode_topic_tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bor_leetcode_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_topic_tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bor_leetcode_topic_tagsUpdateManyArgs>(args: SelectSubset<T, bor_leetcode_topic_tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bor_leetcode_topic_tags.
     * @param {bor_leetcode_topic_tagsUpsertArgs} args - Arguments to update or create a Bor_leetcode_topic_tags.
     * @example
     * // Update or create a Bor_leetcode_topic_tags
     * const bor_leetcode_topic_tags = await prisma.bor_leetcode_topic_tags.upsert({
     *   create: {
     *     // ... data to create a Bor_leetcode_topic_tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bor_leetcode_topic_tags we want to update
     *   }
     * })
     */
    upsert<T extends bor_leetcode_topic_tagsUpsertArgs>(args: SelectSubset<T, bor_leetcode_topic_tagsUpsertArgs<ExtArgs>>): Prisma__bor_leetcode_topic_tagsClient<$Result.GetResult<Prisma.$bor_leetcode_topic_tagsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bor_leetcode_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_topic_tagsCountArgs} args - Arguments to filter Bor_leetcode_topic_tags to count.
     * @example
     * // Count the number of Bor_leetcode_topic_tags
     * const count = await prisma.bor_leetcode_topic_tags.count({
     *   where: {
     *     // ... the filter for the Bor_leetcode_topic_tags we want to count
     *   }
     * })
    **/
    count<T extends bor_leetcode_topic_tagsCountArgs>(
      args?: Subset<T, bor_leetcode_topic_tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bor_leetcode_topic_tagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bor_leetcode_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bor_leetcode_topic_tagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Bor_leetcode_topic_tagsAggregateArgs>(args: Subset<T, Bor_leetcode_topic_tagsAggregateArgs>): Prisma.PrismaPromise<GetBor_leetcode_topic_tagsAggregateType<T>>

    /**
     * Group by Bor_leetcode_topic_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_leetcode_topic_tagsGroupByArgs} args - Group by arguments.
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
      T extends bor_leetcode_topic_tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bor_leetcode_topic_tagsGroupByArgs['orderBy'] }
        : { orderBy?: bor_leetcode_topic_tagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bor_leetcode_topic_tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBor_leetcode_topic_tagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bor_leetcode_topic_tags model
   */
  readonly fields: bor_leetcode_topic_tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bor_leetcode_topic_tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bor_leetcode_topic_tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bor_leetcode_topic_tags model
   */ 
  interface bor_leetcode_topic_tagsFieldRefs {
    readonly id_auto: FieldRef<"bor_leetcode_topic_tags", 'Int'>
    readonly tag_id: FieldRef<"bor_leetcode_topic_tags", 'String'>
    readonly name: FieldRef<"bor_leetcode_topic_tags", 'String'>
    readonly slug: FieldRef<"bor_leetcode_topic_tags", 'String'>
    readonly id: FieldRef<"bor_leetcode_topic_tags", 'String'>
  }
    

  // Custom InputTypes
  /**
   * bor_leetcode_topic_tags findUnique
   */
  export type bor_leetcode_topic_tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_topic_tags to fetch.
     */
    where: bor_leetcode_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_topic_tags findUniqueOrThrow
   */
  export type bor_leetcode_topic_tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_topic_tags to fetch.
     */
    where: bor_leetcode_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_topic_tags findFirst
   */
  export type bor_leetcode_topic_tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_topic_tags to fetch.
     */
    where?: bor_leetcode_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_topic_tagsOrderByWithRelationInput | bor_leetcode_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_leetcode_topic_tags.
     */
    cursor?: bor_leetcode_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_topic_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_leetcode_topic_tags.
     */
    distinct?: Bor_leetcode_topic_tagsScalarFieldEnum | Bor_leetcode_topic_tagsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_topic_tags findFirstOrThrow
   */
  export type bor_leetcode_topic_tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_topic_tags to fetch.
     */
    where?: bor_leetcode_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_topic_tagsOrderByWithRelationInput | bor_leetcode_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_leetcode_topic_tags.
     */
    cursor?: bor_leetcode_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_topic_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_leetcode_topic_tags.
     */
    distinct?: Bor_leetcode_topic_tagsScalarFieldEnum | Bor_leetcode_topic_tagsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_topic_tags findMany
   */
  export type bor_leetcode_topic_tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter, which bor_leetcode_topic_tags to fetch.
     */
    where?: bor_leetcode_topic_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_leetcode_topic_tags to fetch.
     */
    orderBy?: bor_leetcode_topic_tagsOrderByWithRelationInput | bor_leetcode_topic_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bor_leetcode_topic_tags.
     */
    cursor?: bor_leetcode_topic_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_leetcode_topic_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_leetcode_topic_tags.
     */
    skip?: number
    distinct?: Bor_leetcode_topic_tagsScalarFieldEnum | Bor_leetcode_topic_tagsScalarFieldEnum[]
  }

  /**
   * bor_leetcode_topic_tags create
   */
  export type bor_leetcode_topic_tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * The data needed to create a bor_leetcode_topic_tags.
     */
    data?: XOR<bor_leetcode_topic_tagsCreateInput, bor_leetcode_topic_tagsUncheckedCreateInput>
  }

  /**
   * bor_leetcode_topic_tags createMany
   */
  export type bor_leetcode_topic_tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bor_leetcode_topic_tags.
     */
    data: bor_leetcode_topic_tagsCreateManyInput | bor_leetcode_topic_tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_leetcode_topic_tags createManyAndReturn
   */
  export type bor_leetcode_topic_tagsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many bor_leetcode_topic_tags.
     */
    data: bor_leetcode_topic_tagsCreateManyInput | bor_leetcode_topic_tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_leetcode_topic_tags update
   */
  export type bor_leetcode_topic_tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * The data needed to update a bor_leetcode_topic_tags.
     */
    data: XOR<bor_leetcode_topic_tagsUpdateInput, bor_leetcode_topic_tagsUncheckedUpdateInput>
    /**
     * Choose, which bor_leetcode_topic_tags to update.
     */
    where: bor_leetcode_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_topic_tags updateMany
   */
  export type bor_leetcode_topic_tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bor_leetcode_topic_tags.
     */
    data: XOR<bor_leetcode_topic_tagsUpdateManyMutationInput, bor_leetcode_topic_tagsUncheckedUpdateManyInput>
    /**
     * Filter which bor_leetcode_topic_tags to update
     */
    where?: bor_leetcode_topic_tagsWhereInput
  }

  /**
   * bor_leetcode_topic_tags upsert
   */
  export type bor_leetcode_topic_tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * The filter to search for the bor_leetcode_topic_tags to update in case it exists.
     */
    where: bor_leetcode_topic_tagsWhereUniqueInput
    /**
     * In case the bor_leetcode_topic_tags found by the `where` argument doesn't exist, create a new bor_leetcode_topic_tags with this data.
     */
    create: XOR<bor_leetcode_topic_tagsCreateInput, bor_leetcode_topic_tagsUncheckedCreateInput>
    /**
     * In case the bor_leetcode_topic_tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bor_leetcode_topic_tagsUpdateInput, bor_leetcode_topic_tagsUncheckedUpdateInput>
  }

  /**
   * bor_leetcode_topic_tags delete
   */
  export type bor_leetcode_topic_tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
    /**
     * Filter which bor_leetcode_topic_tags to delete.
     */
    where: bor_leetcode_topic_tagsWhereUniqueInput
  }

  /**
   * bor_leetcode_topic_tags deleteMany
   */
  export type bor_leetcode_topic_tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_leetcode_topic_tags to delete
     */
    where?: bor_leetcode_topic_tagsWhereInput
  }

  /**
   * bor_leetcode_topic_tags without action
   */
  export type bor_leetcode_topic_tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_leetcode_topic_tags
     */
    select?: bor_leetcode_topic_tagsSelect<ExtArgs> | null
  }


  /**
   * Model bor_user
   */

  export type AggregateBor_user = {
    _count: Bor_userCountAggregateOutputType | null
    _avg: Bor_userAvgAggregateOutputType | null
    _sum: Bor_userSumAggregateOutputType | null
    _min: Bor_userMinAggregateOutputType | null
    _max: Bor_userMaxAggregateOutputType | null
  }

  export type Bor_userAvgAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_userSumAggregateOutputType = {
    id_auto: number | null
  }

  export type Bor_userMinAggregateOutputType = {
    id_auto: number | null
    id: string | null
    username: string | null
    password: string | null
    avatar: string | null
    email: string | null
    enabled: boolean | null
    account_expired: boolean | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Bor_userMaxAggregateOutputType = {
    id_auto: number | null
    id: string | null
    username: string | null
    password: string | null
    avatar: string | null
    email: string | null
    enabled: boolean | null
    account_expired: boolean | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Bor_userCountAggregateOutputType = {
    id_auto: number
    id: number
    username: number
    password: number
    avatar: number
    email: number
    enabled: number
    account_expired: number
    phone: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Bor_userAvgAggregateInputType = {
    id_auto?: true
  }

  export type Bor_userSumAggregateInputType = {
    id_auto?: true
  }

  export type Bor_userMinAggregateInputType = {
    id_auto?: true
    id?: true
    username?: true
    password?: true
    avatar?: true
    email?: true
    enabled?: true
    account_expired?: true
    phone?: true
    created_at?: true
    updated_at?: true
  }

  export type Bor_userMaxAggregateInputType = {
    id_auto?: true
    id?: true
    username?: true
    password?: true
    avatar?: true
    email?: true
    enabled?: true
    account_expired?: true
    phone?: true
    created_at?: true
    updated_at?: true
  }

  export type Bor_userCountAggregateInputType = {
    id_auto?: true
    id?: true
    username?: true
    password?: true
    avatar?: true
    email?: true
    enabled?: true
    account_expired?: true
    phone?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Bor_userAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_user to aggregate.
     */
    where?: bor_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_users to fetch.
     */
    orderBy?: bor_userOrderByWithRelationInput | bor_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bor_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bor_users
    **/
    _count?: true | Bor_userCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bor_userAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bor_userSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bor_userMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bor_userMaxAggregateInputType
  }

  export type GetBor_userAggregateType<T extends Bor_userAggregateArgs> = {
        [P in keyof T & keyof AggregateBor_user]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBor_user[P]>
      : GetScalarType<T[P], AggregateBor_user[P]>
  }




  export type bor_userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bor_userWhereInput
    orderBy?: bor_userOrderByWithAggregationInput | bor_userOrderByWithAggregationInput[]
    by: Bor_userScalarFieldEnum[] | Bor_userScalarFieldEnum
    having?: bor_userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bor_userCountAggregateInputType | true
    _avg?: Bor_userAvgAggregateInputType
    _sum?: Bor_userSumAggregateInputType
    _min?: Bor_userMinAggregateInputType
    _max?: Bor_userMaxAggregateInputType
  }

  export type Bor_userGroupByOutputType = {
    id_auto: number
    id: string | null
    username: string | null
    password: string | null
    avatar: string | null
    email: string | null
    enabled: boolean | null
    account_expired: boolean | null
    phone: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: Bor_userCountAggregateOutputType | null
    _avg: Bor_userAvgAggregateOutputType | null
    _sum: Bor_userSumAggregateOutputType | null
    _min: Bor_userMinAggregateOutputType | null
    _max: Bor_userMaxAggregateOutputType | null
  }

  type GetBor_userGroupByPayload<T extends bor_userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bor_userGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bor_userGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bor_userGroupByOutputType[P]>
            : GetScalarType<T[P], Bor_userGroupByOutputType[P]>
        }
      >
    >


  export type bor_userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    id?: boolean
    username?: boolean
    password?: boolean
    avatar?: boolean
    email?: boolean
    enabled?: boolean
    account_expired?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["bor_user"]>

  export type bor_userSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_auto?: boolean
    id?: boolean
    username?: boolean
    password?: boolean
    avatar?: boolean
    email?: boolean
    enabled?: boolean
    account_expired?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["bor_user"]>

  export type bor_userSelectScalar = {
    id_auto?: boolean
    id?: boolean
    username?: boolean
    password?: boolean
    avatar?: boolean
    email?: boolean
    enabled?: boolean
    account_expired?: boolean
    phone?: boolean
    created_at?: boolean
    updated_at?: boolean
  }


  export type $bor_userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bor_user"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id_auto: number
      id: string | null
      username: string | null
      password: string | null
      avatar: string | null
      email: string | null
      enabled: boolean | null
      account_expired: boolean | null
      phone: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["bor_user"]>
    composites: {}
  }

  type bor_userGetPayload<S extends boolean | null | undefined | bor_userDefaultArgs> = $Result.GetResult<Prisma.$bor_userPayload, S>

  type bor_userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<bor_userFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: Bor_userCountAggregateInputType | true
    }

  export interface bor_userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bor_user'], meta: { name: 'bor_user' } }
    /**
     * Find zero or one Bor_user that matches the filter.
     * @param {bor_userFindUniqueArgs} args - Arguments to find a Bor_user
     * @example
     * // Get one Bor_user
     * const bor_user = await prisma.bor_user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bor_userFindUniqueArgs>(args: SelectSubset<T, bor_userFindUniqueArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Bor_user that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {bor_userFindUniqueOrThrowArgs} args - Arguments to find a Bor_user
     * @example
     * // Get one Bor_user
     * const bor_user = await prisma.bor_user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bor_userFindUniqueOrThrowArgs>(args: SelectSubset<T, bor_userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Bor_user that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_userFindFirstArgs} args - Arguments to find a Bor_user
     * @example
     * // Get one Bor_user
     * const bor_user = await prisma.bor_user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bor_userFindFirstArgs>(args?: SelectSubset<T, bor_userFindFirstArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Bor_user that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_userFindFirstOrThrowArgs} args - Arguments to find a Bor_user
     * @example
     * // Get one Bor_user
     * const bor_user = await prisma.bor_user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bor_userFindFirstOrThrowArgs>(args?: SelectSubset<T, bor_userFindFirstOrThrowArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Bor_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bor_users
     * const bor_users = await prisma.bor_user.findMany()
     * 
     * // Get first 10 Bor_users
     * const bor_users = await prisma.bor_user.findMany({ take: 10 })
     * 
     * // Only select the `id_auto`
     * const bor_userWithId_autoOnly = await prisma.bor_user.findMany({ select: { id_auto: true } })
     * 
     */
    findMany<T extends bor_userFindManyArgs>(args?: SelectSubset<T, bor_userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Bor_user.
     * @param {bor_userCreateArgs} args - Arguments to create a Bor_user.
     * @example
     * // Create one Bor_user
     * const Bor_user = await prisma.bor_user.create({
     *   data: {
     *     // ... data to create a Bor_user
     *   }
     * })
     * 
     */
    create<T extends bor_userCreateArgs>(args: SelectSubset<T, bor_userCreateArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Bor_users.
     * @param {bor_userCreateManyArgs} args - Arguments to create many Bor_users.
     * @example
     * // Create many Bor_users
     * const bor_user = await prisma.bor_user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bor_userCreateManyArgs>(args?: SelectSubset<T, bor_userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bor_users and returns the data saved in the database.
     * @param {bor_userCreateManyAndReturnArgs} args - Arguments to create many Bor_users.
     * @example
     * // Create many Bor_users
     * const bor_user = await prisma.bor_user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bor_users and only return the `id_auto`
     * const bor_userWithId_autoOnly = await prisma.bor_user.createManyAndReturn({ 
     *   select: { id_auto: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bor_userCreateManyAndReturnArgs>(args?: SelectSubset<T, bor_userCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Bor_user.
     * @param {bor_userDeleteArgs} args - Arguments to delete one Bor_user.
     * @example
     * // Delete one Bor_user
     * const Bor_user = await prisma.bor_user.delete({
     *   where: {
     *     // ... filter to delete one Bor_user
     *   }
     * })
     * 
     */
    delete<T extends bor_userDeleteArgs>(args: SelectSubset<T, bor_userDeleteArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Bor_user.
     * @param {bor_userUpdateArgs} args - Arguments to update one Bor_user.
     * @example
     * // Update one Bor_user
     * const bor_user = await prisma.bor_user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bor_userUpdateArgs>(args: SelectSubset<T, bor_userUpdateArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Bor_users.
     * @param {bor_userDeleteManyArgs} args - Arguments to filter Bor_users to delete.
     * @example
     * // Delete a few Bor_users
     * const { count } = await prisma.bor_user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bor_userDeleteManyArgs>(args?: SelectSubset<T, bor_userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bor_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bor_users
     * const bor_user = await prisma.bor_user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bor_userUpdateManyArgs>(args: SelectSubset<T, bor_userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Bor_user.
     * @param {bor_userUpsertArgs} args - Arguments to update or create a Bor_user.
     * @example
     * // Update or create a Bor_user
     * const bor_user = await prisma.bor_user.upsert({
     *   create: {
     *     // ... data to create a Bor_user
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bor_user we want to update
     *   }
     * })
     */
    upsert<T extends bor_userUpsertArgs>(args: SelectSubset<T, bor_userUpsertArgs<ExtArgs>>): Prisma__bor_userClient<$Result.GetResult<Prisma.$bor_userPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Bor_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_userCountArgs} args - Arguments to filter Bor_users to count.
     * @example
     * // Count the number of Bor_users
     * const count = await prisma.bor_user.count({
     *   where: {
     *     // ... the filter for the Bor_users we want to count
     *   }
     * })
    **/
    count<T extends bor_userCountArgs>(
      args?: Subset<T, bor_userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bor_userCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bor_user.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bor_userAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Bor_userAggregateArgs>(args: Subset<T, Bor_userAggregateArgs>): Prisma.PrismaPromise<GetBor_userAggregateType<T>>

    /**
     * Group by Bor_user.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bor_userGroupByArgs} args - Group by arguments.
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
      T extends bor_userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bor_userGroupByArgs['orderBy'] }
        : { orderBy?: bor_userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bor_userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBor_userGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bor_user model
   */
  readonly fields: bor_userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bor_user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bor_userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bor_user model
   */ 
  interface bor_userFieldRefs {
    readonly id_auto: FieldRef<"bor_user", 'Int'>
    readonly id: FieldRef<"bor_user", 'String'>
    readonly username: FieldRef<"bor_user", 'String'>
    readonly password: FieldRef<"bor_user", 'String'>
    readonly avatar: FieldRef<"bor_user", 'String'>
    readonly email: FieldRef<"bor_user", 'String'>
    readonly enabled: FieldRef<"bor_user", 'Boolean'>
    readonly account_expired: FieldRef<"bor_user", 'Boolean'>
    readonly phone: FieldRef<"bor_user", 'String'>
    readonly created_at: FieldRef<"bor_user", 'DateTime'>
    readonly updated_at: FieldRef<"bor_user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * bor_user findUnique
   */
  export type bor_userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * Filter, which bor_user to fetch.
     */
    where: bor_userWhereUniqueInput
  }

  /**
   * bor_user findUniqueOrThrow
   */
  export type bor_userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * Filter, which bor_user to fetch.
     */
    where: bor_userWhereUniqueInput
  }

  /**
   * bor_user findFirst
   */
  export type bor_userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * Filter, which bor_user to fetch.
     */
    where?: bor_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_users to fetch.
     */
    orderBy?: bor_userOrderByWithRelationInput | bor_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_users.
     */
    cursor?: bor_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_users.
     */
    distinct?: Bor_userScalarFieldEnum | Bor_userScalarFieldEnum[]
  }

  /**
   * bor_user findFirstOrThrow
   */
  export type bor_userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * Filter, which bor_user to fetch.
     */
    where?: bor_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_users to fetch.
     */
    orderBy?: bor_userOrderByWithRelationInput | bor_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bor_users.
     */
    cursor?: bor_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bor_users.
     */
    distinct?: Bor_userScalarFieldEnum | Bor_userScalarFieldEnum[]
  }

  /**
   * bor_user findMany
   */
  export type bor_userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * Filter, which bor_users to fetch.
     */
    where?: bor_userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bor_users to fetch.
     */
    orderBy?: bor_userOrderByWithRelationInput | bor_userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bor_users.
     */
    cursor?: bor_userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bor_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bor_users.
     */
    skip?: number
    distinct?: Bor_userScalarFieldEnum | Bor_userScalarFieldEnum[]
  }

  /**
   * bor_user create
   */
  export type bor_userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * The data needed to create a bor_user.
     */
    data?: XOR<bor_userCreateInput, bor_userUncheckedCreateInput>
  }

  /**
   * bor_user createMany
   */
  export type bor_userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bor_users.
     */
    data: bor_userCreateManyInput | bor_userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_user createManyAndReturn
   */
  export type bor_userCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many bor_users.
     */
    data: bor_userCreateManyInput | bor_userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bor_user update
   */
  export type bor_userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * The data needed to update a bor_user.
     */
    data: XOR<bor_userUpdateInput, bor_userUncheckedUpdateInput>
    /**
     * Choose, which bor_user to update.
     */
    where: bor_userWhereUniqueInput
  }

  /**
   * bor_user updateMany
   */
  export type bor_userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bor_users.
     */
    data: XOR<bor_userUpdateManyMutationInput, bor_userUncheckedUpdateManyInput>
    /**
     * Filter which bor_users to update
     */
    where?: bor_userWhereInput
  }

  /**
   * bor_user upsert
   */
  export type bor_userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * The filter to search for the bor_user to update in case it exists.
     */
    where: bor_userWhereUniqueInput
    /**
     * In case the bor_user found by the `where` argument doesn't exist, create a new bor_user with this data.
     */
    create: XOR<bor_userCreateInput, bor_userUncheckedCreateInput>
    /**
     * In case the bor_user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bor_userUpdateInput, bor_userUncheckedUpdateInput>
  }

  /**
   * bor_user delete
   */
  export type bor_userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
    /**
     * Filter which bor_user to delete.
     */
    where: bor_userWhereUniqueInput
  }

  /**
   * bor_user deleteMany
   */
  export type bor_userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bor_users to delete
     */
    where?: bor_userWhereInput
  }

  /**
   * bor_user without action
   */
  export type bor_userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bor_user
     */
    select?: bor_userSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Bor_configScalarFieldEnum: {
    id_auto: 'id_auto',
    key: 'key',
    value: 'value'
  };

  export type Bor_configScalarFieldEnum = (typeof Bor_configScalarFieldEnum)[keyof typeof Bor_configScalarFieldEnum]


  export const Bor_leetcode_question_topic_tagsScalarFieldEnum: {
    question_id: 'question_id',
    tag_id: 'tag_id',
    id_auto: 'id_auto'
  };

  export type Bor_leetcode_question_topic_tagsScalarFieldEnum = (typeof Bor_leetcode_question_topic_tagsScalarFieldEnum)[keyof typeof Bor_leetcode_question_topic_tagsScalarFieldEnum]


  export const Bor_leetcode_questionsScalarFieldEnum: {
    id_auto: 'id_auto',
    id: 'id',
    ac_rate: 'ac_rate',
    difficulty: 'difficulty',
    question_frontend_id: 'question_frontend_id',
    is_paid_only: 'is_paid_only',
    title: 'title',
    title_slug: 'title_slug',
    status: 'status',
    title_cn: 'title_cn',
    finished_at: 'finished_at',
    start_at: 'start_at'
  };

  export type Bor_leetcode_questionsScalarFieldEnum = (typeof Bor_leetcode_questionsScalarFieldEnum)[keyof typeof Bor_leetcode_questionsScalarFieldEnum]


  export const Bor_leetcode_topic_tagsScalarFieldEnum: {
    id_auto: 'id_auto',
    tag_id: 'tag_id',
    name: 'name',
    slug: 'slug',
    id: 'id'
  };

  export type Bor_leetcode_topic_tagsScalarFieldEnum = (typeof Bor_leetcode_topic_tagsScalarFieldEnum)[keyof typeof Bor_leetcode_topic_tagsScalarFieldEnum]


  export const Bor_userScalarFieldEnum: {
    id_auto: 'id_auto',
    id: 'id',
    username: 'username',
    password: 'password',
    avatar: 'avatar',
    email: 'email',
    enabled: 'enabled',
    account_expired: 'account_expired',
    phone: 'phone',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Bor_userScalarFieldEnum = (typeof Bor_userScalarFieldEnum)[keyof typeof Bor_userScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type bor_configWhereInput = {
    AND?: bor_configWhereInput | bor_configWhereInput[]
    OR?: bor_configWhereInput[]
    NOT?: bor_configWhereInput | bor_configWhereInput[]
    id_auto?: IntFilter<"bor_config"> | number
    key?: StringNullableFilter<"bor_config"> | string | null
    value?: StringNullableFilter<"bor_config"> | string | null
  }

  export type bor_configOrderByWithRelationInput = {
    id_auto?: SortOrder
    key?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
  }

  export type bor_configWhereUniqueInput = Prisma.AtLeast<{
    id_auto?: number
    AND?: bor_configWhereInput | bor_configWhereInput[]
    OR?: bor_configWhereInput[]
    NOT?: bor_configWhereInput | bor_configWhereInput[]
    key?: StringNullableFilter<"bor_config"> | string | null
    value?: StringNullableFilter<"bor_config"> | string | null
  }, "id_auto">

  export type bor_configOrderByWithAggregationInput = {
    id_auto?: SortOrder
    key?: SortOrderInput | SortOrder
    value?: SortOrderInput | SortOrder
    _count?: bor_configCountOrderByAggregateInput
    _avg?: bor_configAvgOrderByAggregateInput
    _max?: bor_configMaxOrderByAggregateInput
    _min?: bor_configMinOrderByAggregateInput
    _sum?: bor_configSumOrderByAggregateInput
  }

  export type bor_configScalarWhereWithAggregatesInput = {
    AND?: bor_configScalarWhereWithAggregatesInput | bor_configScalarWhereWithAggregatesInput[]
    OR?: bor_configScalarWhereWithAggregatesInput[]
    NOT?: bor_configScalarWhereWithAggregatesInput | bor_configScalarWhereWithAggregatesInput[]
    id_auto?: IntWithAggregatesFilter<"bor_config"> | number
    key?: StringNullableWithAggregatesFilter<"bor_config"> | string | null
    value?: StringNullableWithAggregatesFilter<"bor_config"> | string | null
  }

  export type bor_leetcode_question_topic_tagsWhereInput = {
    AND?: bor_leetcode_question_topic_tagsWhereInput | bor_leetcode_question_topic_tagsWhereInput[]
    OR?: bor_leetcode_question_topic_tagsWhereInput[]
    NOT?: bor_leetcode_question_topic_tagsWhereInput | bor_leetcode_question_topic_tagsWhereInput[]
    question_id?: StringNullableFilter<"bor_leetcode_question_topic_tags"> | string | null
    tag_id?: StringNullableFilter<"bor_leetcode_question_topic_tags"> | string | null
    id_auto?: IntFilter<"bor_leetcode_question_topic_tags"> | number
  }

  export type bor_leetcode_question_topic_tagsOrderByWithRelationInput = {
    question_id?: SortOrderInput | SortOrder
    tag_id?: SortOrderInput | SortOrder
    id_auto?: SortOrder
  }

  export type bor_leetcode_question_topic_tagsWhereUniqueInput = Prisma.AtLeast<{
    id_auto?: number
    AND?: bor_leetcode_question_topic_tagsWhereInput | bor_leetcode_question_topic_tagsWhereInput[]
    OR?: bor_leetcode_question_topic_tagsWhereInput[]
    NOT?: bor_leetcode_question_topic_tagsWhereInput | bor_leetcode_question_topic_tagsWhereInput[]
    question_id?: StringNullableFilter<"bor_leetcode_question_topic_tags"> | string | null
    tag_id?: StringNullableFilter<"bor_leetcode_question_topic_tags"> | string | null
  }, "id_auto">

  export type bor_leetcode_question_topic_tagsOrderByWithAggregationInput = {
    question_id?: SortOrderInput | SortOrder
    tag_id?: SortOrderInput | SortOrder
    id_auto?: SortOrder
    _count?: bor_leetcode_question_topic_tagsCountOrderByAggregateInput
    _avg?: bor_leetcode_question_topic_tagsAvgOrderByAggregateInput
    _max?: bor_leetcode_question_topic_tagsMaxOrderByAggregateInput
    _min?: bor_leetcode_question_topic_tagsMinOrderByAggregateInput
    _sum?: bor_leetcode_question_topic_tagsSumOrderByAggregateInput
  }

  export type bor_leetcode_question_topic_tagsScalarWhereWithAggregatesInput = {
    AND?: bor_leetcode_question_topic_tagsScalarWhereWithAggregatesInput | bor_leetcode_question_topic_tagsScalarWhereWithAggregatesInput[]
    OR?: bor_leetcode_question_topic_tagsScalarWhereWithAggregatesInput[]
    NOT?: bor_leetcode_question_topic_tagsScalarWhereWithAggregatesInput | bor_leetcode_question_topic_tagsScalarWhereWithAggregatesInput[]
    question_id?: StringNullableWithAggregatesFilter<"bor_leetcode_question_topic_tags"> | string | null
    tag_id?: StringNullableWithAggregatesFilter<"bor_leetcode_question_topic_tags"> | string | null
    id_auto?: IntWithAggregatesFilter<"bor_leetcode_question_topic_tags"> | number
  }

  export type bor_leetcode_questionsWhereInput = {
    AND?: bor_leetcode_questionsWhereInput | bor_leetcode_questionsWhereInput[]
    OR?: bor_leetcode_questionsWhereInput[]
    NOT?: bor_leetcode_questionsWhereInput | bor_leetcode_questionsWhereInput[]
    id_auto?: IntFilter<"bor_leetcode_questions"> | number
    id?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    ac_rate?: FloatNullableFilter<"bor_leetcode_questions"> | number | null
    difficulty?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    question_frontend_id?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    is_paid_only?: BoolNullableFilter<"bor_leetcode_questions"> | boolean | null
    title?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    title_slug?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    status?: IntNullableFilter<"bor_leetcode_questions"> | number | null
    title_cn?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    finished_at?: DateTimeNullableFilter<"bor_leetcode_questions"> | Date | string | null
    start_at?: DateTimeNullableFilter<"bor_leetcode_questions"> | Date | string | null
  }

  export type bor_leetcode_questionsOrderByWithRelationInput = {
    id_auto?: SortOrder
    id?: SortOrderInput | SortOrder
    ac_rate?: SortOrderInput | SortOrder
    difficulty?: SortOrderInput | SortOrder
    question_frontend_id?: SortOrderInput | SortOrder
    is_paid_only?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    title_slug?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    title_cn?: SortOrderInput | SortOrder
    finished_at?: SortOrderInput | SortOrder
    start_at?: SortOrderInput | SortOrder
  }

  export type bor_leetcode_questionsWhereUniqueInput = Prisma.AtLeast<{
    id_auto?: number
    AND?: bor_leetcode_questionsWhereInput | bor_leetcode_questionsWhereInput[]
    OR?: bor_leetcode_questionsWhereInput[]
    NOT?: bor_leetcode_questionsWhereInput | bor_leetcode_questionsWhereInput[]
    id?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    ac_rate?: FloatNullableFilter<"bor_leetcode_questions"> | number | null
    difficulty?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    question_frontend_id?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    is_paid_only?: BoolNullableFilter<"bor_leetcode_questions"> | boolean | null
    title?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    title_slug?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    status?: IntNullableFilter<"bor_leetcode_questions"> | number | null
    title_cn?: StringNullableFilter<"bor_leetcode_questions"> | string | null
    finished_at?: DateTimeNullableFilter<"bor_leetcode_questions"> | Date | string | null
    start_at?: DateTimeNullableFilter<"bor_leetcode_questions"> | Date | string | null
  }, "id_auto">

  export type bor_leetcode_questionsOrderByWithAggregationInput = {
    id_auto?: SortOrder
    id?: SortOrderInput | SortOrder
    ac_rate?: SortOrderInput | SortOrder
    difficulty?: SortOrderInput | SortOrder
    question_frontend_id?: SortOrderInput | SortOrder
    is_paid_only?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    title_slug?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    title_cn?: SortOrderInput | SortOrder
    finished_at?: SortOrderInput | SortOrder
    start_at?: SortOrderInput | SortOrder
    _count?: bor_leetcode_questionsCountOrderByAggregateInput
    _avg?: bor_leetcode_questionsAvgOrderByAggregateInput
    _max?: bor_leetcode_questionsMaxOrderByAggregateInput
    _min?: bor_leetcode_questionsMinOrderByAggregateInput
    _sum?: bor_leetcode_questionsSumOrderByAggregateInput
  }

  export type bor_leetcode_questionsScalarWhereWithAggregatesInput = {
    AND?: bor_leetcode_questionsScalarWhereWithAggregatesInput | bor_leetcode_questionsScalarWhereWithAggregatesInput[]
    OR?: bor_leetcode_questionsScalarWhereWithAggregatesInput[]
    NOT?: bor_leetcode_questionsScalarWhereWithAggregatesInput | bor_leetcode_questionsScalarWhereWithAggregatesInput[]
    id_auto?: IntWithAggregatesFilter<"bor_leetcode_questions"> | number
    id?: StringNullableWithAggregatesFilter<"bor_leetcode_questions"> | string | null
    ac_rate?: FloatNullableWithAggregatesFilter<"bor_leetcode_questions"> | number | null
    difficulty?: StringNullableWithAggregatesFilter<"bor_leetcode_questions"> | string | null
    question_frontend_id?: StringNullableWithAggregatesFilter<"bor_leetcode_questions"> | string | null
    is_paid_only?: BoolNullableWithAggregatesFilter<"bor_leetcode_questions"> | boolean | null
    title?: StringNullableWithAggregatesFilter<"bor_leetcode_questions"> | string | null
    title_slug?: StringNullableWithAggregatesFilter<"bor_leetcode_questions"> | string | null
    status?: IntNullableWithAggregatesFilter<"bor_leetcode_questions"> | number | null
    title_cn?: StringNullableWithAggregatesFilter<"bor_leetcode_questions"> | string | null
    finished_at?: DateTimeNullableWithAggregatesFilter<"bor_leetcode_questions"> | Date | string | null
    start_at?: DateTimeNullableWithAggregatesFilter<"bor_leetcode_questions"> | Date | string | null
  }

  export type bor_leetcode_topic_tagsWhereInput = {
    AND?: bor_leetcode_topic_tagsWhereInput | bor_leetcode_topic_tagsWhereInput[]
    OR?: bor_leetcode_topic_tagsWhereInput[]
    NOT?: bor_leetcode_topic_tagsWhereInput | bor_leetcode_topic_tagsWhereInput[]
    id_auto?: IntFilter<"bor_leetcode_topic_tags"> | number
    tag_id?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
    name?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
    slug?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
    id?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
  }

  export type bor_leetcode_topic_tagsOrderByWithRelationInput = {
    id_auto?: SortOrder
    tag_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    id?: SortOrderInput | SortOrder
  }

  export type bor_leetcode_topic_tagsWhereUniqueInput = Prisma.AtLeast<{
    id_auto?: number
    AND?: bor_leetcode_topic_tagsWhereInput | bor_leetcode_topic_tagsWhereInput[]
    OR?: bor_leetcode_topic_tagsWhereInput[]
    NOT?: bor_leetcode_topic_tagsWhereInput | bor_leetcode_topic_tagsWhereInput[]
    tag_id?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
    name?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
    slug?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
    id?: StringNullableFilter<"bor_leetcode_topic_tags"> | string | null
  }, "id_auto">

  export type bor_leetcode_topic_tagsOrderByWithAggregationInput = {
    id_auto?: SortOrder
    tag_id?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    slug?: SortOrderInput | SortOrder
    id?: SortOrderInput | SortOrder
    _count?: bor_leetcode_topic_tagsCountOrderByAggregateInput
    _avg?: bor_leetcode_topic_tagsAvgOrderByAggregateInput
    _max?: bor_leetcode_topic_tagsMaxOrderByAggregateInput
    _min?: bor_leetcode_topic_tagsMinOrderByAggregateInput
    _sum?: bor_leetcode_topic_tagsSumOrderByAggregateInput
  }

  export type bor_leetcode_topic_tagsScalarWhereWithAggregatesInput = {
    AND?: bor_leetcode_topic_tagsScalarWhereWithAggregatesInput | bor_leetcode_topic_tagsScalarWhereWithAggregatesInput[]
    OR?: bor_leetcode_topic_tagsScalarWhereWithAggregatesInput[]
    NOT?: bor_leetcode_topic_tagsScalarWhereWithAggregatesInput | bor_leetcode_topic_tagsScalarWhereWithAggregatesInput[]
    id_auto?: IntWithAggregatesFilter<"bor_leetcode_topic_tags"> | number
    tag_id?: StringNullableWithAggregatesFilter<"bor_leetcode_topic_tags"> | string | null
    name?: StringNullableWithAggregatesFilter<"bor_leetcode_topic_tags"> | string | null
    slug?: StringNullableWithAggregatesFilter<"bor_leetcode_topic_tags"> | string | null
    id?: StringNullableWithAggregatesFilter<"bor_leetcode_topic_tags"> | string | null
  }

  export type bor_userWhereInput = {
    AND?: bor_userWhereInput | bor_userWhereInput[]
    OR?: bor_userWhereInput[]
    NOT?: bor_userWhereInput | bor_userWhereInput[]
    id_auto?: IntFilter<"bor_user"> | number
    id?: StringNullableFilter<"bor_user"> | string | null
    username?: StringNullableFilter<"bor_user"> | string | null
    password?: StringNullableFilter<"bor_user"> | string | null
    avatar?: StringNullableFilter<"bor_user"> | string | null
    email?: StringNullableFilter<"bor_user"> | string | null
    enabled?: BoolNullableFilter<"bor_user"> | boolean | null
    account_expired?: BoolNullableFilter<"bor_user"> | boolean | null
    phone?: StringNullableFilter<"bor_user"> | string | null
    created_at?: DateTimeNullableFilter<"bor_user"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"bor_user"> | Date | string | null
  }

  export type bor_userOrderByWithRelationInput = {
    id_auto?: SortOrder
    id?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    enabled?: SortOrderInput | SortOrder
    account_expired?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
  }

  export type bor_userWhereUniqueInput = Prisma.AtLeast<{
    id_auto?: number
    AND?: bor_userWhereInput | bor_userWhereInput[]
    OR?: bor_userWhereInput[]
    NOT?: bor_userWhereInput | bor_userWhereInput[]
    id?: StringNullableFilter<"bor_user"> | string | null
    username?: StringNullableFilter<"bor_user"> | string | null
    password?: StringNullableFilter<"bor_user"> | string | null
    avatar?: StringNullableFilter<"bor_user"> | string | null
    email?: StringNullableFilter<"bor_user"> | string | null
    enabled?: BoolNullableFilter<"bor_user"> | boolean | null
    account_expired?: BoolNullableFilter<"bor_user"> | boolean | null
    phone?: StringNullableFilter<"bor_user"> | string | null
    created_at?: DateTimeNullableFilter<"bor_user"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"bor_user"> | Date | string | null
  }, "id_auto">

  export type bor_userOrderByWithAggregationInput = {
    id_auto?: SortOrder
    id?: SortOrderInput | SortOrder
    username?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    enabled?: SortOrderInput | SortOrder
    account_expired?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: bor_userCountOrderByAggregateInput
    _avg?: bor_userAvgOrderByAggregateInput
    _max?: bor_userMaxOrderByAggregateInput
    _min?: bor_userMinOrderByAggregateInput
    _sum?: bor_userSumOrderByAggregateInput
  }

  export type bor_userScalarWhereWithAggregatesInput = {
    AND?: bor_userScalarWhereWithAggregatesInput | bor_userScalarWhereWithAggregatesInput[]
    OR?: bor_userScalarWhereWithAggregatesInput[]
    NOT?: bor_userScalarWhereWithAggregatesInput | bor_userScalarWhereWithAggregatesInput[]
    id_auto?: IntWithAggregatesFilter<"bor_user"> | number
    id?: StringNullableWithAggregatesFilter<"bor_user"> | string | null
    username?: StringNullableWithAggregatesFilter<"bor_user"> | string | null
    password?: StringNullableWithAggregatesFilter<"bor_user"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"bor_user"> | string | null
    email?: StringNullableWithAggregatesFilter<"bor_user"> | string | null
    enabled?: BoolNullableWithAggregatesFilter<"bor_user"> | boolean | null
    account_expired?: BoolNullableWithAggregatesFilter<"bor_user"> | boolean | null
    phone?: StringNullableWithAggregatesFilter<"bor_user"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"bor_user"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"bor_user"> | Date | string | null
  }

  export type bor_configCreateInput = {
    key?: string | null
    value?: string | null
  }

  export type bor_configUncheckedCreateInput = {
    id_auto?: number
    key?: string | null
    value?: string | null
  }

  export type bor_configUpdateInput = {
    key?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_configUncheckedUpdateInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    key?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_configCreateManyInput = {
    id_auto?: number
    key?: string | null
    value?: string | null
  }

  export type bor_configUpdateManyMutationInput = {
    key?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_configUncheckedUpdateManyInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    key?: NullableStringFieldUpdateOperationsInput | string | null
    value?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_leetcode_question_topic_tagsCreateInput = {
    question_id?: string | null
    tag_id?: string | null
  }

  export type bor_leetcode_question_topic_tagsUncheckedCreateInput = {
    question_id?: string | null
    tag_id?: string | null
    id_auto?: number
  }

  export type bor_leetcode_question_topic_tagsUpdateInput = {
    question_id?: NullableStringFieldUpdateOperationsInput | string | null
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_leetcode_question_topic_tagsUncheckedUpdateInput = {
    question_id?: NullableStringFieldUpdateOperationsInput | string | null
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
    id_auto?: IntFieldUpdateOperationsInput | number
  }

  export type bor_leetcode_question_topic_tagsCreateManyInput = {
    question_id?: string | null
    tag_id?: string | null
    id_auto?: number
  }

  export type bor_leetcode_question_topic_tagsUpdateManyMutationInput = {
    question_id?: NullableStringFieldUpdateOperationsInput | string | null
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_leetcode_question_topic_tagsUncheckedUpdateManyInput = {
    question_id?: NullableStringFieldUpdateOperationsInput | string | null
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
    id_auto?: IntFieldUpdateOperationsInput | number
  }

  export type bor_leetcode_questionsCreateInput = {
    id?: string | null
    ac_rate?: number | null
    difficulty?: string | null
    question_frontend_id?: string | null
    is_paid_only?: boolean | null
    title?: string | null
    title_slug?: string | null
    status?: number | null
    title_cn?: string | null
    finished_at?: Date | string | null
    start_at?: Date | string | null
  }

  export type bor_leetcode_questionsUncheckedCreateInput = {
    id_auto?: number
    id?: string | null
    ac_rate?: number | null
    difficulty?: string | null
    question_frontend_id?: string | null
    is_paid_only?: boolean | null
    title?: string | null
    title_slug?: string | null
    status?: number | null
    title_cn?: string | null
    finished_at?: Date | string | null
    start_at?: Date | string | null
  }

  export type bor_leetcode_questionsUpdateInput = {
    id?: NullableStringFieldUpdateOperationsInput | string | null
    ac_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    question_frontend_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_paid_only?: NullableBoolFieldUpdateOperationsInput | boolean | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    title_slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    title_cn?: NullableStringFieldUpdateOperationsInput | string | null
    finished_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bor_leetcode_questionsUncheckedUpdateInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    id?: NullableStringFieldUpdateOperationsInput | string | null
    ac_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    question_frontend_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_paid_only?: NullableBoolFieldUpdateOperationsInput | boolean | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    title_slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    title_cn?: NullableStringFieldUpdateOperationsInput | string | null
    finished_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bor_leetcode_questionsCreateManyInput = {
    id_auto?: number
    id?: string | null
    ac_rate?: number | null
    difficulty?: string | null
    question_frontend_id?: string | null
    is_paid_only?: boolean | null
    title?: string | null
    title_slug?: string | null
    status?: number | null
    title_cn?: string | null
    finished_at?: Date | string | null
    start_at?: Date | string | null
  }

  export type bor_leetcode_questionsUpdateManyMutationInput = {
    id?: NullableStringFieldUpdateOperationsInput | string | null
    ac_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    question_frontend_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_paid_only?: NullableBoolFieldUpdateOperationsInput | boolean | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    title_slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    title_cn?: NullableStringFieldUpdateOperationsInput | string | null
    finished_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bor_leetcode_questionsUncheckedUpdateManyInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    id?: NullableStringFieldUpdateOperationsInput | string | null
    ac_rate?: NullableFloatFieldUpdateOperationsInput | number | null
    difficulty?: NullableStringFieldUpdateOperationsInput | string | null
    question_frontend_id?: NullableStringFieldUpdateOperationsInput | string | null
    is_paid_only?: NullableBoolFieldUpdateOperationsInput | boolean | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    title_slug?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableIntFieldUpdateOperationsInput | number | null
    title_cn?: NullableStringFieldUpdateOperationsInput | string | null
    finished_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    start_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bor_leetcode_topic_tagsCreateInput = {
    tag_id?: string | null
    name?: string | null
    slug?: string | null
    id?: string | null
  }

  export type bor_leetcode_topic_tagsUncheckedCreateInput = {
    id_auto?: number
    tag_id?: string | null
    name?: string | null
    slug?: string | null
    id?: string | null
  }

  export type bor_leetcode_topic_tagsUpdateInput = {
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_leetcode_topic_tagsUncheckedUpdateInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_leetcode_topic_tagsCreateManyInput = {
    id_auto?: number
    tag_id?: string | null
    name?: string | null
    slug?: string | null
    id?: string | null
  }

  export type bor_leetcode_topic_tagsUpdateManyMutationInput = {
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_leetcode_topic_tagsUncheckedUpdateManyInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    tag_id?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type bor_userCreateInput = {
    id?: string | null
    username?: string | null
    password?: string | null
    avatar?: string | null
    email?: string | null
    enabled?: boolean | null
    account_expired?: boolean | null
    phone?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type bor_userUncheckedCreateInput = {
    id_auto?: number
    id?: string | null
    username?: string | null
    password?: string | null
    avatar?: string | null
    email?: string | null
    enabled?: boolean | null
    account_expired?: boolean | null
    phone?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type bor_userUpdateInput = {
    id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    account_expired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bor_userUncheckedUpdateInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    account_expired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bor_userCreateManyInput = {
    id_auto?: number
    id?: string | null
    username?: string | null
    password?: string | null
    avatar?: string | null
    email?: string | null
    enabled?: boolean | null
    account_expired?: boolean | null
    phone?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type bor_userUpdateManyMutationInput = {
    id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    account_expired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type bor_userUncheckedUpdateManyInput = {
    id_auto?: IntFieldUpdateOperationsInput | number
    id?: NullableStringFieldUpdateOperationsInput | string | null
    username?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    enabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    account_expired?: NullableBoolFieldUpdateOperationsInput | boolean | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type bor_configCountOrderByAggregateInput = {
    id_auto?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type bor_configAvgOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type bor_configMaxOrderByAggregateInput = {
    id_auto?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type bor_configMinOrderByAggregateInput = {
    id_auto?: SortOrder
    key?: SortOrder
    value?: SortOrder
  }

  export type bor_configSumOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type bor_leetcode_question_topic_tagsCountOrderByAggregateInput = {
    question_id?: SortOrder
    tag_id?: SortOrder
    id_auto?: SortOrder
  }

  export type bor_leetcode_question_topic_tagsAvgOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type bor_leetcode_question_topic_tagsMaxOrderByAggregateInput = {
    question_id?: SortOrder
    tag_id?: SortOrder
    id_auto?: SortOrder
  }

  export type bor_leetcode_question_topic_tagsMinOrderByAggregateInput = {
    question_id?: SortOrder
    tag_id?: SortOrder
    id_auto?: SortOrder
  }

  export type bor_leetcode_question_topic_tagsSumOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type bor_leetcode_questionsCountOrderByAggregateInput = {
    id_auto?: SortOrder
    id?: SortOrder
    ac_rate?: SortOrder
    difficulty?: SortOrder
    question_frontend_id?: SortOrder
    is_paid_only?: SortOrder
    title?: SortOrder
    title_slug?: SortOrder
    status?: SortOrder
    title_cn?: SortOrder
    finished_at?: SortOrder
    start_at?: SortOrder
  }

  export type bor_leetcode_questionsAvgOrderByAggregateInput = {
    id_auto?: SortOrder
    ac_rate?: SortOrder
    status?: SortOrder
  }

  export type bor_leetcode_questionsMaxOrderByAggregateInput = {
    id_auto?: SortOrder
    id?: SortOrder
    ac_rate?: SortOrder
    difficulty?: SortOrder
    question_frontend_id?: SortOrder
    is_paid_only?: SortOrder
    title?: SortOrder
    title_slug?: SortOrder
    status?: SortOrder
    title_cn?: SortOrder
    finished_at?: SortOrder
    start_at?: SortOrder
  }

  export type bor_leetcode_questionsMinOrderByAggregateInput = {
    id_auto?: SortOrder
    id?: SortOrder
    ac_rate?: SortOrder
    difficulty?: SortOrder
    question_frontend_id?: SortOrder
    is_paid_only?: SortOrder
    title?: SortOrder
    title_slug?: SortOrder
    status?: SortOrder
    title_cn?: SortOrder
    finished_at?: SortOrder
    start_at?: SortOrder
  }

  export type bor_leetcode_questionsSumOrderByAggregateInput = {
    id_auto?: SortOrder
    ac_rate?: SortOrder
    status?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type bor_leetcode_topic_tagsCountOrderByAggregateInput = {
    id_auto?: SortOrder
    tag_id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    id?: SortOrder
  }

  export type bor_leetcode_topic_tagsAvgOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type bor_leetcode_topic_tagsMaxOrderByAggregateInput = {
    id_auto?: SortOrder
    tag_id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    id?: SortOrder
  }

  export type bor_leetcode_topic_tagsMinOrderByAggregateInput = {
    id_auto?: SortOrder
    tag_id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    id?: SortOrder
  }

  export type bor_leetcode_topic_tagsSumOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type bor_userCountOrderByAggregateInput = {
    id_auto?: SortOrder
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    enabled?: SortOrder
    account_expired?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type bor_userAvgOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type bor_userMaxOrderByAggregateInput = {
    id_auto?: SortOrder
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    enabled?: SortOrder
    account_expired?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type bor_userMinOrderByAggregateInput = {
    id_auto?: SortOrder
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    enabled?: SortOrder
    account_expired?: SortOrder
    phone?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type bor_userSumOrderByAggregateInput = {
    id_auto?: SortOrder
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use bor_configDefaultArgs instead
     */
    export type bor_configArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = bor_configDefaultArgs<ExtArgs>
    /**
     * @deprecated Use bor_leetcode_question_topic_tagsDefaultArgs instead
     */
    export type bor_leetcode_question_topic_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = bor_leetcode_question_topic_tagsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use bor_leetcode_questionsDefaultArgs instead
     */
    export type bor_leetcode_questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = bor_leetcode_questionsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use bor_leetcode_topic_tagsDefaultArgs instead
     */
    export type bor_leetcode_topic_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = bor_leetcode_topic_tagsDefaultArgs<ExtArgs>
    /**
     * @deprecated Use bor_userDefaultArgs instead
     */
    export type bor_userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = bor_userDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}