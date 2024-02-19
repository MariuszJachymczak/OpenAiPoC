import React, { useState } from "react";
import Modal from "./modal/Modal";
import {
  fetchGPT,
  fetchDALLE,
  fetchEmbeddings,
  fetchLangchain,
} from "../libs/api";
import { useTheme } from "./darkmode/ThemeContext";

const Main = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<React.ReactNode>(null);
  const [image, setImage] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState<string>("gpt");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let data;
      switch (endpoint) {
        case "gpt":
          data = await fetchGPT(input);
          setOutput(JSON.stringify(data.message.content));
          break;
        case "dalle":
          data = await fetchDALLE(input);
          setImage(data);
          break;
        case "embeddings":
          data = await fetchEmbeddings(input);
          setOutput(JSON.stringify(data));
          break;
        case "langchain":
          data = await fetchLangchain(input);
          setOutput(JSON.stringify(data));
          break;
        default:
          throw new Error("Invalid endpoint");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="p-4 text-center bg-dark-800">
        <h2 className="text-2xl font-bold">
          Intorduction to OpenAI and Langchain with React - Proof of Concept
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <input
            style={{ color: "black" }}
            className="p-2 border border-gray-800 rounded w-64"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <select
            style={{ color: "black" }}
            className="p-2 border border-gray-800 rounded mt-2"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          >
            <option value="gpt">GPT</option>
            <option value="dalle">DALLE</option>
            <option value="embeddings">RAG</option>
            <option value="langchain">With Memory</option>
          </select>
          <button
            style={{ color: "black" }}
            className="p-2 border border-gray-300 rounded mt-2 mb-2 bg-gray-300"
            type="submit"
          >
            Submit
          </button>

          {isLoading && (
            <div className="flex items-center justify-center space-x-2 mt-2">
              <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
              <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
              <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
            </div>
          )}
          <div className="mt-4 flex justify-center">
            {endpoint === "dalle" && image ? (
              <img src={image} alt="Generated" />
            ) : (
              <div>{output}</div>
            )}
            {isModalOpen && <Modal closeModal={toggleModal} />}
          </div>
        </form>
      </div>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? "Switch to Light Mode" : "Swith to Dark Mode"}
      </button>
    </>
  );
};

export default Main;
