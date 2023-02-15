import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import DropDown, { VibeType } from "../components/DropDown";
import Footer from "../components/Footer";
import Github from "../components/GitHub";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  // const [vibe, setVibe] = useState<VibeType>("Professional");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  console.log("Streamed response: ", generatedBios);

  const prompt =
  "Convert the following raw user input to a properly formatted date time in the MM/DD/YYYY format.\nIf there is any possible ambiguity regarding the year, month or day, indicate so. For instance, sometimes people put the day before the month in dates.\nRemember that the month number ranges from 1 to 12 and the day number ranges from 1 to 31. Remember that months can have 28, 29, 30, or 31 days.\nIndicate if a user input date is impossible.\n\nExamples:\nUser input: 4 3 2001\nResponse: Ambiguity detected! Unclear if this is 04/03/2001 or 03/04/2001. Please specify!\n\nUser input: Nov 2, 1991\nResponse: 11/02/1991\n\nUser input: third of december, 2020\nResponse: 12/03/2020\n\nUser input: feb fourteenth two thousand seventy\nResponse: 12/14/2070\n\nUser input: 13 5 1223\nResponse: 13/05/1223\nThere is no ambiguity here regarding whether 13 is a month or day because there are only 12 months, so 13 has to refer to a day.\n\nUser input: seventh of march '03\nResponse: 03/07/2003\n\nUser input: march 18 09\nResponse: Ambiguity detected! Unclear if the year refers to 2009, 1909, 1809, or another year ending in 09! Please specify.\n\nUser input: 1776-4-5\nResponse: Ambiguity detected! Unclear if this is 4/5/1776 or 5/4/1776. Please specify.\n\nUser input: 02-14-0100\nResponse: 02/14/0100\n\nUser input: 14/145/2900\nResponse: Impossible date provided. 145 is too large to be a possible day or month.\n\nUser input: 1929/19\nResponse: Not enough information provided! Is your date missing a month, day, or year?\n\nUser input: 2/2/2\nResponse: Ambiguity detected! Unclear if the year refers to 0002, 2002, or another year ending in 2. Please specify.\n\nUser input: 2/1 2003\nResponse: Ambiguity detected! Unclear if this is 01/01/2002 or 01/02/2003. Please specify!\n\nConvert the following raw user input to a properly formatted date time in the MM/DD/YYYY format.\nUser input: " + bio + "\nResponse:";

  const generateBio = async (e: any) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>Dates</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
        <h1 className="sm:text-6xl text-4xl max-w-2xl font-bold text-slate-900">
          Format any date with AI.
        </h1>
        <a href='https://mobile.twitter.com/itsandrewgao' className="text-slate-500 mt-5">@itsandrewgao</a>
        <div className="max-w-xl w-full">
          <div className="flex mt-10 items-center space-x-3">
            <Image
              src="/1-black.png"
              width={30}
              height={30}
              alt="1 icon"
              className="mb-5 sm:mb-0"
            />
            <p className="text-left font-medium">
              Input a date string in any format.
            </p>
          </div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
            placeholder={
              "sept 10th 1773"
            }
          />
         
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              onClick={(e) => generateBio(e)}
            >
             Format &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-10">
              {generatedBios && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Formatted date (MM/DD/YYYY):
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                    {generatedBios
                      .split("JKJl3320xx")
                      .map((generatedBio) => {
                        return (
                          <div
                            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                            onClick={() => {
                              navigator.clipboard.writeText(generatedBio);
                              toast("Copied to clipboard", {
                                icon: "✂️",
                              });
                            }}
                            key={generatedBio}
                          >
                            <p>{generatedBio}</p>
                          </div>
                        );
                      })}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
