//users table.. -->userModel
const userModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const loginUser = async (req, res) => {

 try {
  const {email, password} = req.body

  const user = await userModel.findOne({ email: email });
  console.log(user);

  //check if email is exist or not//
  if ( !user ){
     res.status(404).json({
    message: "Email not found..",
  });
}
    // console.log(user.password)
    // console.log(password)

    const isMatch = bcrypt.compareSync(password, user.password);
   
    //true | false
    if (!isMatch) {
      res.status(404).json({
        message: "password not match",
      });
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role }, "my_secret_key", { expiresIn: "24h" });
        res.json({
             success: true,
             token, 
             user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.fullName
             }
        });


 } catch (error) {
  res.status(500).json({error:error.message});
  
 }


  };

const signup = async (req, res) => {
  //try catch if else...
  try {
    // Extract role from request body or default to "Customer"
    const { role = "Customer" } = req.body;
    
    // Validate role is among allowed values
    if (!["Customer", "ServiceProvider", "Admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role. Must be Customer, ServiceProvider, or Admin",
      });
    }

    //password encrypt..
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const confirmPassword= req.body.confirmPassword;

    const isMatch = bcrypt.compareSync(confirmPassword, req.body.password);

    if (isMatch == true) {
      console.log("")
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }

    // Create user with role
    const createdUser = await userModel.create(req.body);
    
    // Generate token with role information
    const token = jwt.sign({ userId: createdUser._id, role: createdUser.role }, "my_secret_key", { expiresIn: "24h" });
    
    res.status(201).json({
      message: "user created..",
      data: createdUser,
      token,
      user: {
        id: createdUser._id,
        email: createdUser.email,
        role: createdUser.role,
        name: createdUser.fullName
      }
    });

  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const addUser = async (req, res) => {
  //req.body...
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "User Saved Successfully",
    data: savedUser,
  });
};
const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId");
  res.json({
    message: "User fetched successfully..",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);
  res.json({
    message: "user fetched successfully..",
    data: foundUser,
  });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "user deleted Successfully..",
    data: deletedUser,
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
};

//addUser
//getUser
//deleteUser
//getUserById

//exports