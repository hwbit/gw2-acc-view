/**
 * 
 * @param req 
 * @returns 
 */
export const mockService = async (req: any): Promise<any> => {
  const result = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Resolved after 5 seconds");
      // or reject("Something went wrong"); if you want to simulate a rejection
    }, 5000); // 5000 milliseconds = 5 seconds
  });

  return result;
}
