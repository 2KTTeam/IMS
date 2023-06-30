class dbService {
  constructor(Model) {
    this.model = Model;
  }

  async create(data) {
    try {
      const model = new this.model(data);
      return await model.save();
    } catch (error) {
      throw new Error(`Error creating data: ${error.message}`);
    }
  }

  async get(id) {
    try {
      // Fetch data from MongoDB using Mongoose
      const data = await this.model.findById(id);

      return data;
    } catch (error) {
      throw new Error(`Error getting data by id: ${error.message}`);
    }
  }

  async queryOne(query = {}) {
    try {
      const data = await this.model.findOne(query);
      return data;
    } catch (error) {
      throw new Error(`Error getting email by email: ${error.message}`);
    }
  }

  async query(query = {}) {
    try {
      return await this.model.find(query);
    } catch (error) {
      throw new Error(`Error getting many data: ${error.message}`);
    }
  }

  async update(id, data) {
    try {
      // Update data in MongoDB using Mongoose
      const updatedData = await this.model.findOneAndUpdate({ _id: id }, data, {
        new: true
      });

      return updatedData;
    } catch (error) {
      throw new Error(`Error updating data: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      // Delete data from MongoDB using Mongoose
      const deletedData = await this.model.findOneAndDelete({ _id: id });

      return deletedData;
    } catch (error) {
      throw new Error(`Error deleting data: ${error.message}`);
    }
  }
}

module.exports = dbService;
