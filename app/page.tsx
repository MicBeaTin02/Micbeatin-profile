"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = modalRef.current.getBoundingClientRect();
    setModalPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      modalRef.current.style.left = `${e.clientX - modalPosition.x}px`;
      modalRef.current.style.top = `${e.clientY - modalPosition.y}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white text-black dark:bg-black dark:text-white"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Profile Section */}
        <section className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <h1 className="text-2xl font-bold mt-4">Micbeatin</h1>
          <p className="text-sm mt-2">A short bio about yourself.</p>
          {/* Login Button */}
          <button
            className="mt-4 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </section>
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white text-black p-6 rounded-lg shadow-lg w-80 relative cursor-move animate-fade-in"
            style={{ position: "absolute" }}
            onMouseDown={handleMouseDown}
          >
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <button
              className="absolute top-4 right-4 text-black"
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
                  className="w-full px-3 py-2 border rounded-lg"
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
                  className="w-full px-3 py-2 border rounded-lg"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <button
                className="w-full px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
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
      `}</style>
    </div>
  );
}