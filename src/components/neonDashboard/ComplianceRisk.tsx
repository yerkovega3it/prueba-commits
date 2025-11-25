import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AnimatedCounter from "../animatedCounter/AnimatedCounter";

function ComplianceRisk() {
  return (
    <div
      className="border-2 border-neon-pink p-2 sm:p-3 lg:p-4 rounded-xl bg-black transition-shadow duration-300 flex flex-col overflow-hidden gap-2"
      style={{
        boxShadow: "0 0 15px #ff0055, inset 0 0 15px rgba(255,0,85,0.1)",
      }}
    >
      <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-neon-pink">
        Matriz de Riesgo de Cumplimiento
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div
          className="border-2 border-neon-pink p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center bg-gray-900"
          style={{
            boxShadow: "0 0 10px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
          }}
        >
          <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-neon-pink">
            <AnimatedCounter value={37} />
          </p>
          <p className="text-xs text-gray-300 mt-1">Personal Inhabilitado</p>
        </div>

        <div
          className="border-2 border-neon-yellow p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center bg-gray-900"
          style={{
            boxShadow: "0 0 10px #ffff00, inset 0 0 10px rgba(255,255,0,0.1)",
          }}
        >
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="text-xl sm:text-2xl text-neon-yellow mb-1 animate-neon-pulse"
          />
          <p className="text-xs text-gray-300 mb-1">Nivel de Riesgo</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-neon-yellow mb-1 sm:mb-2">
            Medio
          </p>
          <p className="text-xs text-white mb-1">
            Próxima sugerencia predictiva
          </p>
          <p className="text-xs font-semibold text-neon-green">
            Renovar 12 licencias en 7 días
          </p>
        </div>
      </div>

      <div
        className="bg-gray-900 border border-neon-pink p-2 sm:p-3 rounded-lg"
        style={{ boxShadow: "0 0 5px #ff0055" }}
      >
        <p className="text-xs text-gray-200">
          Exámenes Vencidos (30 días):{" "}
          <span className="font-semibold text-neon-pink">
            <AnimatedCounter value={30} />
          </span>
        </p>
        <div className="bg-gray-950 h-1.5 sm:h-2 rounded-full w-full mt-1 overflow-hidden border border-neon-pink">
          <div
            className="h-full rounded-full"
            style={{
              width: "75",
              background: "linear-gradient(90deg, #ff0055 0%, #ff3377 100%)",
              boxShadow: "0 0 10px #ff0055",
            }}
          />
        </div>
      </div>

      <div
        className="bg-gray-900 border border-neon-orange p-2 sm:p-3 rounded-lg"
        style={{ boxShadow: "0 0 5px #ff9900" }}
      >
        <p className="text-xs text-gray-200">
          Licencias Operativas Vencidas:{" "}
          <span className="font-semibold text-neon-orange">
            <AnimatedCounter value={7} />
          </span>
        </p>
        <div className="bg-gray-950 h-1.5 sm:h-2 rounded-full w-full mt-1 overflow-hidden border border-neon-orange">
          <div
            className="h-full rounded-full"
            style={{
              width: "35%",
              background: "linear-gradient(90deg, #ff9900 0%, #ffff00 100%)",
              boxShadow: "0 0 10px #ff9900",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ComplianceRisk;
