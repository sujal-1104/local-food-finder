"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import VendorList from "../components/VendorList"; // Import VendorList
import "../styles/home.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="container">
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <h1 className="title">Welcome to Local Food Finder</h1>
      <p>Find the best street food and food trucks near you!</p>
      <VendorList /> {/* Display VendorList */}
    </div>
  );
}
