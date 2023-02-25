import { db_URL } from "./config";
import { Sequelize } from "sequelize";

import { initVideo } from "./models/video";
import { initUser } from "./models/user";

const sequelize = new Sequelize(db_URL);

initVideo(sequelize);
initUser(sequelize);

sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

export default sequelize;
