"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRepository = void 0;
const abstract_repository_1 = require("../../../lib/db/abstract.repository");
const follow_model_1 = require("../model/follow.model");
class FollowRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(follow_model_1.Follow);
    }
}
exports.FollowRepository = FollowRepository;
exports.default = new FollowRepository();
