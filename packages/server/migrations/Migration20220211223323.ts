import { Migration } from '@mikro-orm/migrations';

export class Migration20220211223323 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "book_tag" ("name" varchar(255) not null);');
    this.addSql('alter table "book_tag" add constraint "book_tag_pkey" primary key ("name");');

    this.addSql('create table "author" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "age" int null, "terms_accepted" boolean not null, "identities" varchar(255) null, "born" timestamptz(0) null, "favourite_book_id" varchar(255) null, "version" int not null default 1);');
    this.addSql('alter table "author" add constraint "author_pkey" primary key ("id");');

    this.addSql('create table "book" ("id" varchar(255) not null, "title" varchar(255) not null, "author_id" varchar(255) not null);');
    this.addSql('alter table "book" add constraint "book_pkey" primary key ("id");');

    this.addSql('create table "book_tags" ("book_id" varchar(255) not null, "book_tag_name" varchar(255) not null);');
    this.addSql('alter table "book_tags" add constraint "book_tags_pkey" primary key ("book_id", "book_tag_name");');

    this.addSql('alter table "author" add constraint "author_favourite_book_id_foreign" foreign key ("favourite_book_id") references "book" ("id") on update cascade on delete set null;');

    this.addSql('alter table "book" add constraint "book_author_id_foreign" foreign key ("author_id") references "author" ("id") on update cascade;');

    this.addSql('alter table "book_tags" add constraint "book_tags_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "book_tags" add constraint "book_tags_book_tag_name_foreign" foreign key ("book_tag_name") references "book_tag" ("name") on update cascade on delete cascade;');
  }

}
