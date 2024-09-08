let access_token =
  "ya29.a0AcM612zVg3680kbPUzOIrjaQXU8NSc1L5KWXGXN_FQnQc7RMdlKIaJECXWyCH0l_IXzDuT309KOEYdqH2OsID__SnefFNdpRm936tSQH0QNeEPjKl7PpcgmMSGslauu37SL2l4GqPFFrlfaHh6JKxlUC88geabRSbq1zo1BSaCgYKAcoSARASFQHGX2MiZ1fb5mmr-sIec3OQBwMTDg0175";
try {
  const userRes = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
  );

  console.log("response.data is ", response.data);
} catch (error) {
  console.log("Error fetching user info:", error);
}
