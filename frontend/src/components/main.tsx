import React, { useState } from "react";
import Modal from "./modal/Modal";
import {
  fetchGPT,
  fetchDALLE,
  fetchEmbeddings,
  fetchLangchain,
  fetchScrapper,
} from "../libs/api";
import { animateLoadingDots } from "../assets/assets";
import RightSidebar from "./sidebar/RightSidebar";
import LeftSidebar from "./sidebar/LeftSidebar";
import LandingPage from "./pages/landingpage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageGeneratorPage from "./pages/imageGeneratorPage/ImageGeneratorPage";
import ConversationPage from "./pages/conversationPage/ConversationPage";
import RagPage from "./pages/RAGpage/RagPage";

const Main = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<React.ReactNode>(null);
  const [image, setImage] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState<string>("gpt");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // const handleSubmittedText = async (inputFromModal: string) => {
  //   setInput(inputFromModal);
  //   setEndpoint("embeddings");
  //   handleSubmit(null);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | null) => {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);

    try {
      let data;
      switch (endpoint) {
        // case "gpt":
        //   data = await fetchGPT(input);
        //   setOutput(JSON.stringify(data.message.content));
        //   break;
        // case "dalle":
        //   data = await fetchDALLE(input);
        //   setImage(data);
        //   break;
        case "embeddings":
          data = await fetchEmbeddings(input);
          setOutput(JSON.stringify(data));
          break;
        // case "langchain":
        //   data = await fetchLangchain(input);
        //   setOutput(data);
        //   break;
        case "scrapper":
          data = await fetchScrapper(input);
          setOutput(data);
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

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  return (
    <>
      <BrowserRouter>
        <div className="flex flex-row">
          <div className="basis-1/12 h-screen">
            <LeftSidebar />
          </div>

          <div className="basis-10/12 p-0.5 text-bg-dark-800">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/image" element={<ImageGeneratorPage />} />
              <Route path="/conversation" element={<ConversationPage />} />
              <Route path="/rag" element={<RagPage />} />
            </Routes>

            {/* <form className="mt-4" onSubmit={handleSubmit}>
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
              <option value="scrapper">Scrapper</option>
            </select>
            <button
              style={{ color: "black" }}
              className="p-2 border border-gray-300 rounded mt-2 mb-2 bg-gray-300"
              type="submit"
            >
              Submit
            </button>

            <button
              className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800"
              onClick={toggleModal}
              type="button"
            >
              Open Embedded Text
            </button>

            {isLoading && (
              <div className="flex items-center justify-center space-x-2 mt-2">
                <div className={animateLoadingDots}></div>
                <div className={animateLoadingDots}></div>
                <div className={animateLoadingDots}></div>
              </div>
            )}
            <div className="mt-4 flex justify-center">
              {endpoint === "dalle" && image ? (
                <img src={image} alt="Generated" />
              ) : (
                <div>{output}</div>
              )}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-start p-10">
                  <Modal
                    closeModal={toggleModal}
                    onUserSubmit={handleSubmittedText}
                  />
                </div>
              )}
            </div>
          </form> */}
          </div>
          <div className="basis-1/12 flex h-screen justify-end">
            <RightSidebar />
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Main;
