"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const objection_1 = require("objection");
const tokensModel_1 = require("./tokensModel");
const rolesModel_1 = require("./rolesModel");
class UsersModel extends objection_1.Model {
    static get tableName() {
        return 'users';
    }
    static get relationMappings() {
        return {
            role: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: rolesModel_1.RolesModel,
                join: {
                    from: 'users.role_id',
                    to: 'roles.id',
                },
            },
            tokens: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: tokensModel_1.TokensModel,
                join: {
                    from: 'users.id',
                    to: 'tokens.user_id',
                },
            },
        };
    }
}
exports.UsersModel = UsersModel;
