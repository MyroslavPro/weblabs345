const BASE_URL = "http://127.0.0.1:5000";
const RESOURSE_URL = `${BASE_URL}/item`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
  try {
    const reqParams = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      reqParams.body = JSON.stringify(body);
    }

    return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};


export const getAllItems = async () => {
  const rawResponse = await baseRequest({ method: "GET" });

  return await rawResponse.json();
};

export const postItem = (body) => baseRequest({ method: "POST", body });

export const editItem = (id, body) =>
  baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteItem = (id) =>
  baseRequest({ urlPath: `/${id}`, method: "DELETE" });