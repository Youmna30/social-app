"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractRepository = void 0;
class AbstractRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async update(filter, newData, options) {
        return this.model.findOneAndUpdate(filter, newData, options);
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
    async getOne(filter) {
        return this.model.findOne(filter);
    }
    async getAll(filter) {
        return this.model.find(filter);
    }
}
exports.AbstractRepository = AbstractRepository;
