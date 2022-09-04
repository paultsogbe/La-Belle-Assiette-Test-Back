const Database = require("../database");
const mongoose = require("mongoose");

const SCHEMA = {
  firstname: String,
  lastname: String,
  description: String,
  photo: { type: mongoose.Schema.Types.Mixed, default: {} },
};

class PrivateChefsModel {
  constructor() {
    const schema = Database.getInstance().mongoose.Schema(SCHEMA);
    this.model = Database.getInstance().mongoose.model("Chef", schema);
  }
}

/**
 * Chef model Singleton
 */
class MongooseModel {
  constructor() {
    throw new Error("Use Database.getInstance()");
  }
  static getInstance() {
    if (!MongooseModel.chefsModel) {
      MongooseModel.chefsModel = new PrivateChefsModel();
    }
    return MongooseModel.chefsModel;
  }
}

/**
 * Class chef
 * describe chef method with mongoose
 */
class ChefsManager {
  /**
   * @constructor Chef
   * @param {Object} chef
   * @param {string} chef.firstname
   * @param {string} chef.lastname
   * @param {string} chef.description
   * * @param {{ type: mongoose.Schema.Types.Mixed, default: {} }} chef.photo
   */
  constructor(chef = {}) {
    this.model = MongooseModel.getInstance().model;
    this.chef = new this.model(chef);
  }

  async save() {
    return this.chef.save();
  }

  async getChefs() {
    return this.model.find();
  }

  async getChefById(req) {
    return this.model.findOne({});
  }

  async delete(req) {
    return this.model.delete();
  }
}

module.exports.ChefsManager = ChefsManager;
