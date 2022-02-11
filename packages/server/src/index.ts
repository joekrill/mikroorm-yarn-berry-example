import { MikroORM } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Author } from "./entities/Author";

import config from "./mikro-orm.config";

(async function () {
  const orm = await MikroORM.init<PostgreSqlDriver>(config);
  await orm.getMigrator().up();
  const em = orm.em.fork();

  const result = await em.findAndCount(
    Author,
    // @ts-ignore
    {
      // createdAt: { $lte: em.raw("current_timestamp") },
      // createdAt: { $lt: new Date() },
    },
    {
      filters: [
        // "rawtest",
        "qbtest",
      ],
    }
  );

  console.log("result:", result);

  await orm.close();
})();
