import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const fetchGPT = async (input: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/gpt`, { prompt: input });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDALLE = async (input: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/dalle`, { prompt: input });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEmbeddings = async (input: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/embeddings`, {
      prompt: input,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchLangchain = async (input: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/langchain`, {
      prompt: input,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchScrapper = async (input: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/scrapper`, {
      prompt: input,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
