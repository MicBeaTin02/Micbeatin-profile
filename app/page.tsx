"use client";

import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);

  const images = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300",
    "https://picsum.photos/id/240/200/300",
    "https://picsum.photos/id/241/200/300",
  ];

  const defaultImage = "/default.jpg";

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setModalPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && modalRef.current) {
      modalRef.current.style.left = `${e.clientX - modalPosition.x}px`;
      modalRef.current.style.top = `${e.clientY - modalPosition.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-mono bg-black-900 text-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-white bg-opacity-90 backdrop-blur-md rounded-full shadow-lg fixed top-4">
        <h1 className="text-xl font-bold text-black">Micbeatin</h1>
        <button className="text-black" onClick={toggleMenu}>
          ☰
        </button>
        {isMenuOpen && (
          <nav className="absolute top-16 right-4 bg-black bg-opacity-50 backdrop-blur-md text-white p-4 rounded-xl shadow-lg animate-slide-in">
            <ul className="flex flex-col gap-2">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        )}
      </header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Profile Section */}
        <section className="flex flex-col items-center sm:items-start text-center sm:text-left bg-opacity-50 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mt-4">Micbeatin</h1>
          <p className="text-sm mt-2">A short bio about yourself.</p>
          {/* Login Button */}
          <div className="flex justify-center w-full">
            {/* <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              onClick={handleLoginClick}
            >
              Login
            </button> */}
          </div>
        </section>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-mono">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-white/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 rounded-full shadow-lg fixed bottom-4">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:animate-zoom">
          Facebook
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:animate-zoom">
          Twitter
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:animate-zoom">
          Instagram
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:animate-zoom">
          GitHub
        </a>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-800 bg-opacity-80 text-white p-6 rounded-xl shadow-lg w-80 relative cursor-move animate-fade-in"
            style={{ position: "absolute" }}
            onMouseDown={handleMouseDown}
          >
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <button
              className="absolute top-4 right-4 text-white"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
                  type="text"
                  id="username"
                  name="username"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        @keyframes carousel {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-carousel {
          animation: carousel 0.5s ease-out;
        }

        @keyframes zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        .animate-zoom {
          animation: zoom 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}