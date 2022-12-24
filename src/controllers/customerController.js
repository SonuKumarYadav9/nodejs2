const customerModel = require("../models/customerModel");
const {
  isValidString,
  isValidNumber,
  isValidName,
  isValidMobileNo,
  isValidEmailId,
  isValidDate,
} = require("../validation/validation.js");

const createCustomer = async (req, res) => {
  try {
    const data = req.body;

    let {
      firstName,
      lastName,
      mobileNumber,
      DOB,
      emailID,
      address,
      customerID,
      status,
    } = data;

    if (Object.keys(data).length == 0)
      return res.status(400).send({
        status: false,
        msg: "Please mention some data",
      });

    if (!firstName)
      return res.status(400).send({
        status: false,
        msg: "Please mention firstName",
      });

    if (!lastName)
      return res.status(400).send({
        status: false,
        msg: "Please mention lastName",
      });

    if (!mobileNumber)
      return res.status(400).send({
        status: false,
        msg: "Please mention mobileNumber",
      });

    if (!DOB)
      return res.status(400).send({
        status: false,
        msg: "Please mention DOB",
      });

    if (!emailID)
      return res.status(400).send({
        status: false,
        msg: "Please mention emailID",
      });

    if (!address)
      return res.status(400).send({
        status: false,
        msg: "Please mention address",
      });

    if (!customerID)
      return res.status(400).send({
        status: false,
        msg: "Please mention customerID",
      });

    if (!isValidString(firstName))
      return res.status(400).send({
        status: false,
        msg: "firstName must be string. Example:--> 'Nishant' ",
      });

    if (!isValidString(lastName))
      return res.status(400).send({
        status: false,
        msg: "lastName must be string. Example:--> 'Gautam' ",
      });

    if (!isValidString(mobileNumber))
      return res.status(400).send({
        status: false,
        msg: "mobileNumber must be string. Example:--> '9058503601' ",
      });

    if (!isValidString(emailID))
      return res.status(400).send({
        status: false,
        msg: "emailID must be string. Example:--> 'nk123@gmail.com' ",
      });

    if (!isValidString(address))
      return res.status(400).send({
        status: false,
        msg: "address must be string. Example:--> 'Rohini Sector 63' ",
      });

    if (!isValidString(customerID))
      return res.status(400).send({
        status: false,
        msg: "customerID must be string. Example:--> 'UUID' ",
      });

    if (!isValidString(status))
      return res.status(400).send({
        status: false,
        msg: "status must be string. Example:--> 'ACTIVE/INACTIVE' ",
      });

    if (["ACTIVE", "INACTIVE"].indexOf(status) == -1)
      return res.status(400).send({
        status: false,
        message: "Enter a valid status 'ACTIVE' or 'INACTIVE' ",
      });

    if (!isValidName(firstName))
      return res.status(400).send({
        status: false,
        msg: "firstName is invalid. It must be like this:--> 'Nishant' ",
      });

    if (!isValidName(lastName))
      return res.status(400).send({
        status: false,
        msg: "lastName is invalid. It must be like this:--> 'Gautam' ",
      });

    if (!isValidMobileNo(mobileNumber))
      return res.status(400).send({
        status: false,
        msg: "mobileNumber is invalid. It must be Indian No:--> '9058503601' ",
      });

    if (!isValidEmailId(emailID))
      return res.status(400).send({
        status: false,
        msg: "emailID is invalid. It must be like this:--> 'nk123@gmail.com' ",
      });

    if (!isValidNumber(address))
      return res.status(400).send({
        status: false,
        msg: "address can't be a number",
      });

    if (!isValidDate(DOB))
      return res.status(400).send({
        status: false,
        msg: "DOB is invalid. It must be like this:--> '1999-03-01' ",
      });

    DOB = new Date().toISOString();
    DOB = DOB;

    const registerMobileNumber = await customerModel.find({
      mobileNumber: mobileNumber,
    });
    if (registerMobileNumber.length != 0)
      return res.status(400).send({
        status: false,
        msg: "mobileNumber is already registered",
      });

    const registerEmailID = await customerModel.find({ emailID: emailID });
    if (registerEmailID.length != 0)
      return res.status(400).send({
        status: false,
        msg: "emailID is already registered",
      });

    const registerCustomerID = await customerModel.find({
      customerID: customerID,
    });
    if (registerCustomerID.length != 0)
      return res.status(400).send({
        status: false,
        msg: "customerID is already registered",
      });
    // PAssword

    let profileData = await userModel.create(data);
    return res.status(201).send({
      status: true,
      message: "User Created Successfully",
      data: profileData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const data = req.query;
    const { status } = data;
    const mainData = await customerModel.find({
      status: status || "ACTIVE",
      isDeleted: false,
    });
    if (mainData.length == 0)
      return res.status(404).send({
        status: false,
        msg: "No data found",
      });
    else
      return res
        .status(200)
        .send({ status: true, msg: "All Customer Detail", data: mainData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const customerID = req.query.customerID;
    const alreadyDeleted = await customerModel.findOne({
      customerID: customerID,
    });
    if (alreadyDeleted.isDeleted == true)
      return res.status(404).send({ status: true, msg: "Allready Exist" });

    await customerModel.findOneUpdate(
      { customerID: customerID },
      { $set: { isDeleted: true, deletedAt: new Date() } },
      { upsert: true },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, msg: "Customer Deleted Successfully" });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.export = {
  createCustomer,
  getCustomer,
  deleteCustomer,
};








