"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaSun, FaMoon, FaEnvelope, FaComments } from 'react-icons/fa';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import emailjs from 'emailjs-com';
import { NotionRenderer } from 'react-notion';
import 'react-notion/src/styles.css';
import sunMoonToggle from '../public/sun-moon-toggle.png'; // Ensure the image is placed in the public directory
import EmailModal from './EmailModal'; // Import the new EmailModal component
import ChatBot from './ChatBot'; // Import the new ChatBot component
import pikachuGif from './pikachu-pixelated.gif'; // Ensure the GIF is placed in the public directory

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
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [emailDetails, setEmailDetails] = useState({ to: "", subject: "", body: "" });
  const modalRef = useRef<HTMLDivElement>(null);
  const notionCalendarId = 'YOUR_NOTION_CALENDAR_ID';
  const [typedText, setTypedText] = useState("");
  const bioText = "A short bio about myself.";
  const [isLoading, setIsLoading] = useState(true);
  const [isNameLoading, setIsNameLoading] = useState(true);
  const [typedName, setTypedName] = useState("");
  const nameText = "MICHAEL ANGELO E. EBORA";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < bioText.length) {
        setTypedText((prev) => prev + bioText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate a loading time of 2 seconds
  }, []);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < nameText.length) {
        setTypedName((prev) => prev + nameText[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setIsNameLoading(false);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
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

      // Send email using EmailJS
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: 'ebora.gilax@gmail.com',
        message: inputMessage,
      }, 'YOUR_USER_ID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.error('FAILED...', error);
      });
    }
  };

  const handleSendEmail = () => {
    if (emailDetails.to && emailDetails.subject && emailDetails.body) {
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        to_email: emailDetails.to,
        subject: emailDetails.subject,
        message: emailDetails.body,
      }, 'YOUR_USER_ID')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setIsEmailModalOpen(false);
      }, (error) => {
        console.error('FAILED...', error);
      });
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader">
            <span className="loader-text">MICHAEL ANGELO E. EBORA</span>
          </div>
        </div>
      ) : (
        <div
          className={`${isDarkMode ? 'bg-black-900 text-white' : 'bg-white text-black'} grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Header */}
          <header className="w-full flex justify-between items-center p-4 bg-white bg-opacity-90 backdrop-blur-md rounded-full shadow-lg">
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-black' : 'text-black'}`}>
              {isNameLoading ? typedName : nameText}
            </h1>
            <div className="flex items-center gap-4">
              <button onClick={toggleDarkMode} className="text-black">
                {isDarkMode ? <FaSun size={24} /> : <FaMoon size={24} />}
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
                <p className="text-sm mt-2">{typedText}</p>
                <img src='./pikachu-pixelated.gif' alt="Pikachu Pixelated" className="mt-4 w-32 h-32" />
              </section>
              <ol className="list-inside list-decimal text-sm text-center sm:text-left">
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

              {/* Notion Calendar Section */}
              <section className="w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-blue-500 mb-8">Calendar</h2>
                <NotionRenderer blockMap={notionCalendarId} />
              </section>
            </main>

            {/* Right Sidebar */}
            <aside className={`h-full w-80 ${isDarkMode ? 'bg-black-800 text-white' : 'bg-black-100 text-black'} bg-opacity-10 backdrop-blur-md p-4 shadow-lg`}>
              <h2 className="text-xl font-bold mb-4">Statistics</h2>
              <h3 className="text-lg font-semibold mb-2 mt-8">Languages</h3>
            </aside>
          </div>
          <footer className={`flex gap-6 flex-wrap items-center justify-center ${isDarkMode ? 'bg-white-800' : 'bg-black-800'} bg-opacity-50 backdrop-blur-md p-4 rounded-full shadow-lg shadow-md shadow-light-blue-500/50`}>
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
            <button
              onClick={() => setIsEmailModalOpen(true)}
              className="footer-icon"
            >
              <FaEnvelope size={24} />
            </button>
            <button
              onClick={() => setIsChatBotOpen(true)}
              className="footer-icon"
            >
              <FaComments size={24} />
            </button>
          </footer>

          {/* Email Modal */}
          {isEmailModalOpen && (
            <EmailModal
              emailDetails={emailDetails}
              setEmailDetails={setEmailDetails}
              handleSendEmail={handleSendEmail}
              handleCloseEmailModal={handleCloseEmailModal}
              handleMouseDown={handleMouseDown}
              handleMouseMove={handleMouseMove}
              handleMouseUp={handleMouseUp}
              modalRef={modalRef}
              modalPosition={modalPosition}
              isDragging={isDragging}
            />
          )}

          {/* Chat Bot */}
          {isChatBotOpen && (
            <ChatBot
              messages={messages}
              setMessages={setMessages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSendMessage}
              handleCloseChatBot={() => setIsChatBotOpen(false)}
            />
          )}

          <style jsx>{`
            @font-face {
              font-family: 'Basis33';
              src: url('/app/font/basis33.ttf') format('truetype');
              font-weight: normal;
              font-style: normal;
            }

            * {
              font-family: 'Basis33', monospace;
            }

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

            .loader-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background-color: ${isDarkMode ? '#000' : '#fff'};
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              z-index: 9999;
            }

            .loader {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 200px;
              height: 200px;
              border: 16px solid #f3f3f3;
              border-radius: 50%;
              border-top: 16px solid #ff0000; /* Red color */
              border-right: 16px solid #ff7f00; /* Orange color */
              border-bottom: 16px solid #ffff00; /* Yellow color */
              border-left: 16px solid #0000ff; /* Blue color */
              animation: spin 2s linear infinite;
            }

            .loader-text {
              font-size: 1.5rem;
              font-weight: bold;
              color: #000;
              animation: fade-in-out 2s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            @keyframes fade-in-out {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}