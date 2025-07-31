/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Query } from "mongoose";
import { excludeFields } from "../module/user/user.constrain";

export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>
    public readonly query: Record<string, string>

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query
    }

    sort(): this {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort)
        return this
    };

    fieldFilter(): this {
        const selectedField = this.query.fields?.split(',').join(" ") || "";
        this.modelQuery = this.modelQuery.select(selectedField);
        return this
    };

    filter(): this {
        const filter = { ...this.query };

        for (const field of excludeFields) {
            delete filter[field]
        }

        this.modelQuery = this.modelQuery.find(filter);
        return this
    }

    search(searchAbleFields: string[]): this {
        const searchTerm = this.query.searchTerm || "";

        const searchQuery = {
            $or: searchAbleFields.map(field => ({ [field]: { $regex: searchTerm, $options: "i" } }))

        }
        this.modelQuery = this.modelQuery.find(searchQuery);
        return this
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit)
        return this
    };

    build() {
        return this.modelQuery
    }

    // TODO: we will add meta here
}