
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model PatientVisit
 * 
 */
export type PatientVisit = $Result.DefaultSelection<Prisma.$PatientVisitPayload>
/**
 * Model Assessment
 * 
 */
export type Assessment = $Result.DefaultSelection<Prisma.$AssessmentPayload>
/**
 * Model Treatment
 * 
 */
export type Treatment = $Result.DefaultSelection<Prisma.$TreatmentPayload>
/**
 * Model FollowUp
 * 
 */
export type FollowUp = $Result.DefaultSelection<Prisma.$FollowUpPayload>
/**
 * Model MedicalRecord
 * 
 */
export type MedicalRecord = $Result.DefaultSelection<Prisma.$MedicalRecordPayload>
/**
 * Model Doctor
 * 
 */
export type Doctor = $Result.DefaultSelection<Prisma.$DoctorPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model MedicineType
 * 
 */
export type MedicineType = $Result.DefaultSelection<Prisma.$MedicineTypePayload>
/**
 * Model MedicineBatch
 * 
 */
export type MedicineBatch = $Result.DefaultSelection<Prisma.$MedicineBatchPayload>
/**
 * Model Prescription
 * 
 */
export type Prescription = $Result.DefaultSelection<Prisma.$PrescriptionPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TreatmentStatus: {
  PENDING: 'PENDING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type TreatmentStatus = (typeof TreatmentStatus)[keyof typeof TreatmentStatus]

}

export type TreatmentStatus = $Enums.TreatmentStatus

export const TreatmentStatus: typeof $Enums.TreatmentStatus

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
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patientVisit`: Exposes CRUD operations for the **PatientVisit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PatientVisits
    * const patientVisits = await prisma.patientVisit.findMany()
    * ```
    */
  get patientVisit(): Prisma.PatientVisitDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.assessment`: Exposes CRUD operations for the **Assessment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Assessments
    * const assessments = await prisma.assessment.findMany()
    * ```
    */
  get assessment(): Prisma.AssessmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.treatment`: Exposes CRUD operations for the **Treatment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Treatments
    * const treatments = await prisma.treatment.findMany()
    * ```
    */
  get treatment(): Prisma.TreatmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.followUp`: Exposes CRUD operations for the **FollowUp** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FollowUps
    * const followUps = await prisma.followUp.findMany()
    * ```
    */
  get followUp(): Prisma.FollowUpDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicalRecord`: Exposes CRUD operations for the **MedicalRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicalRecords
    * const medicalRecords = await prisma.medicalRecord.findMany()
    * ```
    */
  get medicalRecord(): Prisma.MedicalRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctor`: Exposes CRUD operations for the **Doctor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Doctors
    * const doctors = await prisma.doctor.findMany()
    * ```
    */
  get doctor(): Prisma.DoctorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicineType`: Exposes CRUD operations for the **MedicineType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicineTypes
    * const medicineTypes = await prisma.medicineType.findMany()
    * ```
    */
  get medicineType(): Prisma.MedicineTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.medicineBatch`: Exposes CRUD operations for the **MedicineBatch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MedicineBatches
    * const medicineBatches = await prisma.medicineBatch.findMany()
    * ```
    */
  get medicineBatch(): Prisma.MedicineBatchDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prescription`: Exposes CRUD operations for the **Prescription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prescriptions
    * const prescriptions = await prisma.prescription.findMany()
    * ```
    */
  get prescription(): Prisma.PrescriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.19.0
   * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    Patient: 'Patient',
    PatientVisit: 'PatientVisit',
    Assessment: 'Assessment',
    Treatment: 'Treatment',
    FollowUp: 'FollowUp',
    MedicalRecord: 'MedicalRecord',
    Doctor: 'Doctor',
    Appointment: 'Appointment',
    MedicineType: 'MedicineType',
    MedicineBatch: 'MedicineBatch',
    Prescription: 'Prescription',
    Post: 'Post'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "patient" | "patientVisit" | "assessment" | "treatment" | "followUp" | "medicalRecord" | "doctor" | "appointment" | "medicineType" | "medicineBatch" | "prescription" | "post"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      PatientVisit: {
        payload: Prisma.$PatientVisitPayload<ExtArgs>
        fields: Prisma.PatientVisitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientVisitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientVisitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>
          }
          findFirst: {
            args: Prisma.PatientVisitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientVisitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>
          }
          findMany: {
            args: Prisma.PatientVisitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>[]
          }
          create: {
            args: Prisma.PatientVisitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>
          }
          createMany: {
            args: Prisma.PatientVisitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientVisitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>[]
          }
          delete: {
            args: Prisma.PatientVisitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>
          }
          update: {
            args: Prisma.PatientVisitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>
          }
          deleteMany: {
            args: Prisma.PatientVisitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientVisitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientVisitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>[]
          }
          upsert: {
            args: Prisma.PatientVisitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientVisitPayload>
          }
          aggregate: {
            args: Prisma.PatientVisitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatientVisit>
          }
          groupBy: {
            args: Prisma.PatientVisitGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientVisitGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientVisitCountArgs<ExtArgs>
            result: $Utils.Optional<PatientVisitCountAggregateOutputType> | number
          }
        }
      }
      Assessment: {
        payload: Prisma.$AssessmentPayload<ExtArgs>
        fields: Prisma.AssessmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AssessmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AssessmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findFirst: {
            args: Prisma.AssessmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AssessmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          findMany: {
            args: Prisma.AssessmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          create: {
            args: Prisma.AssessmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          createMany: {
            args: Prisma.AssessmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AssessmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          delete: {
            args: Prisma.AssessmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          update: {
            args: Prisma.AssessmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          deleteMany: {
            args: Prisma.AssessmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AssessmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AssessmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>[]
          }
          upsert: {
            args: Prisma.AssessmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AssessmentPayload>
          }
          aggregate: {
            args: Prisma.AssessmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAssessment>
          }
          groupBy: {
            args: Prisma.AssessmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AssessmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AssessmentCountArgs<ExtArgs>
            result: $Utils.Optional<AssessmentCountAggregateOutputType> | number
          }
        }
      }
      Treatment: {
        payload: Prisma.$TreatmentPayload<ExtArgs>
        fields: Prisma.TreatmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TreatmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TreatmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          findFirst: {
            args: Prisma.TreatmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TreatmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          findMany: {
            args: Prisma.TreatmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          create: {
            args: Prisma.TreatmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          createMany: {
            args: Prisma.TreatmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TreatmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          delete: {
            args: Prisma.TreatmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          update: {
            args: Prisma.TreatmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          deleteMany: {
            args: Prisma.TreatmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TreatmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TreatmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>[]
          }
          upsert: {
            args: Prisma.TreatmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TreatmentPayload>
          }
          aggregate: {
            args: Prisma.TreatmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTreatment>
          }
          groupBy: {
            args: Prisma.TreatmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TreatmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TreatmentCountArgs<ExtArgs>
            result: $Utils.Optional<TreatmentCountAggregateOutputType> | number
          }
        }
      }
      FollowUp: {
        payload: Prisma.$FollowUpPayload<ExtArgs>
        fields: Prisma.FollowUpFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowUpFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowUpFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>
          }
          findFirst: {
            args: Prisma.FollowUpFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowUpFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>
          }
          findMany: {
            args: Prisma.FollowUpFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>[]
          }
          create: {
            args: Prisma.FollowUpCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>
          }
          createMany: {
            args: Prisma.FollowUpCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowUpCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>[]
          }
          delete: {
            args: Prisma.FollowUpDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>
          }
          update: {
            args: Prisma.FollowUpUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>
          }
          deleteMany: {
            args: Prisma.FollowUpDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowUpUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowUpUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>[]
          }
          upsert: {
            args: Prisma.FollowUpUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowUpPayload>
          }
          aggregate: {
            args: Prisma.FollowUpAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollowUp>
          }
          groupBy: {
            args: Prisma.FollowUpGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowUpGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowUpCountArgs<ExtArgs>
            result: $Utils.Optional<FollowUpCountAggregateOutputType> | number
          }
        }
      }
      MedicalRecord: {
        payload: Prisma.$MedicalRecordPayload<ExtArgs>
        fields: Prisma.MedicalRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicalRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicalRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          findFirst: {
            args: Prisma.MedicalRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicalRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          findMany: {
            args: Prisma.MedicalRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[]
          }
          create: {
            args: Prisma.MedicalRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          createMany: {
            args: Prisma.MedicalRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicalRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[]
          }
          delete: {
            args: Prisma.MedicalRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          update: {
            args: Prisma.MedicalRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          deleteMany: {
            args: Prisma.MedicalRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicalRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicalRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>[]
          }
          upsert: {
            args: Prisma.MedicalRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicalRecordPayload>
          }
          aggregate: {
            args: Prisma.MedicalRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalRecord>
          }
          groupBy: {
            args: Prisma.MedicalRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicalRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicalRecordCountArgs<ExtArgs>
            result: $Utils.Optional<MedicalRecordCountAggregateOutputType> | number
          }
        }
      }
      Doctor: {
        payload: Prisma.$DoctorPayload<ExtArgs>
        fields: Prisma.DoctorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findFirst: {
            args: Prisma.DoctorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          findMany: {
            args: Prisma.DoctorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          create: {
            args: Prisma.DoctorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          createMany: {
            args: Prisma.DoctorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          delete: {
            args: Prisma.DoctorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          update: {
            args: Prisma.DoctorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          deleteMany: {
            args: Prisma.DoctorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>[]
          }
          upsert: {
            args: Prisma.DoctorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPayload>
          }
          aggregate: {
            args: Prisma.DoctorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctor>
          }
          groupBy: {
            args: Prisma.DoctorGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      MedicineType: {
        payload: Prisma.$MedicineTypePayload<ExtArgs>
        fields: Prisma.MedicineTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicineTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicineTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>
          }
          findFirst: {
            args: Prisma.MedicineTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicineTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>
          }
          findMany: {
            args: Prisma.MedicineTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>[]
          }
          create: {
            args: Prisma.MedicineTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>
          }
          createMany: {
            args: Prisma.MedicineTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicineTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>[]
          }
          delete: {
            args: Prisma.MedicineTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>
          }
          update: {
            args: Prisma.MedicineTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>
          }
          deleteMany: {
            args: Prisma.MedicineTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicineTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicineTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>[]
          }
          upsert: {
            args: Prisma.MedicineTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineTypePayload>
          }
          aggregate: {
            args: Prisma.MedicineTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicineType>
          }
          groupBy: {
            args: Prisma.MedicineTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicineTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicineTypeCountArgs<ExtArgs>
            result: $Utils.Optional<MedicineTypeCountAggregateOutputType> | number
          }
        }
      }
      MedicineBatch: {
        payload: Prisma.$MedicineBatchPayload<ExtArgs>
        fields: Prisma.MedicineBatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MedicineBatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MedicineBatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>
          }
          findFirst: {
            args: Prisma.MedicineBatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MedicineBatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>
          }
          findMany: {
            args: Prisma.MedicineBatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>[]
          }
          create: {
            args: Prisma.MedicineBatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>
          }
          createMany: {
            args: Prisma.MedicineBatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MedicineBatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>[]
          }
          delete: {
            args: Prisma.MedicineBatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>
          }
          update: {
            args: Prisma.MedicineBatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>
          }
          deleteMany: {
            args: Prisma.MedicineBatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MedicineBatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MedicineBatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>[]
          }
          upsert: {
            args: Prisma.MedicineBatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MedicineBatchPayload>
          }
          aggregate: {
            args: Prisma.MedicineBatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicineBatch>
          }
          groupBy: {
            args: Prisma.MedicineBatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MedicineBatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MedicineBatchCountArgs<ExtArgs>
            result: $Utils.Optional<MedicineBatchCountAggregateOutputType> | number
          }
        }
      }
      Prescription: {
        payload: Prisma.$PrescriptionPayload<ExtArgs>
        fields: Prisma.PrescriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrescriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrescriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findFirst: {
            args: Prisma.PrescriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrescriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          findMany: {
            args: Prisma.PrescriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          create: {
            args: Prisma.PrescriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          createMany: {
            args: Prisma.PrescriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrescriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          delete: {
            args: Prisma.PrescriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          update: {
            args: Prisma.PrescriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          deleteMany: {
            args: Prisma.PrescriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrescriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrescriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>[]
          }
          upsert: {
            args: Prisma.PrescriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrescriptionPayload>
          }
          aggregate: {
            args: Prisma.PrescriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrescription>
          }
          groupBy: {
            args: Prisma.PrescriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrescriptionCountArgs<ExtArgs>
            result: $Utils.Optional<PrescriptionCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    patient?: PatientOmit
    patientVisit?: PatientVisitOmit
    assessment?: AssessmentOmit
    treatment?: TreatmentOmit
    followUp?: FollowUpOmit
    medicalRecord?: MedicalRecordOmit
    doctor?: DoctorOmit
    appointment?: AppointmentOmit
    medicineType?: MedicineTypeOmit
    medicineBatch?: MedicineBatchOmit
    prescription?: PrescriptionOmit
    post?: PostOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'updateManyAndReturn'
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
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    patientVisit: number
    assessment: number
    treatment: number
    medicalRecords: number
    appointment: number
    prescription: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patientVisit?: boolean | PatientCountOutputTypeCountPatientVisitArgs
    assessment?: boolean | PatientCountOutputTypeCountAssessmentArgs
    treatment?: boolean | PatientCountOutputTypeCountTreatmentArgs
    medicalRecords?: boolean | PatientCountOutputTypeCountMedicalRecordsArgs
    appointment?: boolean | PatientCountOutputTypeCountAppointmentArgs
    prescription?: boolean | PatientCountOutputTypeCountPrescriptionArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPatientVisitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientVisitWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAssessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountTreatmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreatmentWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountMedicalRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalRecordWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountAppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountPrescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }


  /**
   * Count Type PatientVisitCountOutputType
   */

  export type PatientVisitCountOutputType = {
    treatment: number
  }

  export type PatientVisitCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    treatment?: boolean | PatientVisitCountOutputTypeCountTreatmentArgs
  }

  // Custom InputTypes
  /**
   * PatientVisitCountOutputType without action
   */
  export type PatientVisitCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisitCountOutputType
     */
    select?: PatientVisitCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientVisitCountOutputType without action
   */
  export type PatientVisitCountOutputTypeCountTreatmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreatmentWhereInput
  }


  /**
   * Count Type AssessmentCountOutputType
   */

  export type AssessmentCountOutputType = {
    treatment: number
  }

  export type AssessmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    treatment?: boolean | AssessmentCountOutputTypeCountTreatmentArgs
  }

  // Custom InputTypes
  /**
   * AssessmentCountOutputType without action
   */
  export type AssessmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AssessmentCountOutputType
     */
    select?: AssessmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AssessmentCountOutputType without action
   */
  export type AssessmentCountOutputTypeCountTreatmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreatmentWhereInput
  }


  /**
   * Count Type TreatmentCountOutputType
   */

  export type TreatmentCountOutputType = {
    followUps: number
  }

  export type TreatmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    followUps?: boolean | TreatmentCountOutputTypeCountFollowUpsArgs
  }

  // Custom InputTypes
  /**
   * TreatmentCountOutputType without action
   */
  export type TreatmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TreatmentCountOutputType
     */
    select?: TreatmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TreatmentCountOutputType without action
   */
  export type TreatmentCountOutputTypeCountFollowUpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowUpWhereInput
  }


  /**
   * Count Type DoctorCountOutputType
   */

  export type DoctorCountOutputType = {
    appointment: number
    prescription: number
  }

  export type DoctorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointment?: boolean | DoctorCountOutputTypeCountAppointmentArgs
    prescription?: boolean | DoctorCountOutputTypeCountPrescriptionArgs
  }

  // Custom InputTypes
  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorCountOutputType
     */
    select?: DoctorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountAppointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * DoctorCountOutputType without action
   */
  export type DoctorCountOutputTypeCountPrescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }


  /**
   * Count Type MedicineTypeCountOutputType
   */

  export type MedicineTypeCountOutputType = {
    medicineBatch: number
    prescription: number
  }

  export type MedicineTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicineBatch?: boolean | MedicineTypeCountOutputTypeCountMedicineBatchArgs
    prescription?: boolean | MedicineTypeCountOutputTypeCountPrescriptionArgs
  }

  // Custom InputTypes
  /**
   * MedicineTypeCountOutputType without action
   */
  export type MedicineTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineTypeCountOutputType
     */
    select?: MedicineTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MedicineTypeCountOutputType without action
   */
  export type MedicineTypeCountOutputTypeCountMedicineBatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicineBatchWhereInput
  }

  /**
   * MedicineTypeCountOutputType without action
   */
  export type MedicineTypeCountOutputTypeCountPrescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    role: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    role: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    role: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    role?: boolean
    patient?: boolean | User$patientArgs<ExtArgs>
    doctor?: boolean | User$doctorArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | User$patientArgs<ExtArgs>
    doctor?: boolean | User$doctorArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs> | null
      doctor: Prisma.$DoctorPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      role: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    >

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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends User$patientArgs<ExtArgs> = {}>(args?: Subset<T, User$patientArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    doctor<T extends User$doctorArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.patient
   */
  export type User$patientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    where?: PatientWhereInput
  }

  /**
   * User.doctor
   */
  export type User$doctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    where?: DoctorWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archived: boolean | null
    userId: string | null
    name: string | null
    gender: string | null
    dateOfBirth: Date | null
    city: string | null
    barangay: string | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archived: boolean | null
    userId: string | null
    name: string | null
    gender: string | null
    dateOfBirth: Date | null
    city: string | null
    barangay: string | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    archived: number
    userId: number
    name: number
    gender: number
    dateOfBirth: number
    city: number
    barangay: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    userId?: true
    name?: true
    gender?: true
    dateOfBirth?: true
    city?: true
    barangay?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    userId?: true
    name?: true
    gender?: true
    dateOfBirth?: true
    city?: true
    barangay?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    userId?: true
    name?: true
    gender?: true
    dateOfBirth?: true
    city?: true
    barangay?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    archived: boolean
    userId: string | null
    name: string
    gender: string | null
    dateOfBirth: Date | null
    city: string | null
    barangay: string | null
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    name?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    city?: boolean
    barangay?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
    patientVisit?: boolean | Patient$patientVisitArgs<ExtArgs>
    assessment?: boolean | Patient$assessmentArgs<ExtArgs>
    treatment?: boolean | Patient$treatmentArgs<ExtArgs>
    medicalRecords?: boolean | Patient$medicalRecordsArgs<ExtArgs>
    appointment?: boolean | Patient$appointmentArgs<ExtArgs>
    prescription?: boolean | Patient$prescriptionArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    name?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    city?: boolean
    barangay?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    name?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    city?: boolean
    barangay?: boolean
    user?: boolean | Patient$userArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    name?: boolean
    gender?: boolean
    dateOfBirth?: boolean
    city?: boolean
    barangay?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "archived" | "userId" | "name" | "gender" | "dateOfBirth" | "city" | "barangay", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
    patientVisit?: boolean | Patient$patientVisitArgs<ExtArgs>
    assessment?: boolean | Patient$assessmentArgs<ExtArgs>
    treatment?: boolean | Patient$treatmentArgs<ExtArgs>
    medicalRecords?: boolean | Patient$medicalRecordsArgs<ExtArgs>
    appointment?: boolean | Patient$appointmentArgs<ExtArgs>
    prescription?: boolean | Patient$prescriptionArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
  }
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Patient$userArgs<ExtArgs>
  }

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      patientVisit: Prisma.$PatientVisitPayload<ExtArgs>[]
      assessment: Prisma.$AssessmentPayload<ExtArgs>[]
      treatment: Prisma.$TreatmentPayload<ExtArgs>[]
      medicalRecords: Prisma.$MedicalRecordPayload<ExtArgs>[]
      appointment: Prisma.$AppointmentPayload<ExtArgs>[]
      prescription: Prisma.$PrescriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      archived: boolean
      userId: string | null
      name: string
      gender: string | null
      dateOfBirth: Date | null
      city: string | null
      barangay: string | null
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
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
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Patient$userArgs<ExtArgs> = {}>(args?: Subset<T, Patient$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    patientVisit<T extends Patient$patientVisitArgs<ExtArgs> = {}>(args?: Subset<T, Patient$patientVisitArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assessment<T extends Patient$assessmentArgs<ExtArgs> = {}>(args?: Subset<T, Patient$assessmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    treatment<T extends Patient$treatmentArgs<ExtArgs> = {}>(args?: Subset<T, Patient$treatmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalRecords<T extends Patient$medicalRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$medicalRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointment<T extends Patient$appointmentArgs<ExtArgs> = {}>(args?: Subset<T, Patient$appointmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    prescription<T extends Patient$prescriptionArgs<ExtArgs> = {}>(args?: Subset<T, Patient$prescriptionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
    readonly archived: FieldRef<"Patient", 'Boolean'>
    readonly userId: FieldRef<"Patient", 'String'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly gender: FieldRef<"Patient", 'String'>
    readonly dateOfBirth: FieldRef<"Patient", 'DateTime'>
    readonly city: FieldRef<"Patient", 'String'>
    readonly barangay: FieldRef<"Patient", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.user
   */
  export type Patient$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Patient.patientVisit
   */
  export type Patient$patientVisitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    where?: PatientVisitWhereInput
    orderBy?: PatientVisitOrderByWithRelationInput | PatientVisitOrderByWithRelationInput[]
    cursor?: PatientVisitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PatientVisitScalarFieldEnum | PatientVisitScalarFieldEnum[]
  }

  /**
   * Patient.assessment
   */
  export type Patient$assessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    cursor?: AssessmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Patient.treatment
   */
  export type Patient$treatmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    where?: TreatmentWhereInput
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    cursor?: TreatmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Patient.medicalRecords
   */
  export type Patient$medicalRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    where?: MedicalRecordWhereInput
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    cursor?: MedicalRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicalRecordScalarFieldEnum | MedicalRecordScalarFieldEnum[]
  }

  /**
   * Patient.appointment
   */
  export type Patient$appointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Patient.prescription
   */
  export type Patient$prescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model PatientVisit
   */

  export type AggregatePatientVisit = {
    _count: PatientVisitCountAggregateOutputType | null
    _min: PatientVisitMinAggregateOutputType | null
    _max: PatientVisitMaxAggregateOutputType | null
  }

  export type PatientVisitMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    reason: string | null
    status: string | null
    date: Date | null
  }

  export type PatientVisitMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    reason: string | null
    status: string | null
    date: Date | null
  }

  export type PatientVisitCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    patientId: number
    reason: number
    status: number
    date: number
    _all: number
  }


  export type PatientVisitMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    reason?: true
    status?: true
    date?: true
  }

  export type PatientVisitMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    reason?: true
    status?: true
    date?: true
  }

  export type PatientVisitCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    reason?: true
    status?: true
    date?: true
    _all?: true
  }

  export type PatientVisitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientVisit to aggregate.
     */
    where?: PatientVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientVisits to fetch.
     */
    orderBy?: PatientVisitOrderByWithRelationInput | PatientVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PatientVisits
    **/
    _count?: true | PatientVisitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientVisitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientVisitMaxAggregateInputType
  }

  export type GetPatientVisitAggregateType<T extends PatientVisitAggregateArgs> = {
        [P in keyof T & keyof AggregatePatientVisit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatientVisit[P]>
      : GetScalarType<T[P], AggregatePatientVisit[P]>
  }




  export type PatientVisitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientVisitWhereInput
    orderBy?: PatientVisitOrderByWithAggregationInput | PatientVisitOrderByWithAggregationInput[]
    by: PatientVisitScalarFieldEnum[] | PatientVisitScalarFieldEnum
    having?: PatientVisitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientVisitCountAggregateInputType | true
    _min?: PatientVisitMinAggregateInputType
    _max?: PatientVisitMaxAggregateInputType
  }

  export type PatientVisitGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    patientId: string
    reason: string
    status: string
    date: Date
    _count: PatientVisitCountAggregateOutputType | null
    _min: PatientVisitMinAggregateOutputType | null
    _max: PatientVisitMaxAggregateOutputType | null
  }

  type GetPatientVisitGroupByPayload<T extends PatientVisitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientVisitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientVisitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientVisitGroupByOutputType[P]>
            : GetScalarType<T[P], PatientVisitGroupByOutputType[P]>
        }
      >
    >


  export type PatientVisitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    reason?: boolean
    status?: boolean
    date?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    treatment?: boolean | PatientVisit$treatmentArgs<ExtArgs>
    _count?: boolean | PatientVisitCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientVisit"]>

  export type PatientVisitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    reason?: boolean
    status?: boolean
    date?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientVisit"]>

  export type PatientVisitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    reason?: boolean
    status?: boolean
    date?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patientVisit"]>

  export type PatientVisitSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    reason?: boolean
    status?: boolean
    date?: boolean
  }

  export type PatientVisitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "patientId" | "reason" | "status" | "date", ExtArgs["result"]["patientVisit"]>
  export type PatientVisitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    treatment?: boolean | PatientVisit$treatmentArgs<ExtArgs>
    _count?: boolean | PatientVisitCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientVisitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type PatientVisitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $PatientVisitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PatientVisit"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      treatment: Prisma.$TreatmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      patientId: string
      reason: string
      status: string
      date: Date
    }, ExtArgs["result"]["patientVisit"]>
    composites: {}
  }

  type PatientVisitGetPayload<S extends boolean | null | undefined | PatientVisitDefaultArgs> = $Result.GetResult<Prisma.$PatientVisitPayload, S>

  type PatientVisitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientVisitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientVisitCountAggregateInputType | true
    }

  export interface PatientVisitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PatientVisit'], meta: { name: 'PatientVisit' } }
    /**
     * Find zero or one PatientVisit that matches the filter.
     * @param {PatientVisitFindUniqueArgs} args - Arguments to find a PatientVisit
     * @example
     * // Get one PatientVisit
     * const patientVisit = await prisma.patientVisit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientVisitFindUniqueArgs>(args: SelectSubset<T, PatientVisitFindUniqueArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PatientVisit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientVisitFindUniqueOrThrowArgs} args - Arguments to find a PatientVisit
     * @example
     * // Get one PatientVisit
     * const patientVisit = await prisma.patientVisit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientVisitFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientVisitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientVisit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientVisitFindFirstArgs} args - Arguments to find a PatientVisit
     * @example
     * // Get one PatientVisit
     * const patientVisit = await prisma.patientVisit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientVisitFindFirstArgs>(args?: SelectSubset<T, PatientVisitFindFirstArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PatientVisit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientVisitFindFirstOrThrowArgs} args - Arguments to find a PatientVisit
     * @example
     * // Get one PatientVisit
     * const patientVisit = await prisma.patientVisit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientVisitFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientVisitFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PatientVisits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientVisitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PatientVisits
     * const patientVisits = await prisma.patientVisit.findMany()
     * 
     * // Get first 10 PatientVisits
     * const patientVisits = await prisma.patientVisit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientVisitWithIdOnly = await prisma.patientVisit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientVisitFindManyArgs>(args?: SelectSubset<T, PatientVisitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PatientVisit.
     * @param {PatientVisitCreateArgs} args - Arguments to create a PatientVisit.
     * @example
     * // Create one PatientVisit
     * const PatientVisit = await prisma.patientVisit.create({
     *   data: {
     *     // ... data to create a PatientVisit
     *   }
     * })
     * 
     */
    create<T extends PatientVisitCreateArgs>(args: SelectSubset<T, PatientVisitCreateArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PatientVisits.
     * @param {PatientVisitCreateManyArgs} args - Arguments to create many PatientVisits.
     * @example
     * // Create many PatientVisits
     * const patientVisit = await prisma.patientVisit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientVisitCreateManyArgs>(args?: SelectSubset<T, PatientVisitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PatientVisits and returns the data saved in the database.
     * @param {PatientVisitCreateManyAndReturnArgs} args - Arguments to create many PatientVisits.
     * @example
     * // Create many PatientVisits
     * const patientVisit = await prisma.patientVisit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PatientVisits and only return the `id`
     * const patientVisitWithIdOnly = await prisma.patientVisit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientVisitCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientVisitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PatientVisit.
     * @param {PatientVisitDeleteArgs} args - Arguments to delete one PatientVisit.
     * @example
     * // Delete one PatientVisit
     * const PatientVisit = await prisma.patientVisit.delete({
     *   where: {
     *     // ... filter to delete one PatientVisit
     *   }
     * })
     * 
     */
    delete<T extends PatientVisitDeleteArgs>(args: SelectSubset<T, PatientVisitDeleteArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PatientVisit.
     * @param {PatientVisitUpdateArgs} args - Arguments to update one PatientVisit.
     * @example
     * // Update one PatientVisit
     * const patientVisit = await prisma.patientVisit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientVisitUpdateArgs>(args: SelectSubset<T, PatientVisitUpdateArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PatientVisits.
     * @param {PatientVisitDeleteManyArgs} args - Arguments to filter PatientVisits to delete.
     * @example
     * // Delete a few PatientVisits
     * const { count } = await prisma.patientVisit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientVisitDeleteManyArgs>(args?: SelectSubset<T, PatientVisitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientVisitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PatientVisits
     * const patientVisit = await prisma.patientVisit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientVisitUpdateManyArgs>(args: SelectSubset<T, PatientVisitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PatientVisits and returns the data updated in the database.
     * @param {PatientVisitUpdateManyAndReturnArgs} args - Arguments to update many PatientVisits.
     * @example
     * // Update many PatientVisits
     * const patientVisit = await prisma.patientVisit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PatientVisits and only return the `id`
     * const patientVisitWithIdOnly = await prisma.patientVisit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientVisitUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientVisitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PatientVisit.
     * @param {PatientVisitUpsertArgs} args - Arguments to update or create a PatientVisit.
     * @example
     * // Update or create a PatientVisit
     * const patientVisit = await prisma.patientVisit.upsert({
     *   create: {
     *     // ... data to create a PatientVisit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PatientVisit we want to update
     *   }
     * })
     */
    upsert<T extends PatientVisitUpsertArgs>(args: SelectSubset<T, PatientVisitUpsertArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PatientVisits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientVisitCountArgs} args - Arguments to filter PatientVisits to count.
     * @example
     * // Count the number of PatientVisits
     * const count = await prisma.patientVisit.count({
     *   where: {
     *     // ... the filter for the PatientVisits we want to count
     *   }
     * })
    **/
    count<T extends PatientVisitCountArgs>(
      args?: Subset<T, PatientVisitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientVisitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PatientVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientVisitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PatientVisitAggregateArgs>(args: Subset<T, PatientVisitAggregateArgs>): Prisma.PrismaPromise<GetPatientVisitAggregateType<T>>

    /**
     * Group by PatientVisit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientVisitGroupByArgs} args - Group by arguments.
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
      T extends PatientVisitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientVisitGroupByArgs['orderBy'] }
        : { orderBy?: PatientVisitGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PatientVisitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientVisitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PatientVisit model
   */
  readonly fields: PatientVisitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PatientVisit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientVisitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    treatment<T extends PatientVisit$treatmentArgs<ExtArgs> = {}>(args?: Subset<T, PatientVisit$treatmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PatientVisit model
   */
  interface PatientVisitFieldRefs {
    readonly id: FieldRef<"PatientVisit", 'String'>
    readonly createdAt: FieldRef<"PatientVisit", 'DateTime'>
    readonly updatedAt: FieldRef<"PatientVisit", 'DateTime'>
    readonly patientId: FieldRef<"PatientVisit", 'String'>
    readonly reason: FieldRef<"PatientVisit", 'String'>
    readonly status: FieldRef<"PatientVisit", 'String'>
    readonly date: FieldRef<"PatientVisit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PatientVisit findUnique
   */
  export type PatientVisitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * Filter, which PatientVisit to fetch.
     */
    where: PatientVisitWhereUniqueInput
  }

  /**
   * PatientVisit findUniqueOrThrow
   */
  export type PatientVisitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * Filter, which PatientVisit to fetch.
     */
    where: PatientVisitWhereUniqueInput
  }

  /**
   * PatientVisit findFirst
   */
  export type PatientVisitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * Filter, which PatientVisit to fetch.
     */
    where?: PatientVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientVisits to fetch.
     */
    orderBy?: PatientVisitOrderByWithRelationInput | PatientVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientVisits.
     */
    cursor?: PatientVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientVisits.
     */
    distinct?: PatientVisitScalarFieldEnum | PatientVisitScalarFieldEnum[]
  }

  /**
   * PatientVisit findFirstOrThrow
   */
  export type PatientVisitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * Filter, which PatientVisit to fetch.
     */
    where?: PatientVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientVisits to fetch.
     */
    orderBy?: PatientVisitOrderByWithRelationInput | PatientVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PatientVisits.
     */
    cursor?: PatientVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientVisits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PatientVisits.
     */
    distinct?: PatientVisitScalarFieldEnum | PatientVisitScalarFieldEnum[]
  }

  /**
   * PatientVisit findMany
   */
  export type PatientVisitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * Filter, which PatientVisits to fetch.
     */
    where?: PatientVisitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PatientVisits to fetch.
     */
    orderBy?: PatientVisitOrderByWithRelationInput | PatientVisitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PatientVisits.
     */
    cursor?: PatientVisitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PatientVisits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PatientVisits.
     */
    skip?: number
    distinct?: PatientVisitScalarFieldEnum | PatientVisitScalarFieldEnum[]
  }

  /**
   * PatientVisit create
   */
  export type PatientVisitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * The data needed to create a PatientVisit.
     */
    data: XOR<PatientVisitCreateInput, PatientVisitUncheckedCreateInput>
  }

  /**
   * PatientVisit createMany
   */
  export type PatientVisitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PatientVisits.
     */
    data: PatientVisitCreateManyInput | PatientVisitCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PatientVisit createManyAndReturn
   */
  export type PatientVisitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * The data used to create many PatientVisits.
     */
    data: PatientVisitCreateManyInput | PatientVisitCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientVisit update
   */
  export type PatientVisitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * The data needed to update a PatientVisit.
     */
    data: XOR<PatientVisitUpdateInput, PatientVisitUncheckedUpdateInput>
    /**
     * Choose, which PatientVisit to update.
     */
    where: PatientVisitWhereUniqueInput
  }

  /**
   * PatientVisit updateMany
   */
  export type PatientVisitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PatientVisits.
     */
    data: XOR<PatientVisitUpdateManyMutationInput, PatientVisitUncheckedUpdateManyInput>
    /**
     * Filter which PatientVisits to update
     */
    where?: PatientVisitWhereInput
    /**
     * Limit how many PatientVisits to update.
     */
    limit?: number
  }

  /**
   * PatientVisit updateManyAndReturn
   */
  export type PatientVisitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * The data used to update PatientVisits.
     */
    data: XOR<PatientVisitUpdateManyMutationInput, PatientVisitUncheckedUpdateManyInput>
    /**
     * Filter which PatientVisits to update
     */
    where?: PatientVisitWhereInput
    /**
     * Limit how many PatientVisits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PatientVisit upsert
   */
  export type PatientVisitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * The filter to search for the PatientVisit to update in case it exists.
     */
    where: PatientVisitWhereUniqueInput
    /**
     * In case the PatientVisit found by the `where` argument doesn't exist, create a new PatientVisit with this data.
     */
    create: XOR<PatientVisitCreateInput, PatientVisitUncheckedCreateInput>
    /**
     * In case the PatientVisit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientVisitUpdateInput, PatientVisitUncheckedUpdateInput>
  }

  /**
   * PatientVisit delete
   */
  export type PatientVisitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    /**
     * Filter which PatientVisit to delete.
     */
    where: PatientVisitWhereUniqueInput
  }

  /**
   * PatientVisit deleteMany
   */
  export type PatientVisitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PatientVisits to delete
     */
    where?: PatientVisitWhereInput
    /**
     * Limit how many PatientVisits to delete.
     */
    limit?: number
  }

  /**
   * PatientVisit.treatment
   */
  export type PatientVisit$treatmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    where?: TreatmentWhereInput
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    cursor?: TreatmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * PatientVisit without action
   */
  export type PatientVisitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
  }


  /**
   * Model Assessment
   */

  export type AggregateAssessment = {
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  export type AssessmentAvgAggregateOutputType = {
    pulseRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
    painScale: number | null
  }

  export type AssessmentSumAggregateOutputType = {
    pulseRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
    painScale: number | null
  }

  export type AssessmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    symptoms: string | null
    assessment: string | null
    diagnosis: string | null
    bloodPressure: string | null
    pulseRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
    alcoholUse: boolean | null
    smoker: boolean | null
    allergies: string | null
    painLocation: string | null
    painScale: number | null
  }

  export type AssessmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    symptoms: string | null
    assessment: string | null
    diagnosis: string | null
    bloodPressure: string | null
    pulseRate: number | null
    respiratoryRate: number | null
    oxygenSaturation: number | null
    alcoholUse: boolean | null
    smoker: boolean | null
    allergies: string | null
    painLocation: string | null
    painScale: number | null
  }

  export type AssessmentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    patientId: number
    symptoms: number
    assessment: number
    diagnosis: number
    bloodPressure: number
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation: number
    alcoholUse: number
    smoker: number
    allergies: number
    painLocation: number
    painScale: number
    _all: number
  }


  export type AssessmentAvgAggregateInputType = {
    pulseRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    painScale?: true
  }

  export type AssessmentSumAggregateInputType = {
    pulseRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    painScale?: true
  }

  export type AssessmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    symptoms?: true
    assessment?: true
    diagnosis?: true
    bloodPressure?: true
    pulseRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    alcoholUse?: true
    smoker?: true
    allergies?: true
    painLocation?: true
    painScale?: true
  }

  export type AssessmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    symptoms?: true
    assessment?: true
    diagnosis?: true
    bloodPressure?: true
    pulseRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    alcoholUse?: true
    smoker?: true
    allergies?: true
    painLocation?: true
    painScale?: true
  }

  export type AssessmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    symptoms?: true
    assessment?: true
    diagnosis?: true
    bloodPressure?: true
    pulseRate?: true
    respiratoryRate?: true
    oxygenSaturation?: true
    alcoholUse?: true
    smoker?: true
    allergies?: true
    painLocation?: true
    painScale?: true
    _all?: true
  }

  export type AssessmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessment to aggregate.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Assessments
    **/
    _count?: true | AssessmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AssessmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AssessmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AssessmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AssessmentMaxAggregateInputType
  }

  export type GetAssessmentAggregateType<T extends AssessmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAssessment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAssessment[P]>
      : GetScalarType<T[P], AggregateAssessment[P]>
  }




  export type AssessmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AssessmentWhereInput
    orderBy?: AssessmentOrderByWithAggregationInput | AssessmentOrderByWithAggregationInput[]
    by: AssessmentScalarFieldEnum[] | AssessmentScalarFieldEnum
    having?: AssessmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AssessmentCountAggregateInputType | true
    _avg?: AssessmentAvgAggregateInputType
    _sum?: AssessmentSumAggregateInputType
    _min?: AssessmentMinAggregateInputType
    _max?: AssessmentMaxAggregateInputType
  }

  export type AssessmentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    patientId: string
    symptoms: string
    assessment: string | null
    diagnosis: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation: number | null
    alcoholUse: boolean
    smoker: boolean | null
    allergies: string | null
    painLocation: string | null
    painScale: number | null
    _count: AssessmentCountAggregateOutputType | null
    _avg: AssessmentAvgAggregateOutputType | null
    _sum: AssessmentSumAggregateOutputType | null
    _min: AssessmentMinAggregateOutputType | null
    _max: AssessmentMaxAggregateOutputType | null
  }

  type GetAssessmentGroupByPayload<T extends AssessmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AssessmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AssessmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
            : GetScalarType<T[P], AssessmentGroupByOutputType[P]>
        }
      >
    >


  export type AssessmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    symptoms?: boolean
    assessment?: boolean
    diagnosis?: boolean
    bloodPressure?: boolean
    pulseRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    alcoholUse?: boolean
    smoker?: boolean
    allergies?: boolean
    painLocation?: boolean
    painScale?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    treatment?: boolean | Assessment$treatmentArgs<ExtArgs>
    _count?: boolean | AssessmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    symptoms?: boolean
    assessment?: boolean
    diagnosis?: boolean
    bloodPressure?: boolean
    pulseRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    alcoholUse?: boolean
    smoker?: boolean
    allergies?: boolean
    painLocation?: boolean
    painScale?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    symptoms?: boolean
    assessment?: boolean
    diagnosis?: boolean
    bloodPressure?: boolean
    pulseRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    alcoholUse?: boolean
    smoker?: boolean
    allergies?: boolean
    painLocation?: boolean
    painScale?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["assessment"]>

  export type AssessmentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    symptoms?: boolean
    assessment?: boolean
    diagnosis?: boolean
    bloodPressure?: boolean
    pulseRate?: boolean
    respiratoryRate?: boolean
    oxygenSaturation?: boolean
    alcoholUse?: boolean
    smoker?: boolean
    allergies?: boolean
    painLocation?: boolean
    painScale?: boolean
  }

  export type AssessmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "patientId" | "symptoms" | "assessment" | "diagnosis" | "bloodPressure" | "pulseRate" | "respiratoryRate" | "oxygenSaturation" | "alcoholUse" | "smoker" | "allergies" | "painLocation" | "painScale", ExtArgs["result"]["assessment"]>
  export type AssessmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    treatment?: boolean | Assessment$treatmentArgs<ExtArgs>
    _count?: boolean | AssessmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AssessmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type AssessmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $AssessmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Assessment"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      treatment: Prisma.$TreatmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      patientId: string
      symptoms: string
      assessment: string | null
      diagnosis: string | null
      bloodPressure: string
      pulseRate: number
      respiratoryRate: number
      oxygenSaturation: number | null
      alcoholUse: boolean
      smoker: boolean | null
      allergies: string | null
      painLocation: string | null
      painScale: number | null
    }, ExtArgs["result"]["assessment"]>
    composites: {}
  }

  type AssessmentGetPayload<S extends boolean | null | undefined | AssessmentDefaultArgs> = $Result.GetResult<Prisma.$AssessmentPayload, S>

  type AssessmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AssessmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AssessmentCountAggregateInputType | true
    }

  export interface AssessmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Assessment'], meta: { name: 'Assessment' } }
    /**
     * Find zero or one Assessment that matches the filter.
     * @param {AssessmentFindUniqueArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AssessmentFindUniqueArgs>(args: SelectSubset<T, AssessmentFindUniqueArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Assessment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AssessmentFindUniqueOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AssessmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AssessmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AssessmentFindFirstArgs>(args?: SelectSubset<T, AssessmentFindFirstArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Assessment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindFirstOrThrowArgs} args - Arguments to find a Assessment
     * @example
     * // Get one Assessment
     * const assessment = await prisma.assessment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AssessmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AssessmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Assessments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Assessments
     * const assessments = await prisma.assessment.findMany()
     * 
     * // Get first 10 Assessments
     * const assessments = await prisma.assessment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const assessmentWithIdOnly = await prisma.assessment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AssessmentFindManyArgs>(args?: SelectSubset<T, AssessmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Assessment.
     * @param {AssessmentCreateArgs} args - Arguments to create a Assessment.
     * @example
     * // Create one Assessment
     * const Assessment = await prisma.assessment.create({
     *   data: {
     *     // ... data to create a Assessment
     *   }
     * })
     * 
     */
    create<T extends AssessmentCreateArgs>(args: SelectSubset<T, AssessmentCreateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Assessments.
     * @param {AssessmentCreateManyArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AssessmentCreateManyArgs>(args?: SelectSubset<T, AssessmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Assessments and returns the data saved in the database.
     * @param {AssessmentCreateManyAndReturnArgs} args - Arguments to create many Assessments.
     * @example
     * // Create many Assessments
     * const assessment = await prisma.assessment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AssessmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AssessmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Assessment.
     * @param {AssessmentDeleteArgs} args - Arguments to delete one Assessment.
     * @example
     * // Delete one Assessment
     * const Assessment = await prisma.assessment.delete({
     *   where: {
     *     // ... filter to delete one Assessment
     *   }
     * })
     * 
     */
    delete<T extends AssessmentDeleteArgs>(args: SelectSubset<T, AssessmentDeleteArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Assessment.
     * @param {AssessmentUpdateArgs} args - Arguments to update one Assessment.
     * @example
     * // Update one Assessment
     * const assessment = await prisma.assessment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AssessmentUpdateArgs>(args: SelectSubset<T, AssessmentUpdateArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Assessments.
     * @param {AssessmentDeleteManyArgs} args - Arguments to filter Assessments to delete.
     * @example
     * // Delete a few Assessments
     * const { count } = await prisma.assessment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AssessmentDeleteManyArgs>(args?: SelectSubset<T, AssessmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AssessmentUpdateManyArgs>(args: SelectSubset<T, AssessmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Assessments and returns the data updated in the database.
     * @param {AssessmentUpdateManyAndReturnArgs} args - Arguments to update many Assessments.
     * @example
     * // Update many Assessments
     * const assessment = await prisma.assessment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Assessments and only return the `id`
     * const assessmentWithIdOnly = await prisma.assessment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AssessmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AssessmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Assessment.
     * @param {AssessmentUpsertArgs} args - Arguments to update or create a Assessment.
     * @example
     * // Update or create a Assessment
     * const assessment = await prisma.assessment.upsert({
     *   create: {
     *     // ... data to create a Assessment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Assessment we want to update
     *   }
     * })
     */
    upsert<T extends AssessmentUpsertArgs>(args: SelectSubset<T, AssessmentUpsertArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Assessments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentCountArgs} args - Arguments to filter Assessments to count.
     * @example
     * // Count the number of Assessments
     * const count = await prisma.assessment.count({
     *   where: {
     *     // ... the filter for the Assessments we want to count
     *   }
     * })
    **/
    count<T extends AssessmentCountArgs>(
      args?: Subset<T, AssessmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AssessmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AssessmentAggregateArgs>(args: Subset<T, AssessmentAggregateArgs>): Prisma.PrismaPromise<GetAssessmentAggregateType<T>>

    /**
     * Group by Assessment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AssessmentGroupByArgs} args - Group by arguments.
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
      T extends AssessmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AssessmentGroupByArgs['orderBy'] }
        : { orderBy?: AssessmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AssessmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAssessmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Assessment model
   */
  readonly fields: AssessmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Assessment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AssessmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    treatment<T extends Assessment$treatmentArgs<ExtArgs> = {}>(args?: Subset<T, Assessment$treatmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Assessment model
   */
  interface AssessmentFieldRefs {
    readonly id: FieldRef<"Assessment", 'String'>
    readonly createdAt: FieldRef<"Assessment", 'DateTime'>
    readonly updatedAt: FieldRef<"Assessment", 'DateTime'>
    readonly patientId: FieldRef<"Assessment", 'String'>
    readonly symptoms: FieldRef<"Assessment", 'String'>
    readonly assessment: FieldRef<"Assessment", 'String'>
    readonly diagnosis: FieldRef<"Assessment", 'String'>
    readonly bloodPressure: FieldRef<"Assessment", 'String'>
    readonly pulseRate: FieldRef<"Assessment", 'Int'>
    readonly respiratoryRate: FieldRef<"Assessment", 'Int'>
    readonly oxygenSaturation: FieldRef<"Assessment", 'Float'>
    readonly alcoholUse: FieldRef<"Assessment", 'Boolean'>
    readonly smoker: FieldRef<"Assessment", 'Boolean'>
    readonly allergies: FieldRef<"Assessment", 'String'>
    readonly painLocation: FieldRef<"Assessment", 'String'>
    readonly painScale: FieldRef<"Assessment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Assessment findUnique
   */
  export type AssessmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findUniqueOrThrow
   */
  export type AssessmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment findFirst
   */
  export type AssessmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findFirstOrThrow
   */
  export type AssessmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessment to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Assessments.
     */
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment findMany
   */
  export type AssessmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter, which Assessments to fetch.
     */
    where?: AssessmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Assessments to fetch.
     */
    orderBy?: AssessmentOrderByWithRelationInput | AssessmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Assessments.
     */
    cursor?: AssessmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Assessments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Assessments.
     */
    skip?: number
    distinct?: AssessmentScalarFieldEnum | AssessmentScalarFieldEnum[]
  }

  /**
   * Assessment create
   */
  export type AssessmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Assessment.
     */
    data: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
  }

  /**
   * Assessment createMany
   */
  export type AssessmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Assessment createManyAndReturn
   */
  export type AssessmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to create many Assessments.
     */
    data: AssessmentCreateManyInput | AssessmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment update
   */
  export type AssessmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Assessment.
     */
    data: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
    /**
     * Choose, which Assessment to update.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment updateMany
   */
  export type AssessmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
  }

  /**
   * Assessment updateManyAndReturn
   */
  export type AssessmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * The data used to update Assessments.
     */
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyInput>
    /**
     * Filter which Assessments to update
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Assessment upsert
   */
  export type AssessmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Assessment to update in case it exists.
     */
    where: AssessmentWhereUniqueInput
    /**
     * In case the Assessment found by the `where` argument doesn't exist, create a new Assessment with this data.
     */
    create: XOR<AssessmentCreateInput, AssessmentUncheckedCreateInput>
    /**
     * In case the Assessment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AssessmentUpdateInput, AssessmentUncheckedUpdateInput>
  }

  /**
   * Assessment delete
   */
  export type AssessmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    /**
     * Filter which Assessment to delete.
     */
    where: AssessmentWhereUniqueInput
  }

  /**
   * Assessment deleteMany
   */
  export type AssessmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Assessments to delete
     */
    where?: AssessmentWhereInput
    /**
     * Limit how many Assessments to delete.
     */
    limit?: number
  }

  /**
   * Assessment.treatment
   */
  export type Assessment$treatmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    where?: TreatmentWhereInput
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    cursor?: TreatmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Assessment without action
   */
  export type AssessmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
  }


  /**
   * Model Treatment
   */

  export type AggregateTreatment = {
    _count: TreatmentCountAggregateOutputType | null
    _avg: TreatmentAvgAggregateOutputType | null
    _sum: TreatmentSumAggregateOutputType | null
    _min: TreatmentMinAggregateOutputType | null
    _max: TreatmentMaxAggregateOutputType | null
  }

  export type TreatmentAvgAggregateOutputType = {
    painScale: number | null
    priority: number | null
  }

  export type TreatmentSumAggregateOutputType = {
    painScale: number | null
    priority: number | null
  }

  export type TreatmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    visitId: string | null
    assessmentId: string | null
    procedures: string | null
    painScale: number | null
    remarks: string | null
    status: $Enums.TreatmentStatus | null
    priority: number | null
    nextFollowUpAt: Date | null
  }

  export type TreatmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    visitId: string | null
    assessmentId: string | null
    procedures: string | null
    painScale: number | null
    remarks: string | null
    status: $Enums.TreatmentStatus | null
    priority: number | null
    nextFollowUpAt: Date | null
  }

  export type TreatmentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    patientId: number
    visitId: number
    assessmentId: number
    medications: number
    procedures: number
    painScale: number
    remarks: number
    status: number
    priority: number
    nextFollowUpAt: number
    _all: number
  }


  export type TreatmentAvgAggregateInputType = {
    painScale?: true
    priority?: true
  }

  export type TreatmentSumAggregateInputType = {
    painScale?: true
    priority?: true
  }

  export type TreatmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    visitId?: true
    assessmentId?: true
    procedures?: true
    painScale?: true
    remarks?: true
    status?: true
    priority?: true
    nextFollowUpAt?: true
  }

  export type TreatmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    visitId?: true
    assessmentId?: true
    procedures?: true
    painScale?: true
    remarks?: true
    status?: true
    priority?: true
    nextFollowUpAt?: true
  }

  export type TreatmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    visitId?: true
    assessmentId?: true
    medications?: true
    procedures?: true
    painScale?: true
    remarks?: true
    status?: true
    priority?: true
    nextFollowUpAt?: true
    _all?: true
  }

  export type TreatmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Treatment to aggregate.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Treatments
    **/
    _count?: true | TreatmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TreatmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TreatmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TreatmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TreatmentMaxAggregateInputType
  }

  export type GetTreatmentAggregateType<T extends TreatmentAggregateArgs> = {
        [P in keyof T & keyof AggregateTreatment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTreatment[P]>
      : GetScalarType<T[P], AggregateTreatment[P]>
  }




  export type TreatmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TreatmentWhereInput
    orderBy?: TreatmentOrderByWithAggregationInput | TreatmentOrderByWithAggregationInput[]
    by: TreatmentScalarFieldEnum[] | TreatmentScalarFieldEnum
    having?: TreatmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TreatmentCountAggregateInputType | true
    _avg?: TreatmentAvgAggregateInputType
    _sum?: TreatmentSumAggregateInputType
    _min?: TreatmentMinAggregateInputType
    _max?: TreatmentMaxAggregateInputType
  }

  export type TreatmentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    patientId: string
    visitId: string | null
    assessmentId: string | null
    medications: JsonValue | null
    procedures: string | null
    painScale: number | null
    remarks: string | null
    status: $Enums.TreatmentStatus
    priority: number | null
    nextFollowUpAt: Date | null
    _count: TreatmentCountAggregateOutputType | null
    _avg: TreatmentAvgAggregateOutputType | null
    _sum: TreatmentSumAggregateOutputType | null
    _min: TreatmentMinAggregateOutputType | null
    _max: TreatmentMaxAggregateOutputType | null
  }

  type GetTreatmentGroupByPayload<T extends TreatmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TreatmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TreatmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
            : GetScalarType<T[P], TreatmentGroupByOutputType[P]>
        }
      >
    >


  export type TreatmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    visitId?: boolean
    assessmentId?: boolean
    medications?: boolean
    procedures?: boolean
    painScale?: boolean
    remarks?: boolean
    status?: boolean
    priority?: boolean
    nextFollowUpAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    visit?: boolean | Treatment$visitArgs<ExtArgs>
    assessment?: boolean | Treatment$assessmentArgs<ExtArgs>
    followUps?: boolean | Treatment$followUpsArgs<ExtArgs>
    _count?: boolean | TreatmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    visitId?: boolean
    assessmentId?: boolean
    medications?: boolean
    procedures?: boolean
    painScale?: boolean
    remarks?: boolean
    status?: boolean
    priority?: boolean
    nextFollowUpAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    visit?: boolean | Treatment$visitArgs<ExtArgs>
    assessment?: boolean | Treatment$assessmentArgs<ExtArgs>
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    visitId?: boolean
    assessmentId?: boolean
    medications?: boolean
    procedures?: boolean
    painScale?: boolean
    remarks?: boolean
    status?: boolean
    priority?: boolean
    nextFollowUpAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    visit?: boolean | Treatment$visitArgs<ExtArgs>
    assessment?: boolean | Treatment$assessmentArgs<ExtArgs>
  }, ExtArgs["result"]["treatment"]>

  export type TreatmentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    visitId?: boolean
    assessmentId?: boolean
    medications?: boolean
    procedures?: boolean
    painScale?: boolean
    remarks?: boolean
    status?: boolean
    priority?: boolean
    nextFollowUpAt?: boolean
  }

  export type TreatmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "patientId" | "visitId" | "assessmentId" | "medications" | "procedures" | "painScale" | "remarks" | "status" | "priority" | "nextFollowUpAt", ExtArgs["result"]["treatment"]>
  export type TreatmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    visit?: boolean | Treatment$visitArgs<ExtArgs>
    assessment?: boolean | Treatment$assessmentArgs<ExtArgs>
    followUps?: boolean | Treatment$followUpsArgs<ExtArgs>
    _count?: boolean | TreatmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TreatmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    visit?: boolean | Treatment$visitArgs<ExtArgs>
    assessment?: boolean | Treatment$assessmentArgs<ExtArgs>
  }
  export type TreatmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    visit?: boolean | Treatment$visitArgs<ExtArgs>
    assessment?: boolean | Treatment$assessmentArgs<ExtArgs>
  }

  export type $TreatmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Treatment"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      visit: Prisma.$PatientVisitPayload<ExtArgs> | null
      assessment: Prisma.$AssessmentPayload<ExtArgs> | null
      followUps: Prisma.$FollowUpPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      patientId: string
      visitId: string | null
      assessmentId: string | null
      medications: Prisma.JsonValue | null
      procedures: string | null
      painScale: number | null
      remarks: string | null
      status: $Enums.TreatmentStatus
      priority: number | null
      nextFollowUpAt: Date | null
    }, ExtArgs["result"]["treatment"]>
    composites: {}
  }

  type TreatmentGetPayload<S extends boolean | null | undefined | TreatmentDefaultArgs> = $Result.GetResult<Prisma.$TreatmentPayload, S>

  type TreatmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TreatmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TreatmentCountAggregateInputType | true
    }

  export interface TreatmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Treatment'], meta: { name: 'Treatment' } }
    /**
     * Find zero or one Treatment that matches the filter.
     * @param {TreatmentFindUniqueArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TreatmentFindUniqueArgs>(args: SelectSubset<T, TreatmentFindUniqueArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Treatment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TreatmentFindUniqueOrThrowArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TreatmentFindUniqueOrThrowArgs>(args: SelectSubset<T, TreatmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Treatment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindFirstArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TreatmentFindFirstArgs>(args?: SelectSubset<T, TreatmentFindFirstArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Treatment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindFirstOrThrowArgs} args - Arguments to find a Treatment
     * @example
     * // Get one Treatment
     * const treatment = await prisma.treatment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TreatmentFindFirstOrThrowArgs>(args?: SelectSubset<T, TreatmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Treatments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Treatments
     * const treatments = await prisma.treatment.findMany()
     * 
     * // Get first 10 Treatments
     * const treatments = await prisma.treatment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const treatmentWithIdOnly = await prisma.treatment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TreatmentFindManyArgs>(args?: SelectSubset<T, TreatmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Treatment.
     * @param {TreatmentCreateArgs} args - Arguments to create a Treatment.
     * @example
     * // Create one Treatment
     * const Treatment = await prisma.treatment.create({
     *   data: {
     *     // ... data to create a Treatment
     *   }
     * })
     * 
     */
    create<T extends TreatmentCreateArgs>(args: SelectSubset<T, TreatmentCreateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Treatments.
     * @param {TreatmentCreateManyArgs} args - Arguments to create many Treatments.
     * @example
     * // Create many Treatments
     * const treatment = await prisma.treatment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TreatmentCreateManyArgs>(args?: SelectSubset<T, TreatmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Treatments and returns the data saved in the database.
     * @param {TreatmentCreateManyAndReturnArgs} args - Arguments to create many Treatments.
     * @example
     * // Create many Treatments
     * const treatment = await prisma.treatment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Treatments and only return the `id`
     * const treatmentWithIdOnly = await prisma.treatment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TreatmentCreateManyAndReturnArgs>(args?: SelectSubset<T, TreatmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Treatment.
     * @param {TreatmentDeleteArgs} args - Arguments to delete one Treatment.
     * @example
     * // Delete one Treatment
     * const Treatment = await prisma.treatment.delete({
     *   where: {
     *     // ... filter to delete one Treatment
     *   }
     * })
     * 
     */
    delete<T extends TreatmentDeleteArgs>(args: SelectSubset<T, TreatmentDeleteArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Treatment.
     * @param {TreatmentUpdateArgs} args - Arguments to update one Treatment.
     * @example
     * // Update one Treatment
     * const treatment = await prisma.treatment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TreatmentUpdateArgs>(args: SelectSubset<T, TreatmentUpdateArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Treatments.
     * @param {TreatmentDeleteManyArgs} args - Arguments to filter Treatments to delete.
     * @example
     * // Delete a few Treatments
     * const { count } = await prisma.treatment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TreatmentDeleteManyArgs>(args?: SelectSubset<T, TreatmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Treatments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Treatments
     * const treatment = await prisma.treatment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TreatmentUpdateManyArgs>(args: SelectSubset<T, TreatmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Treatments and returns the data updated in the database.
     * @param {TreatmentUpdateManyAndReturnArgs} args - Arguments to update many Treatments.
     * @example
     * // Update many Treatments
     * const treatment = await prisma.treatment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Treatments and only return the `id`
     * const treatmentWithIdOnly = await prisma.treatment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TreatmentUpdateManyAndReturnArgs>(args: SelectSubset<T, TreatmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Treatment.
     * @param {TreatmentUpsertArgs} args - Arguments to update or create a Treatment.
     * @example
     * // Update or create a Treatment
     * const treatment = await prisma.treatment.upsert({
     *   create: {
     *     // ... data to create a Treatment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Treatment we want to update
     *   }
     * })
     */
    upsert<T extends TreatmentUpsertArgs>(args: SelectSubset<T, TreatmentUpsertArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Treatments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentCountArgs} args - Arguments to filter Treatments to count.
     * @example
     * // Count the number of Treatments
     * const count = await prisma.treatment.count({
     *   where: {
     *     // ... the filter for the Treatments we want to count
     *   }
     * })
    **/
    count<T extends TreatmentCountArgs>(
      args?: Subset<T, TreatmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TreatmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Treatment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TreatmentAggregateArgs>(args: Subset<T, TreatmentAggregateArgs>): Prisma.PrismaPromise<GetTreatmentAggregateType<T>>

    /**
     * Group by Treatment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TreatmentGroupByArgs} args - Group by arguments.
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
      T extends TreatmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TreatmentGroupByArgs['orderBy'] }
        : { orderBy?: TreatmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TreatmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTreatmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Treatment model
   */
  readonly fields: TreatmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Treatment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TreatmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    visit<T extends Treatment$visitArgs<ExtArgs> = {}>(args?: Subset<T, Treatment$visitArgs<ExtArgs>>): Prisma__PatientVisitClient<$Result.GetResult<Prisma.$PatientVisitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assessment<T extends Treatment$assessmentArgs<ExtArgs> = {}>(args?: Subset<T, Treatment$assessmentArgs<ExtArgs>>): Prisma__AssessmentClient<$Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    followUps<T extends Treatment$followUpsArgs<ExtArgs> = {}>(args?: Subset<T, Treatment$followUpsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Treatment model
   */
  interface TreatmentFieldRefs {
    readonly id: FieldRef<"Treatment", 'String'>
    readonly createdAt: FieldRef<"Treatment", 'DateTime'>
    readonly updatedAt: FieldRef<"Treatment", 'DateTime'>
    readonly patientId: FieldRef<"Treatment", 'String'>
    readonly visitId: FieldRef<"Treatment", 'String'>
    readonly assessmentId: FieldRef<"Treatment", 'String'>
    readonly medications: FieldRef<"Treatment", 'Json'>
    readonly procedures: FieldRef<"Treatment", 'String'>
    readonly painScale: FieldRef<"Treatment", 'Int'>
    readonly remarks: FieldRef<"Treatment", 'String'>
    readonly status: FieldRef<"Treatment", 'TreatmentStatus'>
    readonly priority: FieldRef<"Treatment", 'Int'>
    readonly nextFollowUpAt: FieldRef<"Treatment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Treatment findUnique
   */
  export type TreatmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment findUniqueOrThrow
   */
  export type TreatmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment findFirst
   */
  export type TreatmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Treatments.
     */
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment findFirstOrThrow
   */
  export type TreatmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatment to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Treatments.
     */
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment findMany
   */
  export type TreatmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter, which Treatments to fetch.
     */
    where?: TreatmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Treatments to fetch.
     */
    orderBy?: TreatmentOrderByWithRelationInput | TreatmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Treatments.
     */
    cursor?: TreatmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Treatments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Treatments.
     */
    skip?: number
    distinct?: TreatmentScalarFieldEnum | TreatmentScalarFieldEnum[]
  }

  /**
   * Treatment create
   */
  export type TreatmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Treatment.
     */
    data: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
  }

  /**
   * Treatment createMany
   */
  export type TreatmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Treatments.
     */
    data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Treatment createManyAndReturn
   */
  export type TreatmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data used to create many Treatments.
     */
    data: TreatmentCreateManyInput | TreatmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Treatment update
   */
  export type TreatmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Treatment.
     */
    data: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
    /**
     * Choose, which Treatment to update.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment updateMany
   */
  export type TreatmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Treatments.
     */
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
    /**
     * Filter which Treatments to update
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to update.
     */
    limit?: number
  }

  /**
   * Treatment updateManyAndReturn
   */
  export type TreatmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * The data used to update Treatments.
     */
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyInput>
    /**
     * Filter which Treatments to update
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Treatment upsert
   */
  export type TreatmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Treatment to update in case it exists.
     */
    where: TreatmentWhereUniqueInput
    /**
     * In case the Treatment found by the `where` argument doesn't exist, create a new Treatment with this data.
     */
    create: XOR<TreatmentCreateInput, TreatmentUncheckedCreateInput>
    /**
     * In case the Treatment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TreatmentUpdateInput, TreatmentUncheckedUpdateInput>
  }

  /**
   * Treatment delete
   */
  export type TreatmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
    /**
     * Filter which Treatment to delete.
     */
    where: TreatmentWhereUniqueInput
  }

  /**
   * Treatment deleteMany
   */
  export type TreatmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Treatments to delete
     */
    where?: TreatmentWhereInput
    /**
     * Limit how many Treatments to delete.
     */
    limit?: number
  }

  /**
   * Treatment.visit
   */
  export type Treatment$visitArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientVisit
     */
    select?: PatientVisitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PatientVisit
     */
    omit?: PatientVisitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientVisitInclude<ExtArgs> | null
    where?: PatientVisitWhereInput
  }

  /**
   * Treatment.assessment
   */
  export type Treatment$assessmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Assessment
     */
    select?: AssessmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Assessment
     */
    omit?: AssessmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AssessmentInclude<ExtArgs> | null
    where?: AssessmentWhereInput
  }

  /**
   * Treatment.followUps
   */
  export type Treatment$followUpsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    where?: FollowUpWhereInput
    orderBy?: FollowUpOrderByWithRelationInput | FollowUpOrderByWithRelationInput[]
    cursor?: FollowUpWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowUpScalarFieldEnum | FollowUpScalarFieldEnum[]
  }

  /**
   * Treatment without action
   */
  export type TreatmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Treatment
     */
    select?: TreatmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Treatment
     */
    omit?: TreatmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TreatmentInclude<ExtArgs> | null
  }


  /**
   * Model FollowUp
   */

  export type AggregateFollowUp = {
    _count: FollowUpCountAggregateOutputType | null
    _avg: FollowUpAvgAggregateOutputType | null
    _sum: FollowUpSumAggregateOutputType | null
    _min: FollowUpMinAggregateOutputType | null
    _max: FollowUpMaxAggregateOutputType | null
  }

  export type FollowUpAvgAggregateOutputType = {
    painScale: number | null
  }

  export type FollowUpSumAggregateOutputType = {
    painScale: number | null
  }

  export type FollowUpMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    treatmentId: string | null
    note: string | null
    findings: string | null
    outcome: string | null
    nextAction: string | null
    painScale: number | null
    followUpDate: Date | null
    nextFollowUp: Date | null
    resolved: boolean | null
  }

  export type FollowUpMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    treatmentId: string | null
    note: string | null
    findings: string | null
    outcome: string | null
    nextAction: string | null
    painScale: number | null
    followUpDate: Date | null
    nextFollowUp: Date | null
    resolved: boolean | null
  }

  export type FollowUpCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    treatmentId: number
    note: number
    findings: number
    outcome: number
    nextAction: number
    painScale: number
    vitals: number
    followUpDate: number
    nextFollowUp: number
    resolved: number
    _all: number
  }


  export type FollowUpAvgAggregateInputType = {
    painScale?: true
  }

  export type FollowUpSumAggregateInputType = {
    painScale?: true
  }

  export type FollowUpMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    treatmentId?: true
    note?: true
    findings?: true
    outcome?: true
    nextAction?: true
    painScale?: true
    followUpDate?: true
    nextFollowUp?: true
    resolved?: true
  }

  export type FollowUpMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    treatmentId?: true
    note?: true
    findings?: true
    outcome?: true
    nextAction?: true
    painScale?: true
    followUpDate?: true
    nextFollowUp?: true
    resolved?: true
  }

  export type FollowUpCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    treatmentId?: true
    note?: true
    findings?: true
    outcome?: true
    nextAction?: true
    painScale?: true
    vitals?: true
    followUpDate?: true
    nextFollowUp?: true
    resolved?: true
    _all?: true
  }

  export type FollowUpAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FollowUp to aggregate.
     */
    where?: FollowUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUps to fetch.
     */
    orderBy?: FollowUpOrderByWithRelationInput | FollowUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FollowUps
    **/
    _count?: true | FollowUpCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FollowUpAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FollowUpSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowUpMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowUpMaxAggregateInputType
  }

  export type GetFollowUpAggregateType<T extends FollowUpAggregateArgs> = {
        [P in keyof T & keyof AggregateFollowUp]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollowUp[P]>
      : GetScalarType<T[P], AggregateFollowUp[P]>
  }




  export type FollowUpGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowUpWhereInput
    orderBy?: FollowUpOrderByWithAggregationInput | FollowUpOrderByWithAggregationInput[]
    by: FollowUpScalarFieldEnum[] | FollowUpScalarFieldEnum
    having?: FollowUpScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowUpCountAggregateInputType | true
    _avg?: FollowUpAvgAggregateInputType
    _sum?: FollowUpSumAggregateInputType
    _min?: FollowUpMinAggregateInputType
    _max?: FollowUpMaxAggregateInputType
  }

  export type FollowUpGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    treatmentId: string
    note: string | null
    findings: string | null
    outcome: string | null
    nextAction: string | null
    painScale: number | null
    vitals: JsonValue | null
    followUpDate: Date
    nextFollowUp: Date | null
    resolved: boolean
    _count: FollowUpCountAggregateOutputType | null
    _avg: FollowUpAvgAggregateOutputType | null
    _sum: FollowUpSumAggregateOutputType | null
    _min: FollowUpMinAggregateOutputType | null
    _max: FollowUpMaxAggregateOutputType | null
  }

  type GetFollowUpGroupByPayload<T extends FollowUpGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowUpGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowUpGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowUpGroupByOutputType[P]>
            : GetScalarType<T[P], FollowUpGroupByOutputType[P]>
        }
      >
    >


  export type FollowUpSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    treatmentId?: boolean
    note?: boolean
    findings?: boolean
    outcome?: boolean
    nextAction?: boolean
    painScale?: boolean
    vitals?: boolean
    followUpDate?: boolean
    nextFollowUp?: boolean
    resolved?: boolean
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["followUp"]>

  export type FollowUpSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    treatmentId?: boolean
    note?: boolean
    findings?: boolean
    outcome?: boolean
    nextAction?: boolean
    painScale?: boolean
    vitals?: boolean
    followUpDate?: boolean
    nextFollowUp?: boolean
    resolved?: boolean
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["followUp"]>

  export type FollowUpSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    treatmentId?: boolean
    note?: boolean
    findings?: boolean
    outcome?: boolean
    nextAction?: boolean
    painScale?: boolean
    vitals?: boolean
    followUpDate?: boolean
    nextFollowUp?: boolean
    resolved?: boolean
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["followUp"]>

  export type FollowUpSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    treatmentId?: boolean
    note?: boolean
    findings?: boolean
    outcome?: boolean
    nextAction?: boolean
    painScale?: boolean
    vitals?: boolean
    followUpDate?: boolean
    nextFollowUp?: boolean
    resolved?: boolean
  }

  export type FollowUpOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "treatmentId" | "note" | "findings" | "outcome" | "nextAction" | "painScale" | "vitals" | "followUpDate" | "nextFollowUp" | "resolved", ExtArgs["result"]["followUp"]>
  export type FollowUpInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
  }
  export type FollowUpIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
  }
  export type FollowUpIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    treatment?: boolean | TreatmentDefaultArgs<ExtArgs>
  }

  export type $FollowUpPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FollowUp"
    objects: {
      treatment: Prisma.$TreatmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      treatmentId: string
      note: string | null
      findings: string | null
      outcome: string | null
      nextAction: string | null
      painScale: number | null
      vitals: Prisma.JsonValue | null
      followUpDate: Date
      nextFollowUp: Date | null
      resolved: boolean
    }, ExtArgs["result"]["followUp"]>
    composites: {}
  }

  type FollowUpGetPayload<S extends boolean | null | undefined | FollowUpDefaultArgs> = $Result.GetResult<Prisma.$FollowUpPayload, S>

  type FollowUpCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowUpFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowUpCountAggregateInputType | true
    }

  export interface FollowUpDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FollowUp'], meta: { name: 'FollowUp' } }
    /**
     * Find zero or one FollowUp that matches the filter.
     * @param {FollowUpFindUniqueArgs} args - Arguments to find a FollowUp
     * @example
     * // Get one FollowUp
     * const followUp = await prisma.followUp.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowUpFindUniqueArgs>(args: SelectSubset<T, FollowUpFindUniqueArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FollowUp that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowUpFindUniqueOrThrowArgs} args - Arguments to find a FollowUp
     * @example
     * // Get one FollowUp
     * const followUp = await prisma.followUp.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowUpFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowUpFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FollowUp that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpFindFirstArgs} args - Arguments to find a FollowUp
     * @example
     * // Get one FollowUp
     * const followUp = await prisma.followUp.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowUpFindFirstArgs>(args?: SelectSubset<T, FollowUpFindFirstArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FollowUp that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpFindFirstOrThrowArgs} args - Arguments to find a FollowUp
     * @example
     * // Get one FollowUp
     * const followUp = await prisma.followUp.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowUpFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowUpFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FollowUps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FollowUps
     * const followUps = await prisma.followUp.findMany()
     * 
     * // Get first 10 FollowUps
     * const followUps = await prisma.followUp.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const followUpWithIdOnly = await prisma.followUp.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FollowUpFindManyArgs>(args?: SelectSubset<T, FollowUpFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FollowUp.
     * @param {FollowUpCreateArgs} args - Arguments to create a FollowUp.
     * @example
     * // Create one FollowUp
     * const FollowUp = await prisma.followUp.create({
     *   data: {
     *     // ... data to create a FollowUp
     *   }
     * })
     * 
     */
    create<T extends FollowUpCreateArgs>(args: SelectSubset<T, FollowUpCreateArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FollowUps.
     * @param {FollowUpCreateManyArgs} args - Arguments to create many FollowUps.
     * @example
     * // Create many FollowUps
     * const followUp = await prisma.followUp.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowUpCreateManyArgs>(args?: SelectSubset<T, FollowUpCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FollowUps and returns the data saved in the database.
     * @param {FollowUpCreateManyAndReturnArgs} args - Arguments to create many FollowUps.
     * @example
     * // Create many FollowUps
     * const followUp = await prisma.followUp.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FollowUps and only return the `id`
     * const followUpWithIdOnly = await prisma.followUp.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowUpCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowUpCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FollowUp.
     * @param {FollowUpDeleteArgs} args - Arguments to delete one FollowUp.
     * @example
     * // Delete one FollowUp
     * const FollowUp = await prisma.followUp.delete({
     *   where: {
     *     // ... filter to delete one FollowUp
     *   }
     * })
     * 
     */
    delete<T extends FollowUpDeleteArgs>(args: SelectSubset<T, FollowUpDeleteArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FollowUp.
     * @param {FollowUpUpdateArgs} args - Arguments to update one FollowUp.
     * @example
     * // Update one FollowUp
     * const followUp = await prisma.followUp.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowUpUpdateArgs>(args: SelectSubset<T, FollowUpUpdateArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FollowUps.
     * @param {FollowUpDeleteManyArgs} args - Arguments to filter FollowUps to delete.
     * @example
     * // Delete a few FollowUps
     * const { count } = await prisma.followUp.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowUpDeleteManyArgs>(args?: SelectSubset<T, FollowUpDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FollowUps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FollowUps
     * const followUp = await prisma.followUp.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowUpUpdateManyArgs>(args: SelectSubset<T, FollowUpUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FollowUps and returns the data updated in the database.
     * @param {FollowUpUpdateManyAndReturnArgs} args - Arguments to update many FollowUps.
     * @example
     * // Update many FollowUps
     * const followUp = await prisma.followUp.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FollowUps and only return the `id`
     * const followUpWithIdOnly = await prisma.followUp.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowUpUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowUpUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FollowUp.
     * @param {FollowUpUpsertArgs} args - Arguments to update or create a FollowUp.
     * @example
     * // Update or create a FollowUp
     * const followUp = await prisma.followUp.upsert({
     *   create: {
     *     // ... data to create a FollowUp
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FollowUp we want to update
     *   }
     * })
     */
    upsert<T extends FollowUpUpsertArgs>(args: SelectSubset<T, FollowUpUpsertArgs<ExtArgs>>): Prisma__FollowUpClient<$Result.GetResult<Prisma.$FollowUpPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FollowUps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpCountArgs} args - Arguments to filter FollowUps to count.
     * @example
     * // Count the number of FollowUps
     * const count = await prisma.followUp.count({
     *   where: {
     *     // ... the filter for the FollowUps we want to count
     *   }
     * })
    **/
    count<T extends FollowUpCountArgs>(
      args?: Subset<T, FollowUpCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowUpCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FollowUp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FollowUpAggregateArgs>(args: Subset<T, FollowUpAggregateArgs>): Prisma.PrismaPromise<GetFollowUpAggregateType<T>>

    /**
     * Group by FollowUp.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpGroupByArgs} args - Group by arguments.
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
      T extends FollowUpGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowUpGroupByArgs['orderBy'] }
        : { orderBy?: FollowUpGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FollowUpGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowUpGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FollowUp model
   */
  readonly fields: FollowUpFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FollowUp.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowUpClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    treatment<T extends TreatmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TreatmentDefaultArgs<ExtArgs>>): Prisma__TreatmentClient<$Result.GetResult<Prisma.$TreatmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FollowUp model
   */
  interface FollowUpFieldRefs {
    readonly id: FieldRef<"FollowUp", 'String'>
    readonly createdAt: FieldRef<"FollowUp", 'DateTime'>
    readonly updatedAt: FieldRef<"FollowUp", 'DateTime'>
    readonly treatmentId: FieldRef<"FollowUp", 'String'>
    readonly note: FieldRef<"FollowUp", 'String'>
    readonly findings: FieldRef<"FollowUp", 'String'>
    readonly outcome: FieldRef<"FollowUp", 'String'>
    readonly nextAction: FieldRef<"FollowUp", 'String'>
    readonly painScale: FieldRef<"FollowUp", 'Int'>
    readonly vitals: FieldRef<"FollowUp", 'Json'>
    readonly followUpDate: FieldRef<"FollowUp", 'DateTime'>
    readonly nextFollowUp: FieldRef<"FollowUp", 'DateTime'>
    readonly resolved: FieldRef<"FollowUp", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * FollowUp findUnique
   */
  export type FollowUpFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * Filter, which FollowUp to fetch.
     */
    where: FollowUpWhereUniqueInput
  }

  /**
   * FollowUp findUniqueOrThrow
   */
  export type FollowUpFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * Filter, which FollowUp to fetch.
     */
    where: FollowUpWhereUniqueInput
  }

  /**
   * FollowUp findFirst
   */
  export type FollowUpFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * Filter, which FollowUp to fetch.
     */
    where?: FollowUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUps to fetch.
     */
    orderBy?: FollowUpOrderByWithRelationInput | FollowUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FollowUps.
     */
    cursor?: FollowUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FollowUps.
     */
    distinct?: FollowUpScalarFieldEnum | FollowUpScalarFieldEnum[]
  }

  /**
   * FollowUp findFirstOrThrow
   */
  export type FollowUpFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * Filter, which FollowUp to fetch.
     */
    where?: FollowUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUps to fetch.
     */
    orderBy?: FollowUpOrderByWithRelationInput | FollowUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FollowUps.
     */
    cursor?: FollowUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FollowUps.
     */
    distinct?: FollowUpScalarFieldEnum | FollowUpScalarFieldEnum[]
  }

  /**
   * FollowUp findMany
   */
  export type FollowUpFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * Filter, which FollowUps to fetch.
     */
    where?: FollowUpWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FollowUps to fetch.
     */
    orderBy?: FollowUpOrderByWithRelationInput | FollowUpOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FollowUps.
     */
    cursor?: FollowUpWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FollowUps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FollowUps.
     */
    skip?: number
    distinct?: FollowUpScalarFieldEnum | FollowUpScalarFieldEnum[]
  }

  /**
   * FollowUp create
   */
  export type FollowUpCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * The data needed to create a FollowUp.
     */
    data: XOR<FollowUpCreateInput, FollowUpUncheckedCreateInput>
  }

  /**
   * FollowUp createMany
   */
  export type FollowUpCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FollowUps.
     */
    data: FollowUpCreateManyInput | FollowUpCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FollowUp createManyAndReturn
   */
  export type FollowUpCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * The data used to create many FollowUps.
     */
    data: FollowUpCreateManyInput | FollowUpCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FollowUp update
   */
  export type FollowUpUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * The data needed to update a FollowUp.
     */
    data: XOR<FollowUpUpdateInput, FollowUpUncheckedUpdateInput>
    /**
     * Choose, which FollowUp to update.
     */
    where: FollowUpWhereUniqueInput
  }

  /**
   * FollowUp updateMany
   */
  export type FollowUpUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FollowUps.
     */
    data: XOR<FollowUpUpdateManyMutationInput, FollowUpUncheckedUpdateManyInput>
    /**
     * Filter which FollowUps to update
     */
    where?: FollowUpWhereInput
    /**
     * Limit how many FollowUps to update.
     */
    limit?: number
  }

  /**
   * FollowUp updateManyAndReturn
   */
  export type FollowUpUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * The data used to update FollowUps.
     */
    data: XOR<FollowUpUpdateManyMutationInput, FollowUpUncheckedUpdateManyInput>
    /**
     * Filter which FollowUps to update
     */
    where?: FollowUpWhereInput
    /**
     * Limit how many FollowUps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FollowUp upsert
   */
  export type FollowUpUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * The filter to search for the FollowUp to update in case it exists.
     */
    where: FollowUpWhereUniqueInput
    /**
     * In case the FollowUp found by the `where` argument doesn't exist, create a new FollowUp with this data.
     */
    create: XOR<FollowUpCreateInput, FollowUpUncheckedCreateInput>
    /**
     * In case the FollowUp was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUpUpdateInput, FollowUpUncheckedUpdateInput>
  }

  /**
   * FollowUp delete
   */
  export type FollowUpDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
    /**
     * Filter which FollowUp to delete.
     */
    where: FollowUpWhereUniqueInput
  }

  /**
   * FollowUp deleteMany
   */
  export type FollowUpDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FollowUps to delete
     */
    where?: FollowUpWhereInput
    /**
     * Limit how many FollowUps to delete.
     */
    limit?: number
  }

  /**
   * FollowUp without action
   */
  export type FollowUpDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FollowUp
     */
    select?: FollowUpSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FollowUp
     */
    omit?: FollowUpOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowUpInclude<ExtArgs> | null
  }


  /**
   * Model MedicalRecord
   */

  export type AggregateMedicalRecord = {
    _count: MedicalRecordCountAggregateOutputType | null
    _min: MedicalRecordMinAggregateOutputType | null
    _max: MedicalRecordMaxAggregateOutputType | null
  }

  export type MedicalRecordMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    diagnosis: string | null
    treatment: string | null
    notes: string | null
  }

  export type MedicalRecordMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    diagnosis: string | null
    treatment: string | null
    notes: string | null
  }

  export type MedicalRecordCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    patientId: number
    diagnosis: number
    treatment: number
    notes: number
    _all: number
  }


  export type MedicalRecordMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    diagnosis?: true
    treatment?: true
    notes?: true
  }

  export type MedicalRecordMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    diagnosis?: true
    treatment?: true
    notes?: true
  }

  export type MedicalRecordCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    diagnosis?: true
    treatment?: true
    notes?: true
    _all?: true
  }

  export type MedicalRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalRecord to aggregate.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicalRecords
    **/
    _count?: true | MedicalRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicalRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicalRecordMaxAggregateInputType
  }

  export type GetMedicalRecordAggregateType<T extends MedicalRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalRecord[P]>
      : GetScalarType<T[P], AggregateMedicalRecord[P]>
  }




  export type MedicalRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicalRecordWhereInput
    orderBy?: MedicalRecordOrderByWithAggregationInput | MedicalRecordOrderByWithAggregationInput[]
    by: MedicalRecordScalarFieldEnum[] | MedicalRecordScalarFieldEnum
    having?: MedicalRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicalRecordCountAggregateInputType | true
    _min?: MedicalRecordMinAggregateInputType
    _max?: MedicalRecordMaxAggregateInputType
  }

  export type MedicalRecordGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    patientId: string
    diagnosis: string
    treatment: string
    notes: string | null
    _count: MedicalRecordCountAggregateOutputType | null
    _min: MedicalRecordMinAggregateOutputType | null
    _max: MedicalRecordMaxAggregateOutputType | null
  }

  type GetMedicalRecordGroupByPayload<T extends MedicalRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicalRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicalRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicalRecordGroupByOutputType[P]>
            : GetScalarType<T[P], MedicalRecordGroupByOutputType[P]>
        }
      >
    >


  export type MedicalRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    diagnosis?: boolean
    treatment?: boolean
    notes?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalRecord"]>

  export type MedicalRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    diagnosis?: boolean
    treatment?: boolean
    notes?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalRecord"]>

  export type MedicalRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    diagnosis?: boolean
    treatment?: boolean
    notes?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalRecord"]>

  export type MedicalRecordSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    diagnosis?: boolean
    treatment?: boolean
    notes?: boolean
  }

  export type MedicalRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "patientId" | "diagnosis" | "treatment" | "notes", ExtArgs["result"]["medicalRecord"]>
  export type MedicalRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type MedicalRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }
  export type MedicalRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
  }

  export type $MedicalRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicalRecord"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      patientId: string
      diagnosis: string
      treatment: string
      notes: string | null
    }, ExtArgs["result"]["medicalRecord"]>
    composites: {}
  }

  type MedicalRecordGetPayload<S extends boolean | null | undefined | MedicalRecordDefaultArgs> = $Result.GetResult<Prisma.$MedicalRecordPayload, S>

  type MedicalRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicalRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicalRecordCountAggregateInputType | true
    }

  export interface MedicalRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicalRecord'], meta: { name: 'MedicalRecord' } }
    /**
     * Find zero or one MedicalRecord that matches the filter.
     * @param {MedicalRecordFindUniqueArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicalRecordFindUniqueArgs>(args: SelectSubset<T, MedicalRecordFindUniqueArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicalRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicalRecordFindUniqueOrThrowArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicalRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicalRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordFindFirstArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicalRecordFindFirstArgs>(args?: SelectSubset<T, MedicalRecordFindFirstArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicalRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordFindFirstOrThrowArgs} args - Arguments to find a MedicalRecord
     * @example
     * // Get one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicalRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicalRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicalRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicalRecords
     * const medicalRecords = await prisma.medicalRecord.findMany()
     * 
     * // Get first 10 MedicalRecords
     * const medicalRecords = await prisma.medicalRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicalRecordWithIdOnly = await prisma.medicalRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicalRecordFindManyArgs>(args?: SelectSubset<T, MedicalRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicalRecord.
     * @param {MedicalRecordCreateArgs} args - Arguments to create a MedicalRecord.
     * @example
     * // Create one MedicalRecord
     * const MedicalRecord = await prisma.medicalRecord.create({
     *   data: {
     *     // ... data to create a MedicalRecord
     *   }
     * })
     * 
     */
    create<T extends MedicalRecordCreateArgs>(args: SelectSubset<T, MedicalRecordCreateArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicalRecords.
     * @param {MedicalRecordCreateManyArgs} args - Arguments to create many MedicalRecords.
     * @example
     * // Create many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicalRecordCreateManyArgs>(args?: SelectSubset<T, MedicalRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicalRecords and returns the data saved in the database.
     * @param {MedicalRecordCreateManyAndReturnArgs} args - Arguments to create many MedicalRecords.
     * @example
     * // Create many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicalRecords and only return the `id`
     * const medicalRecordWithIdOnly = await prisma.medicalRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicalRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicalRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicalRecord.
     * @param {MedicalRecordDeleteArgs} args - Arguments to delete one MedicalRecord.
     * @example
     * // Delete one MedicalRecord
     * const MedicalRecord = await prisma.medicalRecord.delete({
     *   where: {
     *     // ... filter to delete one MedicalRecord
     *   }
     * })
     * 
     */
    delete<T extends MedicalRecordDeleteArgs>(args: SelectSubset<T, MedicalRecordDeleteArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicalRecord.
     * @param {MedicalRecordUpdateArgs} args - Arguments to update one MedicalRecord.
     * @example
     * // Update one MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicalRecordUpdateArgs>(args: SelectSubset<T, MedicalRecordUpdateArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicalRecords.
     * @param {MedicalRecordDeleteManyArgs} args - Arguments to filter MedicalRecords to delete.
     * @example
     * // Delete a few MedicalRecords
     * const { count } = await prisma.medicalRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicalRecordDeleteManyArgs>(args?: SelectSubset<T, MedicalRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicalRecordUpdateManyArgs>(args: SelectSubset<T, MedicalRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicalRecords and returns the data updated in the database.
     * @param {MedicalRecordUpdateManyAndReturnArgs} args - Arguments to update many MedicalRecords.
     * @example
     * // Update many MedicalRecords
     * const medicalRecord = await prisma.medicalRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicalRecords and only return the `id`
     * const medicalRecordWithIdOnly = await prisma.medicalRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicalRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicalRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicalRecord.
     * @param {MedicalRecordUpsertArgs} args - Arguments to update or create a MedicalRecord.
     * @example
     * // Update or create a MedicalRecord
     * const medicalRecord = await prisma.medicalRecord.upsert({
     *   create: {
     *     // ... data to create a MedicalRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicalRecord we want to update
     *   }
     * })
     */
    upsert<T extends MedicalRecordUpsertArgs>(args: SelectSubset<T, MedicalRecordUpsertArgs<ExtArgs>>): Prisma__MedicalRecordClient<$Result.GetResult<Prisma.$MedicalRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicalRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordCountArgs} args - Arguments to filter MedicalRecords to count.
     * @example
     * // Count the number of MedicalRecords
     * const count = await prisma.medicalRecord.count({
     *   where: {
     *     // ... the filter for the MedicalRecords we want to count
     *   }
     * })
    **/
    count<T extends MedicalRecordCountArgs>(
      args?: Subset<T, MedicalRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicalRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicalRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicalRecordAggregateArgs>(args: Subset<T, MedicalRecordAggregateArgs>): Prisma.PrismaPromise<GetMedicalRecordAggregateType<T>>

    /**
     * Group by MedicalRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicalRecordGroupByArgs} args - Group by arguments.
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
      T extends MedicalRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicalRecordGroupByArgs['orderBy'] }
        : { orderBy?: MedicalRecordGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MedicalRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicalRecord model
   */
  readonly fields: MedicalRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicalRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicalRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MedicalRecord model
   */
  interface MedicalRecordFieldRefs {
    readonly id: FieldRef<"MedicalRecord", 'String'>
    readonly createdAt: FieldRef<"MedicalRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"MedicalRecord", 'DateTime'>
    readonly patientId: FieldRef<"MedicalRecord", 'String'>
    readonly diagnosis: FieldRef<"MedicalRecord", 'String'>
    readonly treatment: FieldRef<"MedicalRecord", 'String'>
    readonly notes: FieldRef<"MedicalRecord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MedicalRecord findUnique
   */
  export type MedicalRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord findUniqueOrThrow
   */
  export type MedicalRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord findFirst
   */
  export type MedicalRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalRecords.
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalRecords.
     */
    distinct?: MedicalRecordScalarFieldEnum | MedicalRecordScalarFieldEnum[]
  }

  /**
   * MedicalRecord findFirstOrThrow
   */
  export type MedicalRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecord to fetch.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicalRecords.
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicalRecords.
     */
    distinct?: MedicalRecordScalarFieldEnum | MedicalRecordScalarFieldEnum[]
  }

  /**
   * MedicalRecord findMany
   */
  export type MedicalRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter, which MedicalRecords to fetch.
     */
    where?: MedicalRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicalRecords to fetch.
     */
    orderBy?: MedicalRecordOrderByWithRelationInput | MedicalRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicalRecords.
     */
    cursor?: MedicalRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicalRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicalRecords.
     */
    skip?: number
    distinct?: MedicalRecordScalarFieldEnum | MedicalRecordScalarFieldEnum[]
  }

  /**
   * MedicalRecord create
   */
  export type MedicalRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicalRecord.
     */
    data: XOR<MedicalRecordCreateInput, MedicalRecordUncheckedCreateInput>
  }

  /**
   * MedicalRecord createMany
   */
  export type MedicalRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicalRecords.
     */
    data: MedicalRecordCreateManyInput | MedicalRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicalRecord createManyAndReturn
   */
  export type MedicalRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * The data used to create many MedicalRecords.
     */
    data: MedicalRecordCreateManyInput | MedicalRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalRecord update
   */
  export type MedicalRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicalRecord.
     */
    data: XOR<MedicalRecordUpdateInput, MedicalRecordUncheckedUpdateInput>
    /**
     * Choose, which MedicalRecord to update.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord updateMany
   */
  export type MedicalRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicalRecords.
     */
    data: XOR<MedicalRecordUpdateManyMutationInput, MedicalRecordUncheckedUpdateManyInput>
    /**
     * Filter which MedicalRecords to update
     */
    where?: MedicalRecordWhereInput
    /**
     * Limit how many MedicalRecords to update.
     */
    limit?: number
  }

  /**
   * MedicalRecord updateManyAndReturn
   */
  export type MedicalRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * The data used to update MedicalRecords.
     */
    data: XOR<MedicalRecordUpdateManyMutationInput, MedicalRecordUncheckedUpdateManyInput>
    /**
     * Filter which MedicalRecords to update
     */
    where?: MedicalRecordWhereInput
    /**
     * Limit how many MedicalRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicalRecord upsert
   */
  export type MedicalRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicalRecord to update in case it exists.
     */
    where: MedicalRecordWhereUniqueInput
    /**
     * In case the MedicalRecord found by the `where` argument doesn't exist, create a new MedicalRecord with this data.
     */
    create: XOR<MedicalRecordCreateInput, MedicalRecordUncheckedCreateInput>
    /**
     * In case the MedicalRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicalRecordUpdateInput, MedicalRecordUncheckedUpdateInput>
  }

  /**
   * MedicalRecord delete
   */
  export type MedicalRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
    /**
     * Filter which MedicalRecord to delete.
     */
    where: MedicalRecordWhereUniqueInput
  }

  /**
   * MedicalRecord deleteMany
   */
  export type MedicalRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicalRecords to delete
     */
    where?: MedicalRecordWhereInput
    /**
     * Limit how many MedicalRecords to delete.
     */
    limit?: number
  }

  /**
   * MedicalRecord without action
   */
  export type MedicalRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicalRecord
     */
    select?: MedicalRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicalRecord
     */
    omit?: MedicalRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicalRecordInclude<ExtArgs> | null
  }


  /**
   * Model Doctor
   */

  export type AggregateDoctor = {
    _count: DoctorCountAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  export type DoctorMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archived: boolean | null
    userId: string | null
    field: string | null
  }

  export type DoctorMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archived: boolean | null
    userId: string | null
    field: string | null
  }

  export type DoctorCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    archived: number
    userId: number
    field: number
    _all: number
  }


  export type DoctorMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    userId?: true
    field?: true
  }

  export type DoctorMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    userId?: true
    field?: true
  }

  export type DoctorCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    userId?: true
    field?: true
    _all?: true
  }

  export type DoctorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctor to aggregate.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Doctors
    **/
    _count?: true | DoctorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorMaxAggregateInputType
  }

  export type GetDoctorAggregateType<T extends DoctorAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctor[P]>
      : GetScalarType<T[P], AggregateDoctor[P]>
  }




  export type DoctorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorWhereInput
    orderBy?: DoctorOrderByWithAggregationInput | DoctorOrderByWithAggregationInput[]
    by: DoctorScalarFieldEnum[] | DoctorScalarFieldEnum
    having?: DoctorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorCountAggregateInputType | true
    _min?: DoctorMinAggregateInputType
    _max?: DoctorMaxAggregateInputType
  }

  export type DoctorGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    archived: boolean
    userId: string
    field: string
    _count: DoctorCountAggregateOutputType | null
    _min: DoctorMinAggregateOutputType | null
    _max: DoctorMaxAggregateOutputType | null
  }

  type GetDoctorGroupByPayload<T extends DoctorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorGroupByOutputType[P]>
        }
      >
    >


  export type DoctorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    field?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointment?: boolean | Doctor$appointmentArgs<ExtArgs>
    prescription?: boolean | Doctor$prescriptionArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    field?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    field?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctor"]>

  export type DoctorSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    userId?: boolean
    field?: boolean
  }

  export type DoctorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "archived" | "userId" | "field", ExtArgs["result"]["doctor"]>
  export type DoctorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    appointment?: boolean | Doctor$appointmentArgs<ExtArgs>
    prescription?: boolean | Doctor$prescriptionArgs<ExtArgs>
    _count?: boolean | DoctorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoctorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Doctor"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      appointment: Prisma.$AppointmentPayload<ExtArgs>[]
      prescription: Prisma.$PrescriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      archived: boolean
      userId: string
      field: string
    }, ExtArgs["result"]["doctor"]>
    composites: {}
  }

  type DoctorGetPayload<S extends boolean | null | undefined | DoctorDefaultArgs> = $Result.GetResult<Prisma.$DoctorPayload, S>

  type DoctorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorCountAggregateInputType | true
    }

  export interface DoctorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Doctor'], meta: { name: 'Doctor' } }
    /**
     * Find zero or one Doctor that matches the filter.
     * @param {DoctorFindUniqueArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorFindUniqueArgs>(args: SelectSubset<T, DoctorFindUniqueArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Doctor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorFindUniqueOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorFindFirstArgs>(args?: SelectSubset<T, DoctorFindFirstArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Doctor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindFirstOrThrowArgs} args - Arguments to find a Doctor
     * @example
     * // Get one Doctor
     * const doctor = await prisma.doctor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Doctors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Doctors
     * const doctors = await prisma.doctor.findMany()
     * 
     * // Get first 10 Doctors
     * const doctors = await prisma.doctor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorWithIdOnly = await prisma.doctor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorFindManyArgs>(args?: SelectSubset<T, DoctorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Doctor.
     * @param {DoctorCreateArgs} args - Arguments to create a Doctor.
     * @example
     * // Create one Doctor
     * const Doctor = await prisma.doctor.create({
     *   data: {
     *     // ... data to create a Doctor
     *   }
     * })
     * 
     */
    create<T extends DoctorCreateArgs>(args: SelectSubset<T, DoctorCreateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Doctors.
     * @param {DoctorCreateManyArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorCreateManyArgs>(args?: SelectSubset<T, DoctorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Doctors and returns the data saved in the database.
     * @param {DoctorCreateManyAndReturnArgs} args - Arguments to create many Doctors.
     * @example
     * // Create many Doctors
     * const doctor = await prisma.doctor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Doctor.
     * @param {DoctorDeleteArgs} args - Arguments to delete one Doctor.
     * @example
     * // Delete one Doctor
     * const Doctor = await prisma.doctor.delete({
     *   where: {
     *     // ... filter to delete one Doctor
     *   }
     * })
     * 
     */
    delete<T extends DoctorDeleteArgs>(args: SelectSubset<T, DoctorDeleteArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Doctor.
     * @param {DoctorUpdateArgs} args - Arguments to update one Doctor.
     * @example
     * // Update one Doctor
     * const doctor = await prisma.doctor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorUpdateArgs>(args: SelectSubset<T, DoctorUpdateArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Doctors.
     * @param {DoctorDeleteManyArgs} args - Arguments to filter Doctors to delete.
     * @example
     * // Delete a few Doctors
     * const { count } = await prisma.doctor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorDeleteManyArgs>(args?: SelectSubset<T, DoctorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorUpdateManyArgs>(args: SelectSubset<T, DoctorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Doctors and returns the data updated in the database.
     * @param {DoctorUpdateManyAndReturnArgs} args - Arguments to update many Doctors.
     * @example
     * // Update many Doctors
     * const doctor = await prisma.doctor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Doctors and only return the `id`
     * const doctorWithIdOnly = await prisma.doctor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Doctor.
     * @param {DoctorUpsertArgs} args - Arguments to update or create a Doctor.
     * @example
     * // Update or create a Doctor
     * const doctor = await prisma.doctor.upsert({
     *   create: {
     *     // ... data to create a Doctor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Doctor we want to update
     *   }
     * })
     */
    upsert<T extends DoctorUpsertArgs>(args: SelectSubset<T, DoctorUpsertArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Doctors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorCountArgs} args - Arguments to filter Doctors to count.
     * @example
     * // Count the number of Doctors
     * const count = await prisma.doctor.count({
     *   where: {
     *     // ... the filter for the Doctors we want to count
     *   }
     * })
    **/
    count<T extends DoctorCountArgs>(
      args?: Subset<T, DoctorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DoctorAggregateArgs>(args: Subset<T, DoctorAggregateArgs>): Prisma.PrismaPromise<GetDoctorAggregateType<T>>

    /**
     * Group by Doctor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorGroupByArgs} args - Group by arguments.
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
      T extends DoctorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorGroupByArgs['orderBy'] }
        : { orderBy?: DoctorGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DoctorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Doctor model
   */
  readonly fields: DoctorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Doctor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    appointment<T extends Doctor$appointmentArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$appointmentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    prescription<T extends Doctor$prescriptionArgs<ExtArgs> = {}>(args?: Subset<T, Doctor$prescriptionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Doctor model
   */
  interface DoctorFieldRefs {
    readonly id: FieldRef<"Doctor", 'String'>
    readonly createdAt: FieldRef<"Doctor", 'DateTime'>
    readonly updatedAt: FieldRef<"Doctor", 'DateTime'>
    readonly archived: FieldRef<"Doctor", 'Boolean'>
    readonly userId: FieldRef<"Doctor", 'String'>
    readonly field: FieldRef<"Doctor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Doctor findUnique
   */
  export type DoctorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findUniqueOrThrow
   */
  export type DoctorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor findFirst
   */
  export type DoctorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findFirstOrThrow
   */
  export type DoctorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctor to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Doctors.
     */
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor findMany
   */
  export type DoctorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter, which Doctors to fetch.
     */
    where?: DoctorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Doctors to fetch.
     */
    orderBy?: DoctorOrderByWithRelationInput | DoctorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Doctors.
     */
    cursor?: DoctorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Doctors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Doctors.
     */
    skip?: number
    distinct?: DoctorScalarFieldEnum | DoctorScalarFieldEnum[]
  }

  /**
   * Doctor create
   */
  export type DoctorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to create a Doctor.
     */
    data: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
  }

  /**
   * Doctor createMany
   */
  export type DoctorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Doctor createManyAndReturn
   */
  export type DoctorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to create many Doctors.
     */
    data: DoctorCreateManyInput | DoctorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor update
   */
  export type DoctorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The data needed to update a Doctor.
     */
    data: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
    /**
     * Choose, which Doctor to update.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor updateMany
   */
  export type DoctorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
  }

  /**
   * Doctor updateManyAndReturn
   */
  export type DoctorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * The data used to update Doctors.
     */
    data: XOR<DoctorUpdateManyMutationInput, DoctorUncheckedUpdateManyInput>
    /**
     * Filter which Doctors to update
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Doctor upsert
   */
  export type DoctorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * The filter to search for the Doctor to update in case it exists.
     */
    where: DoctorWhereUniqueInput
    /**
     * In case the Doctor found by the `where` argument doesn't exist, create a new Doctor with this data.
     */
    create: XOR<DoctorCreateInput, DoctorUncheckedCreateInput>
    /**
     * In case the Doctor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorUpdateInput, DoctorUncheckedUpdateInput>
  }

  /**
   * Doctor delete
   */
  export type DoctorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
    /**
     * Filter which Doctor to delete.
     */
    where: DoctorWhereUniqueInput
  }

  /**
   * Doctor deleteMany
   */
  export type DoctorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Doctors to delete
     */
    where?: DoctorWhereInput
    /**
     * Limit how many Doctors to delete.
     */
    limit?: number
  }

  /**
   * Doctor.appointment
   */
  export type Doctor$appointmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Doctor.prescription
   */
  export type Doctor$prescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Doctor without action
   */
  export type DoctorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Doctor
     */
    select?: DoctorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Doctor
     */
    omit?: DoctorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archived: boolean | null
    patientId: string | null
    doctorId: string | null
    date: Date | null
    status: string | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    archived: boolean | null
    patientId: string | null
    doctorId: string | null
    date: Date | null
    status: string | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    archived: number
    patientId: number
    doctorId: number
    date: number
    status: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    patientId?: true
    doctorId?: true
    date?: true
    status?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    patientId?: true
    doctorId?: true
    date?: true
    status?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    archived?: true
    patientId?: true
    doctorId?: true
    date?: true
    status?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    archived: boolean
    patientId: string
    doctorId: string
    date: Date
    status: string
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    patientId?: boolean
    doctorId?: boolean
    date?: boolean
    status?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    patientId?: boolean
    doctorId?: boolean
    date?: boolean
    status?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    patientId?: boolean
    doctorId?: boolean
    date?: boolean
    status?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    archived?: boolean
    patientId?: boolean
    doctorId?: boolean
    date?: boolean
    status?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "archived" | "patientId" | "doctorId" | "date" | "status", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      doctor: Prisma.$DoctorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      archived: boolean
      patientId: string
      doctorId: string
      date: Date
      status: string
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
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
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
    readonly archived: FieldRef<"Appointment", 'Boolean'>
    readonly patientId: FieldRef<"Appointment", 'String'>
    readonly doctorId: FieldRef<"Appointment", 'String'>
    readonly date: FieldRef<"Appointment", 'DateTime'>
    readonly status: FieldRef<"Appointment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model MedicineType
   */

  export type AggregateMedicineType = {
    _count: MedicineTypeCountAggregateOutputType | null
    _min: MedicineTypeMinAggregateOutputType | null
    _max: MedicineTypeMaxAggregateOutputType | null
  }

  export type MedicineTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    form: string | null
    strength: string | null
  }

  export type MedicineTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    form: string | null
    strength: string | null
  }

  export type MedicineTypeCountAggregateOutputType = {
    id: number
    name: number
    form: number
    strength: number
    _all: number
  }


  export type MedicineTypeMinAggregateInputType = {
    id?: true
    name?: true
    form?: true
    strength?: true
  }

  export type MedicineTypeMaxAggregateInputType = {
    id?: true
    name?: true
    form?: true
    strength?: true
  }

  export type MedicineTypeCountAggregateInputType = {
    id?: true
    name?: true
    form?: true
    strength?: true
    _all?: true
  }

  export type MedicineTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineType to aggregate.
     */
    where?: MedicineTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineTypes to fetch.
     */
    orderBy?: MedicineTypeOrderByWithRelationInput | MedicineTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicineTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicineTypes
    **/
    _count?: true | MedicineTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicineTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicineTypeMaxAggregateInputType
  }

  export type GetMedicineTypeAggregateType<T extends MedicineTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicineType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicineType[P]>
      : GetScalarType<T[P], AggregateMedicineType[P]>
  }




  export type MedicineTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicineTypeWhereInput
    orderBy?: MedicineTypeOrderByWithAggregationInput | MedicineTypeOrderByWithAggregationInput[]
    by: MedicineTypeScalarFieldEnum[] | MedicineTypeScalarFieldEnum
    having?: MedicineTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicineTypeCountAggregateInputType | true
    _min?: MedicineTypeMinAggregateInputType
    _max?: MedicineTypeMaxAggregateInputType
  }

  export type MedicineTypeGroupByOutputType = {
    id: string
    name: string
    form: string
    strength: string
    _count: MedicineTypeCountAggregateOutputType | null
    _min: MedicineTypeMinAggregateOutputType | null
    _max: MedicineTypeMaxAggregateOutputType | null
  }

  type GetMedicineTypeGroupByPayload<T extends MedicineTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicineTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicineTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicineTypeGroupByOutputType[P]>
            : GetScalarType<T[P], MedicineTypeGroupByOutputType[P]>
        }
      >
    >


  export type MedicineTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    form?: boolean
    strength?: boolean
    medicineBatch?: boolean | MedicineType$medicineBatchArgs<ExtArgs>
    prescription?: boolean | MedicineType$prescriptionArgs<ExtArgs>
    _count?: boolean | MedicineTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicineType"]>

  export type MedicineTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    form?: boolean
    strength?: boolean
  }, ExtArgs["result"]["medicineType"]>

  export type MedicineTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    form?: boolean
    strength?: boolean
  }, ExtArgs["result"]["medicineType"]>

  export type MedicineTypeSelectScalar = {
    id?: boolean
    name?: boolean
    form?: boolean
    strength?: boolean
  }

  export type MedicineTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "form" | "strength", ExtArgs["result"]["medicineType"]>
  export type MedicineTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicineBatch?: boolean | MedicineType$medicineBatchArgs<ExtArgs>
    prescription?: boolean | MedicineType$prescriptionArgs<ExtArgs>
    _count?: boolean | MedicineTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MedicineTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MedicineTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MedicineTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicineType"
    objects: {
      medicineBatch: Prisma.$MedicineBatchPayload<ExtArgs>[]
      prescription: Prisma.$PrescriptionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      form: string
      strength: string
    }, ExtArgs["result"]["medicineType"]>
    composites: {}
  }

  type MedicineTypeGetPayload<S extends boolean | null | undefined | MedicineTypeDefaultArgs> = $Result.GetResult<Prisma.$MedicineTypePayload, S>

  type MedicineTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicineTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicineTypeCountAggregateInputType | true
    }

  export interface MedicineTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicineType'], meta: { name: 'MedicineType' } }
    /**
     * Find zero or one MedicineType that matches the filter.
     * @param {MedicineTypeFindUniqueArgs} args - Arguments to find a MedicineType
     * @example
     * // Get one MedicineType
     * const medicineType = await prisma.medicineType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicineTypeFindUniqueArgs>(args: SelectSubset<T, MedicineTypeFindUniqueArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicineType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicineTypeFindUniqueOrThrowArgs} args - Arguments to find a MedicineType
     * @example
     * // Get one MedicineType
     * const medicineType = await prisma.medicineType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicineTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicineTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicineType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineTypeFindFirstArgs} args - Arguments to find a MedicineType
     * @example
     * // Get one MedicineType
     * const medicineType = await prisma.medicineType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicineTypeFindFirstArgs>(args?: SelectSubset<T, MedicineTypeFindFirstArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicineType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineTypeFindFirstOrThrowArgs} args - Arguments to find a MedicineType
     * @example
     * // Get one MedicineType
     * const medicineType = await prisma.medicineType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicineTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicineTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicineTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicineTypes
     * const medicineTypes = await prisma.medicineType.findMany()
     * 
     * // Get first 10 MedicineTypes
     * const medicineTypes = await prisma.medicineType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicineTypeWithIdOnly = await prisma.medicineType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicineTypeFindManyArgs>(args?: SelectSubset<T, MedicineTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicineType.
     * @param {MedicineTypeCreateArgs} args - Arguments to create a MedicineType.
     * @example
     * // Create one MedicineType
     * const MedicineType = await prisma.medicineType.create({
     *   data: {
     *     // ... data to create a MedicineType
     *   }
     * })
     * 
     */
    create<T extends MedicineTypeCreateArgs>(args: SelectSubset<T, MedicineTypeCreateArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicineTypes.
     * @param {MedicineTypeCreateManyArgs} args - Arguments to create many MedicineTypes.
     * @example
     * // Create many MedicineTypes
     * const medicineType = await prisma.medicineType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicineTypeCreateManyArgs>(args?: SelectSubset<T, MedicineTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicineTypes and returns the data saved in the database.
     * @param {MedicineTypeCreateManyAndReturnArgs} args - Arguments to create many MedicineTypes.
     * @example
     * // Create many MedicineTypes
     * const medicineType = await prisma.medicineType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicineTypes and only return the `id`
     * const medicineTypeWithIdOnly = await prisma.medicineType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicineTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicineTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicineType.
     * @param {MedicineTypeDeleteArgs} args - Arguments to delete one MedicineType.
     * @example
     * // Delete one MedicineType
     * const MedicineType = await prisma.medicineType.delete({
     *   where: {
     *     // ... filter to delete one MedicineType
     *   }
     * })
     * 
     */
    delete<T extends MedicineTypeDeleteArgs>(args: SelectSubset<T, MedicineTypeDeleteArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicineType.
     * @param {MedicineTypeUpdateArgs} args - Arguments to update one MedicineType.
     * @example
     * // Update one MedicineType
     * const medicineType = await prisma.medicineType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicineTypeUpdateArgs>(args: SelectSubset<T, MedicineTypeUpdateArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicineTypes.
     * @param {MedicineTypeDeleteManyArgs} args - Arguments to filter MedicineTypes to delete.
     * @example
     * // Delete a few MedicineTypes
     * const { count } = await prisma.medicineType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicineTypeDeleteManyArgs>(args?: SelectSubset<T, MedicineTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicineTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicineTypes
     * const medicineType = await prisma.medicineType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicineTypeUpdateManyArgs>(args: SelectSubset<T, MedicineTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicineTypes and returns the data updated in the database.
     * @param {MedicineTypeUpdateManyAndReturnArgs} args - Arguments to update many MedicineTypes.
     * @example
     * // Update many MedicineTypes
     * const medicineType = await prisma.medicineType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicineTypes and only return the `id`
     * const medicineTypeWithIdOnly = await prisma.medicineType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicineTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicineTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicineType.
     * @param {MedicineTypeUpsertArgs} args - Arguments to update or create a MedicineType.
     * @example
     * // Update or create a MedicineType
     * const medicineType = await prisma.medicineType.upsert({
     *   create: {
     *     // ... data to create a MedicineType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicineType we want to update
     *   }
     * })
     */
    upsert<T extends MedicineTypeUpsertArgs>(args: SelectSubset<T, MedicineTypeUpsertArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicineTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineTypeCountArgs} args - Arguments to filter MedicineTypes to count.
     * @example
     * // Count the number of MedicineTypes
     * const count = await prisma.medicineType.count({
     *   where: {
     *     // ... the filter for the MedicineTypes we want to count
     *   }
     * })
    **/
    count<T extends MedicineTypeCountArgs>(
      args?: Subset<T, MedicineTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicineTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicineType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicineTypeAggregateArgs>(args: Subset<T, MedicineTypeAggregateArgs>): Prisma.PrismaPromise<GetMedicineTypeAggregateType<T>>

    /**
     * Group by MedicineType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineTypeGroupByArgs} args - Group by arguments.
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
      T extends MedicineTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicineTypeGroupByArgs['orderBy'] }
        : { orderBy?: MedicineTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MedicineTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicineTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicineType model
   */
  readonly fields: MedicineTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicineType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicineTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medicineBatch<T extends MedicineType$medicineBatchArgs<ExtArgs> = {}>(args?: Subset<T, MedicineType$medicineBatchArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    prescription<T extends MedicineType$prescriptionArgs<ExtArgs> = {}>(args?: Subset<T, MedicineType$prescriptionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the MedicineType model
   */
  interface MedicineTypeFieldRefs {
    readonly id: FieldRef<"MedicineType", 'String'>
    readonly name: FieldRef<"MedicineType", 'String'>
    readonly form: FieldRef<"MedicineType", 'String'>
    readonly strength: FieldRef<"MedicineType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MedicineType findUnique
   */
  export type MedicineTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * Filter, which MedicineType to fetch.
     */
    where: MedicineTypeWhereUniqueInput
  }

  /**
   * MedicineType findUniqueOrThrow
   */
  export type MedicineTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * Filter, which MedicineType to fetch.
     */
    where: MedicineTypeWhereUniqueInput
  }

  /**
   * MedicineType findFirst
   */
  export type MedicineTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * Filter, which MedicineType to fetch.
     */
    where?: MedicineTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineTypes to fetch.
     */
    orderBy?: MedicineTypeOrderByWithRelationInput | MedicineTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicineTypes.
     */
    cursor?: MedicineTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicineTypes.
     */
    distinct?: MedicineTypeScalarFieldEnum | MedicineTypeScalarFieldEnum[]
  }

  /**
   * MedicineType findFirstOrThrow
   */
  export type MedicineTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * Filter, which MedicineType to fetch.
     */
    where?: MedicineTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineTypes to fetch.
     */
    orderBy?: MedicineTypeOrderByWithRelationInput | MedicineTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicineTypes.
     */
    cursor?: MedicineTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicineTypes.
     */
    distinct?: MedicineTypeScalarFieldEnum | MedicineTypeScalarFieldEnum[]
  }

  /**
   * MedicineType findMany
   */
  export type MedicineTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * Filter, which MedicineTypes to fetch.
     */
    where?: MedicineTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineTypes to fetch.
     */
    orderBy?: MedicineTypeOrderByWithRelationInput | MedicineTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicineTypes.
     */
    cursor?: MedicineTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineTypes.
     */
    skip?: number
    distinct?: MedicineTypeScalarFieldEnum | MedicineTypeScalarFieldEnum[]
  }

  /**
   * MedicineType create
   */
  export type MedicineTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicineType.
     */
    data: XOR<MedicineTypeCreateInput, MedicineTypeUncheckedCreateInput>
  }

  /**
   * MedicineType createMany
   */
  export type MedicineTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicineTypes.
     */
    data: MedicineTypeCreateManyInput | MedicineTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicineType createManyAndReturn
   */
  export type MedicineTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * The data used to create many MedicineTypes.
     */
    data: MedicineTypeCreateManyInput | MedicineTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicineType update
   */
  export type MedicineTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicineType.
     */
    data: XOR<MedicineTypeUpdateInput, MedicineTypeUncheckedUpdateInput>
    /**
     * Choose, which MedicineType to update.
     */
    where: MedicineTypeWhereUniqueInput
  }

  /**
   * MedicineType updateMany
   */
  export type MedicineTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicineTypes.
     */
    data: XOR<MedicineTypeUpdateManyMutationInput, MedicineTypeUncheckedUpdateManyInput>
    /**
     * Filter which MedicineTypes to update
     */
    where?: MedicineTypeWhereInput
    /**
     * Limit how many MedicineTypes to update.
     */
    limit?: number
  }

  /**
   * MedicineType updateManyAndReturn
   */
  export type MedicineTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * The data used to update MedicineTypes.
     */
    data: XOR<MedicineTypeUpdateManyMutationInput, MedicineTypeUncheckedUpdateManyInput>
    /**
     * Filter which MedicineTypes to update
     */
    where?: MedicineTypeWhereInput
    /**
     * Limit how many MedicineTypes to update.
     */
    limit?: number
  }

  /**
   * MedicineType upsert
   */
  export type MedicineTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicineType to update in case it exists.
     */
    where: MedicineTypeWhereUniqueInput
    /**
     * In case the MedicineType found by the `where` argument doesn't exist, create a new MedicineType with this data.
     */
    create: XOR<MedicineTypeCreateInput, MedicineTypeUncheckedCreateInput>
    /**
     * In case the MedicineType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicineTypeUpdateInput, MedicineTypeUncheckedUpdateInput>
  }

  /**
   * MedicineType delete
   */
  export type MedicineTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
    /**
     * Filter which MedicineType to delete.
     */
    where: MedicineTypeWhereUniqueInput
  }

  /**
   * MedicineType deleteMany
   */
  export type MedicineTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineTypes to delete
     */
    where?: MedicineTypeWhereInput
    /**
     * Limit how many MedicineTypes to delete.
     */
    limit?: number
  }

  /**
   * MedicineType.medicineBatch
   */
  export type MedicineType$medicineBatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    where?: MedicineBatchWhereInput
    orderBy?: MedicineBatchOrderByWithRelationInput | MedicineBatchOrderByWithRelationInput[]
    cursor?: MedicineBatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MedicineBatchScalarFieldEnum | MedicineBatchScalarFieldEnum[]
  }

  /**
   * MedicineType.prescription
   */
  export type MedicineType$prescriptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    cursor?: PrescriptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * MedicineType without action
   */
  export type MedicineTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineType
     */
    select?: MedicineTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineType
     */
    omit?: MedicineTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineTypeInclude<ExtArgs> | null
  }


  /**
   * Model MedicineBatch
   */

  export type AggregateMedicineBatch = {
    _count: MedicineBatchCountAggregateOutputType | null
    _avg: MedicineBatchAvgAggregateOutputType | null
    _sum: MedicineBatchSumAggregateOutputType | null
    _min: MedicineBatchMinAggregateOutputType | null
    _max: MedicineBatchMaxAggregateOutputType | null
  }

  export type MedicineBatchAvgAggregateOutputType = {
    quantity: number | null
  }

  export type MedicineBatchSumAggregateOutputType = {
    quantity: number | null
  }

  export type MedicineBatchMinAggregateOutputType = {
    id: string | null
    medicineId: string | null
    batchNumber: string | null
    expiryDate: Date | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicineBatchMaxAggregateOutputType = {
    id: string | null
    medicineId: string | null
    batchNumber: string | null
    expiryDate: Date | null
    quantity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MedicineBatchCountAggregateOutputType = {
    id: number
    medicineId: number
    batchNumber: number
    expiryDate: number
    quantity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MedicineBatchAvgAggregateInputType = {
    quantity?: true
  }

  export type MedicineBatchSumAggregateInputType = {
    quantity?: true
  }

  export type MedicineBatchMinAggregateInputType = {
    id?: true
    medicineId?: true
    batchNumber?: true
    expiryDate?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicineBatchMaxAggregateInputType = {
    id?: true
    medicineId?: true
    batchNumber?: true
    expiryDate?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MedicineBatchCountAggregateInputType = {
    id?: true
    medicineId?: true
    batchNumber?: true
    expiryDate?: true
    quantity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MedicineBatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineBatch to aggregate.
     */
    where?: MedicineBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineBatches to fetch.
     */
    orderBy?: MedicineBatchOrderByWithRelationInput | MedicineBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MedicineBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MedicineBatches
    **/
    _count?: true | MedicineBatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MedicineBatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MedicineBatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MedicineBatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MedicineBatchMaxAggregateInputType
  }

  export type GetMedicineBatchAggregateType<T extends MedicineBatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicineBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicineBatch[P]>
      : GetScalarType<T[P], AggregateMedicineBatch[P]>
  }




  export type MedicineBatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MedicineBatchWhereInput
    orderBy?: MedicineBatchOrderByWithAggregationInput | MedicineBatchOrderByWithAggregationInput[]
    by: MedicineBatchScalarFieldEnum[] | MedicineBatchScalarFieldEnum
    having?: MedicineBatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MedicineBatchCountAggregateInputType | true
    _avg?: MedicineBatchAvgAggregateInputType
    _sum?: MedicineBatchSumAggregateInputType
    _min?: MedicineBatchMinAggregateInputType
    _max?: MedicineBatchMaxAggregateInputType
  }

  export type MedicineBatchGroupByOutputType = {
    id: string
    medicineId: string
    batchNumber: string
    expiryDate: Date
    quantity: number
    createdAt: Date
    updatedAt: Date
    _count: MedicineBatchCountAggregateOutputType | null
    _avg: MedicineBatchAvgAggregateOutputType | null
    _sum: MedicineBatchSumAggregateOutputType | null
    _min: MedicineBatchMinAggregateOutputType | null
    _max: MedicineBatchMaxAggregateOutputType | null
  }

  type GetMedicineBatchGroupByPayload<T extends MedicineBatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MedicineBatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MedicineBatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MedicineBatchGroupByOutputType[P]>
            : GetScalarType<T[P], MedicineBatchGroupByOutputType[P]>
        }
      >
    >


  export type MedicineBatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medicineId?: boolean
    batchNumber?: boolean
    expiryDate?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicineBatch"]>

  export type MedicineBatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medicineId?: boolean
    batchNumber?: boolean
    expiryDate?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicineBatch"]>

  export type MedicineBatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    medicineId?: boolean
    batchNumber?: boolean
    expiryDate?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicineBatch"]>

  export type MedicineBatchSelectScalar = {
    id?: boolean
    medicineId?: boolean
    batchNumber?: boolean
    expiryDate?: boolean
    quantity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MedicineBatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "medicineId" | "batchNumber" | "expiryDate" | "quantity" | "createdAt" | "updatedAt", ExtArgs["result"]["medicineBatch"]>
  export type MedicineBatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }
  export type MedicineBatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }
  export type MedicineBatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }

  export type $MedicineBatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MedicineBatch"
    objects: {
      medicine: Prisma.$MedicineTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      medicineId: string
      batchNumber: string
      expiryDate: Date
      quantity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["medicineBatch"]>
    composites: {}
  }

  type MedicineBatchGetPayload<S extends boolean | null | undefined | MedicineBatchDefaultArgs> = $Result.GetResult<Prisma.$MedicineBatchPayload, S>

  type MedicineBatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MedicineBatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MedicineBatchCountAggregateInputType | true
    }

  export interface MedicineBatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MedicineBatch'], meta: { name: 'MedicineBatch' } }
    /**
     * Find zero or one MedicineBatch that matches the filter.
     * @param {MedicineBatchFindUniqueArgs} args - Arguments to find a MedicineBatch
     * @example
     * // Get one MedicineBatch
     * const medicineBatch = await prisma.medicineBatch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MedicineBatchFindUniqueArgs>(args: SelectSubset<T, MedicineBatchFindUniqueArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MedicineBatch that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MedicineBatchFindUniqueOrThrowArgs} args - Arguments to find a MedicineBatch
     * @example
     * // Get one MedicineBatch
     * const medicineBatch = await prisma.medicineBatch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MedicineBatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MedicineBatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicineBatch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineBatchFindFirstArgs} args - Arguments to find a MedicineBatch
     * @example
     * // Get one MedicineBatch
     * const medicineBatch = await prisma.medicineBatch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MedicineBatchFindFirstArgs>(args?: SelectSubset<T, MedicineBatchFindFirstArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MedicineBatch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineBatchFindFirstOrThrowArgs} args - Arguments to find a MedicineBatch
     * @example
     * // Get one MedicineBatch
     * const medicineBatch = await prisma.medicineBatch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MedicineBatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MedicineBatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MedicineBatches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineBatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MedicineBatches
     * const medicineBatches = await prisma.medicineBatch.findMany()
     * 
     * // Get first 10 MedicineBatches
     * const medicineBatches = await prisma.medicineBatch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const medicineBatchWithIdOnly = await prisma.medicineBatch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MedicineBatchFindManyArgs>(args?: SelectSubset<T, MedicineBatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MedicineBatch.
     * @param {MedicineBatchCreateArgs} args - Arguments to create a MedicineBatch.
     * @example
     * // Create one MedicineBatch
     * const MedicineBatch = await prisma.medicineBatch.create({
     *   data: {
     *     // ... data to create a MedicineBatch
     *   }
     * })
     * 
     */
    create<T extends MedicineBatchCreateArgs>(args: SelectSubset<T, MedicineBatchCreateArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MedicineBatches.
     * @param {MedicineBatchCreateManyArgs} args - Arguments to create many MedicineBatches.
     * @example
     * // Create many MedicineBatches
     * const medicineBatch = await prisma.medicineBatch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MedicineBatchCreateManyArgs>(args?: SelectSubset<T, MedicineBatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MedicineBatches and returns the data saved in the database.
     * @param {MedicineBatchCreateManyAndReturnArgs} args - Arguments to create many MedicineBatches.
     * @example
     * // Create many MedicineBatches
     * const medicineBatch = await prisma.medicineBatch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MedicineBatches and only return the `id`
     * const medicineBatchWithIdOnly = await prisma.medicineBatch.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MedicineBatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MedicineBatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MedicineBatch.
     * @param {MedicineBatchDeleteArgs} args - Arguments to delete one MedicineBatch.
     * @example
     * // Delete one MedicineBatch
     * const MedicineBatch = await prisma.medicineBatch.delete({
     *   where: {
     *     // ... filter to delete one MedicineBatch
     *   }
     * })
     * 
     */
    delete<T extends MedicineBatchDeleteArgs>(args: SelectSubset<T, MedicineBatchDeleteArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MedicineBatch.
     * @param {MedicineBatchUpdateArgs} args - Arguments to update one MedicineBatch.
     * @example
     * // Update one MedicineBatch
     * const medicineBatch = await prisma.medicineBatch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MedicineBatchUpdateArgs>(args: SelectSubset<T, MedicineBatchUpdateArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MedicineBatches.
     * @param {MedicineBatchDeleteManyArgs} args - Arguments to filter MedicineBatches to delete.
     * @example
     * // Delete a few MedicineBatches
     * const { count } = await prisma.medicineBatch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MedicineBatchDeleteManyArgs>(args?: SelectSubset<T, MedicineBatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicineBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineBatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MedicineBatches
     * const medicineBatch = await prisma.medicineBatch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MedicineBatchUpdateManyArgs>(args: SelectSubset<T, MedicineBatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MedicineBatches and returns the data updated in the database.
     * @param {MedicineBatchUpdateManyAndReturnArgs} args - Arguments to update many MedicineBatches.
     * @example
     * // Update many MedicineBatches
     * const medicineBatch = await prisma.medicineBatch.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MedicineBatches and only return the `id`
     * const medicineBatchWithIdOnly = await prisma.medicineBatch.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MedicineBatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MedicineBatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MedicineBatch.
     * @param {MedicineBatchUpsertArgs} args - Arguments to update or create a MedicineBatch.
     * @example
     * // Update or create a MedicineBatch
     * const medicineBatch = await prisma.medicineBatch.upsert({
     *   create: {
     *     // ... data to create a MedicineBatch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MedicineBatch we want to update
     *   }
     * })
     */
    upsert<T extends MedicineBatchUpsertArgs>(args: SelectSubset<T, MedicineBatchUpsertArgs<ExtArgs>>): Prisma__MedicineBatchClient<$Result.GetResult<Prisma.$MedicineBatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MedicineBatches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineBatchCountArgs} args - Arguments to filter MedicineBatches to count.
     * @example
     * // Count the number of MedicineBatches
     * const count = await prisma.medicineBatch.count({
     *   where: {
     *     // ... the filter for the MedicineBatches we want to count
     *   }
     * })
    **/
    count<T extends MedicineBatchCountArgs>(
      args?: Subset<T, MedicineBatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MedicineBatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MedicineBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineBatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MedicineBatchAggregateArgs>(args: Subset<T, MedicineBatchAggregateArgs>): Prisma.PrismaPromise<GetMedicineBatchAggregateType<T>>

    /**
     * Group by MedicineBatch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MedicineBatchGroupByArgs} args - Group by arguments.
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
      T extends MedicineBatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MedicineBatchGroupByArgs['orderBy'] }
        : { orderBy?: MedicineBatchGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MedicineBatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicineBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MedicineBatch model
   */
  readonly fields: MedicineBatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MedicineBatch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MedicineBatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medicine<T extends MedicineTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicineTypeDefaultArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the MedicineBatch model
   */
  interface MedicineBatchFieldRefs {
    readonly id: FieldRef<"MedicineBatch", 'String'>
    readonly medicineId: FieldRef<"MedicineBatch", 'String'>
    readonly batchNumber: FieldRef<"MedicineBatch", 'String'>
    readonly expiryDate: FieldRef<"MedicineBatch", 'DateTime'>
    readonly quantity: FieldRef<"MedicineBatch", 'Int'>
    readonly createdAt: FieldRef<"MedicineBatch", 'DateTime'>
    readonly updatedAt: FieldRef<"MedicineBatch", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MedicineBatch findUnique
   */
  export type MedicineBatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * Filter, which MedicineBatch to fetch.
     */
    where: MedicineBatchWhereUniqueInput
  }

  /**
   * MedicineBatch findUniqueOrThrow
   */
  export type MedicineBatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * Filter, which MedicineBatch to fetch.
     */
    where: MedicineBatchWhereUniqueInput
  }

  /**
   * MedicineBatch findFirst
   */
  export type MedicineBatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * Filter, which MedicineBatch to fetch.
     */
    where?: MedicineBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineBatches to fetch.
     */
    orderBy?: MedicineBatchOrderByWithRelationInput | MedicineBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicineBatches.
     */
    cursor?: MedicineBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicineBatches.
     */
    distinct?: MedicineBatchScalarFieldEnum | MedicineBatchScalarFieldEnum[]
  }

  /**
   * MedicineBatch findFirstOrThrow
   */
  export type MedicineBatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * Filter, which MedicineBatch to fetch.
     */
    where?: MedicineBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineBatches to fetch.
     */
    orderBy?: MedicineBatchOrderByWithRelationInput | MedicineBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MedicineBatches.
     */
    cursor?: MedicineBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineBatches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MedicineBatches.
     */
    distinct?: MedicineBatchScalarFieldEnum | MedicineBatchScalarFieldEnum[]
  }

  /**
   * MedicineBatch findMany
   */
  export type MedicineBatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * Filter, which MedicineBatches to fetch.
     */
    where?: MedicineBatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MedicineBatches to fetch.
     */
    orderBy?: MedicineBatchOrderByWithRelationInput | MedicineBatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MedicineBatches.
     */
    cursor?: MedicineBatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MedicineBatches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MedicineBatches.
     */
    skip?: number
    distinct?: MedicineBatchScalarFieldEnum | MedicineBatchScalarFieldEnum[]
  }

  /**
   * MedicineBatch create
   */
  export type MedicineBatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * The data needed to create a MedicineBatch.
     */
    data: XOR<MedicineBatchCreateInput, MedicineBatchUncheckedCreateInput>
  }

  /**
   * MedicineBatch createMany
   */
  export type MedicineBatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MedicineBatches.
     */
    data: MedicineBatchCreateManyInput | MedicineBatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MedicineBatch createManyAndReturn
   */
  export type MedicineBatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * The data used to create many MedicineBatches.
     */
    data: MedicineBatchCreateManyInput | MedicineBatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicineBatch update
   */
  export type MedicineBatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * The data needed to update a MedicineBatch.
     */
    data: XOR<MedicineBatchUpdateInput, MedicineBatchUncheckedUpdateInput>
    /**
     * Choose, which MedicineBatch to update.
     */
    where: MedicineBatchWhereUniqueInput
  }

  /**
   * MedicineBatch updateMany
   */
  export type MedicineBatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MedicineBatches.
     */
    data: XOR<MedicineBatchUpdateManyMutationInput, MedicineBatchUncheckedUpdateManyInput>
    /**
     * Filter which MedicineBatches to update
     */
    where?: MedicineBatchWhereInput
    /**
     * Limit how many MedicineBatches to update.
     */
    limit?: number
  }

  /**
   * MedicineBatch updateManyAndReturn
   */
  export type MedicineBatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * The data used to update MedicineBatches.
     */
    data: XOR<MedicineBatchUpdateManyMutationInput, MedicineBatchUncheckedUpdateManyInput>
    /**
     * Filter which MedicineBatches to update
     */
    where?: MedicineBatchWhereInput
    /**
     * Limit how many MedicineBatches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MedicineBatch upsert
   */
  export type MedicineBatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * The filter to search for the MedicineBatch to update in case it exists.
     */
    where: MedicineBatchWhereUniqueInput
    /**
     * In case the MedicineBatch found by the `where` argument doesn't exist, create a new MedicineBatch with this data.
     */
    create: XOR<MedicineBatchCreateInput, MedicineBatchUncheckedCreateInput>
    /**
     * In case the MedicineBatch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MedicineBatchUpdateInput, MedicineBatchUncheckedUpdateInput>
  }

  /**
   * MedicineBatch delete
   */
  export type MedicineBatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
    /**
     * Filter which MedicineBatch to delete.
     */
    where: MedicineBatchWhereUniqueInput
  }

  /**
   * MedicineBatch deleteMany
   */
  export type MedicineBatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MedicineBatches to delete
     */
    where?: MedicineBatchWhereInput
    /**
     * Limit how many MedicineBatches to delete.
     */
    limit?: number
  }

  /**
   * MedicineBatch without action
   */
  export type MedicineBatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MedicineBatch
     */
    select?: MedicineBatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MedicineBatch
     */
    omit?: MedicineBatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MedicineBatchInclude<ExtArgs> | null
  }


  /**
   * Model Prescription
   */

  export type AggregatePrescription = {
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  export type PrescriptionMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    doctorId: string | null
    medicineId: string | null
    dosage: string | null
    duration: string | null
  }

  export type PrescriptionMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    patientId: string | null
    doctorId: string | null
    medicineId: string | null
    dosage: string | null
    duration: string | null
  }

  export type PrescriptionCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    patientId: number
    doctorId: number
    medicineId: number
    dosage: number
    duration: number
    _all: number
  }


  export type PrescriptionMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    doctorId?: true
    medicineId?: true
    dosage?: true
    duration?: true
  }

  export type PrescriptionMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    doctorId?: true
    medicineId?: true
    dosage?: true
    duration?: true
  }

  export type PrescriptionCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    patientId?: true
    doctorId?: true
    medicineId?: true
    dosage?: true
    duration?: true
    _all?: true
  }

  export type PrescriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescription to aggregate.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prescriptions
    **/
    _count?: true | PrescriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrescriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrescriptionMaxAggregateInputType
  }

  export type GetPrescriptionAggregateType<T extends PrescriptionAggregateArgs> = {
        [P in keyof T & keyof AggregatePrescription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrescription[P]>
      : GetScalarType<T[P], AggregatePrescription[P]>
  }




  export type PrescriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrescriptionWhereInput
    orderBy?: PrescriptionOrderByWithAggregationInput | PrescriptionOrderByWithAggregationInput[]
    by: PrescriptionScalarFieldEnum[] | PrescriptionScalarFieldEnum
    having?: PrescriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrescriptionCountAggregateInputType | true
    _min?: PrescriptionMinAggregateInputType
    _max?: PrescriptionMaxAggregateInputType
  }

  export type PrescriptionGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    patientId: string
    doctorId: string
    medicineId: string
    dosage: string
    duration: string
    _count: PrescriptionCountAggregateOutputType | null
    _min: PrescriptionMinAggregateOutputType | null
    _max: PrescriptionMaxAggregateOutputType | null
  }

  type GetPrescriptionGroupByPayload<T extends PrescriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrescriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrescriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
            : GetScalarType<T[P], PrescriptionGroupByOutputType[P]>
        }
      >
    >


  export type PrescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    doctorId?: boolean
    medicineId?: boolean
    dosage?: boolean
    duration?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    doctorId?: boolean
    medicineId?: boolean
    dosage?: boolean
    duration?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    doctorId?: boolean
    medicineId?: boolean
    dosage?: boolean
    duration?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prescription"]>

  export type PrescriptionSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patientId?: boolean
    doctorId?: boolean
    medicineId?: boolean
    dosage?: boolean
    duration?: boolean
  }

  export type PrescriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "patientId" | "doctorId" | "medicineId" | "dosage" | "duration", ExtArgs["result"]["prescription"]>
  export type PrescriptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }
  export type PrescriptionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }
  export type PrescriptionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    doctor?: boolean | DoctorDefaultArgs<ExtArgs>
    medicine?: boolean | MedicineTypeDefaultArgs<ExtArgs>
  }

  export type $PrescriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prescription"
    objects: {
      patient: Prisma.$PatientPayload<ExtArgs>
      doctor: Prisma.$DoctorPayload<ExtArgs>
      medicine: Prisma.$MedicineTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      patientId: string
      doctorId: string
      medicineId: string
      dosage: string
      duration: string
    }, ExtArgs["result"]["prescription"]>
    composites: {}
  }

  type PrescriptionGetPayload<S extends boolean | null | undefined | PrescriptionDefaultArgs> = $Result.GetResult<Prisma.$PrescriptionPayload, S>

  type PrescriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrescriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrescriptionCountAggregateInputType | true
    }

  export interface PrescriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prescription'], meta: { name: 'Prescription' } }
    /**
     * Find zero or one Prescription that matches the filter.
     * @param {PrescriptionFindUniqueArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrescriptionFindUniqueArgs>(args: SelectSubset<T, PrescriptionFindUniqueArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prescription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrescriptionFindUniqueOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrescriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, PrescriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrescriptionFindFirstArgs>(args?: SelectSubset<T, PrescriptionFindFirstArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prescription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindFirstOrThrowArgs} args - Arguments to find a Prescription
     * @example
     * // Get one Prescription
     * const prescription = await prisma.prescription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrescriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, PrescriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prescriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prescriptions
     * const prescriptions = await prisma.prescription.findMany()
     * 
     * // Get first 10 Prescriptions
     * const prescriptions = await prisma.prescription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrescriptionFindManyArgs>(args?: SelectSubset<T, PrescriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prescription.
     * @param {PrescriptionCreateArgs} args - Arguments to create a Prescription.
     * @example
     * // Create one Prescription
     * const Prescription = await prisma.prescription.create({
     *   data: {
     *     // ... data to create a Prescription
     *   }
     * })
     * 
     */
    create<T extends PrescriptionCreateArgs>(args: SelectSubset<T, PrescriptionCreateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prescriptions.
     * @param {PrescriptionCreateManyArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrescriptionCreateManyArgs>(args?: SelectSubset<T, PrescriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prescriptions and returns the data saved in the database.
     * @param {PrescriptionCreateManyAndReturnArgs} args - Arguments to create many Prescriptions.
     * @example
     * // Create many Prescriptions
     * const prescription = await prisma.prescription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrescriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, PrescriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prescription.
     * @param {PrescriptionDeleteArgs} args - Arguments to delete one Prescription.
     * @example
     * // Delete one Prescription
     * const Prescription = await prisma.prescription.delete({
     *   where: {
     *     // ... filter to delete one Prescription
     *   }
     * })
     * 
     */
    delete<T extends PrescriptionDeleteArgs>(args: SelectSubset<T, PrescriptionDeleteArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prescription.
     * @param {PrescriptionUpdateArgs} args - Arguments to update one Prescription.
     * @example
     * // Update one Prescription
     * const prescription = await prisma.prescription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrescriptionUpdateArgs>(args: SelectSubset<T, PrescriptionUpdateArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prescriptions.
     * @param {PrescriptionDeleteManyArgs} args - Arguments to filter Prescriptions to delete.
     * @example
     * // Delete a few Prescriptions
     * const { count } = await prisma.prescription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrescriptionDeleteManyArgs>(args?: SelectSubset<T, PrescriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrescriptionUpdateManyArgs>(args: SelectSubset<T, PrescriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prescriptions and returns the data updated in the database.
     * @param {PrescriptionUpdateManyAndReturnArgs} args - Arguments to update many Prescriptions.
     * @example
     * // Update many Prescriptions
     * const prescription = await prisma.prescription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prescriptions and only return the `id`
     * const prescriptionWithIdOnly = await prisma.prescription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrescriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, PrescriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prescription.
     * @param {PrescriptionUpsertArgs} args - Arguments to update or create a Prescription.
     * @example
     * // Update or create a Prescription
     * const prescription = await prisma.prescription.upsert({
     *   create: {
     *     // ... data to create a Prescription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prescription we want to update
     *   }
     * })
     */
    upsert<T extends PrescriptionUpsertArgs>(args: SelectSubset<T, PrescriptionUpsertArgs<ExtArgs>>): Prisma__PrescriptionClient<$Result.GetResult<Prisma.$PrescriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prescriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionCountArgs} args - Arguments to filter Prescriptions to count.
     * @example
     * // Count the number of Prescriptions
     * const count = await prisma.prescription.count({
     *   where: {
     *     // ... the filter for the Prescriptions we want to count
     *   }
     * })
    **/
    count<T extends PrescriptionCountArgs>(
      args?: Subset<T, PrescriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrescriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrescriptionAggregateArgs>(args: Subset<T, PrescriptionAggregateArgs>): Prisma.PrismaPromise<GetPrescriptionAggregateType<T>>

    /**
     * Group by Prescription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrescriptionGroupByArgs} args - Group by arguments.
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
      T extends PrescriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrescriptionGroupByArgs['orderBy'] }
        : { orderBy?: PrescriptionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PrescriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrescriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prescription model
   */
  readonly fields: PrescriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prescription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrescriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    doctor<T extends DoctorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DoctorDefaultArgs<ExtArgs>>): Prisma__DoctorClient<$Result.GetResult<Prisma.$DoctorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    medicine<T extends MedicineTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MedicineTypeDefaultArgs<ExtArgs>>): Prisma__MedicineTypeClient<$Result.GetResult<Prisma.$MedicineTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Prescription model
   */
  interface PrescriptionFieldRefs {
    readonly id: FieldRef<"Prescription", 'String'>
    readonly createdAt: FieldRef<"Prescription", 'DateTime'>
    readonly updatedAt: FieldRef<"Prescription", 'DateTime'>
    readonly patientId: FieldRef<"Prescription", 'String'>
    readonly doctorId: FieldRef<"Prescription", 'String'>
    readonly medicineId: FieldRef<"Prescription", 'String'>
    readonly dosage: FieldRef<"Prescription", 'String'>
    readonly duration: FieldRef<"Prescription", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Prescription findUnique
   */
  export type PrescriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findUniqueOrThrow
   */
  export type PrescriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription findFirst
   */
  export type PrescriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findFirstOrThrow
   */
  export type PrescriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescription to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prescriptions.
     */
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription findMany
   */
  export type PrescriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter, which Prescriptions to fetch.
     */
    where?: PrescriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prescriptions to fetch.
     */
    orderBy?: PrescriptionOrderByWithRelationInput | PrescriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prescriptions.
     */
    cursor?: PrescriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prescriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prescriptions.
     */
    skip?: number
    distinct?: PrescriptionScalarFieldEnum | PrescriptionScalarFieldEnum[]
  }

  /**
   * Prescription create
   */
  export type PrescriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Prescription.
     */
    data: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
  }

  /**
   * Prescription createMany
   */
  export type PrescriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prescription createManyAndReturn
   */
  export type PrescriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to create many Prescriptions.
     */
    data: PrescriptionCreateManyInput | PrescriptionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prescription update
   */
  export type PrescriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Prescription.
     */
    data: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
    /**
     * Choose, which Prescription to update.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription updateMany
   */
  export type PrescriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
  }

  /**
   * Prescription updateManyAndReturn
   */
  export type PrescriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * The data used to update Prescriptions.
     */
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyInput>
    /**
     * Filter which Prescriptions to update
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prescription upsert
   */
  export type PrescriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Prescription to update in case it exists.
     */
    where: PrescriptionWhereUniqueInput
    /**
     * In case the Prescription found by the `where` argument doesn't exist, create a new Prescription with this data.
     */
    create: XOR<PrescriptionCreateInput, PrescriptionUncheckedCreateInput>
    /**
     * In case the Prescription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrescriptionUpdateInput, PrescriptionUncheckedUpdateInput>
  }

  /**
   * Prescription delete
   */
  export type PrescriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
    /**
     * Filter which Prescription to delete.
     */
    where: PrescriptionWhereUniqueInput
  }

  /**
   * Prescription deleteMany
   */
  export type PrescriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prescriptions to delete
     */
    where?: PrescriptionWhereInput
    /**
     * Limit how many Prescriptions to delete.
     */
    limit?: number
  }

  /**
   * Prescription without action
   */
  export type PrescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prescription
     */
    select?: PrescriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prescription
     */
    omit?: PrescriptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrescriptionInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    content: string | null
    published: boolean | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    slug: string | null
    content: string | null
    published: boolean | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    slug: number
    content: number
    published: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    content?: true
    published?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    content?: true
    published?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    slug?: true
    content?: true
    published?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    slug: string
    content: string
    published: boolean | null
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    published?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "title" | "slug" | "content" | "published", ExtArgs["result"]["post"]>

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      title: string
      slug: string
      content: string
      published: boolean | null
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
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
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly title: FieldRef<"Post", 'String'>
    readonly slug: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly published: FieldRef<"Post", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PatientScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    archived: 'archived',
    userId: 'userId',
    name: 'name',
    gender: 'gender',
    dateOfBirth: 'dateOfBirth',
    city: 'city',
    barangay: 'barangay'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const PatientVisitScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    patientId: 'patientId',
    reason: 'reason',
    status: 'status',
    date: 'date'
  };

  export type PatientVisitScalarFieldEnum = (typeof PatientVisitScalarFieldEnum)[keyof typeof PatientVisitScalarFieldEnum]


  export const AssessmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    patientId: 'patientId',
    symptoms: 'symptoms',
    assessment: 'assessment',
    diagnosis: 'diagnosis',
    bloodPressure: 'bloodPressure',
    pulseRate: 'pulseRate',
    respiratoryRate: 'respiratoryRate',
    oxygenSaturation: 'oxygenSaturation',
    alcoholUse: 'alcoholUse',
    smoker: 'smoker',
    allergies: 'allergies',
    painLocation: 'painLocation',
    painScale: 'painScale'
  };

  export type AssessmentScalarFieldEnum = (typeof AssessmentScalarFieldEnum)[keyof typeof AssessmentScalarFieldEnum]


  export const TreatmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    patientId: 'patientId',
    visitId: 'visitId',
    assessmentId: 'assessmentId',
    medications: 'medications',
    procedures: 'procedures',
    painScale: 'painScale',
    remarks: 'remarks',
    status: 'status',
    priority: 'priority',
    nextFollowUpAt: 'nextFollowUpAt'
  };

  export type TreatmentScalarFieldEnum = (typeof TreatmentScalarFieldEnum)[keyof typeof TreatmentScalarFieldEnum]


  export const FollowUpScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    treatmentId: 'treatmentId',
    note: 'note',
    findings: 'findings',
    outcome: 'outcome',
    nextAction: 'nextAction',
    painScale: 'painScale',
    vitals: 'vitals',
    followUpDate: 'followUpDate',
    nextFollowUp: 'nextFollowUp',
    resolved: 'resolved'
  };

  export type FollowUpScalarFieldEnum = (typeof FollowUpScalarFieldEnum)[keyof typeof FollowUpScalarFieldEnum]


  export const MedicalRecordScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    patientId: 'patientId',
    diagnosis: 'diagnosis',
    treatment: 'treatment',
    notes: 'notes'
  };

  export type MedicalRecordScalarFieldEnum = (typeof MedicalRecordScalarFieldEnum)[keyof typeof MedicalRecordScalarFieldEnum]


  export const DoctorScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    archived: 'archived',
    userId: 'userId',
    field: 'field'
  };

  export type DoctorScalarFieldEnum = (typeof DoctorScalarFieldEnum)[keyof typeof DoctorScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    archived: 'archived',
    patientId: 'patientId',
    doctorId: 'doctorId',
    date: 'date',
    status: 'status'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const MedicineTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    form: 'form',
    strength: 'strength'
  };

  export type MedicineTypeScalarFieldEnum = (typeof MedicineTypeScalarFieldEnum)[keyof typeof MedicineTypeScalarFieldEnum]


  export const MedicineBatchScalarFieldEnum: {
    id: 'id',
    medicineId: 'medicineId',
    batchNumber: 'batchNumber',
    expiryDate: 'expiryDate',
    quantity: 'quantity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MedicineBatchScalarFieldEnum = (typeof MedicineBatchScalarFieldEnum)[keyof typeof MedicineBatchScalarFieldEnum]


  export const PrescriptionScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    patientId: 'patientId',
    doctorId: 'doctorId',
    medicineId: 'medicineId',
    dosage: 'dosage',
    duration: 'duration'
  };

  export type PrescriptionScalarFieldEnum = (typeof PrescriptionScalarFieldEnum)[keyof typeof PrescriptionScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    slug: 'slug',
    content: 'content',
    published: 'published'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'TreatmentStatus'
   */
  export type EnumTreatmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreatmentStatus'>
    


  /**
   * Reference to a field of type 'TreatmentStatus[]'
   */
  export type ListEnumTreatmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TreatmentStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    doctor?: XOR<DoctorNullableScalarRelationFilter, DoctorWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    role?: SortOrder
    patient?: PatientOrderByWithRelationInput
    doctor?: DoctorOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    patient?: XOR<PatientNullableScalarRelationFilter, PatientWhereInput> | null
    doctor?: XOR<DoctorNullableScalarRelationFilter, DoctorWhereInput> | null
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
  }

  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    archived?: BoolFilter<"Patient"> | boolean
    userId?: StringNullableFilter<"Patient"> | string | null
    name?: StringFilter<"Patient"> | string
    gender?: StringNullableFilter<"Patient"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Patient"> | Date | string | null
    city?: StringNullableFilter<"Patient"> | string | null
    barangay?: StringNullableFilter<"Patient"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    patientVisit?: PatientVisitListRelationFilter
    assessment?: AssessmentListRelationFilter
    treatment?: TreatmentListRelationFilter
    medicalRecords?: MedicalRecordListRelationFilter
    appointment?: AppointmentListRelationFilter
    prescription?: PrescriptionListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    barangay?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    patientVisit?: PatientVisitOrderByRelationAggregateInput
    assessment?: AssessmentOrderByRelationAggregateInput
    treatment?: TreatmentOrderByRelationAggregateInput
    medicalRecords?: MedicalRecordOrderByRelationAggregateInput
    appointment?: AppointmentOrderByRelationAggregateInput
    prescription?: PrescriptionOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    archived?: BoolFilter<"Patient"> | boolean
    name?: StringFilter<"Patient"> | string
    gender?: StringNullableFilter<"Patient"> | string | null
    dateOfBirth?: DateTimeNullableFilter<"Patient"> | Date | string | null
    city?: StringNullableFilter<"Patient"> | string | null
    barangay?: StringNullableFilter<"Patient"> | string | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    patientVisit?: PatientVisitListRelationFilter
    assessment?: AssessmentListRelationFilter
    treatment?: TreatmentListRelationFilter
    medicalRecords?: MedicalRecordListRelationFilter
    appointment?: AppointmentListRelationFilter
    prescription?: PrescriptionListRelationFilter
  }, "id" | "userId">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrderInput | SortOrder
    name?: SortOrder
    gender?: SortOrderInput | SortOrder
    dateOfBirth?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    barangay?: SortOrderInput | SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    archived?: BoolWithAggregatesFilter<"Patient"> | boolean
    userId?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    name?: StringWithAggregatesFilter<"Patient"> | string
    gender?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    dateOfBirth?: DateTimeNullableWithAggregatesFilter<"Patient"> | Date | string | null
    city?: StringNullableWithAggregatesFilter<"Patient"> | string | null
    barangay?: StringNullableWithAggregatesFilter<"Patient"> | string | null
  }

  export type PatientVisitWhereInput = {
    AND?: PatientVisitWhereInput | PatientVisitWhereInput[]
    OR?: PatientVisitWhereInput[]
    NOT?: PatientVisitWhereInput | PatientVisitWhereInput[]
    id?: StringFilter<"PatientVisit"> | string
    createdAt?: DateTimeFilter<"PatientVisit"> | Date | string
    updatedAt?: DateTimeFilter<"PatientVisit"> | Date | string
    patientId?: StringFilter<"PatientVisit"> | string
    reason?: StringFilter<"PatientVisit"> | string
    status?: StringFilter<"PatientVisit"> | string
    date?: DateTimeFilter<"PatientVisit"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    treatment?: TreatmentListRelationFilter
  }

  export type PatientVisitOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    date?: SortOrder
    patient?: PatientOrderByWithRelationInput
    treatment?: TreatmentOrderByRelationAggregateInput
  }

  export type PatientVisitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PatientVisitWhereInput | PatientVisitWhereInput[]
    OR?: PatientVisitWhereInput[]
    NOT?: PatientVisitWhereInput | PatientVisitWhereInput[]
    createdAt?: DateTimeFilter<"PatientVisit"> | Date | string
    updatedAt?: DateTimeFilter<"PatientVisit"> | Date | string
    patientId?: StringFilter<"PatientVisit"> | string
    reason?: StringFilter<"PatientVisit"> | string
    status?: StringFilter<"PatientVisit"> | string
    date?: DateTimeFilter<"PatientVisit"> | Date | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    treatment?: TreatmentListRelationFilter
  }, "id">

  export type PatientVisitOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    date?: SortOrder
    _count?: PatientVisitCountOrderByAggregateInput
    _max?: PatientVisitMaxOrderByAggregateInput
    _min?: PatientVisitMinOrderByAggregateInput
  }

  export type PatientVisitScalarWhereWithAggregatesInput = {
    AND?: PatientVisitScalarWhereWithAggregatesInput | PatientVisitScalarWhereWithAggregatesInput[]
    OR?: PatientVisitScalarWhereWithAggregatesInput[]
    NOT?: PatientVisitScalarWhereWithAggregatesInput | PatientVisitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PatientVisit"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PatientVisit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PatientVisit"> | Date | string
    patientId?: StringWithAggregatesFilter<"PatientVisit"> | string
    reason?: StringWithAggregatesFilter<"PatientVisit"> | string
    status?: StringWithAggregatesFilter<"PatientVisit"> | string
    date?: DateTimeWithAggregatesFilter<"PatientVisit"> | Date | string
  }

  export type AssessmentWhereInput = {
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    id?: StringFilter<"Assessment"> | string
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
    patientId?: StringFilter<"Assessment"> | string
    symptoms?: StringFilter<"Assessment"> | string
    assessment?: StringNullableFilter<"Assessment"> | string | null
    diagnosis?: StringNullableFilter<"Assessment"> | string | null
    bloodPressure?: StringFilter<"Assessment"> | string
    pulseRate?: IntFilter<"Assessment"> | number
    respiratoryRate?: IntFilter<"Assessment"> | number
    oxygenSaturation?: FloatNullableFilter<"Assessment"> | number | null
    alcoholUse?: BoolFilter<"Assessment"> | boolean
    smoker?: BoolNullableFilter<"Assessment"> | boolean | null
    allergies?: StringNullableFilter<"Assessment"> | string | null
    painLocation?: StringNullableFilter<"Assessment"> | string | null
    painScale?: IntNullableFilter<"Assessment"> | number | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    treatment?: TreatmentListRelationFilter
  }

  export type AssessmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    symptoms?: SortOrder
    assessment?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    bloodPressure?: SortOrder
    pulseRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrderInput | SortOrder
    alcoholUse?: SortOrder
    smoker?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    painLocation?: SortOrderInput | SortOrder
    painScale?: SortOrderInput | SortOrder
    patient?: PatientOrderByWithRelationInput
    treatment?: TreatmentOrderByRelationAggregateInput
  }

  export type AssessmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AssessmentWhereInput | AssessmentWhereInput[]
    OR?: AssessmentWhereInput[]
    NOT?: AssessmentWhereInput | AssessmentWhereInput[]
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
    patientId?: StringFilter<"Assessment"> | string
    symptoms?: StringFilter<"Assessment"> | string
    assessment?: StringNullableFilter<"Assessment"> | string | null
    diagnosis?: StringNullableFilter<"Assessment"> | string | null
    bloodPressure?: StringFilter<"Assessment"> | string
    pulseRate?: IntFilter<"Assessment"> | number
    respiratoryRate?: IntFilter<"Assessment"> | number
    oxygenSaturation?: FloatNullableFilter<"Assessment"> | number | null
    alcoholUse?: BoolFilter<"Assessment"> | boolean
    smoker?: BoolNullableFilter<"Assessment"> | boolean | null
    allergies?: StringNullableFilter<"Assessment"> | string | null
    painLocation?: StringNullableFilter<"Assessment"> | string | null
    painScale?: IntNullableFilter<"Assessment"> | number | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    treatment?: TreatmentListRelationFilter
  }, "id">

  export type AssessmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    symptoms?: SortOrder
    assessment?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    bloodPressure?: SortOrder
    pulseRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrderInput | SortOrder
    alcoholUse?: SortOrder
    smoker?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    painLocation?: SortOrderInput | SortOrder
    painScale?: SortOrderInput | SortOrder
    _count?: AssessmentCountOrderByAggregateInput
    _avg?: AssessmentAvgOrderByAggregateInput
    _max?: AssessmentMaxOrderByAggregateInput
    _min?: AssessmentMinOrderByAggregateInput
    _sum?: AssessmentSumOrderByAggregateInput
  }

  export type AssessmentScalarWhereWithAggregatesInput = {
    AND?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    OR?: AssessmentScalarWhereWithAggregatesInput[]
    NOT?: AssessmentScalarWhereWithAggregatesInput | AssessmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Assessment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Assessment"> | Date | string
    patientId?: StringWithAggregatesFilter<"Assessment"> | string
    symptoms?: StringWithAggregatesFilter<"Assessment"> | string
    assessment?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    diagnosis?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    bloodPressure?: StringWithAggregatesFilter<"Assessment"> | string
    pulseRate?: IntWithAggregatesFilter<"Assessment"> | number
    respiratoryRate?: IntWithAggregatesFilter<"Assessment"> | number
    oxygenSaturation?: FloatNullableWithAggregatesFilter<"Assessment"> | number | null
    alcoholUse?: BoolWithAggregatesFilter<"Assessment"> | boolean
    smoker?: BoolNullableWithAggregatesFilter<"Assessment"> | boolean | null
    allergies?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    painLocation?: StringNullableWithAggregatesFilter<"Assessment"> | string | null
    painScale?: IntNullableWithAggregatesFilter<"Assessment"> | number | null
  }

  export type TreatmentWhereInput = {
    AND?: TreatmentWhereInput | TreatmentWhereInput[]
    OR?: TreatmentWhereInput[]
    NOT?: TreatmentWhereInput | TreatmentWhereInput[]
    id?: StringFilter<"Treatment"> | string
    createdAt?: DateTimeFilter<"Treatment"> | Date | string
    updatedAt?: DateTimeFilter<"Treatment"> | Date | string
    patientId?: StringFilter<"Treatment"> | string
    visitId?: StringNullableFilter<"Treatment"> | string | null
    assessmentId?: StringNullableFilter<"Treatment"> | string | null
    medications?: JsonNullableFilter<"Treatment">
    procedures?: StringNullableFilter<"Treatment"> | string | null
    painScale?: IntNullableFilter<"Treatment"> | number | null
    remarks?: StringNullableFilter<"Treatment"> | string | null
    status?: EnumTreatmentStatusFilter<"Treatment"> | $Enums.TreatmentStatus
    priority?: IntNullableFilter<"Treatment"> | number | null
    nextFollowUpAt?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    visit?: XOR<PatientVisitNullableScalarRelationFilter, PatientVisitWhereInput> | null
    assessment?: XOR<AssessmentNullableScalarRelationFilter, AssessmentWhereInput> | null
    followUps?: FollowUpListRelationFilter
  }

  export type TreatmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    visitId?: SortOrderInput | SortOrder
    assessmentId?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    procedures?: SortOrderInput | SortOrder
    painScale?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    nextFollowUpAt?: SortOrderInput | SortOrder
    patient?: PatientOrderByWithRelationInput
    visit?: PatientVisitOrderByWithRelationInput
    assessment?: AssessmentOrderByWithRelationInput
    followUps?: FollowUpOrderByRelationAggregateInput
  }

  export type TreatmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TreatmentWhereInput | TreatmentWhereInput[]
    OR?: TreatmentWhereInput[]
    NOT?: TreatmentWhereInput | TreatmentWhereInput[]
    createdAt?: DateTimeFilter<"Treatment"> | Date | string
    updatedAt?: DateTimeFilter<"Treatment"> | Date | string
    patientId?: StringFilter<"Treatment"> | string
    visitId?: StringNullableFilter<"Treatment"> | string | null
    assessmentId?: StringNullableFilter<"Treatment"> | string | null
    medications?: JsonNullableFilter<"Treatment">
    procedures?: StringNullableFilter<"Treatment"> | string | null
    painScale?: IntNullableFilter<"Treatment"> | number | null
    remarks?: StringNullableFilter<"Treatment"> | string | null
    status?: EnumTreatmentStatusFilter<"Treatment"> | $Enums.TreatmentStatus
    priority?: IntNullableFilter<"Treatment"> | number | null
    nextFollowUpAt?: DateTimeNullableFilter<"Treatment"> | Date | string | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    visit?: XOR<PatientVisitNullableScalarRelationFilter, PatientVisitWhereInput> | null
    assessment?: XOR<AssessmentNullableScalarRelationFilter, AssessmentWhereInput> | null
    followUps?: FollowUpListRelationFilter
  }, "id">

  export type TreatmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    visitId?: SortOrderInput | SortOrder
    assessmentId?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    procedures?: SortOrderInput | SortOrder
    painScale?: SortOrderInput | SortOrder
    remarks?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    nextFollowUpAt?: SortOrderInput | SortOrder
    _count?: TreatmentCountOrderByAggregateInput
    _avg?: TreatmentAvgOrderByAggregateInput
    _max?: TreatmentMaxOrderByAggregateInput
    _min?: TreatmentMinOrderByAggregateInput
    _sum?: TreatmentSumOrderByAggregateInput
  }

  export type TreatmentScalarWhereWithAggregatesInput = {
    AND?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
    OR?: TreatmentScalarWhereWithAggregatesInput[]
    NOT?: TreatmentScalarWhereWithAggregatesInput | TreatmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Treatment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Treatment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Treatment"> | Date | string
    patientId?: StringWithAggregatesFilter<"Treatment"> | string
    visitId?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    assessmentId?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    medications?: JsonNullableWithAggregatesFilter<"Treatment">
    procedures?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    painScale?: IntNullableWithAggregatesFilter<"Treatment"> | number | null
    remarks?: StringNullableWithAggregatesFilter<"Treatment"> | string | null
    status?: EnumTreatmentStatusWithAggregatesFilter<"Treatment"> | $Enums.TreatmentStatus
    priority?: IntNullableWithAggregatesFilter<"Treatment"> | number | null
    nextFollowUpAt?: DateTimeNullableWithAggregatesFilter<"Treatment"> | Date | string | null
  }

  export type FollowUpWhereInput = {
    AND?: FollowUpWhereInput | FollowUpWhereInput[]
    OR?: FollowUpWhereInput[]
    NOT?: FollowUpWhereInput | FollowUpWhereInput[]
    id?: StringFilter<"FollowUp"> | string
    createdAt?: DateTimeFilter<"FollowUp"> | Date | string
    updatedAt?: DateTimeFilter<"FollowUp"> | Date | string
    treatmentId?: StringFilter<"FollowUp"> | string
    note?: StringNullableFilter<"FollowUp"> | string | null
    findings?: StringNullableFilter<"FollowUp"> | string | null
    outcome?: StringNullableFilter<"FollowUp"> | string | null
    nextAction?: StringNullableFilter<"FollowUp"> | string | null
    painScale?: IntNullableFilter<"FollowUp"> | number | null
    vitals?: JsonNullableFilter<"FollowUp">
    followUpDate?: DateTimeFilter<"FollowUp"> | Date | string
    nextFollowUp?: DateTimeNullableFilter<"FollowUp"> | Date | string | null
    resolved?: BoolFilter<"FollowUp"> | boolean
    treatment?: XOR<TreatmentScalarRelationFilter, TreatmentWhereInput>
  }

  export type FollowUpOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    treatmentId?: SortOrder
    note?: SortOrderInput | SortOrder
    findings?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    nextAction?: SortOrderInput | SortOrder
    painScale?: SortOrderInput | SortOrder
    vitals?: SortOrderInput | SortOrder
    followUpDate?: SortOrder
    nextFollowUp?: SortOrderInput | SortOrder
    resolved?: SortOrder
    treatment?: TreatmentOrderByWithRelationInput
  }

  export type FollowUpWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FollowUpWhereInput | FollowUpWhereInput[]
    OR?: FollowUpWhereInput[]
    NOT?: FollowUpWhereInput | FollowUpWhereInput[]
    createdAt?: DateTimeFilter<"FollowUp"> | Date | string
    updatedAt?: DateTimeFilter<"FollowUp"> | Date | string
    treatmentId?: StringFilter<"FollowUp"> | string
    note?: StringNullableFilter<"FollowUp"> | string | null
    findings?: StringNullableFilter<"FollowUp"> | string | null
    outcome?: StringNullableFilter<"FollowUp"> | string | null
    nextAction?: StringNullableFilter<"FollowUp"> | string | null
    painScale?: IntNullableFilter<"FollowUp"> | number | null
    vitals?: JsonNullableFilter<"FollowUp">
    followUpDate?: DateTimeFilter<"FollowUp"> | Date | string
    nextFollowUp?: DateTimeNullableFilter<"FollowUp"> | Date | string | null
    resolved?: BoolFilter<"FollowUp"> | boolean
    treatment?: XOR<TreatmentScalarRelationFilter, TreatmentWhereInput>
  }, "id">

  export type FollowUpOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    treatmentId?: SortOrder
    note?: SortOrderInput | SortOrder
    findings?: SortOrderInput | SortOrder
    outcome?: SortOrderInput | SortOrder
    nextAction?: SortOrderInput | SortOrder
    painScale?: SortOrderInput | SortOrder
    vitals?: SortOrderInput | SortOrder
    followUpDate?: SortOrder
    nextFollowUp?: SortOrderInput | SortOrder
    resolved?: SortOrder
    _count?: FollowUpCountOrderByAggregateInput
    _avg?: FollowUpAvgOrderByAggregateInput
    _max?: FollowUpMaxOrderByAggregateInput
    _min?: FollowUpMinOrderByAggregateInput
    _sum?: FollowUpSumOrderByAggregateInput
  }

  export type FollowUpScalarWhereWithAggregatesInput = {
    AND?: FollowUpScalarWhereWithAggregatesInput | FollowUpScalarWhereWithAggregatesInput[]
    OR?: FollowUpScalarWhereWithAggregatesInput[]
    NOT?: FollowUpScalarWhereWithAggregatesInput | FollowUpScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FollowUp"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FollowUp"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FollowUp"> | Date | string
    treatmentId?: StringWithAggregatesFilter<"FollowUp"> | string
    note?: StringNullableWithAggregatesFilter<"FollowUp"> | string | null
    findings?: StringNullableWithAggregatesFilter<"FollowUp"> | string | null
    outcome?: StringNullableWithAggregatesFilter<"FollowUp"> | string | null
    nextAction?: StringNullableWithAggregatesFilter<"FollowUp"> | string | null
    painScale?: IntNullableWithAggregatesFilter<"FollowUp"> | number | null
    vitals?: JsonNullableWithAggregatesFilter<"FollowUp">
    followUpDate?: DateTimeWithAggregatesFilter<"FollowUp"> | Date | string
    nextFollowUp?: DateTimeNullableWithAggregatesFilter<"FollowUp"> | Date | string | null
    resolved?: BoolWithAggregatesFilter<"FollowUp"> | boolean
  }

  export type MedicalRecordWhereInput = {
    AND?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    OR?: MedicalRecordWhereInput[]
    NOT?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    id?: StringFilter<"MedicalRecord"> | string
    createdAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    patientId?: StringFilter<"MedicalRecord"> | string
    diagnosis?: StringFilter<"MedicalRecord"> | string
    treatment?: StringFilter<"MedicalRecord"> | string
    notes?: StringNullableFilter<"MedicalRecord"> | string | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }

  export type MedicalRecordOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    notes?: SortOrderInput | SortOrder
    patient?: PatientOrderByWithRelationInput
  }

  export type MedicalRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    OR?: MedicalRecordWhereInput[]
    NOT?: MedicalRecordWhereInput | MedicalRecordWhereInput[]
    createdAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    patientId?: StringFilter<"MedicalRecord"> | string
    diagnosis?: StringFilter<"MedicalRecord"> | string
    treatment?: StringFilter<"MedicalRecord"> | string
    notes?: StringNullableFilter<"MedicalRecord"> | string | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
  }, "id">

  export type MedicalRecordOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: MedicalRecordCountOrderByAggregateInput
    _max?: MedicalRecordMaxOrderByAggregateInput
    _min?: MedicalRecordMinOrderByAggregateInput
  }

  export type MedicalRecordScalarWhereWithAggregatesInput = {
    AND?: MedicalRecordScalarWhereWithAggregatesInput | MedicalRecordScalarWhereWithAggregatesInput[]
    OR?: MedicalRecordScalarWhereWithAggregatesInput[]
    NOT?: MedicalRecordScalarWhereWithAggregatesInput | MedicalRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicalRecord"> | string
    createdAt?: DateTimeWithAggregatesFilter<"MedicalRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MedicalRecord"> | Date | string
    patientId?: StringWithAggregatesFilter<"MedicalRecord"> | string
    diagnosis?: StringWithAggregatesFilter<"MedicalRecord"> | string
    treatment?: StringWithAggregatesFilter<"MedicalRecord"> | string
    notes?: StringNullableWithAggregatesFilter<"MedicalRecord"> | string | null
  }

  export type DoctorWhereInput = {
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    id?: StringFilter<"Doctor"> | string
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    archived?: BoolFilter<"Doctor"> | boolean
    userId?: StringFilter<"Doctor"> | string
    field?: StringFilter<"Doctor"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointment?: AppointmentListRelationFilter
    prescription?: PrescriptionListRelationFilter
  }

  export type DoctorOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    field?: SortOrder
    user?: UserOrderByWithRelationInput
    appointment?: AppointmentOrderByRelationAggregateInput
    prescription?: PrescriptionOrderByRelationAggregateInput
  }

  export type DoctorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: DoctorWhereInput | DoctorWhereInput[]
    OR?: DoctorWhereInput[]
    NOT?: DoctorWhereInput | DoctorWhereInput[]
    createdAt?: DateTimeFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeFilter<"Doctor"> | Date | string
    archived?: BoolFilter<"Doctor"> | boolean
    field?: StringFilter<"Doctor"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    appointment?: AppointmentListRelationFilter
    prescription?: PrescriptionListRelationFilter
  }, "id" | "userId">

  export type DoctorOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    field?: SortOrder
    _count?: DoctorCountOrderByAggregateInput
    _max?: DoctorMaxOrderByAggregateInput
    _min?: DoctorMinOrderByAggregateInput
  }

  export type DoctorScalarWhereWithAggregatesInput = {
    AND?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    OR?: DoctorScalarWhereWithAggregatesInput[]
    NOT?: DoctorScalarWhereWithAggregatesInput | DoctorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Doctor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Doctor"> | Date | string
    archived?: BoolWithAggregatesFilter<"Doctor"> | boolean
    userId?: StringWithAggregatesFilter<"Doctor"> | string
    field?: StringWithAggregatesFilter<"Doctor"> | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    archived?: BoolFilter<"Appointment"> | boolean
    patientId?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    status?: StringFilter<"Appointment"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    patient?: PatientOrderByWithRelationInput
    doctor?: DoctorOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    archived?: BoolFilter<"Appointment"> | boolean
    patientId?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    status?: StringFilter<"Appointment"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    archived?: BoolWithAggregatesFilter<"Appointment"> | boolean
    patientId?: StringWithAggregatesFilter<"Appointment"> | string
    doctorId?: StringWithAggregatesFilter<"Appointment"> | string
    date?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    status?: StringWithAggregatesFilter<"Appointment"> | string
  }

  export type MedicineTypeWhereInput = {
    AND?: MedicineTypeWhereInput | MedicineTypeWhereInput[]
    OR?: MedicineTypeWhereInput[]
    NOT?: MedicineTypeWhereInput | MedicineTypeWhereInput[]
    id?: StringFilter<"MedicineType"> | string
    name?: StringFilter<"MedicineType"> | string
    form?: StringFilter<"MedicineType"> | string
    strength?: StringFilter<"MedicineType"> | string
    medicineBatch?: MedicineBatchListRelationFilter
    prescription?: PrescriptionListRelationFilter
  }

  export type MedicineTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    form?: SortOrder
    strength?: SortOrder
    medicineBatch?: MedicineBatchOrderByRelationAggregateInput
    prescription?: PrescriptionOrderByRelationAggregateInput
  }

  export type MedicineTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: MedicineTypeWhereInput | MedicineTypeWhereInput[]
    OR?: MedicineTypeWhereInput[]
    NOT?: MedicineTypeWhereInput | MedicineTypeWhereInput[]
    form?: StringFilter<"MedicineType"> | string
    strength?: StringFilter<"MedicineType"> | string
    medicineBatch?: MedicineBatchListRelationFilter
    prescription?: PrescriptionListRelationFilter
  }, "id" | "name">

  export type MedicineTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    form?: SortOrder
    strength?: SortOrder
    _count?: MedicineTypeCountOrderByAggregateInput
    _max?: MedicineTypeMaxOrderByAggregateInput
    _min?: MedicineTypeMinOrderByAggregateInput
  }

  export type MedicineTypeScalarWhereWithAggregatesInput = {
    AND?: MedicineTypeScalarWhereWithAggregatesInput | MedicineTypeScalarWhereWithAggregatesInput[]
    OR?: MedicineTypeScalarWhereWithAggregatesInput[]
    NOT?: MedicineTypeScalarWhereWithAggregatesInput | MedicineTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicineType"> | string
    name?: StringWithAggregatesFilter<"MedicineType"> | string
    form?: StringWithAggregatesFilter<"MedicineType"> | string
    strength?: StringWithAggregatesFilter<"MedicineType"> | string
  }

  export type MedicineBatchWhereInput = {
    AND?: MedicineBatchWhereInput | MedicineBatchWhereInput[]
    OR?: MedicineBatchWhereInput[]
    NOT?: MedicineBatchWhereInput | MedicineBatchWhereInput[]
    id?: StringFilter<"MedicineBatch"> | string
    medicineId?: StringFilter<"MedicineBatch"> | string
    batchNumber?: StringFilter<"MedicineBatch"> | string
    expiryDate?: DateTimeFilter<"MedicineBatch"> | Date | string
    quantity?: IntFilter<"MedicineBatch"> | number
    createdAt?: DateTimeFilter<"MedicineBatch"> | Date | string
    updatedAt?: DateTimeFilter<"MedicineBatch"> | Date | string
    medicine?: XOR<MedicineTypeScalarRelationFilter, MedicineTypeWhereInput>
  }

  export type MedicineBatchOrderByWithRelationInput = {
    id?: SortOrder
    medicineId?: SortOrder
    batchNumber?: SortOrder
    expiryDate?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    medicine?: MedicineTypeOrderByWithRelationInput
  }

  export type MedicineBatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MedicineBatchWhereInput | MedicineBatchWhereInput[]
    OR?: MedicineBatchWhereInput[]
    NOT?: MedicineBatchWhereInput | MedicineBatchWhereInput[]
    medicineId?: StringFilter<"MedicineBatch"> | string
    batchNumber?: StringFilter<"MedicineBatch"> | string
    expiryDate?: DateTimeFilter<"MedicineBatch"> | Date | string
    quantity?: IntFilter<"MedicineBatch"> | number
    createdAt?: DateTimeFilter<"MedicineBatch"> | Date | string
    updatedAt?: DateTimeFilter<"MedicineBatch"> | Date | string
    medicine?: XOR<MedicineTypeScalarRelationFilter, MedicineTypeWhereInput>
  }, "id">

  export type MedicineBatchOrderByWithAggregationInput = {
    id?: SortOrder
    medicineId?: SortOrder
    batchNumber?: SortOrder
    expiryDate?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MedicineBatchCountOrderByAggregateInput
    _avg?: MedicineBatchAvgOrderByAggregateInput
    _max?: MedicineBatchMaxOrderByAggregateInput
    _min?: MedicineBatchMinOrderByAggregateInput
    _sum?: MedicineBatchSumOrderByAggregateInput
  }

  export type MedicineBatchScalarWhereWithAggregatesInput = {
    AND?: MedicineBatchScalarWhereWithAggregatesInput | MedicineBatchScalarWhereWithAggregatesInput[]
    OR?: MedicineBatchScalarWhereWithAggregatesInput[]
    NOT?: MedicineBatchScalarWhereWithAggregatesInput | MedicineBatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MedicineBatch"> | string
    medicineId?: StringWithAggregatesFilter<"MedicineBatch"> | string
    batchNumber?: StringWithAggregatesFilter<"MedicineBatch"> | string
    expiryDate?: DateTimeWithAggregatesFilter<"MedicineBatch"> | Date | string
    quantity?: IntWithAggregatesFilter<"MedicineBatch"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MedicineBatch"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MedicineBatch"> | Date | string
  }

  export type PrescriptionWhereInput = {
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    id?: StringFilter<"Prescription"> | string
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    patientId?: StringFilter<"Prescription"> | string
    doctorId?: StringFilter<"Prescription"> | string
    medicineId?: StringFilter<"Prescription"> | string
    dosage?: StringFilter<"Prescription"> | string
    duration?: StringFilter<"Prescription"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    medicine?: XOR<MedicineTypeScalarRelationFilter, MedicineTypeWhereInput>
  }

  export type PrescriptionOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    medicineId?: SortOrder
    dosage?: SortOrder
    duration?: SortOrder
    patient?: PatientOrderByWithRelationInput
    doctor?: DoctorOrderByWithRelationInput
    medicine?: MedicineTypeOrderByWithRelationInput
  }

  export type PrescriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PrescriptionWhereInput | PrescriptionWhereInput[]
    OR?: PrescriptionWhereInput[]
    NOT?: PrescriptionWhereInput | PrescriptionWhereInput[]
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    patientId?: StringFilter<"Prescription"> | string
    doctorId?: StringFilter<"Prescription"> | string
    medicineId?: StringFilter<"Prescription"> | string
    dosage?: StringFilter<"Prescription"> | string
    duration?: StringFilter<"Prescription"> | string
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    doctor?: XOR<DoctorScalarRelationFilter, DoctorWhereInput>
    medicine?: XOR<MedicineTypeScalarRelationFilter, MedicineTypeWhereInput>
  }, "id">

  export type PrescriptionOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    medicineId?: SortOrder
    dosage?: SortOrder
    duration?: SortOrder
    _count?: PrescriptionCountOrderByAggregateInput
    _max?: PrescriptionMaxOrderByAggregateInput
    _min?: PrescriptionMinOrderByAggregateInput
  }

  export type PrescriptionScalarWhereWithAggregatesInput = {
    AND?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    OR?: PrescriptionScalarWhereWithAggregatesInput[]
    NOT?: PrescriptionScalarWhereWithAggregatesInput | PrescriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prescription"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prescription"> | Date | string
    patientId?: StringWithAggregatesFilter<"Prescription"> | string
    doctorId?: StringWithAggregatesFilter<"Prescription"> | string
    medicineId?: StringWithAggregatesFilter<"Prescription"> | string
    dosage?: StringWithAggregatesFilter<"Prescription"> | string
    duration?: StringWithAggregatesFilter<"Prescription"> | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    title?: StringFilter<"Post"> | string
    slug?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    published?: BoolNullableFilter<"Post"> | boolean | null
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrderInput | SortOrder
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    published?: BoolNullableFilter<"Post"> | boolean | null
  }, "id" | "slug">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrderInput | SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    title?: StringWithAggregatesFilter<"Post"> | string
    slug?: StringWithAggregatesFilter<"Post"> | string
    content?: StringWithAggregatesFilter<"Post"> | string
    published?: BoolNullableWithAggregatesFilter<"Post"> | boolean | null
  }

  export type UserCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    role: string
    patient?: PatientCreateNestedOneWithoutUserInput
    doctor?: DoctorCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    role: string
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneWithoutUserNestedInput
    doctor?: DoctorUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    role: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type PatientCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    user?: UserCreateNestedOneWithoutPatientInput
    patientVisit?: PatientVisitCreateNestedManyWithoutPatientInput
    assessment?: AssessmentCreateNestedManyWithoutPatientInput
    treatment?: TreatmentCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordCreateNestedManyWithoutPatientInput
    appointment?: AppointmentCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitUncheckedCreateNestedManyWithoutPatientInput
    assessment?: AssessmentUncheckedCreateNestedManyWithoutPatientInput
    treatment?: TreatmentUncheckedCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordUncheckedCreateNestedManyWithoutPatientInput
    appointment?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutPatientNestedInput
    patientVisit?: PatientVisitUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUncheckedUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUncheckedUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PatientVisitCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reason: string
    status: string
    date?: Date | string
    patient: PatientCreateNestedOneWithoutPatientVisitInput
    treatment?: TreatmentCreateNestedManyWithoutVisitInput
  }

  export type PatientVisitUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    reason: string
    status: string
    date?: Date | string
    treatment?: TreatmentUncheckedCreateNestedManyWithoutVisitInput
  }

  export type PatientVisitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPatientVisitNestedInput
    treatment?: TreatmentUpdateManyWithoutVisitNestedInput
  }

  export type PatientVisitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    treatment?: TreatmentUncheckedUpdateManyWithoutVisitNestedInput
  }

  export type PatientVisitCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    reason: string
    status: string
    date?: Date | string
  }

  export type PatientVisitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientVisitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
    patient: PatientCreateNestedOneWithoutAssessmentInput
    treatment?: TreatmentCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
    treatment?: TreatmentUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    patient?: PatientUpdateOneRequiredWithoutAssessmentNestedInput
    treatment?: TreatmentUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    treatment?: TreatmentUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
  }

  export type AssessmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AssessmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TreatmentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    patient: PatientCreateNestedOneWithoutTreatmentInput
    visit?: PatientVisitCreateNestedOneWithoutTreatmentInput
    assessment?: AssessmentCreateNestedOneWithoutTreatmentInput
    followUps?: FollowUpCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    visitId?: string | null
    assessmentId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    followUps?: FollowUpUncheckedCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneRequiredWithoutTreatmentNestedInput
    visit?: PatientVisitUpdateOneWithoutTreatmentNestedInput
    assessment?: AssessmentUpdateOneWithoutTreatmentNestedInput
    followUps?: FollowUpUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    assessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUps?: FollowUpUncheckedUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    visitId?: string | null
    assessmentId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
  }

  export type TreatmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TreatmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    assessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FollowUpCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    findings?: string | null
    outcome?: string | null
    nextAction?: string | null
    painScale?: number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: Date | string
    nextFollowUp?: Date | string | null
    resolved?: boolean
    treatment: TreatmentCreateNestedOneWithoutFollowUpsInput
  }

  export type FollowUpUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    treatmentId: string
    note?: string | null
    findings?: string | null
    outcome?: string | null
    nextAction?: string | null
    painScale?: number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: Date | string
    nextFollowUp?: Date | string | null
    resolved?: boolean
  }

  export type FollowUpUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextAction?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextFollowUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
    treatment?: TreatmentUpdateOneRequiredWithoutFollowUpsNestedInput
  }

  export type FollowUpUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    treatmentId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextAction?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextFollowUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FollowUpCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    treatmentId: string
    note?: string | null
    findings?: string | null
    outcome?: string | null
    nextAction?: string | null
    painScale?: number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: Date | string
    nextFollowUp?: Date | string | null
    resolved?: boolean
  }

  export type FollowUpUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextAction?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextFollowUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FollowUpUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    treatmentId?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextAction?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextFollowUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MedicalRecordCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosis: string
    treatment: string
    notes?: string | null
    patient: PatientCreateNestedOneWithoutMedicalRecordsInput
  }

  export type MedicalRecordUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    diagnosis: string
    treatment: string
    notes?: string | null
  }

  export type MedicalRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    patient?: PatientUpdateOneRequiredWithoutMedicalRecordsNestedInput
  }

  export type MedicalRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MedicalRecordCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    diagnosis: string
    treatment: string
    notes?: string | null
  }

  export type MedicalRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MedicalRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DoctorCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    field: string
    user: UserCreateNestedOneWithoutDoctorInput
    appointment?: AppointmentCreateNestedManyWithoutDoctorInput
    prescription?: PrescriptionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId: string
    field: string
    appointment?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    field?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    appointment?: AppointmentUpdateManyWithoutDoctorNestedInput
    prescription?: PrescriptionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    appointment?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId: string
    field: string
  }

  export type DoctorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    field?: StringFieldUpdateOperationsInput | string
  }

  export type DoctorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    date: Date | string
    status: string
    patient: PatientCreateNestedOneWithoutAppointmentInput
    doctor: DoctorCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    patientId: string
    doctorId: string
    date: Date | string
    status: string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    patientId: string
    doctorId: string
    date: Date | string
    status: string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MedicineTypeCreateInput = {
    id?: string
    name: string
    form: string
    strength: string
    medicineBatch?: MedicineBatchCreateNestedManyWithoutMedicineInput
    prescription?: PrescriptionCreateNestedManyWithoutMedicineInput
  }

  export type MedicineTypeUncheckedCreateInput = {
    id?: string
    name: string
    form: string
    strength: string
    medicineBatch?: MedicineBatchUncheckedCreateNestedManyWithoutMedicineInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutMedicineInput
  }

  export type MedicineTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
    medicineBatch?: MedicineBatchUpdateManyWithoutMedicineNestedInput
    prescription?: PrescriptionUpdateManyWithoutMedicineNestedInput
  }

  export type MedicineTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
    medicineBatch?: MedicineBatchUncheckedUpdateManyWithoutMedicineNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutMedicineNestedInput
  }

  export type MedicineTypeCreateManyInput = {
    id?: string
    name: string
    form: string
    strength: string
  }

  export type MedicineTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
  }

  export type MedicineTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
  }

  export type MedicineBatchCreateInput = {
    id?: string
    batchNumber: string
    expiryDate: Date | string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    medicine: MedicineTypeCreateNestedOneWithoutMedicineBatchInput
  }

  export type MedicineBatchUncheckedCreateInput = {
    id?: string
    medicineId: string
    batchNumber: string
    expiryDate: Date | string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicineBatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medicine?: MedicineTypeUpdateOneRequiredWithoutMedicineBatchNestedInput
  }

  export type MedicineBatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    batchNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicineBatchCreateManyInput = {
    id?: string
    medicineId: string
    batchNumber: string
    expiryDate: Date | string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicineBatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicineBatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    batchNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dosage: string
    duration: string
    patient: PatientCreateNestedOneWithoutPrescriptionInput
    doctor: DoctorCreateNestedOneWithoutPrescriptionInput
    medicine: MedicineTypeCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    doctorId: string
    medicineId: string
    dosage: string
    duration: string
  }

  export type PrescriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutPrescriptionNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutPrescriptionNestedInput
    medicine?: MedicineTypeUpdateOneRequiredWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    doctorId: string
    medicineId: string
    dosage: string
    duration: string
  }

  export type PrescriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type PostCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    content: string
    published?: boolean | null
  }

  export type PostUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    content: string
    published?: boolean | null
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type PostCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    slug: string
    content: string
    published?: boolean | null
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PatientNullableScalarRelationFilter = {
    is?: PatientWhereInput | null
    isNot?: PatientWhereInput | null
  }

  export type DoctorNullableScalarRelationFilter = {
    is?: DoctorWhereInput | null
    isNot?: DoctorWhereInput | null
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    role?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PatientVisitListRelationFilter = {
    every?: PatientVisitWhereInput
    some?: PatientVisitWhereInput
    none?: PatientVisitWhereInput
  }

  export type AssessmentListRelationFilter = {
    every?: AssessmentWhereInput
    some?: AssessmentWhereInput
    none?: AssessmentWhereInput
  }

  export type TreatmentListRelationFilter = {
    every?: TreatmentWhereInput
    some?: TreatmentWhereInput
    none?: TreatmentWhereInput
  }

  export type MedicalRecordListRelationFilter = {
    every?: MedicalRecordWhereInput
    some?: MedicalRecordWhereInput
    none?: MedicalRecordWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type PrescriptionListRelationFilter = {
    every?: PrescriptionWhereInput
    some?: PrescriptionWhereInput
    none?: PrescriptionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PatientVisitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AssessmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreatmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicalRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PrescriptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    city?: SortOrder
    barangay?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    city?: SortOrder
    barangay?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    gender?: SortOrder
    dateOfBirth?: SortOrder
    city?: SortOrder
    barangay?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type PatientVisitCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    date?: SortOrder
  }

  export type PatientVisitMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    date?: SortOrder
  }

  export type PatientVisitMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    reason?: SortOrder
    status?: SortOrder
    date?: SortOrder
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

  export type AssessmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    symptoms?: SortOrder
    assessment?: SortOrder
    diagnosis?: SortOrder
    bloodPressure?: SortOrder
    pulseRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    alcoholUse?: SortOrder
    smoker?: SortOrder
    allergies?: SortOrder
    painLocation?: SortOrder
    painScale?: SortOrder
  }

  export type AssessmentAvgOrderByAggregateInput = {
    pulseRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    painScale?: SortOrder
  }

  export type AssessmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    symptoms?: SortOrder
    assessment?: SortOrder
    diagnosis?: SortOrder
    bloodPressure?: SortOrder
    pulseRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    alcoholUse?: SortOrder
    smoker?: SortOrder
    allergies?: SortOrder
    painLocation?: SortOrder
    painScale?: SortOrder
  }

  export type AssessmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    symptoms?: SortOrder
    assessment?: SortOrder
    diagnosis?: SortOrder
    bloodPressure?: SortOrder
    pulseRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    alcoholUse?: SortOrder
    smoker?: SortOrder
    allergies?: SortOrder
    painLocation?: SortOrder
    painScale?: SortOrder
  }

  export type AssessmentSumOrderByAggregateInput = {
    pulseRate?: SortOrder
    respiratoryRate?: SortOrder
    oxygenSaturation?: SortOrder
    painScale?: SortOrder
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
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumTreatmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusFilter<$PrismaModel> | $Enums.TreatmentStatus
  }

  export type PatientVisitNullableScalarRelationFilter = {
    is?: PatientVisitWhereInput | null
    isNot?: PatientVisitWhereInput | null
  }

  export type AssessmentNullableScalarRelationFilter = {
    is?: AssessmentWhereInput | null
    isNot?: AssessmentWhereInput | null
  }

  export type FollowUpListRelationFilter = {
    every?: FollowUpWhereInput
    some?: FollowUpWhereInput
    none?: FollowUpWhereInput
  }

  export type FollowUpOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TreatmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    visitId?: SortOrder
    assessmentId?: SortOrder
    medications?: SortOrder
    procedures?: SortOrder
    painScale?: SortOrder
    remarks?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    nextFollowUpAt?: SortOrder
  }

  export type TreatmentAvgOrderByAggregateInput = {
    painScale?: SortOrder
    priority?: SortOrder
  }

  export type TreatmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    visitId?: SortOrder
    assessmentId?: SortOrder
    procedures?: SortOrder
    painScale?: SortOrder
    remarks?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    nextFollowUpAt?: SortOrder
  }

  export type TreatmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    visitId?: SortOrder
    assessmentId?: SortOrder
    procedures?: SortOrder
    painScale?: SortOrder
    remarks?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    nextFollowUpAt?: SortOrder
  }

  export type TreatmentSumOrderByAggregateInput = {
    painScale?: SortOrder
    priority?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumTreatmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TreatmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreatmentStatusFilter<$PrismaModel>
    _max?: NestedEnumTreatmentStatusFilter<$PrismaModel>
  }

  export type TreatmentScalarRelationFilter = {
    is?: TreatmentWhereInput
    isNot?: TreatmentWhereInput
  }

  export type FollowUpCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    treatmentId?: SortOrder
    note?: SortOrder
    findings?: SortOrder
    outcome?: SortOrder
    nextAction?: SortOrder
    painScale?: SortOrder
    vitals?: SortOrder
    followUpDate?: SortOrder
    nextFollowUp?: SortOrder
    resolved?: SortOrder
  }

  export type FollowUpAvgOrderByAggregateInput = {
    painScale?: SortOrder
  }

  export type FollowUpMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    treatmentId?: SortOrder
    note?: SortOrder
    findings?: SortOrder
    outcome?: SortOrder
    nextAction?: SortOrder
    painScale?: SortOrder
    followUpDate?: SortOrder
    nextFollowUp?: SortOrder
    resolved?: SortOrder
  }

  export type FollowUpMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    treatmentId?: SortOrder
    note?: SortOrder
    findings?: SortOrder
    outcome?: SortOrder
    nextAction?: SortOrder
    painScale?: SortOrder
    followUpDate?: SortOrder
    nextFollowUp?: SortOrder
    resolved?: SortOrder
  }

  export type FollowUpSumOrderByAggregateInput = {
    painScale?: SortOrder
  }

  export type MedicalRecordCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    notes?: SortOrder
  }

  export type MedicalRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    notes?: SortOrder
  }

  export type MedicalRecordMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    notes?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DoctorCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    field?: SortOrder
  }

  export type DoctorMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    field?: SortOrder
  }

  export type DoctorMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    userId?: SortOrder
    field?: SortOrder
  }

  export type DoctorScalarRelationFilter = {
    is?: DoctorWhereInput
    isNot?: DoctorWhereInput
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    status?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    status?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    archived?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    date?: SortOrder
    status?: SortOrder
  }

  export type MedicineBatchListRelationFilter = {
    every?: MedicineBatchWhereInput
    some?: MedicineBatchWhereInput
    none?: MedicineBatchWhereInput
  }

  export type MedicineBatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MedicineTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    form?: SortOrder
    strength?: SortOrder
  }

  export type MedicineTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    form?: SortOrder
    strength?: SortOrder
  }

  export type MedicineTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    form?: SortOrder
    strength?: SortOrder
  }

  export type MedicineTypeScalarRelationFilter = {
    is?: MedicineTypeWhereInput
    isNot?: MedicineTypeWhereInput
  }

  export type MedicineBatchCountOrderByAggregateInput = {
    id?: SortOrder
    medicineId?: SortOrder
    batchNumber?: SortOrder
    expiryDate?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicineBatchAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type MedicineBatchMaxOrderByAggregateInput = {
    id?: SortOrder
    medicineId?: SortOrder
    batchNumber?: SortOrder
    expiryDate?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicineBatchMinOrderByAggregateInput = {
    id?: SortOrder
    medicineId?: SortOrder
    batchNumber?: SortOrder
    expiryDate?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MedicineBatchSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type PrescriptionCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    medicineId?: SortOrder
    dosage?: SortOrder
    duration?: SortOrder
  }

  export type PrescriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    medicineId?: SortOrder
    dosage?: SortOrder
    duration?: SortOrder
  }

  export type PrescriptionMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    patientId?: SortOrder
    doctorId?: SortOrder
    medicineId?: SortOrder
    dosage?: SortOrder
    duration?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    published?: SortOrder
  }

  export type PatientCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    connect?: DoctorWhereUniqueInput
  }

  export type PatientUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    connect?: DoctorWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PatientUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type DoctorUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    upsert?: DoctorUpsertWithoutUserInput
    disconnect?: DoctorWhereInput | boolean
    delete?: DoctorWhereInput | boolean
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutUserInput, DoctorUpdateWithoutUserInput>, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type PatientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    connectOrCreate?: PatientCreateOrConnectWithoutUserInput
    upsert?: PatientUpsertWithoutUserInput
    disconnect?: PatientWhereInput | boolean
    delete?: PatientWhereInput | boolean
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutUserInput, PatientUpdateWithoutUserInput>, PatientUncheckedUpdateWithoutUserInput>
  }

  export type DoctorUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutUserInput
    upsert?: DoctorUpsertWithoutUserInput
    disconnect?: DoctorWhereInput | boolean
    delete?: DoctorWhereInput | boolean
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutUserInput, DoctorUpdateWithoutUserInput>, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutPatientInput = {
    create?: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientInput
    connect?: UserWhereUniqueInput
  }

  export type PatientVisitCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientVisitCreateWithoutPatientInput, PatientVisitUncheckedCreateWithoutPatientInput> | PatientVisitCreateWithoutPatientInput[] | PatientVisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientVisitCreateOrConnectWithoutPatientInput | PatientVisitCreateOrConnectWithoutPatientInput[]
    createMany?: PatientVisitCreateManyPatientInputEnvelope
    connect?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
  }

  export type AssessmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AssessmentCreateWithoutPatientInput, AssessmentUncheckedCreateWithoutPatientInput> | AssessmentCreateWithoutPatientInput[] | AssessmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutPatientInput | AssessmentCreateOrConnectWithoutPatientInput[]
    createMany?: AssessmentCreateManyPatientInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type TreatmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<TreatmentCreateWithoutPatientInput, TreatmentUncheckedCreateWithoutPatientInput> | TreatmentCreateWithoutPatientInput[] | TreatmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutPatientInput | TreatmentCreateOrConnectWithoutPatientInput[]
    createMany?: TreatmentCreateManyPatientInputEnvelope
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
  }

  export type MedicalRecordCreateNestedManyWithoutPatientInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput> | MedicalRecordCreateWithoutPatientInput[] | MedicalRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput | MedicalRecordCreateOrConnectWithoutPatientInput[]
    createMany?: MedicalRecordCreateManyPatientInputEnvelope
    connect?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutPatientInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type PatientVisitUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PatientVisitCreateWithoutPatientInput, PatientVisitUncheckedCreateWithoutPatientInput> | PatientVisitCreateWithoutPatientInput[] | PatientVisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientVisitCreateOrConnectWithoutPatientInput | PatientVisitCreateOrConnectWithoutPatientInput[]
    createMany?: PatientVisitCreateManyPatientInputEnvelope
    connect?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
  }

  export type AssessmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AssessmentCreateWithoutPatientInput, AssessmentUncheckedCreateWithoutPatientInput> | AssessmentCreateWithoutPatientInput[] | AssessmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutPatientInput | AssessmentCreateOrConnectWithoutPatientInput[]
    createMany?: AssessmentCreateManyPatientInputEnvelope
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
  }

  export type TreatmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<TreatmentCreateWithoutPatientInput, TreatmentUncheckedCreateWithoutPatientInput> | TreatmentCreateWithoutPatientInput[] | TreatmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutPatientInput | TreatmentCreateOrConnectWithoutPatientInput[]
    createMany?: TreatmentCreateManyPatientInputEnvelope
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
  }

  export type MedicalRecordUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput> | MedicalRecordCreateWithoutPatientInput[] | MedicalRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput | MedicalRecordCreateOrConnectWithoutPatientInput[]
    createMany?: MedicalRecordCreateManyPatientInputEnvelope
    connect?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutPatientNestedInput = {
    create?: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientInput
    upsert?: UserUpsertWithoutPatientInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientInput, UserUpdateWithoutPatientInput>, UserUncheckedUpdateWithoutPatientInput>
  }

  export type PatientVisitUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientVisitCreateWithoutPatientInput, PatientVisitUncheckedCreateWithoutPatientInput> | PatientVisitCreateWithoutPatientInput[] | PatientVisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientVisitCreateOrConnectWithoutPatientInput | PatientVisitCreateOrConnectWithoutPatientInput[]
    upsert?: PatientVisitUpsertWithWhereUniqueWithoutPatientInput | PatientVisitUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientVisitCreateManyPatientInputEnvelope
    set?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    disconnect?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    delete?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    connect?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    update?: PatientVisitUpdateWithWhereUniqueWithoutPatientInput | PatientVisitUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientVisitUpdateManyWithWhereWithoutPatientInput | PatientVisitUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientVisitScalarWhereInput | PatientVisitScalarWhereInput[]
  }

  export type AssessmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AssessmentCreateWithoutPatientInput, AssessmentUncheckedCreateWithoutPatientInput> | AssessmentCreateWithoutPatientInput[] | AssessmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutPatientInput | AssessmentCreateOrConnectWithoutPatientInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutPatientInput | AssessmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AssessmentCreateManyPatientInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutPatientInput | AssessmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutPatientInput | AssessmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type TreatmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<TreatmentCreateWithoutPatientInput, TreatmentUncheckedCreateWithoutPatientInput> | TreatmentCreateWithoutPatientInput[] | TreatmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutPatientInput | TreatmentCreateOrConnectWithoutPatientInput[]
    upsert?: TreatmentUpsertWithWhereUniqueWithoutPatientInput | TreatmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: TreatmentCreateManyPatientInputEnvelope
    set?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    disconnect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    delete?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    update?: TreatmentUpdateWithWhereUniqueWithoutPatientInput | TreatmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: TreatmentUpdateManyWithWhereWithoutPatientInput | TreatmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
  }

  export type MedicalRecordUpdateManyWithoutPatientNestedInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput> | MedicalRecordCreateWithoutPatientInput[] | MedicalRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput | MedicalRecordCreateOrConnectWithoutPatientInput[]
    upsert?: MedicalRecordUpsertWithWhereUniqueWithoutPatientInput | MedicalRecordUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: MedicalRecordCreateManyPatientInputEnvelope
    set?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    disconnect?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    delete?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    connect?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    update?: MedicalRecordUpdateWithWhereUniqueWithoutPatientInput | MedicalRecordUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: MedicalRecordUpdateManyWithWhereWithoutPatientInput | MedicalRecordUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: MedicalRecordScalarWhereInput | MedicalRecordScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPatientInput | PrescriptionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPatientInput | PrescriptionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPatientInput | PrescriptionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type PatientVisitUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PatientVisitCreateWithoutPatientInput, PatientVisitUncheckedCreateWithoutPatientInput> | PatientVisitCreateWithoutPatientInput[] | PatientVisitUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PatientVisitCreateOrConnectWithoutPatientInput | PatientVisitCreateOrConnectWithoutPatientInput[]
    upsert?: PatientVisitUpsertWithWhereUniqueWithoutPatientInput | PatientVisitUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PatientVisitCreateManyPatientInputEnvelope
    set?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    disconnect?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    delete?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    connect?: PatientVisitWhereUniqueInput | PatientVisitWhereUniqueInput[]
    update?: PatientVisitUpdateWithWhereUniqueWithoutPatientInput | PatientVisitUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PatientVisitUpdateManyWithWhereWithoutPatientInput | PatientVisitUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PatientVisitScalarWhereInput | PatientVisitScalarWhereInput[]
  }

  export type AssessmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AssessmentCreateWithoutPatientInput, AssessmentUncheckedCreateWithoutPatientInput> | AssessmentCreateWithoutPatientInput[] | AssessmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AssessmentCreateOrConnectWithoutPatientInput | AssessmentCreateOrConnectWithoutPatientInput[]
    upsert?: AssessmentUpsertWithWhereUniqueWithoutPatientInput | AssessmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AssessmentCreateManyPatientInputEnvelope
    set?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    disconnect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    delete?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    connect?: AssessmentWhereUniqueInput | AssessmentWhereUniqueInput[]
    update?: AssessmentUpdateWithWhereUniqueWithoutPatientInput | AssessmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AssessmentUpdateManyWithWhereWithoutPatientInput | AssessmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
  }

  export type TreatmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<TreatmentCreateWithoutPatientInput, TreatmentUncheckedCreateWithoutPatientInput> | TreatmentCreateWithoutPatientInput[] | TreatmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutPatientInput | TreatmentCreateOrConnectWithoutPatientInput[]
    upsert?: TreatmentUpsertWithWhereUniqueWithoutPatientInput | TreatmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: TreatmentCreateManyPatientInputEnvelope
    set?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    disconnect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    delete?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    update?: TreatmentUpdateWithWhereUniqueWithoutPatientInput | TreatmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: TreatmentUpdateManyWithWhereWithoutPatientInput | TreatmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
  }

  export type MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput> | MedicalRecordCreateWithoutPatientInput[] | MedicalRecordUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: MedicalRecordCreateOrConnectWithoutPatientInput | MedicalRecordCreateOrConnectWithoutPatientInput[]
    upsert?: MedicalRecordUpsertWithWhereUniqueWithoutPatientInput | MedicalRecordUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: MedicalRecordCreateManyPatientInputEnvelope
    set?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    disconnect?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    delete?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    connect?: MedicalRecordWhereUniqueInput | MedicalRecordWhereUniqueInput[]
    update?: MedicalRecordUpdateWithWhereUniqueWithoutPatientInput | MedicalRecordUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: MedicalRecordUpdateManyWithWhereWithoutPatientInput | MedicalRecordUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: MedicalRecordScalarWhereInput | MedicalRecordScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput> | PrescriptionCreateWithoutPatientInput[] | PrescriptionUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutPatientInput | PrescriptionCreateOrConnectWithoutPatientInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutPatientInput | PrescriptionUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: PrescriptionCreateManyPatientInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutPatientInput | PrescriptionUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutPatientInput | PrescriptionUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutPatientVisitInput = {
    create?: XOR<PatientCreateWithoutPatientVisitInput, PatientUncheckedCreateWithoutPatientVisitInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientVisitInput
    connect?: PatientWhereUniqueInput
  }

  export type TreatmentCreateNestedManyWithoutVisitInput = {
    create?: XOR<TreatmentCreateWithoutVisitInput, TreatmentUncheckedCreateWithoutVisitInput> | TreatmentCreateWithoutVisitInput[] | TreatmentUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutVisitInput | TreatmentCreateOrConnectWithoutVisitInput[]
    createMany?: TreatmentCreateManyVisitInputEnvelope
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
  }

  export type TreatmentUncheckedCreateNestedManyWithoutVisitInput = {
    create?: XOR<TreatmentCreateWithoutVisitInput, TreatmentUncheckedCreateWithoutVisitInput> | TreatmentCreateWithoutVisitInput[] | TreatmentUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutVisitInput | TreatmentCreateOrConnectWithoutVisitInput[]
    createMany?: TreatmentCreateManyVisitInputEnvelope
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
  }

  export type PatientUpdateOneRequiredWithoutPatientVisitNestedInput = {
    create?: XOR<PatientCreateWithoutPatientVisitInput, PatientUncheckedCreateWithoutPatientVisitInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPatientVisitInput
    upsert?: PatientUpsertWithoutPatientVisitInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPatientVisitInput, PatientUpdateWithoutPatientVisitInput>, PatientUncheckedUpdateWithoutPatientVisitInput>
  }

  export type TreatmentUpdateManyWithoutVisitNestedInput = {
    create?: XOR<TreatmentCreateWithoutVisitInput, TreatmentUncheckedCreateWithoutVisitInput> | TreatmentCreateWithoutVisitInput[] | TreatmentUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutVisitInput | TreatmentCreateOrConnectWithoutVisitInput[]
    upsert?: TreatmentUpsertWithWhereUniqueWithoutVisitInput | TreatmentUpsertWithWhereUniqueWithoutVisitInput[]
    createMany?: TreatmentCreateManyVisitInputEnvelope
    set?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    disconnect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    delete?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    update?: TreatmentUpdateWithWhereUniqueWithoutVisitInput | TreatmentUpdateWithWhereUniqueWithoutVisitInput[]
    updateMany?: TreatmentUpdateManyWithWhereWithoutVisitInput | TreatmentUpdateManyWithWhereWithoutVisitInput[]
    deleteMany?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
  }

  export type TreatmentUncheckedUpdateManyWithoutVisitNestedInput = {
    create?: XOR<TreatmentCreateWithoutVisitInput, TreatmentUncheckedCreateWithoutVisitInput> | TreatmentCreateWithoutVisitInput[] | TreatmentUncheckedCreateWithoutVisitInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutVisitInput | TreatmentCreateOrConnectWithoutVisitInput[]
    upsert?: TreatmentUpsertWithWhereUniqueWithoutVisitInput | TreatmentUpsertWithWhereUniqueWithoutVisitInput[]
    createMany?: TreatmentCreateManyVisitInputEnvelope
    set?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    disconnect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    delete?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    update?: TreatmentUpdateWithWhereUniqueWithoutVisitInput | TreatmentUpdateWithWhereUniqueWithoutVisitInput[]
    updateMany?: TreatmentUpdateManyWithWhereWithoutVisitInput | TreatmentUpdateManyWithWhereWithoutVisitInput[]
    deleteMany?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutAssessmentInput = {
    create?: XOR<PatientCreateWithoutAssessmentInput, PatientUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAssessmentInput
    connect?: PatientWhereUniqueInput
  }

  export type TreatmentCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<TreatmentCreateWithoutAssessmentInput, TreatmentUncheckedCreateWithoutAssessmentInput> | TreatmentCreateWithoutAssessmentInput[] | TreatmentUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutAssessmentInput | TreatmentCreateOrConnectWithoutAssessmentInput[]
    createMany?: TreatmentCreateManyAssessmentInputEnvelope
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
  }

  export type TreatmentUncheckedCreateNestedManyWithoutAssessmentInput = {
    create?: XOR<TreatmentCreateWithoutAssessmentInput, TreatmentUncheckedCreateWithoutAssessmentInput> | TreatmentCreateWithoutAssessmentInput[] | TreatmentUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutAssessmentInput | TreatmentCreateOrConnectWithoutAssessmentInput[]
    createMany?: TreatmentCreateManyAssessmentInputEnvelope
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
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

  export type PatientUpdateOneRequiredWithoutAssessmentNestedInput = {
    create?: XOR<PatientCreateWithoutAssessmentInput, PatientUncheckedCreateWithoutAssessmentInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAssessmentInput
    upsert?: PatientUpsertWithoutAssessmentInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAssessmentInput, PatientUpdateWithoutAssessmentInput>, PatientUncheckedUpdateWithoutAssessmentInput>
  }

  export type TreatmentUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<TreatmentCreateWithoutAssessmentInput, TreatmentUncheckedCreateWithoutAssessmentInput> | TreatmentCreateWithoutAssessmentInput[] | TreatmentUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutAssessmentInput | TreatmentCreateOrConnectWithoutAssessmentInput[]
    upsert?: TreatmentUpsertWithWhereUniqueWithoutAssessmentInput | TreatmentUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: TreatmentCreateManyAssessmentInputEnvelope
    set?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    disconnect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    delete?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    update?: TreatmentUpdateWithWhereUniqueWithoutAssessmentInput | TreatmentUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: TreatmentUpdateManyWithWhereWithoutAssessmentInput | TreatmentUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
  }

  export type TreatmentUncheckedUpdateManyWithoutAssessmentNestedInput = {
    create?: XOR<TreatmentCreateWithoutAssessmentInput, TreatmentUncheckedCreateWithoutAssessmentInput> | TreatmentCreateWithoutAssessmentInput[] | TreatmentUncheckedCreateWithoutAssessmentInput[]
    connectOrCreate?: TreatmentCreateOrConnectWithoutAssessmentInput | TreatmentCreateOrConnectWithoutAssessmentInput[]
    upsert?: TreatmentUpsertWithWhereUniqueWithoutAssessmentInput | TreatmentUpsertWithWhereUniqueWithoutAssessmentInput[]
    createMany?: TreatmentCreateManyAssessmentInputEnvelope
    set?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    disconnect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    delete?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    connect?: TreatmentWhereUniqueInput | TreatmentWhereUniqueInput[]
    update?: TreatmentUpdateWithWhereUniqueWithoutAssessmentInput | TreatmentUpdateWithWhereUniqueWithoutAssessmentInput[]
    updateMany?: TreatmentUpdateManyWithWhereWithoutAssessmentInput | TreatmentUpdateManyWithWhereWithoutAssessmentInput[]
    deleteMany?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutTreatmentInput = {
    create?: XOR<PatientCreateWithoutTreatmentInput, PatientUncheckedCreateWithoutTreatmentInput>
    connectOrCreate?: PatientCreateOrConnectWithoutTreatmentInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientVisitCreateNestedOneWithoutTreatmentInput = {
    create?: XOR<PatientVisitCreateWithoutTreatmentInput, PatientVisitUncheckedCreateWithoutTreatmentInput>
    connectOrCreate?: PatientVisitCreateOrConnectWithoutTreatmentInput
    connect?: PatientVisitWhereUniqueInput
  }

  export type AssessmentCreateNestedOneWithoutTreatmentInput = {
    create?: XOR<AssessmentCreateWithoutTreatmentInput, AssessmentUncheckedCreateWithoutTreatmentInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutTreatmentInput
    connect?: AssessmentWhereUniqueInput
  }

  export type FollowUpCreateNestedManyWithoutTreatmentInput = {
    create?: XOR<FollowUpCreateWithoutTreatmentInput, FollowUpUncheckedCreateWithoutTreatmentInput> | FollowUpCreateWithoutTreatmentInput[] | FollowUpUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: FollowUpCreateOrConnectWithoutTreatmentInput | FollowUpCreateOrConnectWithoutTreatmentInput[]
    createMany?: FollowUpCreateManyTreatmentInputEnvelope
    connect?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
  }

  export type FollowUpUncheckedCreateNestedManyWithoutTreatmentInput = {
    create?: XOR<FollowUpCreateWithoutTreatmentInput, FollowUpUncheckedCreateWithoutTreatmentInput> | FollowUpCreateWithoutTreatmentInput[] | FollowUpUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: FollowUpCreateOrConnectWithoutTreatmentInput | FollowUpCreateOrConnectWithoutTreatmentInput[]
    createMany?: FollowUpCreateManyTreatmentInputEnvelope
    connect?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
  }

  export type EnumTreatmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.TreatmentStatus
  }

  export type PatientUpdateOneRequiredWithoutTreatmentNestedInput = {
    create?: XOR<PatientCreateWithoutTreatmentInput, PatientUncheckedCreateWithoutTreatmentInput>
    connectOrCreate?: PatientCreateOrConnectWithoutTreatmentInput
    upsert?: PatientUpsertWithoutTreatmentInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutTreatmentInput, PatientUpdateWithoutTreatmentInput>, PatientUncheckedUpdateWithoutTreatmentInput>
  }

  export type PatientVisitUpdateOneWithoutTreatmentNestedInput = {
    create?: XOR<PatientVisitCreateWithoutTreatmentInput, PatientVisitUncheckedCreateWithoutTreatmentInput>
    connectOrCreate?: PatientVisitCreateOrConnectWithoutTreatmentInput
    upsert?: PatientVisitUpsertWithoutTreatmentInput
    disconnect?: PatientVisitWhereInput | boolean
    delete?: PatientVisitWhereInput | boolean
    connect?: PatientVisitWhereUniqueInput
    update?: XOR<XOR<PatientVisitUpdateToOneWithWhereWithoutTreatmentInput, PatientVisitUpdateWithoutTreatmentInput>, PatientVisitUncheckedUpdateWithoutTreatmentInput>
  }

  export type AssessmentUpdateOneWithoutTreatmentNestedInput = {
    create?: XOR<AssessmentCreateWithoutTreatmentInput, AssessmentUncheckedCreateWithoutTreatmentInput>
    connectOrCreate?: AssessmentCreateOrConnectWithoutTreatmentInput
    upsert?: AssessmentUpsertWithoutTreatmentInput
    disconnect?: AssessmentWhereInput | boolean
    delete?: AssessmentWhereInput | boolean
    connect?: AssessmentWhereUniqueInput
    update?: XOR<XOR<AssessmentUpdateToOneWithWhereWithoutTreatmentInput, AssessmentUpdateWithoutTreatmentInput>, AssessmentUncheckedUpdateWithoutTreatmentInput>
  }

  export type FollowUpUpdateManyWithoutTreatmentNestedInput = {
    create?: XOR<FollowUpCreateWithoutTreatmentInput, FollowUpUncheckedCreateWithoutTreatmentInput> | FollowUpCreateWithoutTreatmentInput[] | FollowUpUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: FollowUpCreateOrConnectWithoutTreatmentInput | FollowUpCreateOrConnectWithoutTreatmentInput[]
    upsert?: FollowUpUpsertWithWhereUniqueWithoutTreatmentInput | FollowUpUpsertWithWhereUniqueWithoutTreatmentInput[]
    createMany?: FollowUpCreateManyTreatmentInputEnvelope
    set?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    disconnect?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    delete?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    connect?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    update?: FollowUpUpdateWithWhereUniqueWithoutTreatmentInput | FollowUpUpdateWithWhereUniqueWithoutTreatmentInput[]
    updateMany?: FollowUpUpdateManyWithWhereWithoutTreatmentInput | FollowUpUpdateManyWithWhereWithoutTreatmentInput[]
    deleteMany?: FollowUpScalarWhereInput | FollowUpScalarWhereInput[]
  }

  export type FollowUpUncheckedUpdateManyWithoutTreatmentNestedInput = {
    create?: XOR<FollowUpCreateWithoutTreatmentInput, FollowUpUncheckedCreateWithoutTreatmentInput> | FollowUpCreateWithoutTreatmentInput[] | FollowUpUncheckedCreateWithoutTreatmentInput[]
    connectOrCreate?: FollowUpCreateOrConnectWithoutTreatmentInput | FollowUpCreateOrConnectWithoutTreatmentInput[]
    upsert?: FollowUpUpsertWithWhereUniqueWithoutTreatmentInput | FollowUpUpsertWithWhereUniqueWithoutTreatmentInput[]
    createMany?: FollowUpCreateManyTreatmentInputEnvelope
    set?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    disconnect?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    delete?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    connect?: FollowUpWhereUniqueInput | FollowUpWhereUniqueInput[]
    update?: FollowUpUpdateWithWhereUniqueWithoutTreatmentInput | FollowUpUpdateWithWhereUniqueWithoutTreatmentInput[]
    updateMany?: FollowUpUpdateManyWithWhereWithoutTreatmentInput | FollowUpUpdateManyWithWhereWithoutTreatmentInput[]
    deleteMany?: FollowUpScalarWhereInput | FollowUpScalarWhereInput[]
  }

  export type TreatmentCreateNestedOneWithoutFollowUpsInput = {
    create?: XOR<TreatmentCreateWithoutFollowUpsInput, TreatmentUncheckedCreateWithoutFollowUpsInput>
    connectOrCreate?: TreatmentCreateOrConnectWithoutFollowUpsInput
    connect?: TreatmentWhereUniqueInput
  }

  export type TreatmentUpdateOneRequiredWithoutFollowUpsNestedInput = {
    create?: XOR<TreatmentCreateWithoutFollowUpsInput, TreatmentUncheckedCreateWithoutFollowUpsInput>
    connectOrCreate?: TreatmentCreateOrConnectWithoutFollowUpsInput
    upsert?: TreatmentUpsertWithoutFollowUpsInput
    connect?: TreatmentWhereUniqueInput
    update?: XOR<XOR<TreatmentUpdateToOneWithWhereWithoutFollowUpsInput, TreatmentUpdateWithoutFollowUpsInput>, TreatmentUncheckedUpdateWithoutFollowUpsInput>
  }

  export type PatientCreateNestedOneWithoutMedicalRecordsInput = {
    create?: XOR<PatientCreateWithoutMedicalRecordsInput, PatientUncheckedCreateWithoutMedicalRecordsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutMedicalRecordsInput
    connect?: PatientWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutMedicalRecordsNestedInput = {
    create?: XOR<PatientCreateWithoutMedicalRecordsInput, PatientUncheckedCreateWithoutMedicalRecordsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutMedicalRecordsInput
    upsert?: PatientUpsertWithoutMedicalRecordsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutMedicalRecordsInput, PatientUpdateWithoutMedicalRecordsInput>, PatientUncheckedUpdateWithoutMedicalRecordsInput>
  }

  export type UserCreateNestedOneWithoutDoctorInput = {
    create?: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorInput
    connect?: UserWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutDoctorInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutDoctorNestedInput = {
    create?: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorInput
    upsert?: UserUpsertWithoutDoctorInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorInput, UserUpdateWithoutDoctorInput>, UserUncheckedUpdateWithoutDoctorInput>
  }

  export type AppointmentUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutDoctorInput | PrescriptionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutDoctorInput | PrescriptionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutDoctorInput | PrescriptionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput> | PrescriptionCreateWithoutDoctorInput[] | PrescriptionUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutDoctorInput | PrescriptionCreateOrConnectWithoutDoctorInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutDoctorInput | PrescriptionUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: PrescriptionCreateManyDoctorInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutDoctorInput | PrescriptionUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutDoctorInput | PrescriptionUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type PatientCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<PatientCreateWithoutAppointmentInput, PatientUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorCreateNestedOneWithoutAppointmentInput = {
    create?: XOR<DoctorCreateWithoutAppointmentInput, DoctorUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutAppointmentInput
    connect?: DoctorWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutAppointmentNestedInput = {
    create?: XOR<PatientCreateWithoutAppointmentInput, PatientUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: PatientCreateOrConnectWithoutAppointmentInput
    upsert?: PatientUpsertWithoutAppointmentInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutAppointmentInput, PatientUpdateWithoutAppointmentInput>, PatientUncheckedUpdateWithoutAppointmentInput>
  }

  export type DoctorUpdateOneRequiredWithoutAppointmentNestedInput = {
    create?: XOR<DoctorCreateWithoutAppointmentInput, DoctorUncheckedCreateWithoutAppointmentInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutAppointmentInput
    upsert?: DoctorUpsertWithoutAppointmentInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutAppointmentInput, DoctorUpdateWithoutAppointmentInput>, DoctorUncheckedUpdateWithoutAppointmentInput>
  }

  export type MedicineBatchCreateNestedManyWithoutMedicineInput = {
    create?: XOR<MedicineBatchCreateWithoutMedicineInput, MedicineBatchUncheckedCreateWithoutMedicineInput> | MedicineBatchCreateWithoutMedicineInput[] | MedicineBatchUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: MedicineBatchCreateOrConnectWithoutMedicineInput | MedicineBatchCreateOrConnectWithoutMedicineInput[]
    createMany?: MedicineBatchCreateManyMedicineInputEnvelope
    connect?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
  }

  export type PrescriptionCreateNestedManyWithoutMedicineInput = {
    create?: XOR<PrescriptionCreateWithoutMedicineInput, PrescriptionUncheckedCreateWithoutMedicineInput> | PrescriptionCreateWithoutMedicineInput[] | PrescriptionUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutMedicineInput | PrescriptionCreateOrConnectWithoutMedicineInput[]
    createMany?: PrescriptionCreateManyMedicineInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type MedicineBatchUncheckedCreateNestedManyWithoutMedicineInput = {
    create?: XOR<MedicineBatchCreateWithoutMedicineInput, MedicineBatchUncheckedCreateWithoutMedicineInput> | MedicineBatchCreateWithoutMedicineInput[] | MedicineBatchUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: MedicineBatchCreateOrConnectWithoutMedicineInput | MedicineBatchCreateOrConnectWithoutMedicineInput[]
    createMany?: MedicineBatchCreateManyMedicineInputEnvelope
    connect?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
  }

  export type PrescriptionUncheckedCreateNestedManyWithoutMedicineInput = {
    create?: XOR<PrescriptionCreateWithoutMedicineInput, PrescriptionUncheckedCreateWithoutMedicineInput> | PrescriptionCreateWithoutMedicineInput[] | PrescriptionUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutMedicineInput | PrescriptionCreateOrConnectWithoutMedicineInput[]
    createMany?: PrescriptionCreateManyMedicineInputEnvelope
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
  }

  export type MedicineBatchUpdateManyWithoutMedicineNestedInput = {
    create?: XOR<MedicineBatchCreateWithoutMedicineInput, MedicineBatchUncheckedCreateWithoutMedicineInput> | MedicineBatchCreateWithoutMedicineInput[] | MedicineBatchUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: MedicineBatchCreateOrConnectWithoutMedicineInput | MedicineBatchCreateOrConnectWithoutMedicineInput[]
    upsert?: MedicineBatchUpsertWithWhereUniqueWithoutMedicineInput | MedicineBatchUpsertWithWhereUniqueWithoutMedicineInput[]
    createMany?: MedicineBatchCreateManyMedicineInputEnvelope
    set?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    disconnect?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    delete?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    connect?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    update?: MedicineBatchUpdateWithWhereUniqueWithoutMedicineInput | MedicineBatchUpdateWithWhereUniqueWithoutMedicineInput[]
    updateMany?: MedicineBatchUpdateManyWithWhereWithoutMedicineInput | MedicineBatchUpdateManyWithWhereWithoutMedicineInput[]
    deleteMany?: MedicineBatchScalarWhereInput | MedicineBatchScalarWhereInput[]
  }

  export type PrescriptionUpdateManyWithoutMedicineNestedInput = {
    create?: XOR<PrescriptionCreateWithoutMedicineInput, PrescriptionUncheckedCreateWithoutMedicineInput> | PrescriptionCreateWithoutMedicineInput[] | PrescriptionUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutMedicineInput | PrescriptionCreateOrConnectWithoutMedicineInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutMedicineInput | PrescriptionUpsertWithWhereUniqueWithoutMedicineInput[]
    createMany?: PrescriptionCreateManyMedicineInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutMedicineInput | PrescriptionUpdateWithWhereUniqueWithoutMedicineInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutMedicineInput | PrescriptionUpdateManyWithWhereWithoutMedicineInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type MedicineBatchUncheckedUpdateManyWithoutMedicineNestedInput = {
    create?: XOR<MedicineBatchCreateWithoutMedicineInput, MedicineBatchUncheckedCreateWithoutMedicineInput> | MedicineBatchCreateWithoutMedicineInput[] | MedicineBatchUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: MedicineBatchCreateOrConnectWithoutMedicineInput | MedicineBatchCreateOrConnectWithoutMedicineInput[]
    upsert?: MedicineBatchUpsertWithWhereUniqueWithoutMedicineInput | MedicineBatchUpsertWithWhereUniqueWithoutMedicineInput[]
    createMany?: MedicineBatchCreateManyMedicineInputEnvelope
    set?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    disconnect?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    delete?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    connect?: MedicineBatchWhereUniqueInput | MedicineBatchWhereUniqueInput[]
    update?: MedicineBatchUpdateWithWhereUniqueWithoutMedicineInput | MedicineBatchUpdateWithWhereUniqueWithoutMedicineInput[]
    updateMany?: MedicineBatchUpdateManyWithWhereWithoutMedicineInput | MedicineBatchUpdateManyWithWhereWithoutMedicineInput[]
    deleteMany?: MedicineBatchScalarWhereInput | MedicineBatchScalarWhereInput[]
  }

  export type PrescriptionUncheckedUpdateManyWithoutMedicineNestedInput = {
    create?: XOR<PrescriptionCreateWithoutMedicineInput, PrescriptionUncheckedCreateWithoutMedicineInput> | PrescriptionCreateWithoutMedicineInput[] | PrescriptionUncheckedCreateWithoutMedicineInput[]
    connectOrCreate?: PrescriptionCreateOrConnectWithoutMedicineInput | PrescriptionCreateOrConnectWithoutMedicineInput[]
    upsert?: PrescriptionUpsertWithWhereUniqueWithoutMedicineInput | PrescriptionUpsertWithWhereUniqueWithoutMedicineInput[]
    createMany?: PrescriptionCreateManyMedicineInputEnvelope
    set?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    disconnect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    delete?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    connect?: PrescriptionWhereUniqueInput | PrescriptionWhereUniqueInput[]
    update?: PrescriptionUpdateWithWhereUniqueWithoutMedicineInput | PrescriptionUpdateWithWhereUniqueWithoutMedicineInput[]
    updateMany?: PrescriptionUpdateManyWithWhereWithoutMedicineInput | PrescriptionUpdateManyWithWhereWithoutMedicineInput[]
    deleteMany?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
  }

  export type MedicineTypeCreateNestedOneWithoutMedicineBatchInput = {
    create?: XOR<MedicineTypeCreateWithoutMedicineBatchInput, MedicineTypeUncheckedCreateWithoutMedicineBatchInput>
    connectOrCreate?: MedicineTypeCreateOrConnectWithoutMedicineBatchInput
    connect?: MedicineTypeWhereUniqueInput
  }

  export type MedicineTypeUpdateOneRequiredWithoutMedicineBatchNestedInput = {
    create?: XOR<MedicineTypeCreateWithoutMedicineBatchInput, MedicineTypeUncheckedCreateWithoutMedicineBatchInput>
    connectOrCreate?: MedicineTypeCreateOrConnectWithoutMedicineBatchInput
    upsert?: MedicineTypeUpsertWithoutMedicineBatchInput
    connect?: MedicineTypeWhereUniqueInput
    update?: XOR<XOR<MedicineTypeUpdateToOneWithWhereWithoutMedicineBatchInput, MedicineTypeUpdateWithoutMedicineBatchInput>, MedicineTypeUncheckedUpdateWithoutMedicineBatchInput>
  }

  export type PatientCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<PatientCreateWithoutPrescriptionInput, PatientUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPrescriptionInput
    connect?: PatientWhereUniqueInput
  }

  export type DoctorCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<DoctorCreateWithoutPrescriptionInput, DoctorUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutPrescriptionInput
    connect?: DoctorWhereUniqueInput
  }

  export type MedicineTypeCreateNestedOneWithoutPrescriptionInput = {
    create?: XOR<MedicineTypeCreateWithoutPrescriptionInput, MedicineTypeUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: MedicineTypeCreateOrConnectWithoutPrescriptionInput
    connect?: MedicineTypeWhereUniqueInput
  }

  export type PatientUpdateOneRequiredWithoutPrescriptionNestedInput = {
    create?: XOR<PatientCreateWithoutPrescriptionInput, PatientUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: PatientCreateOrConnectWithoutPrescriptionInput
    upsert?: PatientUpsertWithoutPrescriptionInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutPrescriptionInput, PatientUpdateWithoutPrescriptionInput>, PatientUncheckedUpdateWithoutPrescriptionInput>
  }

  export type DoctorUpdateOneRequiredWithoutPrescriptionNestedInput = {
    create?: XOR<DoctorCreateWithoutPrescriptionInput, DoctorUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: DoctorCreateOrConnectWithoutPrescriptionInput
    upsert?: DoctorUpsertWithoutPrescriptionInput
    connect?: DoctorWhereUniqueInput
    update?: XOR<XOR<DoctorUpdateToOneWithWhereWithoutPrescriptionInput, DoctorUpdateWithoutPrescriptionInput>, DoctorUncheckedUpdateWithoutPrescriptionInput>
  }

  export type MedicineTypeUpdateOneRequiredWithoutPrescriptionNestedInput = {
    create?: XOR<MedicineTypeCreateWithoutPrescriptionInput, MedicineTypeUncheckedCreateWithoutPrescriptionInput>
    connectOrCreate?: MedicineTypeCreateOrConnectWithoutPrescriptionInput
    upsert?: MedicineTypeUpsertWithoutPrescriptionInput
    connect?: MedicineTypeWhereUniqueInput
    update?: XOR<XOR<MedicineTypeUpdateToOneWithWhereWithoutPrescriptionInput, MedicineTypeUpdateWithoutPrescriptionInput>, MedicineTypeUncheckedUpdateWithoutPrescriptionInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumTreatmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusFilter<$PrismaModel> | $Enums.TreatmentStatus
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumTreatmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TreatmentStatus | EnumTreatmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TreatmentStatus[] | ListEnumTreatmentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTreatmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.TreatmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTreatmentStatusFilter<$PrismaModel>
    _max?: NestedEnumTreatmentStatusFilter<$PrismaModel>
  }

  export type PatientCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitCreateNestedManyWithoutPatientInput
    assessment?: AssessmentCreateNestedManyWithoutPatientInput
    treatment?: TreatmentCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordCreateNestedManyWithoutPatientInput
    appointment?: AppointmentCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitUncheckedCreateNestedManyWithoutPatientInput
    assessment?: AssessmentUncheckedCreateNestedManyWithoutPatientInput
    treatment?: TreatmentUncheckedCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordUncheckedCreateNestedManyWithoutPatientInput
    appointment?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutUserInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
  }

  export type DoctorCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    field: string
    appointment?: AppointmentCreateNestedManyWithoutDoctorInput
    prescription?: PrescriptionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    field: string
    appointment?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutUserInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
  }

  export type PatientUpsertWithoutUserInput = {
    update: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
    create: XOR<PatientCreateWithoutUserInput, PatientUncheckedCreateWithoutUserInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutUserInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutUserInput, PatientUncheckedUpdateWithoutUserInput>
  }

  export type PatientUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUncheckedUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUncheckedUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type DoctorUpsertWithoutUserInput = {
    update: XOR<DoctorUpdateWithoutUserInput, DoctorUncheckedUpdateWithoutUserInput>
    create: XOR<DoctorCreateWithoutUserInput, DoctorUncheckedCreateWithoutUserInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutUserInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutUserInput, DoctorUncheckedUpdateWithoutUserInput>
  }

  export type DoctorUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    field?: StringFieldUpdateOperationsInput | string
    appointment?: AppointmentUpdateManyWithoutDoctorNestedInput
    prescription?: PrescriptionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    field?: StringFieldUpdateOperationsInput | string
    appointment?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type UserCreateWithoutPatientInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    role: string
    doctor?: DoctorCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPatientInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    role: string
    doctor?: DoctorUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPatientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
  }

  export type PatientVisitCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reason: string
    status: string
    date?: Date | string
    treatment?: TreatmentCreateNestedManyWithoutVisitInput
  }

  export type PatientVisitUncheckedCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reason: string
    status: string
    date?: Date | string
    treatment?: TreatmentUncheckedCreateNestedManyWithoutVisitInput
  }

  export type PatientVisitCreateOrConnectWithoutPatientInput = {
    where: PatientVisitWhereUniqueInput
    create: XOR<PatientVisitCreateWithoutPatientInput, PatientVisitUncheckedCreateWithoutPatientInput>
  }

  export type PatientVisitCreateManyPatientInputEnvelope = {
    data: PatientVisitCreateManyPatientInput | PatientVisitCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type AssessmentCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
    treatment?: TreatmentCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
    treatment?: TreatmentUncheckedCreateNestedManyWithoutAssessmentInput
  }

  export type AssessmentCreateOrConnectWithoutPatientInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutPatientInput, AssessmentUncheckedCreateWithoutPatientInput>
  }

  export type AssessmentCreateManyPatientInputEnvelope = {
    data: AssessmentCreateManyPatientInput | AssessmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type TreatmentCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    visit?: PatientVisitCreateNestedOneWithoutTreatmentInput
    assessment?: AssessmentCreateNestedOneWithoutTreatmentInput
    followUps?: FollowUpCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentUncheckedCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    visitId?: string | null
    assessmentId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    followUps?: FollowUpUncheckedCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentCreateOrConnectWithoutPatientInput = {
    where: TreatmentWhereUniqueInput
    create: XOR<TreatmentCreateWithoutPatientInput, TreatmentUncheckedCreateWithoutPatientInput>
  }

  export type TreatmentCreateManyPatientInputEnvelope = {
    data: TreatmentCreateManyPatientInput | TreatmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type MedicalRecordCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosis: string
    treatment: string
    notes?: string | null
  }

  export type MedicalRecordUncheckedCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosis: string
    treatment: string
    notes?: string | null
  }

  export type MedicalRecordCreateOrConnectWithoutPatientInput = {
    where: MedicalRecordWhereUniqueInput
    create: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
  }

  export type MedicalRecordCreateManyPatientInputEnvelope = {
    data: MedicalRecordCreateManyPatientInput | MedicalRecordCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    date: Date | string
    status: string
    doctor: DoctorCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    doctorId: string
    date: Date | string
    status: string
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type PrescriptionCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dosage: string
    duration: string
    doctor: DoctorCreateNestedOneWithoutPrescriptionInput
    medicine: MedicineTypeCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorId: string
    medicineId: string
    dosage: string
    duration: string
  }

  export type PrescriptionCreateOrConnectWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput>
  }

  export type PrescriptionCreateManyPatientInputEnvelope = {
    data: PrescriptionCreateManyPatientInput | PrescriptionCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPatientInput = {
    update: XOR<UserUpdateWithoutPatientInput, UserUncheckedUpdateWithoutPatientInput>
    create: XOR<UserCreateWithoutPatientInput, UserUncheckedCreateWithoutPatientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientInput, UserUncheckedUpdateWithoutPatientInput>
  }

  export type UserUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    doctor?: DoctorUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    doctor?: DoctorUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PatientVisitUpsertWithWhereUniqueWithoutPatientInput = {
    where: PatientVisitWhereUniqueInput
    update: XOR<PatientVisitUpdateWithoutPatientInput, PatientVisitUncheckedUpdateWithoutPatientInput>
    create: XOR<PatientVisitCreateWithoutPatientInput, PatientVisitUncheckedCreateWithoutPatientInput>
  }

  export type PatientVisitUpdateWithWhereUniqueWithoutPatientInput = {
    where: PatientVisitWhereUniqueInput
    data: XOR<PatientVisitUpdateWithoutPatientInput, PatientVisitUncheckedUpdateWithoutPatientInput>
  }

  export type PatientVisitUpdateManyWithWhereWithoutPatientInput = {
    where: PatientVisitScalarWhereInput
    data: XOR<PatientVisitUpdateManyMutationInput, PatientVisitUncheckedUpdateManyWithoutPatientInput>
  }

  export type PatientVisitScalarWhereInput = {
    AND?: PatientVisitScalarWhereInput | PatientVisitScalarWhereInput[]
    OR?: PatientVisitScalarWhereInput[]
    NOT?: PatientVisitScalarWhereInput | PatientVisitScalarWhereInput[]
    id?: StringFilter<"PatientVisit"> | string
    createdAt?: DateTimeFilter<"PatientVisit"> | Date | string
    updatedAt?: DateTimeFilter<"PatientVisit"> | Date | string
    patientId?: StringFilter<"PatientVisit"> | string
    reason?: StringFilter<"PatientVisit"> | string
    status?: StringFilter<"PatientVisit"> | string
    date?: DateTimeFilter<"PatientVisit"> | Date | string
  }

  export type AssessmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AssessmentWhereUniqueInput
    update: XOR<AssessmentUpdateWithoutPatientInput, AssessmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AssessmentCreateWithoutPatientInput, AssessmentUncheckedCreateWithoutPatientInput>
  }

  export type AssessmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AssessmentWhereUniqueInput
    data: XOR<AssessmentUpdateWithoutPatientInput, AssessmentUncheckedUpdateWithoutPatientInput>
  }

  export type AssessmentUpdateManyWithWhereWithoutPatientInput = {
    where: AssessmentScalarWhereInput
    data: XOR<AssessmentUpdateManyMutationInput, AssessmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type AssessmentScalarWhereInput = {
    AND?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    OR?: AssessmentScalarWhereInput[]
    NOT?: AssessmentScalarWhereInput | AssessmentScalarWhereInput[]
    id?: StringFilter<"Assessment"> | string
    createdAt?: DateTimeFilter<"Assessment"> | Date | string
    updatedAt?: DateTimeFilter<"Assessment"> | Date | string
    patientId?: StringFilter<"Assessment"> | string
    symptoms?: StringFilter<"Assessment"> | string
    assessment?: StringNullableFilter<"Assessment"> | string | null
    diagnosis?: StringNullableFilter<"Assessment"> | string | null
    bloodPressure?: StringFilter<"Assessment"> | string
    pulseRate?: IntFilter<"Assessment"> | number
    respiratoryRate?: IntFilter<"Assessment"> | number
    oxygenSaturation?: FloatNullableFilter<"Assessment"> | number | null
    alcoholUse?: BoolFilter<"Assessment"> | boolean
    smoker?: BoolNullableFilter<"Assessment"> | boolean | null
    allergies?: StringNullableFilter<"Assessment"> | string | null
    painLocation?: StringNullableFilter<"Assessment"> | string | null
    painScale?: IntNullableFilter<"Assessment"> | number | null
  }

  export type TreatmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: TreatmentWhereUniqueInput
    update: XOR<TreatmentUpdateWithoutPatientInput, TreatmentUncheckedUpdateWithoutPatientInput>
    create: XOR<TreatmentCreateWithoutPatientInput, TreatmentUncheckedCreateWithoutPatientInput>
  }

  export type TreatmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: TreatmentWhereUniqueInput
    data: XOR<TreatmentUpdateWithoutPatientInput, TreatmentUncheckedUpdateWithoutPatientInput>
  }

  export type TreatmentUpdateManyWithWhereWithoutPatientInput = {
    where: TreatmentScalarWhereInput
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type TreatmentScalarWhereInput = {
    AND?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
    OR?: TreatmentScalarWhereInput[]
    NOT?: TreatmentScalarWhereInput | TreatmentScalarWhereInput[]
    id?: StringFilter<"Treatment"> | string
    createdAt?: DateTimeFilter<"Treatment"> | Date | string
    updatedAt?: DateTimeFilter<"Treatment"> | Date | string
    patientId?: StringFilter<"Treatment"> | string
    visitId?: StringNullableFilter<"Treatment"> | string | null
    assessmentId?: StringNullableFilter<"Treatment"> | string | null
    medications?: JsonNullableFilter<"Treatment">
    procedures?: StringNullableFilter<"Treatment"> | string | null
    painScale?: IntNullableFilter<"Treatment"> | number | null
    remarks?: StringNullableFilter<"Treatment"> | string | null
    status?: EnumTreatmentStatusFilter<"Treatment"> | $Enums.TreatmentStatus
    priority?: IntNullableFilter<"Treatment"> | number | null
    nextFollowUpAt?: DateTimeNullableFilter<"Treatment"> | Date | string | null
  }

  export type MedicalRecordUpsertWithWhereUniqueWithoutPatientInput = {
    where: MedicalRecordWhereUniqueInput
    update: XOR<MedicalRecordUpdateWithoutPatientInput, MedicalRecordUncheckedUpdateWithoutPatientInput>
    create: XOR<MedicalRecordCreateWithoutPatientInput, MedicalRecordUncheckedCreateWithoutPatientInput>
  }

  export type MedicalRecordUpdateWithWhereUniqueWithoutPatientInput = {
    where: MedicalRecordWhereUniqueInput
    data: XOR<MedicalRecordUpdateWithoutPatientInput, MedicalRecordUncheckedUpdateWithoutPatientInput>
  }

  export type MedicalRecordUpdateManyWithWhereWithoutPatientInput = {
    where: MedicalRecordScalarWhereInput
    data: XOR<MedicalRecordUpdateManyMutationInput, MedicalRecordUncheckedUpdateManyWithoutPatientInput>
  }

  export type MedicalRecordScalarWhereInput = {
    AND?: MedicalRecordScalarWhereInput | MedicalRecordScalarWhereInput[]
    OR?: MedicalRecordScalarWhereInput[]
    NOT?: MedicalRecordScalarWhereInput | MedicalRecordScalarWhereInput[]
    id?: StringFilter<"MedicalRecord"> | string
    createdAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    updatedAt?: DateTimeFilter<"MedicalRecord"> | Date | string
    patientId?: StringFilter<"MedicalRecord"> | string
    diagnosis?: StringFilter<"MedicalRecord"> | string
    treatment?: StringFilter<"MedicalRecord"> | string
    notes?: StringNullableFilter<"MedicalRecord"> | string | null
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    archived?: BoolFilter<"Appointment"> | boolean
    patientId?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    status?: StringFilter<"Appointment"> | string
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutPatientInput, PrescriptionUncheckedUpdateWithoutPatientInput>
    create: XOR<PrescriptionCreateWithoutPatientInput, PrescriptionUncheckedCreateWithoutPatientInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutPatientInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutPatientInput, PrescriptionUncheckedUpdateWithoutPatientInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutPatientInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutPatientInput>
  }

  export type PrescriptionScalarWhereInput = {
    AND?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    OR?: PrescriptionScalarWhereInput[]
    NOT?: PrescriptionScalarWhereInput | PrescriptionScalarWhereInput[]
    id?: StringFilter<"Prescription"> | string
    createdAt?: DateTimeFilter<"Prescription"> | Date | string
    updatedAt?: DateTimeFilter<"Prescription"> | Date | string
    patientId?: StringFilter<"Prescription"> | string
    doctorId?: StringFilter<"Prescription"> | string
    medicineId?: StringFilter<"Prescription"> | string
    dosage?: StringFilter<"Prescription"> | string
    duration?: StringFilter<"Prescription"> | string
  }

  export type PatientCreateWithoutPatientVisitInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    user?: UserCreateNestedOneWithoutPatientInput
    assessment?: AssessmentCreateNestedManyWithoutPatientInput
    treatment?: TreatmentCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordCreateNestedManyWithoutPatientInput
    appointment?: AppointmentCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPatientVisitInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    assessment?: AssessmentUncheckedCreateNestedManyWithoutPatientInput
    treatment?: TreatmentUncheckedCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordUncheckedCreateNestedManyWithoutPatientInput
    appointment?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPatientVisitInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPatientVisitInput, PatientUncheckedCreateWithoutPatientVisitInput>
  }

  export type TreatmentCreateWithoutVisitInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    patient: PatientCreateNestedOneWithoutTreatmentInput
    assessment?: AssessmentCreateNestedOneWithoutTreatmentInput
    followUps?: FollowUpCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentUncheckedCreateWithoutVisitInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    assessmentId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    followUps?: FollowUpUncheckedCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentCreateOrConnectWithoutVisitInput = {
    where: TreatmentWhereUniqueInput
    create: XOR<TreatmentCreateWithoutVisitInput, TreatmentUncheckedCreateWithoutVisitInput>
  }

  export type TreatmentCreateManyVisitInputEnvelope = {
    data: TreatmentCreateManyVisitInput | TreatmentCreateManyVisitInput[]
    skipDuplicates?: boolean
  }

  export type PatientUpsertWithoutPatientVisitInput = {
    update: XOR<PatientUpdateWithoutPatientVisitInput, PatientUncheckedUpdateWithoutPatientVisitInput>
    create: XOR<PatientCreateWithoutPatientVisitInput, PatientUncheckedCreateWithoutPatientVisitInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPatientVisitInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPatientVisitInput, PatientUncheckedUpdateWithoutPatientVisitInput>
  }

  export type PatientUpdateWithoutPatientVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutPatientNestedInput
    assessment?: AssessmentUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPatientVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    assessment?: AssessmentUncheckedUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type TreatmentUpsertWithWhereUniqueWithoutVisitInput = {
    where: TreatmentWhereUniqueInput
    update: XOR<TreatmentUpdateWithoutVisitInput, TreatmentUncheckedUpdateWithoutVisitInput>
    create: XOR<TreatmentCreateWithoutVisitInput, TreatmentUncheckedCreateWithoutVisitInput>
  }

  export type TreatmentUpdateWithWhereUniqueWithoutVisitInput = {
    where: TreatmentWhereUniqueInput
    data: XOR<TreatmentUpdateWithoutVisitInput, TreatmentUncheckedUpdateWithoutVisitInput>
  }

  export type TreatmentUpdateManyWithWhereWithoutVisitInput = {
    where: TreatmentScalarWhereInput
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyWithoutVisitInput>
  }

  export type PatientCreateWithoutAssessmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    user?: UserCreateNestedOneWithoutPatientInput
    patientVisit?: PatientVisitCreateNestedManyWithoutPatientInput
    treatment?: TreatmentCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordCreateNestedManyWithoutPatientInput
    appointment?: AppointmentCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAssessmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitUncheckedCreateNestedManyWithoutPatientInput
    treatment?: TreatmentUncheckedCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordUncheckedCreateNestedManyWithoutPatientInput
    appointment?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAssessmentInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAssessmentInput, PatientUncheckedCreateWithoutAssessmentInput>
  }

  export type TreatmentCreateWithoutAssessmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    patient: PatientCreateNestedOneWithoutTreatmentInput
    visit?: PatientVisitCreateNestedOneWithoutTreatmentInput
    followUps?: FollowUpCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentUncheckedCreateWithoutAssessmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    visitId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    followUps?: FollowUpUncheckedCreateNestedManyWithoutTreatmentInput
  }

  export type TreatmentCreateOrConnectWithoutAssessmentInput = {
    where: TreatmentWhereUniqueInput
    create: XOR<TreatmentCreateWithoutAssessmentInput, TreatmentUncheckedCreateWithoutAssessmentInput>
  }

  export type TreatmentCreateManyAssessmentInputEnvelope = {
    data: TreatmentCreateManyAssessmentInput | TreatmentCreateManyAssessmentInput[]
    skipDuplicates?: boolean
  }

  export type PatientUpsertWithoutAssessmentInput = {
    update: XOR<PatientUpdateWithoutAssessmentInput, PatientUncheckedUpdateWithoutAssessmentInput>
    create: XOR<PatientCreateWithoutAssessmentInput, PatientUncheckedCreateWithoutAssessmentInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAssessmentInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAssessmentInput, PatientUncheckedUpdateWithoutAssessmentInput>
  }

  export type PatientUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutPatientNestedInput
    patientVisit?: PatientVisitUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUncheckedUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type TreatmentUpsertWithWhereUniqueWithoutAssessmentInput = {
    where: TreatmentWhereUniqueInput
    update: XOR<TreatmentUpdateWithoutAssessmentInput, TreatmentUncheckedUpdateWithoutAssessmentInput>
    create: XOR<TreatmentCreateWithoutAssessmentInput, TreatmentUncheckedCreateWithoutAssessmentInput>
  }

  export type TreatmentUpdateWithWhereUniqueWithoutAssessmentInput = {
    where: TreatmentWhereUniqueInput
    data: XOR<TreatmentUpdateWithoutAssessmentInput, TreatmentUncheckedUpdateWithoutAssessmentInput>
  }

  export type TreatmentUpdateManyWithWhereWithoutAssessmentInput = {
    where: TreatmentScalarWhereInput
    data: XOR<TreatmentUpdateManyMutationInput, TreatmentUncheckedUpdateManyWithoutAssessmentInput>
  }

  export type PatientCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    user?: UserCreateNestedOneWithoutPatientInput
    patientVisit?: PatientVisitCreateNestedManyWithoutPatientInput
    assessment?: AssessmentCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordCreateNestedManyWithoutPatientInput
    appointment?: AppointmentCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitUncheckedCreateNestedManyWithoutPatientInput
    assessment?: AssessmentUncheckedCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordUncheckedCreateNestedManyWithoutPatientInput
    appointment?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutTreatmentInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutTreatmentInput, PatientUncheckedCreateWithoutTreatmentInput>
  }

  export type PatientVisitCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reason: string
    status: string
    date?: Date | string
    patient: PatientCreateNestedOneWithoutPatientVisitInput
  }

  export type PatientVisitUncheckedCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    reason: string
    status: string
    date?: Date | string
  }

  export type PatientVisitCreateOrConnectWithoutTreatmentInput = {
    where: PatientVisitWhereUniqueInput
    create: XOR<PatientVisitCreateWithoutTreatmentInput, PatientVisitUncheckedCreateWithoutTreatmentInput>
  }

  export type AssessmentCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
    patient: PatientCreateNestedOneWithoutAssessmentInput
  }

  export type AssessmentUncheckedCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
  }

  export type AssessmentCreateOrConnectWithoutTreatmentInput = {
    where: AssessmentWhereUniqueInput
    create: XOR<AssessmentCreateWithoutTreatmentInput, AssessmentUncheckedCreateWithoutTreatmentInput>
  }

  export type FollowUpCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    findings?: string | null
    outcome?: string | null
    nextAction?: string | null
    painScale?: number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: Date | string
    nextFollowUp?: Date | string | null
    resolved?: boolean
  }

  export type FollowUpUncheckedCreateWithoutTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    findings?: string | null
    outcome?: string | null
    nextAction?: string | null
    painScale?: number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: Date | string
    nextFollowUp?: Date | string | null
    resolved?: boolean
  }

  export type FollowUpCreateOrConnectWithoutTreatmentInput = {
    where: FollowUpWhereUniqueInput
    create: XOR<FollowUpCreateWithoutTreatmentInput, FollowUpUncheckedCreateWithoutTreatmentInput>
  }

  export type FollowUpCreateManyTreatmentInputEnvelope = {
    data: FollowUpCreateManyTreatmentInput | FollowUpCreateManyTreatmentInput[]
    skipDuplicates?: boolean
  }

  export type PatientUpsertWithoutTreatmentInput = {
    update: XOR<PatientUpdateWithoutTreatmentInput, PatientUncheckedUpdateWithoutTreatmentInput>
    create: XOR<PatientCreateWithoutTreatmentInput, PatientUncheckedCreateWithoutTreatmentInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutTreatmentInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutTreatmentInput, PatientUncheckedUpdateWithoutTreatmentInput>
  }

  export type PatientUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutPatientNestedInput
    patientVisit?: PatientVisitUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUncheckedUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientVisitUpsertWithoutTreatmentInput = {
    update: XOR<PatientVisitUpdateWithoutTreatmentInput, PatientVisitUncheckedUpdateWithoutTreatmentInput>
    create: XOR<PatientVisitCreateWithoutTreatmentInput, PatientVisitUncheckedCreateWithoutTreatmentInput>
    where?: PatientVisitWhereInput
  }

  export type PatientVisitUpdateToOneWithWhereWithoutTreatmentInput = {
    where?: PatientVisitWhereInput
    data: XOR<PatientVisitUpdateWithoutTreatmentInput, PatientVisitUncheckedUpdateWithoutTreatmentInput>
  }

  export type PatientVisitUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutPatientVisitNestedInput
  }

  export type PatientVisitUncheckedUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUpsertWithoutTreatmentInput = {
    update: XOR<AssessmentUpdateWithoutTreatmentInput, AssessmentUncheckedUpdateWithoutTreatmentInput>
    create: XOR<AssessmentCreateWithoutTreatmentInput, AssessmentUncheckedCreateWithoutTreatmentInput>
    where?: AssessmentWhereInput
  }

  export type AssessmentUpdateToOneWithWhereWithoutTreatmentInput = {
    where?: AssessmentWhereInput
    data: XOR<AssessmentUpdateWithoutTreatmentInput, AssessmentUncheckedUpdateWithoutTreatmentInput>
  }

  export type AssessmentUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    patient?: PatientUpdateOneRequiredWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type FollowUpUpsertWithWhereUniqueWithoutTreatmentInput = {
    where: FollowUpWhereUniqueInput
    update: XOR<FollowUpUpdateWithoutTreatmentInput, FollowUpUncheckedUpdateWithoutTreatmentInput>
    create: XOR<FollowUpCreateWithoutTreatmentInput, FollowUpUncheckedCreateWithoutTreatmentInput>
  }

  export type FollowUpUpdateWithWhereUniqueWithoutTreatmentInput = {
    where: FollowUpWhereUniqueInput
    data: XOR<FollowUpUpdateWithoutTreatmentInput, FollowUpUncheckedUpdateWithoutTreatmentInput>
  }

  export type FollowUpUpdateManyWithWhereWithoutTreatmentInput = {
    where: FollowUpScalarWhereInput
    data: XOR<FollowUpUpdateManyMutationInput, FollowUpUncheckedUpdateManyWithoutTreatmentInput>
  }

  export type FollowUpScalarWhereInput = {
    AND?: FollowUpScalarWhereInput | FollowUpScalarWhereInput[]
    OR?: FollowUpScalarWhereInput[]
    NOT?: FollowUpScalarWhereInput | FollowUpScalarWhereInput[]
    id?: StringFilter<"FollowUp"> | string
    createdAt?: DateTimeFilter<"FollowUp"> | Date | string
    updatedAt?: DateTimeFilter<"FollowUp"> | Date | string
    treatmentId?: StringFilter<"FollowUp"> | string
    note?: StringNullableFilter<"FollowUp"> | string | null
    findings?: StringNullableFilter<"FollowUp"> | string | null
    outcome?: StringNullableFilter<"FollowUp"> | string | null
    nextAction?: StringNullableFilter<"FollowUp"> | string | null
    painScale?: IntNullableFilter<"FollowUp"> | number | null
    vitals?: JsonNullableFilter<"FollowUp">
    followUpDate?: DateTimeFilter<"FollowUp"> | Date | string
    nextFollowUp?: DateTimeNullableFilter<"FollowUp"> | Date | string | null
    resolved?: BoolFilter<"FollowUp"> | boolean
  }

  export type TreatmentCreateWithoutFollowUpsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
    patient: PatientCreateNestedOneWithoutTreatmentInput
    visit?: PatientVisitCreateNestedOneWithoutTreatmentInput
    assessment?: AssessmentCreateNestedOneWithoutTreatmentInput
  }

  export type TreatmentUncheckedCreateWithoutFollowUpsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    visitId?: string | null
    assessmentId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
  }

  export type TreatmentCreateOrConnectWithoutFollowUpsInput = {
    where: TreatmentWhereUniqueInput
    create: XOR<TreatmentCreateWithoutFollowUpsInput, TreatmentUncheckedCreateWithoutFollowUpsInput>
  }

  export type TreatmentUpsertWithoutFollowUpsInput = {
    update: XOR<TreatmentUpdateWithoutFollowUpsInput, TreatmentUncheckedUpdateWithoutFollowUpsInput>
    create: XOR<TreatmentCreateWithoutFollowUpsInput, TreatmentUncheckedCreateWithoutFollowUpsInput>
    where?: TreatmentWhereInput
  }

  export type TreatmentUpdateToOneWithWhereWithoutFollowUpsInput = {
    where?: TreatmentWhereInput
    data: XOR<TreatmentUpdateWithoutFollowUpsInput, TreatmentUncheckedUpdateWithoutFollowUpsInput>
  }

  export type TreatmentUpdateWithoutFollowUpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneRequiredWithoutTreatmentNestedInput
    visit?: PatientVisitUpdateOneWithoutTreatmentNestedInput
    assessment?: AssessmentUpdateOneWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateWithoutFollowUpsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    assessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PatientCreateWithoutMedicalRecordsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    user?: UserCreateNestedOneWithoutPatientInput
    patientVisit?: PatientVisitCreateNestedManyWithoutPatientInput
    assessment?: AssessmentCreateNestedManyWithoutPatientInput
    treatment?: TreatmentCreateNestedManyWithoutPatientInput
    appointment?: AppointmentCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutMedicalRecordsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitUncheckedCreateNestedManyWithoutPatientInput
    assessment?: AssessmentUncheckedCreateNestedManyWithoutPatientInput
    treatment?: TreatmentUncheckedCreateNestedManyWithoutPatientInput
    appointment?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutMedicalRecordsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutMedicalRecordsInput, PatientUncheckedCreateWithoutMedicalRecordsInput>
  }

  export type PatientUpsertWithoutMedicalRecordsInput = {
    update: XOR<PatientUpdateWithoutMedicalRecordsInput, PatientUncheckedUpdateWithoutMedicalRecordsInput>
    create: XOR<PatientCreateWithoutMedicalRecordsInput, PatientUncheckedCreateWithoutMedicalRecordsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutMedicalRecordsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutMedicalRecordsInput, PatientUncheckedUpdateWithoutMedicalRecordsInput>
  }

  export type PatientUpdateWithoutMedicalRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutPatientNestedInput
    patientVisit?: PatientVisitUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutMedicalRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUncheckedUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUncheckedUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUncheckedUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type UserCreateWithoutDoctorInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    role: string
    patient?: PatientCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoctorInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    role: string
    patient?: PatientUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoctorInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentCreateWithoutDoctorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    date: Date | string
    status: string
    patient: PatientCreateNestedOneWithoutAppointmentInput
  }

  export type AppointmentUncheckedCreateWithoutDoctorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    patientId: string
    date: Date | string
    status: string
  }

  export type AppointmentCreateOrConnectWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentCreateManyDoctorInputEnvelope = {
    data: AppointmentCreateManyDoctorInput | AppointmentCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type PrescriptionCreateWithoutDoctorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dosage: string
    duration: string
    patient: PatientCreateNestedOneWithoutPrescriptionInput
    medicine: MedicineTypeCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutDoctorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    medicineId: string
    dosage: string
    duration: string
  }

  export type PrescriptionCreateOrConnectWithoutDoctorInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput>
  }

  export type PrescriptionCreateManyDoctorInputEnvelope = {
    data: PrescriptionCreateManyDoctorInput | PrescriptionCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutDoctorInput = {
    update: XOR<UserUpdateWithoutDoctorInput, UserUncheckedUpdateWithoutDoctorInput>
    create: XOR<UserCreateWithoutDoctorInput, UserUncheckedCreateWithoutDoctorInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorInput, UserUncheckedUpdateWithoutDoctorInput>
  }

  export type UserUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    patient?: PatientUncheckedUpdateOneWithoutUserNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutDoctorInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutDoctorInput>
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutDoctorInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutDoctorInput, PrescriptionUncheckedUpdateWithoutDoctorInput>
    create: XOR<PrescriptionCreateWithoutDoctorInput, PrescriptionUncheckedCreateWithoutDoctorInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutDoctorInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutDoctorInput, PrescriptionUncheckedUpdateWithoutDoctorInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutDoctorInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutDoctorInput>
  }

  export type PatientCreateWithoutAppointmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    user?: UserCreateNestedOneWithoutPatientInput
    patientVisit?: PatientVisitCreateNestedManyWithoutPatientInput
    assessment?: AssessmentCreateNestedManyWithoutPatientInput
    treatment?: TreatmentCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutAppointmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitUncheckedCreateNestedManyWithoutPatientInput
    assessment?: AssessmentUncheckedCreateNestedManyWithoutPatientInput
    treatment?: TreatmentUncheckedCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordUncheckedCreateNestedManyWithoutPatientInput
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutAppointmentInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutAppointmentInput, PatientUncheckedCreateWithoutAppointmentInput>
  }

  export type DoctorCreateWithoutAppointmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    field: string
    user: UserCreateNestedOneWithoutDoctorInput
    prescription?: PrescriptionCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutAppointmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId: string
    field: string
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutAppointmentInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutAppointmentInput, DoctorUncheckedCreateWithoutAppointmentInput>
  }

  export type PatientUpsertWithoutAppointmentInput = {
    update: XOR<PatientUpdateWithoutAppointmentInput, PatientUncheckedUpdateWithoutAppointmentInput>
    create: XOR<PatientCreateWithoutAppointmentInput, PatientUncheckedCreateWithoutAppointmentInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutAppointmentInput, PatientUncheckedUpdateWithoutAppointmentInput>
  }

  export type PatientUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutPatientNestedInput
    patientVisit?: PatientVisitUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUncheckedUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUncheckedUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput
    prescription?: PrescriptionUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type DoctorUpsertWithoutAppointmentInput = {
    update: XOR<DoctorUpdateWithoutAppointmentInput, DoctorUncheckedUpdateWithoutAppointmentInput>
    create: XOR<DoctorCreateWithoutAppointmentInput, DoctorUncheckedCreateWithoutAppointmentInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutAppointmentInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutAppointmentInput, DoctorUncheckedUpdateWithoutAppointmentInput>
  }

  export type DoctorUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    field?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    prescription?: PrescriptionUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutAppointmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    prescription?: PrescriptionUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type MedicineBatchCreateWithoutMedicineInput = {
    id?: string
    batchNumber: string
    expiryDate: Date | string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicineBatchUncheckedCreateWithoutMedicineInput = {
    id?: string
    batchNumber: string
    expiryDate: Date | string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MedicineBatchCreateOrConnectWithoutMedicineInput = {
    where: MedicineBatchWhereUniqueInput
    create: XOR<MedicineBatchCreateWithoutMedicineInput, MedicineBatchUncheckedCreateWithoutMedicineInput>
  }

  export type MedicineBatchCreateManyMedicineInputEnvelope = {
    data: MedicineBatchCreateManyMedicineInput | MedicineBatchCreateManyMedicineInput[]
    skipDuplicates?: boolean
  }

  export type PrescriptionCreateWithoutMedicineInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    dosage: string
    duration: string
    patient: PatientCreateNestedOneWithoutPrescriptionInput
    doctor: DoctorCreateNestedOneWithoutPrescriptionInput
  }

  export type PrescriptionUncheckedCreateWithoutMedicineInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    doctorId: string
    dosage: string
    duration: string
  }

  export type PrescriptionCreateOrConnectWithoutMedicineInput = {
    where: PrescriptionWhereUniqueInput
    create: XOR<PrescriptionCreateWithoutMedicineInput, PrescriptionUncheckedCreateWithoutMedicineInput>
  }

  export type PrescriptionCreateManyMedicineInputEnvelope = {
    data: PrescriptionCreateManyMedicineInput | PrescriptionCreateManyMedicineInput[]
    skipDuplicates?: boolean
  }

  export type MedicineBatchUpsertWithWhereUniqueWithoutMedicineInput = {
    where: MedicineBatchWhereUniqueInput
    update: XOR<MedicineBatchUpdateWithoutMedicineInput, MedicineBatchUncheckedUpdateWithoutMedicineInput>
    create: XOR<MedicineBatchCreateWithoutMedicineInput, MedicineBatchUncheckedCreateWithoutMedicineInput>
  }

  export type MedicineBatchUpdateWithWhereUniqueWithoutMedicineInput = {
    where: MedicineBatchWhereUniqueInput
    data: XOR<MedicineBatchUpdateWithoutMedicineInput, MedicineBatchUncheckedUpdateWithoutMedicineInput>
  }

  export type MedicineBatchUpdateManyWithWhereWithoutMedicineInput = {
    where: MedicineBatchScalarWhereInput
    data: XOR<MedicineBatchUpdateManyMutationInput, MedicineBatchUncheckedUpdateManyWithoutMedicineInput>
  }

  export type MedicineBatchScalarWhereInput = {
    AND?: MedicineBatchScalarWhereInput | MedicineBatchScalarWhereInput[]
    OR?: MedicineBatchScalarWhereInput[]
    NOT?: MedicineBatchScalarWhereInput | MedicineBatchScalarWhereInput[]
    id?: StringFilter<"MedicineBatch"> | string
    medicineId?: StringFilter<"MedicineBatch"> | string
    batchNumber?: StringFilter<"MedicineBatch"> | string
    expiryDate?: DateTimeFilter<"MedicineBatch"> | Date | string
    quantity?: IntFilter<"MedicineBatch"> | number
    createdAt?: DateTimeFilter<"MedicineBatch"> | Date | string
    updatedAt?: DateTimeFilter<"MedicineBatch"> | Date | string
  }

  export type PrescriptionUpsertWithWhereUniqueWithoutMedicineInput = {
    where: PrescriptionWhereUniqueInput
    update: XOR<PrescriptionUpdateWithoutMedicineInput, PrescriptionUncheckedUpdateWithoutMedicineInput>
    create: XOR<PrescriptionCreateWithoutMedicineInput, PrescriptionUncheckedCreateWithoutMedicineInput>
  }

  export type PrescriptionUpdateWithWhereUniqueWithoutMedicineInput = {
    where: PrescriptionWhereUniqueInput
    data: XOR<PrescriptionUpdateWithoutMedicineInput, PrescriptionUncheckedUpdateWithoutMedicineInput>
  }

  export type PrescriptionUpdateManyWithWhereWithoutMedicineInput = {
    where: PrescriptionScalarWhereInput
    data: XOR<PrescriptionUpdateManyMutationInput, PrescriptionUncheckedUpdateManyWithoutMedicineInput>
  }

  export type MedicineTypeCreateWithoutMedicineBatchInput = {
    id?: string
    name: string
    form: string
    strength: string
    prescription?: PrescriptionCreateNestedManyWithoutMedicineInput
  }

  export type MedicineTypeUncheckedCreateWithoutMedicineBatchInput = {
    id?: string
    name: string
    form: string
    strength: string
    prescription?: PrescriptionUncheckedCreateNestedManyWithoutMedicineInput
  }

  export type MedicineTypeCreateOrConnectWithoutMedicineBatchInput = {
    where: MedicineTypeWhereUniqueInput
    create: XOR<MedicineTypeCreateWithoutMedicineBatchInput, MedicineTypeUncheckedCreateWithoutMedicineBatchInput>
  }

  export type MedicineTypeUpsertWithoutMedicineBatchInput = {
    update: XOR<MedicineTypeUpdateWithoutMedicineBatchInput, MedicineTypeUncheckedUpdateWithoutMedicineBatchInput>
    create: XOR<MedicineTypeCreateWithoutMedicineBatchInput, MedicineTypeUncheckedCreateWithoutMedicineBatchInput>
    where?: MedicineTypeWhereInput
  }

  export type MedicineTypeUpdateToOneWithWhereWithoutMedicineBatchInput = {
    where?: MedicineTypeWhereInput
    data: XOR<MedicineTypeUpdateWithoutMedicineBatchInput, MedicineTypeUncheckedUpdateWithoutMedicineBatchInput>
  }

  export type MedicineTypeUpdateWithoutMedicineBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
    prescription?: PrescriptionUpdateManyWithoutMedicineNestedInput
  }

  export type MedicineTypeUncheckedUpdateWithoutMedicineBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
    prescription?: PrescriptionUncheckedUpdateManyWithoutMedicineNestedInput
  }

  export type PatientCreateWithoutPrescriptionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    user?: UserCreateNestedOneWithoutPatientInput
    patientVisit?: PatientVisitCreateNestedManyWithoutPatientInput
    assessment?: AssessmentCreateNestedManyWithoutPatientInput
    treatment?: TreatmentCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordCreateNestedManyWithoutPatientInput
    appointment?: AppointmentCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId?: string | null
    name: string
    gender?: string | null
    dateOfBirth?: Date | string | null
    city?: string | null
    barangay?: string | null
    patientVisit?: PatientVisitUncheckedCreateNestedManyWithoutPatientInput
    assessment?: AssessmentUncheckedCreateNestedManyWithoutPatientInput
    treatment?: TreatmentUncheckedCreateNestedManyWithoutPatientInput
    medicalRecords?: MedicalRecordUncheckedCreateNestedManyWithoutPatientInput
    appointment?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientCreateOrConnectWithoutPrescriptionInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutPrescriptionInput, PatientUncheckedCreateWithoutPrescriptionInput>
  }

  export type DoctorCreateWithoutPrescriptionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    field: string
    user: UserCreateNestedOneWithoutDoctorInput
    appointment?: AppointmentCreateNestedManyWithoutDoctorInput
  }

  export type DoctorUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    userId: string
    field: string
    appointment?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type DoctorCreateOrConnectWithoutPrescriptionInput = {
    where: DoctorWhereUniqueInput
    create: XOR<DoctorCreateWithoutPrescriptionInput, DoctorUncheckedCreateWithoutPrescriptionInput>
  }

  export type MedicineTypeCreateWithoutPrescriptionInput = {
    id?: string
    name: string
    form: string
    strength: string
    medicineBatch?: MedicineBatchCreateNestedManyWithoutMedicineInput
  }

  export type MedicineTypeUncheckedCreateWithoutPrescriptionInput = {
    id?: string
    name: string
    form: string
    strength: string
    medicineBatch?: MedicineBatchUncheckedCreateNestedManyWithoutMedicineInput
  }

  export type MedicineTypeCreateOrConnectWithoutPrescriptionInput = {
    where: MedicineTypeWhereUniqueInput
    create: XOR<MedicineTypeCreateWithoutPrescriptionInput, MedicineTypeUncheckedCreateWithoutPrescriptionInput>
  }

  export type PatientUpsertWithoutPrescriptionInput = {
    update: XOR<PatientUpdateWithoutPrescriptionInput, PatientUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<PatientCreateWithoutPrescriptionInput, PatientUncheckedCreateWithoutPrescriptionInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutPrescriptionInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutPrescriptionInput, PatientUncheckedUpdateWithoutPrescriptionInput>
  }

  export type PatientUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneWithoutPatientNestedInput
    patientVisit?: PatientVisitUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    dateOfBirth?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    barangay?: NullableStringFieldUpdateOperationsInput | string | null
    patientVisit?: PatientVisitUncheckedUpdateManyWithoutPatientNestedInput
    assessment?: AssessmentUncheckedUpdateManyWithoutPatientNestedInput
    treatment?: TreatmentUncheckedUpdateManyWithoutPatientNestedInput
    medicalRecords?: MedicalRecordUncheckedUpdateManyWithoutPatientNestedInput
    appointment?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type DoctorUpsertWithoutPrescriptionInput = {
    update: XOR<DoctorUpdateWithoutPrescriptionInput, DoctorUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<DoctorCreateWithoutPrescriptionInput, DoctorUncheckedCreateWithoutPrescriptionInput>
    where?: DoctorWhereInput
  }

  export type DoctorUpdateToOneWithWhereWithoutPrescriptionInput = {
    where?: DoctorWhereInput
    data: XOR<DoctorUpdateWithoutPrescriptionInput, DoctorUncheckedUpdateWithoutPrescriptionInput>
  }

  export type DoctorUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    field?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutDoctorNestedInput
    appointment?: AppointmentUpdateManyWithoutDoctorNestedInput
  }

  export type DoctorUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    field?: StringFieldUpdateOperationsInput | string
    appointment?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type MedicineTypeUpsertWithoutPrescriptionInput = {
    update: XOR<MedicineTypeUpdateWithoutPrescriptionInput, MedicineTypeUncheckedUpdateWithoutPrescriptionInput>
    create: XOR<MedicineTypeCreateWithoutPrescriptionInput, MedicineTypeUncheckedCreateWithoutPrescriptionInput>
    where?: MedicineTypeWhereInput
  }

  export type MedicineTypeUpdateToOneWithWhereWithoutPrescriptionInput = {
    where?: MedicineTypeWhereInput
    data: XOR<MedicineTypeUpdateWithoutPrescriptionInput, MedicineTypeUncheckedUpdateWithoutPrescriptionInput>
  }

  export type MedicineTypeUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
    medicineBatch?: MedicineBatchUpdateManyWithoutMedicineNestedInput
  }

  export type MedicineTypeUncheckedUpdateWithoutPrescriptionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    form?: StringFieldUpdateOperationsInput | string
    strength?: StringFieldUpdateOperationsInput | string
    medicineBatch?: MedicineBatchUncheckedUpdateManyWithoutMedicineNestedInput
  }

  export type PatientVisitCreateManyPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reason: string
    status: string
    date?: Date | string
  }

  export type AssessmentCreateManyPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    symptoms: string
    assessment?: string | null
    diagnosis?: string | null
    bloodPressure: string
    pulseRate: number
    respiratoryRate: number
    oxygenSaturation?: number | null
    alcoholUse: boolean
    smoker?: boolean | null
    allergies?: string | null
    painLocation?: string | null
    painScale?: number | null
  }

  export type TreatmentCreateManyPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    visitId?: string | null
    assessmentId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
  }

  export type MedicalRecordCreateManyPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    diagnosis: string
    treatment: string
    notes?: string | null
  }

  export type AppointmentCreateManyPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    doctorId: string
    date: Date | string
    status: string
  }

  export type PrescriptionCreateManyPatientInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorId: string
    medicineId: string
    dosage: string
    duration: string
  }

  export type PatientVisitUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    treatment?: TreatmentUpdateManyWithoutVisitNestedInput
  }

  export type PatientVisitUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    treatment?: TreatmentUncheckedUpdateManyWithoutVisitNestedInput
  }

  export type PatientVisitUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reason?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AssessmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    treatment?: TreatmentUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    treatment?: TreatmentUncheckedUpdateManyWithoutAssessmentNestedInput
  }

  export type AssessmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    symptoms?: StringFieldUpdateOperationsInput | string
    assessment?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: StringFieldUpdateOperationsInput | string
    pulseRate?: IntFieldUpdateOperationsInput | number
    respiratoryRate?: IntFieldUpdateOperationsInput | number
    oxygenSaturation?: NullableFloatFieldUpdateOperationsInput | number | null
    alcoholUse?: BoolFieldUpdateOperationsInput | boolean
    smoker?: NullableBoolFieldUpdateOperationsInput | boolean | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    painLocation?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TreatmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit?: PatientVisitUpdateOneWithoutTreatmentNestedInput
    assessment?: AssessmentUpdateOneWithoutTreatmentNestedInput
    followUps?: FollowUpUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    assessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUps?: FollowUpUncheckedUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    assessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type MedicalRecordUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MedicalRecordUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MedicalRecordUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    diagnosis?: StringFieldUpdateOperationsInput | string
    treatment?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AppointmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    doctor?: DoctorUpdateOneRequiredWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    doctor?: DoctorUpdateOneRequiredWithoutPrescriptionNestedInput
    medicine?: MedicineTypeUpdateOneRequiredWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type TreatmentCreateManyVisitInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    assessmentId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
  }

  export type TreatmentUpdateWithoutVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneRequiredWithoutTreatmentNestedInput
    assessment?: AssessmentUpdateOneWithoutTreatmentNestedInput
    followUps?: FollowUpUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateWithoutVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    assessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUps?: FollowUpUncheckedUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateManyWithoutVisitInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    assessmentId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TreatmentCreateManyAssessmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    visitId?: string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: string | null
    painScale?: number | null
    remarks?: string | null
    status?: $Enums.TreatmentStatus
    priority?: number | null
    nextFollowUpAt?: Date | string | null
  }

  export type TreatmentUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    patient?: PatientUpdateOneRequiredWithoutTreatmentNestedInput
    visit?: PatientVisitUpdateOneWithoutTreatmentNestedInput
    followUps?: FollowUpUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    followUps?: FollowUpUncheckedUpdateManyWithoutTreatmentNestedInput
  }

  export type TreatmentUncheckedUpdateManyWithoutAssessmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    visitId?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableJsonNullValueInput | InputJsonValue
    procedures?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    remarks?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumTreatmentStatusFieldUpdateOperationsInput | $Enums.TreatmentStatus
    priority?: NullableIntFieldUpdateOperationsInput | number | null
    nextFollowUpAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FollowUpCreateManyTreatmentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    note?: string | null
    findings?: string | null
    outcome?: string | null
    nextAction?: string | null
    painScale?: number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: Date | string
    nextFollowUp?: Date | string | null
    resolved?: boolean
  }

  export type FollowUpUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextAction?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextFollowUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FollowUpUncheckedUpdateWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextAction?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextFollowUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FollowUpUncheckedUpdateManyWithoutTreatmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    outcome?: NullableStringFieldUpdateOperationsInput | string | null
    nextAction?: NullableStringFieldUpdateOperationsInput | string | null
    painScale?: NullableIntFieldUpdateOperationsInput | number | null
    vitals?: NullableJsonNullValueInput | InputJsonValue
    followUpDate?: DateTimeFieldUpdateOperationsInput | Date | string
    nextFollowUp?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolved?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AppointmentCreateManyDoctorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    archived?: boolean
    patientId: string
    date: Date | string
    status: string
  }

  export type PrescriptionCreateManyDoctorInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    medicineId: string
    dosage: string
    duration: string
  }

  export type AppointmentUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutAppointmentNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    archived?: BoolFieldUpdateOperationsInput | boolean
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutPrescriptionNestedInput
    medicine?: MedicineTypeUpdateOneRequiredWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    medicineId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type MedicineBatchCreateManyMedicineInput = {
    id?: string
    batchNumber: string
    expiryDate: Date | string
    quantity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrescriptionCreateManyMedicineInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    patientId: string
    doctorId: string
    dosage: string
    duration: string
  }

  export type MedicineBatchUpdateWithoutMedicineInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicineBatchUncheckedUpdateWithoutMedicineInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MedicineBatchUncheckedUpdateManyWithoutMedicineInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchNumber?: StringFieldUpdateOperationsInput | string
    expiryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrescriptionUpdateWithoutMedicineInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
    patient?: PatientUpdateOneRequiredWithoutPrescriptionNestedInput
    doctor?: DoctorUpdateOneRequiredWithoutPrescriptionNestedInput
  }

  export type PrescriptionUncheckedUpdateWithoutMedicineInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }

  export type PrescriptionUncheckedUpdateManyWithoutMedicineInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patientId?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    dosage?: StringFieldUpdateOperationsInput | string
    duration?: StringFieldUpdateOperationsInput | string
  }



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