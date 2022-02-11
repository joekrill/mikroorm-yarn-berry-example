import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  ManyToOne,
  Filter,
} from "@mikro-orm/core";
import { SqlEntityManager } from "@mikro-orm/postgresql";
import { Book } from "./Book";

@Entity()
@Filter({
  name: "rawtest",
  args: false,
  cond: async (_args, _type, em: SqlEntityManager) => ({
    createdAt: { $lte: em.raw("current_timestamp") },
  }),
})
@Filter({
  name: "qbtest",
  args: false,
  cond: async (_args, _type, em: SqlEntityManager) => {
    const qb = em.createQueryBuilder(Author, "test0");
    qb.select("id").where({ name: "test" });

    return {
      id: { $in: qb.getKnexQuery() },
    };
  },
})
export class Author {
  @PrimaryKey()
  id!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  age?: number;

  @Property()
  termsAccepted = false;

  @Property()
  identities?: string[];

  @Property()
  born?: Date;

  @OneToMany(() => Book, (book) => book.author)
  books = new Collection<Book>(this);

  @ManyToOne()
  favouriteBook?: Book;

  @Property({ version: true })
  version!: number;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
