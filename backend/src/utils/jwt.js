import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET || "dev_jwt_secret_key_12345",
    {
      expiresIn: "1d",
    },
  );
};
