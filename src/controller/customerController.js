const Customer = require("../model/customer");
const {
  createCustomerService,
  getAllCustomersService,
  putUpdateCustomerService,
  deleteACustomerService,
} = require("../services/customerService");
const { uploadSingleFile } = require("../services/uploadFile");
const aqp = require("api-query-params");
const postCreateCustomerAPI = async (req, res) => {
  console.log(req.body);
  if (req.body?.customer) {
    try {
      await Customer.insertMany(req.body.customer);
      res.status(201).send("Create customer successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    const { name, email, phone, address, image, description } = req.body;
    let imageName = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded");
    } else {
      const result = await uploadSingleFile(req.files.image);
      imageName = req.files.image.name;
    }

    try {
      await createCustomerService({
        name,
        email,
        phone,
        address,
        description,
        imageName,
      });
      res.status(201).send("Create customer successfully");
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

const getCustomersAPI = async (req, res) => {
  let limit = req.query.limit;
  let page = req.query.page;
  let result;
  if (limit && page) {
    result = await getAllCustomersService(
      parseInt(limit),
      parseInt(page),
      req.query
    );
  } else {
    result = await getAllCustomersService();
  }
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const putUpdateCustomerAPI = async (req, res) => {
  let { id, name, email, phone, address, description } = req.body;
  let data = await putUpdateCustomerService(
    id,
    email,
    name,
    phone,
    address,
    description
  );
  return res.status(200).json({
    EC: 0,
    data: data,
  });
};

const deleteCustomerAPI = async (req, res) => {
  let ids = req.body.ids;
  console.log(ids);
  let result;
  if (!Array.isArray) {
    result = await deleteACustomerService(ids);
  } else {
    result = await Customer.delete({
      _id: {
        $in: ids,
      },
    });
  }
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  postCreateCustomerAPI,
  getCustomersAPI,
  putUpdateCustomerAPI,
  deleteCustomerAPI,
};
