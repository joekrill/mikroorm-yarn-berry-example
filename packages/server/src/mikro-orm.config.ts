import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { Author } from "./entities/Author";
import { Book } from "./entities/Book";
import { BookTag } from "./entities/BookTag";

export default {
  entities: [Author, Book, BookTag], // no need for `entitiesTs` this way
  dbName: ":memory:",
  type: "sqlite",
  metadataProvider: TsMorphMetadataProvider,
};
