import { Entity, ManyToMany, Collection, PrimaryKey } from "@mikro-orm/core";
import { Book } from "./Book";

@Entity()
export class BookTag {
  @PrimaryKey()
  name: String;

  // inverse side has to point to the owning side via `mappedBy` attribute/parameter
  @ManyToMany(() => Book, (book) => book.tags)
  books = new Collection<Book>(this);

  constructor(name: string) {
    this.name = name;
  }
}
