import axios from "axios";

export async function getQuote(id = "random") {
    try {
        const response = await axios.get(`https://dummyjson.com/quotes/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching quote:", error);
        throw error;
    }
}