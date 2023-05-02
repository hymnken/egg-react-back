/* eslint valid-jsdoc: "off" */

"use strict";
const path = require("path");

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1575812978932_7706";

  // add your middleware config here
  config.middleware = ["httpLog"];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.view = {
    mapping: {
      ".html": "ejs",
    },
    root: [
      path.join(appInfo.baseDir, "app/html"),
      path.join(appInfo.baseDir, "app/view"),
    ].join(","),
  };

  config.ejs = {
    delimiter: "%",
  };

  config.static = {
    prefix: "/assets/",
    dir: path.join(appInfo.baseDir, "app/assets"),
  };

  config.session = {
    key: "MUKE_SESS",
    httpOnly: true,
    maxAge: 1000 * 50,
    renew: true,
  };
  config.auth = {
    exclude: ["/api/user/login", "/api/user/register"],
  };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "123456",
    database: "egg_house",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };
  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "123456",
      db: 0,
    },
  };
  config.jwt = {
    // 密钥
    secret: "hymnken",
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: "hymnken",
    redisExpire: 60 * 60 * 24,
  };

  return {
    ...config,
    ...userConfig,
  };
};
