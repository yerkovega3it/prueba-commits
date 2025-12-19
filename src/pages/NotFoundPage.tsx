import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const goToBase = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-soft">
      <div className="bg-card shadow-lg rounded-3xl p-10 w-full max-w-3xl text-center border border-border animate-neon-glow">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-critic text-6xl md:text-7xl lg:text-8xl animate-neon-pulse drop-shadow-lg"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-avenir">
          ¡Oops! Página no encontrada
        </h1>
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={goToBase}
            className="flex items-center justify-center gap-2 bg-white text-bg-soft font-bold py-3 px-8 rounded-2xl shadow-lg transition-colors duration-200 font-avenir animate-neon-pulse text-lg md:text-xl uppercase tracking-wide"
            tabIndex={0}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};
