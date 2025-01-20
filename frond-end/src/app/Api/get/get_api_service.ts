export async function getData(url: string) {
  debugger
  try {
    const response = await fetch(url); // Default is GET method
    if (!response.ok) {
    console.log("Network response was not ok");
    }
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    console.error("There was an error fetching the data:", error);
    return null; // Return null if there was an error
  }
}
