import axios from "axios";
import React, { useState } from "react";

const Main = () => {
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<React.ReactNode>(null);
  const [image, setImage] = useState<string | null>(null);
  const [endpoint, setEndpoint] = useState<string>("gpt");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`http://localhost:4000/${endpoint}`, { prompt: input })
      .then((res) => {
        if (endpoint === "dalle") {
          setImage(res.data);
        } else {
          setOutput(JSON.stringify(res.data.message.content));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="gpt p-4 text-center">
      <h2 className="text-2xl fondt-bold">OpenAI</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          className="p-2 border border-gray-300 rounded w-64"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 rounded mt-2"
          value={endpoint}
          onChange={(e) => setEndpoint(e.target.value)}
        >
          <option value="gpt">GPT</option>
          <option value="dalle">DALLE</option>
        </select>
        <button
          className="p-2 border border-gray-300 rounded mt-2"
          type="submit"
        >
          Submit
        </button>
        {isLoading && <p>Loading...</p>}
        <div className="mt-4 flex justify-center">
          {endpoint === "dalle" && image ? (
            <img src={image} alt="Generated" />
          ) : (
            output
          )}
        </div>
      </form>
    </div>
  );
};

export default Main;
