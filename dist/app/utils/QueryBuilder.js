"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        console.log({ query: this.query });
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
    getMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalDocuments = yield this.modelQuery.model.countDocuments();
            const page = Number(this.query.page) || 1;
            const limit = Number(this.query.limit) || 10;
            const totalPage = Math.ceil(totalDocuments / limit);
            return { page, limit, total: totalDocuments, totalPage };
        });
    }
    population(field) {
        this.modelQuery = this.modelQuery.populate(field);
        return this;
    }
}
exports.QueryBuilder = QueryBuilder;
