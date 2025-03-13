"use client";
import { ApolloProvider } from "@apollo/client";
import CharacterList from "../../components/CharacterList";
import client from "@/apollo-client";
import Navbar from "../../components/Navbar";

function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col items-center justify-start">
        <Navbar />
        <CharacterList />
      </div>
    </ApolloProvider>
  );
}

export default Home;
