import Head from "next/head";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import { AppShell, useMantineTheme } from "@mantine/core";
import ChatDisplay from "@/components/ChatDisplay";
import ChatInput from "@/components/ChatInput";
import Hero from "@/components/Hero";
import { useChatStore } from "@/stores/ChatStore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useMantineTheme();

  const apiKey = useChatStore((state) => state.apiKey);
  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  const AudioRecorder = dynamic(() => import("@/components/AudioRecorder"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <title>YourB00sty AI Assistant</title>
        <meta name="description" content="YourB00sty AI Assistant inspired by ChatGPT UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "gi3uupkw6c");
            `,
          }}
        />
      </Head>
      <AppShell
        padding={0}
        navbar={<Nav />}
        layout="alt"
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <div style={{ position: "relative", height: "100%" }}>
          {apiKey ? <ChatDisplay /> : <Hero />}
          {apiKey && <ChatInput />}
        </div>
      </AppShell>
      <AudioRecorder />
    </>
  );
}
