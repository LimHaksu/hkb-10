const baseUrl = "http://localhost:3000/api";

const login = async (id: string, password: string) => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    });
    const result = await response.json();
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export default login;
