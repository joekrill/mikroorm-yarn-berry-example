import { Configuration, Options } from "@mikro-orm/core";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Author } from "./entities/Author";
import { Book } from "./entities/Book";
import { BookTag } from "./entities/BookTag";

export default {
  debug: true,
  entities: [Author, Book, BookTag], // no need for `entitiesTs` this way

  // dbName: ":memory:",
  // type: "sqlite",

  // docker run -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword postgres:14
  type: "postgresql",
  clientUrl:
    "postgres://postgres:mysecretpassword@localhost:5432/postgres?sslmode=disable",
  dbName: "postgres",

  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    path: "./migrations",
  },
} as Options<PostgreSqlDriver>;
