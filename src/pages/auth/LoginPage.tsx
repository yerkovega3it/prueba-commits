import backgroundImage from "../../assets/login-bg.jpg";
import LogoAmsa from "../../assets/amsa_logo_color.svg";
import { useState } from "react";
import { AMSA_LOGIN_URL } from "../../constants/environments";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    window.location.href = `${AMSA_LOGIN_URL}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-2 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      draggable={false}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md">
          <form
            method="post"
            onClick={handleClick}
            className="p-8 flex flex-col gap-6"
          >
            <img
              src={LogoAmsa}
              alt="AMSA Logo"
              draggable={false}
              className="h-15 select-none"
            />

            <button
              type="button"
              disabled={loading}
              className="bg-[#26758d] hover:bg-[#26758d]/90 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {loading ? "Iniciando sesión..." : "Dashboard"}
            </button>
            {loading && (
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div className="bg-green-500 h-full animate-pulse"></div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
