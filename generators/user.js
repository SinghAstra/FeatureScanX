import bcrypt from "bcrypt";
import Chance from "chance";
import User from "../models/User.js"; // Adjust the path as necessary

const chance = new Chance();

// Function to generate a random user
const generateUsers = async () => {
  const password = "password123"; // You can generate a random password or use a default one
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName: chance.name(),
    userName: chance.string({
      length: 8,
      pool: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456",
    }),
    email: chance.email(),
    mobile: chance.phone({ country: "us", mobile: true }),
    password: hashedPassword,
    bio: chance.sentence({ words: 10 }),
    website: chance.url(),
    followers: [],
    following: [],
    bookmarks: [],
    location: chance.city(),
    occupation: chance.profession(),
    isPrivate: chance.bool(),
    verified: chance.bool(),
    dateOfBirth: chance.birthday({ string: true }),
    gender: chance.gender(),
    address: chance.address(),
  });

  await user.save();

  return user;
};

// Function to generate multiple random users
export const generateMultipleUsers = async (count) => {
  const users = [];

  for (let i = 0; i < count; i++) {
    const user = await generateUsers();
    users.push(user);
  }

  return users;
};
