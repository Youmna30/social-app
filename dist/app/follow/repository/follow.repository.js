"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowRepository = void 0;
const abstract_repository_1 = require("../../../lib/db/abstract.repository");
const follow_model_1 = require("../model/follow.model");
const tsyringe_1 = require("tsyringe");
let FollowRepository = class FollowRepository extends abstract_repository_1.AbstractRepository {
    constructor() {
        super(follow_model_1.Follow);
    }
};
exports.FollowRepository = FollowRepository;
exports.FollowRepository = FollowRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], FollowRepository);
