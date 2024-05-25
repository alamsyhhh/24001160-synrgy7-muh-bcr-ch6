"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesModel = void 0;
const objection_1 = require("objection");
const usersModel_1 = require("./usersModel");
class RolesModel extends objection_1.Model {
    static get tableName() {
        return 'roles';
    }
    static get relationMappings() {
        return {
            users: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: usersModel_1.UsersModel,
                join: {
                    from: 'roles.id',
                    to: 'users.role_id',
                },
            },
        };
    }
}
exports.RolesModel = RolesModel;
