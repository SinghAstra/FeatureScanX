import axios from "axios";

const baseURL = "http://localhost:5000/api";
const commonPassword = "YourCommonPassword123";

async function getAllUsers() {
  try {
    const response = await axios.get(`${baseURL}/users/get-all-users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
}

async function loginUser(email) {
  try {
    const response = await axios.post(
      `${baseURL}/auth/login`,
      { email, password: commonPassword },
      { withCredentials: true }
    );
    const cookies = response.headers["set-cookie"];
    const tokenCookie = cookies?.find((cookie) => cookie.startsWith("token="));
    if (!tokenCookie) {
      throw new Error("Token not found in cookies");
    }
    const token = tokenCookie.split(";")[0].replace("token=", "");
    return token;
  } catch (error) {
    console.error(`Error logging in user ${email}:`, error.message);
    return null;
  }
}

async function followUser(currentUsername, token, userName) {
  try {
    await axios.get(`${baseURL}/users/${userName}/toggle-follow`, {
      headers: {
        Cookie: `token=${token}`,
      },
      withCredentials: true,
    });
    console.log(`${currentUsername} Started following ${userName}`);
  } catch (error) {
    console.error(`Error following ${userName}:`, error.message);
  }
}

function shouldFollow() {
  return Math.random() > 0.5;
}

async function automateFollowing() {
  const users = await getAllUsers();
  if (users.length === 0) {
    console.log("No users to process.");
    return;
  }

  for (const currentUser of users) {
    const token = await loginUser(currentUser.email);
    if (!token) {
      console.log(`Skipping ${currentUser.userName} due to login failure.`);
      continue;
    }

    for (const user of users) {
      if (currentUser.userName !== user.userName && shouldFollow()) {
        await followUser(currentUser.userName, token, user.userName);
      }
    }
  }
}

automateFollowing();
