import { db_URL } from "./config";
import { Sequelize } from "sequelize";

import Video, { initVideo } from "./models/video";
import User, { initUser } from "./models/user";
import Likes, { initLikes } from "./models/likes";
import Follow, { initFollows } from "./models/follow";

const sequelize = new Sequelize(db_URL);

initVideo(sequelize);
initUser(sequelize);
initLikes(sequelize);
initFollows(sequelize);

User.hasMany(Video, { foreignKey: "userId" });
Video.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Video, { through: Likes, as: "likedVideos" });
Video.belongsToMany(User, { through: Likes, as: "likedBy" });

Follow.belongsTo(User, { foreignKey: "followerId", as: "follower" });
Follow.belongsTo(User, { foreignKey: "followingId", as: "following" });
User.hasMany(Follow, { foreignKey: "followerId", as: "followings" });
User.hasMany(Follow, { foreignKey: "followingId", as: "followers" });

export default sequelize;
