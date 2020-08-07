const baseUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;

const signup = async (id: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/api/signup`, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export default signup;
