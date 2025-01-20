const Customer = require("../model/customer");
const aqp = require("api-query-params");
module.exports = {
  createCustomerService: async (customerInfo) => {
    await Customer.create({
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      image: customerInfo.imageName,
      description: customerInfo.description,
    });
  },
  getAllCustomersService: async (limit, page, queryString) => {
    try {
      let result = null;
      if (page && limit) {
        const { filter } = aqp(queryString);
        delete filter.page;
        console.log(filter);
        let skip = (page - 1) * limit;
        result = await Customer.find(filter).skip(skip).limit(limit).exec();
      } else {
        result = await Customer.find({});
      }
      return result;
    } catch (error) {
      console.log(error);
      return result;
    }
  },
  putUpdateCustomerService: async (
    id,
    email,
    name,
    phone,
    address,
    description
  ) => {
    try {
      return await Customer.updateOne(
        { _id: id },
        { name, email, phone, address, description }
      );
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  deleteACustomerService: async (id) => {
    return await Customer.deleteById({ _id: id });
  },
};
