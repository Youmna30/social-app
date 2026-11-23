"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const abstract_repository_1 = require("../../../lib/db/abstract.repository");
const post_model_1 = require("../model/post.model");
class PostRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(post_model_1.Post);
    }
}
exports.PostRepository = PostRepository;
exports.default = new PostRepository();
