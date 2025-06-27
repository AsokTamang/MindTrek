import React from "react";
import axios from "axios";


interface propsType {
  data:string[]      //here we are declaring that the data is an array consisting of strings
}



export default function Suggestion({ data }: propsType) {
  const [input, setInput] = React.useState<string[]>([]); // here we are storing an array of feelings of a user into input state
  const [success, setSuccess] = React.useState(false); // this state tracks if the suggestion was successfully received
  const [suggestion, setSuggestion] = React.useState(""); // this stores the AI's suggested response

  React.useEffect(() => {
    setInput(data);

    const getSuggestion = async () => {
      try {
        const res = await axios.post(
          "/api/suggestion",
          { input },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const { success, data: responseData } = res.data;

        if (success) {
          setSuccess(true);
          setSuggestion(responseData);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message); // log any error
        }
      }
    };

    getSuggestion();
  }, [data,input]); // we are using data as the dependency array because only when the data (i.e., the set of feelings) is passed into this page, we run the logic inside useEffect

  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center px-6 py-14 text-center space-y-6">
      {success ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            AI Suggested Response
          </h1>

          <div className="max-w-2xl w-full bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow-md text-left leading-relaxed whitespace-pre-wrap">
            {suggestion}
          </div>
        </>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 animate-pulse text-lg">
          Generating suggestion...
        </div>
      )}
    </div>
  );
}
