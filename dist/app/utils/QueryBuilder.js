"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const user_constrain_1 = require("../module/user/user.constrain");
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    sort() {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    ;
    fieldFilter() {
        var _a;
        const selectedField = ((_a = this.query.fields) === null || _a === void 0 ? void 0 : _a.split(',').join(" ")) || "";
        this.modelQuery = this.modelQuery.select(selectedField);
        return this;
    }
    ;
    filter() {
        const filter = Object.assign({}, this.query);
        for (const field of user_constrain_1.excludeFields) {
            delete filter[field];
        }
        const numFields = ["fare", "distance"];
        for (const field of numFields) {
            if (filter[field]) {
                filter[field] = parseFloat(filter[field]);
            }
        }
        let mongoFilter = Object.assign({}, filter);
        if (filter.status) {
            mongoFilter = Object.assign(Object.assign({}, mongoFilter), { $expr: {
                    $eq: [
                        { $arrayElemAt: ["$status.status", -1] },
                        filter.status
                    ]
                } });
            delete mongoFilter.status;
        }
        this.modelQuery = this.modelQuery.find(mongoFilter);
        return this;
    }
    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    ;
    build() {
        return this.modelQuery;
    }
    population(field) {
        this.modelQuery = this.modelQuery.populate(field);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
