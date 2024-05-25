"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensModel = void 0;
const objection_1 = require("objection");
const usersModel_1 = require("./usersModel");
class TokensModel extends objection_1.Model {
    static get tableName() {
        return 'tokens';
    }
    static get relationMappings() {
        return {
            user: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: usersModel_1.UsersModel,
                join: {
                    from: 'tokens.user_id', // Change userId to user_id
                    to: 'users.id',
                },
            },
        };
    }
}
exports.TokensModel = TokensModel;
