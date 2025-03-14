"use client";
import { ApolloProvider } from "@apollo/client";
import CharacterList from "../../components/CharacterList";
import client from "@/apollo-client";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";

function Home() {
  return (
    <ApolloProvider client={client}>
      <div className="flex flex-col items-center justify-start">
        <Navbar />
        <CharacterList />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default Home;
