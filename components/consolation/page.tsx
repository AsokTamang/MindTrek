import React from "react";
import axios from "axios";

export default function Suggestion({ data }: any) {
  const [input, setInput] = React.useState([]); // here we are storing an array of feelings of a user into input state
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

        const { success, data: responseData, message } = res.data;

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
  }, [data]); // we are using data as the dependency array because only when the data (i.e., the set of feelings) is passed into this page, we run the logic inside useEffect

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-14 text-center space-y-5">
      {success ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            AI Suggested Response
          </h1>

        
          <p className="max-w-2xl text-base md:text-lg leading-relaxed border rounded-xl p-6 shadow-md border-gray-300 dark:border-gray-700">
            {suggestion}
          </p>
        </>
      ) : (
        
        <div className="text-muted-foreground animate-pulse text-lg">
          Generating suggestion...
        </div>
      )}
    </div>
  );
}
