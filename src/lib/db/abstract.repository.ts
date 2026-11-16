import {
  HydratedDocument,
  Model,
  QueryFilter,
  QueryOptions,
  Types,
} from "mongoose";

export abstract class AbstractRepository<T> {
  constructor(protected readonly model: Model<T>) {}
  async create(data: T): Promise<HydratedDocument<T>> {
    return this.model.create(data);
  }
  async update(
    filter: QueryFilter<T>,
    newData: Partial<T>,
    options: QueryOptions<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOneAndUpdate(filter, newData, options);
  }
  async delete(id: Types.ObjectId) {
    return this.model.findByIdAndDelete(id);
  }
  async getOne(filter: QueryFilter<T>): Promise<HydratedDocument<T> | null> {
    return this.model.findOne(filter);
  }
  async getAll(filter: QueryFilter<T>) {
    return this.model.find(filter);
  }
}
