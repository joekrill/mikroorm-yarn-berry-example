import {
  Entity,
  Property,
  ManyToOne,
  IdentifiedReference,
  ManyToMany,
  Collection,
  PrimaryKey,
} from "@mikro-orm/core";
import { Author } from "./Author";
import { BookTag } from "./BookTag";

@Entity()
export class Book {
  @PrimaryKey()
  id!: string;

  @Property()
  title!: string;

  @ManyToOne()
  author!: Author;

  @ManyToMany(() => BookTag)
  tags = new Collection<BookTag>(this);
}
