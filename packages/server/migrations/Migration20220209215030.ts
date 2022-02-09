import { Migration } from '@mikro-orm/migrations';

export class Migration20220209215030 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `book_tag` (`name` text not null, primary key (`name`));');

    this.addSql('create table `author` (`id` text not null, `created_at` datetime not null, `updated_at` datetime not null, `name` text not null, `email` text not null, `age` integer null, `terms_accepted` integer not null, `identities` text null, `born` datetime null, `favourite_book_id` text null, `version` integer not null default 1, constraint `author_favourite_book_id_foreign` foreign key(`favourite_book_id`) references `book`(`id`) on delete set null on update cascade, primary key (`id`));');
    this.addSql('create index `author_favourite_book_id_index` on `author` (`favourite_book_id`);');

    this.addSql('create table `book` (`id` text not null, `title` text not null, `author_id` text not null, constraint `book_author_id_foreign` foreign key(`author_id`) references `author`(`id`) on update cascade, primary key (`id`));');
    this.addSql('create index `book_author_id_index` on `book` (`author_id`);');

    this.addSql('create table `book_tags` (`book_id` text not null, `book_tag_name` text not null, constraint `book_tags_book_id_foreign` foreign key(`book_id`) references `book`(`id`) on delete cascade on update cascade, constraint `book_tags_book_tag_name_foreign` foreign key(`book_tag_name`) references `book_tag`(`name`) on delete cascade on update cascade, primary key (`book_id`, `book_tag_name`));');
    this.addSql('create index `book_tags_book_id_index` on `book_tags` (`book_id`);');
    this.addSql('create index `book_tags_book_tag_name_index` on `book_tags` (`book_tag_name`);');
  }

}
