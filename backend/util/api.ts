export const createReqDetails = (key?: string) => ({
    method: "GET",
    headers: {
      Authorization: `Bearer ${key}`,
    },
  });