import React, { MouseEvent, RefObject } from 'react';

interface EmailModalProps {
  emailDetails: { to: string; subject: string; body: string };
  setEmailDetails: (details: { to: string; subject: string; body: string }) => void;
  handleSendEmail: () => void;
  handleCloseEmailModal: () => void;
  handleMouseDown: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  modalRef: RefObject<HTMLDivElement>;
  modalPosition: { x: number; y: number };
  isDragging: boolean;
}

const EmailModal: React.FC<EmailModalProps> = ({
  emailDetails,
  setEmailDetails,
  handleSendEmail,
  handleCloseEmailModal,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  modalRef,
  modalPosition,
  isDragging,
}) => {
  return (
    <div className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex items-center justify-center font-Basis33">
      <div
        ref={modalRef}
        className="bg-gray-800 bg-opacity-80 text-white p-6 rounded-xl shadow-lg w-80 relative cursor-move animate-fade-in"
        style={{ position: "absolute" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <h2 className="text-xl font-bold mb-4">Send Email</h2>
        <button
          className="absolute top-4 right-4 text-white"
          onClick={handleCloseEmailModal}
        >
          &times;
        </button>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="to">
              To
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
              type="email"
              id="to"
              name="to"
              value={emailDetails.to}
              onChange={(e) => setEmailDetails({ ...emailDetails, to: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="subject">
              Subject
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
              type="text"
              id="subject"
              name="subject"
              value={emailDetails.subject}
              onChange={(e) => setEmailDetails({ ...emailDetails, subject: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="body">
              Body
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded-lg bg-gray-700 text-white"
              id="body"
              name="body"
              value={emailDetails.body}
              onChange={(e) => setEmailDetails({ ...emailDetails, body: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            onClick={handleSendEmail}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
