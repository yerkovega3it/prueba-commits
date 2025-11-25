import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ComplianceRisk() {
  return (
    <div className="border-2 p-2 sm:p-3 lg:p-4 rounded-xl bg-card transition-shadow duration-300 flex flex-col overflow-hidden gap-2">
      <h2 className="text-sm sm:text-base lg:text-xl font-semibold">
        Matriz de Riesgo de Cumplimiento
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="border-2 p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center bg-main">
          <p className="text-3xl sm:text-4xl lg:text-6xl font-bold">37</p>
          <p className="text-xs text-gray-300 mt-1">Personal Inhabilitado</p>
        </div>

        <div className="border-2 p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center bg-main">
          <FontAwesomeIcon
            icon={faShieldAlt}
            className="text-xl sm:text-2xl mb-1"
          />
          <p className="text-xs text-gray-300 mb-1">Nivel de Riesgo</p>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
            Medio
          </p>
          <p className="text-xs text-gray-400 mb-1">
            Próxima sugerencia predictiva
          </p>
          <p className="text-xs font-semibold">
            Renovar 12 licencias en 7 días
          </p>
        </div>
      </div>

      <div className="bg-main border p-2 sm:p-3 rounded-lg">
        <p className="text-xs text-gray-200">
          Exámenes Vencidos (30 días): <span className="font-semibold">30</span>
        </p>
        <div className="bg-gray-950 h-1.5 sm:h-2 rounded-full w-full mt-1 overflow-hidden border">
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

      <div className="bg-main border p-2 sm:p-3 rounded-lg">
        <p className="text-xs text-gray-200">
          Licencias Operativas Vencidas:{" "}
          <span className="font-semibold">7</span>
        </p>
        <div className="bg-gray-950 h-1.5 sm:h-2 rounded-full w-full mt-1 overflow-hidden border">
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
