const getUserId = async (access_token) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const res = await response.json();
  if (res.error) {
    return "";
  }
  return res.id;
};

export default getUserId;
