"use strict";

const Sequelize = require("sequelize");
// const config = require(__dirname + "/../config/config.json")["development"];

// env 사용할 때는 js 파일과 같이 사용
const config = require(__dirname + "/../config/config.json")["development"];

console.log("config >>", config);
const db = {};

// (1)Sequelize 클래스를 이용해서 sequelize 인스턴스 생성
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// (2)모델 불러오기, sequelize 인스턴스와 Sequelize 모듈을 전달
const PlayerModel = require("./Player")(sequelize, Sequelize);
const ProfileModel = require("./Profile")(sequelize, Sequelize);
const TeamModel = require("./Team")(sequelize, Sequelize);
const GameModel = require("./Game")(sequelize, Sequelize);
const TeamGameModel = require("./TeamGame")(sequelize, Sequelize);

// (3) 모델간 관계 설정
// hasOne, hasMany, belongsTo, belongsMany
// 3-1) 1:1 관계 설정, Player:Profile = 1:1
// Play의 pk가 Profile의 fk 가 된다.
//  Profile은 Player에 속해 있다. (belongs to)
PlayerModel.hasOne(ProfileModel, {
  // 두 모델을 연결하는 키 설정
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  foreignKey: "player_id",
});
ProfileModel.belongsTo(PlayerModel, {
  // 두 모델을 연결하는 키 설정
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  foreignKey: "player_id",
});
// 3-2) Team:Player = 1:N
// 한 팀에 여러 플레이어가 '속해있음'
TeamModel.hasMany(PlayerModel, {
  sourceKey: "team_id",
  foreignKey: "teamid",
});
PlayerModel.belongsTo(TeamModel, {
  targetKey: "team_id",
  foreignKey: "teamid",
});

// 3-3)Game:Team = N:M
// 하나의 팀은 여러 경기를 할 수 있고,
// 하나의 경기에는 여러팀(2팀)이 참여
TeamModel.belongsToMany(GameModel, {
  through: TeamGameModel,
  foreignKey: "team_id",
});
GameModel.belongsToMany(TeamModel, {
  through: TeamGameModel,
  foreignKey: "game_id",
});

// (4)db객체에 모델 추가
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Player = PlayerModel;
db.Profile = ProfileModel;
db.Team = TeamModel;
db.Game = GameModel;
db.TeamGame = TeamGameModel;

module.exports = db;
