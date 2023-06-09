const Service = require("egg").Service;
const md5 = require("md5");
const BaseService = require("./base");
class UserService extends BaseService {
  // 查询用户信息
  async getUser(username, password) {
    return this.run(async () => {
      const { ctx, app } = this;
      const _where = password
        ? { username, password: md5(password + app.config.salt) }
        : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }
  // 添加用户
  async addUser(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }
  // 编辑用户
  async editUser(params) {
    return this.run(async (ctx) => {
      const result = await ctx.model.User.update(params, {
        where: {
          username:ctx.username
        }
      });
      return result
    })
  }
}
module.exports = UserService;
