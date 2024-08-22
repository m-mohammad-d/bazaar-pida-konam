import { useState, useRef, useEffect } from "react";
import "./SeachComponnent.css";
import Modal from "./modal";

function SearchComponent() {
  const [query, setQuery] = useState(""); // Store the search query
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if the modal is open
  const searchButtonRef = useRef<HTMLButtonElement>(null); // Reference to the search button
  const [showMousePointer, setShowMousePointer] = useState(false); // Track if the mouse pointer indicator should be shown

  // Retrieve search parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get("q");

  // Handle search button click
  const handleSearch = () => {
    if (!searchParam) return; // Do nothing if no search parameter is found
    const encodedQuery = encodeURIComponent(searchParam); // Encode the search parameter
    window.location.href = `https://www.google.com/search?q=${encodedQuery}`;
  };

  // Handle key press event for input field
  const handleCreateUrl = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsModalOpen(true); // Open modal when Enter key is pressed
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (searchParam) {
      setQuery(searchParam); // Set query value based on URL parameter

      setShowMousePointer(true); // Show the mouse pointer indicator

      // Simulate a click on the search button after 1 second
      setTimeout(() => {
        if (searchButtonRef.current) {
          searchButtonRef.current.click();
        }
      }, 1000);
    }
  }, [searchParam]); // Dependency on search parameter

  // Construct the current site's URL
  const currentSiteUrl = `${window.location.origin}${window.location.pathname}`;
  const modalUrl = `${currentSiteUrl}?q=${encodeURIComponent(query)}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-xl p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6 text-gray-800">
          بزار برات پیدا کنم
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={searchParam || query} // Display search parameter from URL or local value
            onChange={(e) => setQuery(e.target.value)} // Update search query
            onKeyDown={handleCreateUrl} // Handle Enter key press
            placeholder="چی میخوای براش سرچ کنی"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            ref={searchButtonRef} // Reference to button
            onClick={handleSearch} // Handle button click
            className="px-4 py-2 bg-blue-600 text-white rounded-r-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            جست و جو
          </button>
        </div>
        {showMousePointer && (
          <div
            className="mouse-pointer absolute bg-red-500 w-6 h-6 rounded-full"
            style={{
              top: `${searchButtonRef.current?.offsetTop}px`,
              left: `${searchButtonRef.current?.offsetLeft}px`,
            }}
          ></div>
        )}
        {isModalOpen && <Modal url={modalUrl} onClose={handleCloseModal} />}
      </div>
    </div>
  );
}

export default SearchComponent;
