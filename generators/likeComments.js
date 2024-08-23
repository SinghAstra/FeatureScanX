import axios from "axios";

const baseURL = "http://localhost:5000/api";
const commonPassword = "YourCommonPassword123";

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
    console.log(`Error logging in user ${email}:`, error.message);
    return null;
  }
}

async function fetchAllUsers() {
  try {
    const response = await axios.get(`${baseURL}/users/get-all-users`);
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error.message);
    return [];
  }
}

async function fetchAllComments() {
  try {
    const response = await axios.get(`${baseURL}/comments/get-all-comments`);
    return response.data;
  } catch (error) {
    console.log("Error fetching comments:", error.message);
    return [];
  }
}

async function likeComment(commentId, token, username) {
  try {
    await axios.post(
      `${baseURL}/comments/${commentId}/like`,
      {},
      { headers: { Cookie: `token=${token}` }, withCredentials: true }
    );
    console.log(`Liked comment ${commentId} by ${username}`);
  } catch (error) {
    console.log(`Error liking comment ${commentId}:`, error.message);
  }
}

// Main function to run the generator
async function likeComments() {
  const users = await fetchAllUsers();
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

    const comments = await fetchAllComments();

    for (const comment of comments) {
      if (Math.random() < 0.5) {
        await likeComment(comment._id, token, currentUser.userName);
      } else {
        console.log(
          `Skipped liking comment ${comment._id} by ${currentUser.userName}`
        );
      }
    }
  }
}

likeComments();
