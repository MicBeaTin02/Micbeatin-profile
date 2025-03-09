"use client";

import { useState, useRef, MouseEvent } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaSun, FaMoon } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const languageData = {
  labels: ['Vue JS', 'React JS', 'Laravel', 'PHP Native'],
  datasets: [
    {
      label: 'Vue JS',
      data: [30],
      backgroundColor: ['#41B883'],
      hoverBackgroundColor: ['#41B883'],
      borderWidth: 0,
      cutout: '80%',
    },
    {
      label: 'React JS',
      data: [25],
      backgroundColor: ['#61DAFB'],
      hoverBackgroundColor: ['#61DAFB'],
      borderWidth: 0,
      cutout: '60%',
    },
    {
      label: 'Laravel',
      data: [35],
      backgroundColor: ['#FF2D20'],
      hoverBackgroundColor: ['#FF2D20'],
      borderWidth: 0,
      cutout: '40%',
    },
    {
      label: 'PHP Native',
      data: [10],
      backgroundColor: ['#4F5D95'],
      hoverBackgroundColor: ['#4F5D95'],
      borderWidth: 0,
      cutout: '20%',
    },
  ],
};

const languageOptions = {
  plugins: {
    legend: {
      labels: {
        generateLabels: (chart) => {
          const data = chart.data;
          return data.labels.map((label, index) => ({
            text: label,
            fillStyle: data.datasets[index].backgroundColor[0],
          }));
        },
      },
    },
  },
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, inputMessage]);
      setInputMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, "This is an automatic response from AI."]);
      }, 1000);
  
      // Send email
      fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'ebora.gilax@gmail.com',
          subject: 'New AI Message',
          text: inputMessage,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  };

  return (
    <div
      className={`${isDarkMode ? 'bg-black-900 text-white' : 'bg-white text-black'} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-mono`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Header */}
      <header className={`w-full flex justify-between items-center p-4 bg-gradient-to-r ${isDarkMode ? 'from-black to-white' : 'from-white to-black'} bg-opacity-90 backdrop-blur-md rounded-full shadow-lg`}>
        <h1 className="text-xl font-bold">MICHAEL ANGELO E. EBORA</h1>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="text-black">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className={`absolute top-16 right-4 ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} bg-opacity-50 backdrop-blur-md p-4 rounded-xl shadow-lg animate-slide-in`}>
            <ul className="flex flex-col gap-2">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        )}
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-8 w-full">
        <main className="flex flex-col gap-8 items-center sm:items-start">
          {/* Profile Section */}
          <section className={`flex flex-col items-center sm:items-start text-center sm:text-left ${isDarkMode ? 'bg-opacity-50' : 'bg-opacity-50'} p-6 rounded-xl shadow-lg`}>
            <p className="text-sm mt-2">A short bio about myself.</p>
          </section>
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-mono">
            <li>Save and see your changes instantly.</li>
          </ol>

          {/* Experience Section */}
          <section className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-blue-500 mb-8">Experience</h2>
            <div className="relative border-l border-gray-200 dark:border-gray-700">
              {/* Experience Item */}
              <div className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full -left-3 ring-8 ring-black"></span>
                <h3 className="flex items-center mb-1 text-lg font-semibold">Full Stack Web Developer</h3>
                <p className="block mb-2 text-sm font-normal leading-none">Fujitsu Die-Tech Corporation of the Philippines</p>
                <ul className="mb-4 text-base font-normal list-disc list-inside">
                  <li>Utilizing Laravel and Vue JS to develop a web-based application for the company.</li>
                  <li>Collaborating with the team to test and debug the company's web systems.</li>
                  <li>Developed Systems: Machine Scheduling System, P.O Printing, O.E.M.S and M.S.R.S.</li>
                </ul>
                <time className="block mb-2 text-sm font-normal leading-none">July 2022 - Present</time>
              </div>
            </div>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className={`h-full w-80 ${isDarkMode ? 'bg-black-800 text-white' : 'bg-black-100 text-black'} bg-opacity-10 backdrop-blur-md p-4 shadow-lg`}>
          <h2 className="text-xl font-bold mb-4">Statistics</h2>
          <h3 className="text-lg font-semibold mb-2 mt-8">Languages</h3>
          <Doughnut data={languageData} options={languageOptions} />
        </aside>
      </div>
      <footer className={`flex gap-6 flex-wrap items-center justify-center ${isDarkMode ? 'bg-white-800' : 'bg-black-800'} bg-opacity-50 backdrop-blur-md p-4 rounded-full shadow-lg`}>
        <a href="https://github.com/MicBeaTin02" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/michael-angelo-ebora-100496226" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaLinkedin size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaTwitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
          <FaInstagram size={24} />
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

      {/* AI Message Section */}
      <div className="fixed bottom-4 right-4 w-80 bg-gray-800 bg-opacity-80 backdrop-blur-md text-white p-4 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">AI Chat</h2>
        <div className="mb-4 max-h-40 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-2">
              <p className="text-sm">{message}</p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-lg bg-gray-700 text-white"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>

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

        @keyframes zoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }

        .hover\\:animate-zoom:hover {
          animation: zoom 0.3s ease-out;
        }

        .footer-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          border: 2px solid white;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .footer-icon:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}