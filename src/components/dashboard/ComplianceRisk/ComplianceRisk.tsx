import {
  faShieldAlt,
  faArrowTrendUp,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CardTitle from "../shared/CardHeader";

function ComplianceRisk() {
  return (
    <div className="p-6 rounded-xl bg-card flex flex-col gap-4">
      <CardTitle
        icon={faArrowTrendUp}
        title="Matriz de Riesgo de Cumplimiento"
        subtitle="Proyección de inhabilitación de personal y riesgo de multas."
        iconClassName="text-info"
      />
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center bg-critical-light">
          <div className="flex items-center gap-4">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-critical text-2xl sm:text-3xl lg:text-4xl"
            />
            <p className="text-4xl font-bold">37</p>
          </div>
          <p className="text-md text-white mt-1">Personal Inhabilitado</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-card p-2 sm:p-3 rounded-lg">
            <p className="text-xs text-gray-200 flex justify-between">
              Exámenes Vencidos (30 días):
              <span className="font-semibold">30</span>
            </p>
            <div className="bg-gray-950 h-4 w-full mt-1 overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: "75%",
                  background:
                    "linear-gradient(90deg, #FB4D57 0%, #F5D6D8 100%)",
                  boxShadow: "0 0 10px #ff0055",
                }}
              />
            </div>
          </div>
          <div className="bg-card p-2 sm:p-3 rounded-lg">
            <p className="text-xs text-gray-200 flex justify-between">
              Licencias operativas Vencidas:
              <span className="font-semibold">7</span>
            </p>
            <div className="bg-gray-950 h-4 w-full mt-1 overflow-hidden">
              <div
                className="h-full"
                style={{
                  width: "25%",
                  background:
                    "linear-gradient(90deg, #EAAA00 0%, #F8ECCA 100%)",
                  boxShadow: "0 0 10px #EAAA00",
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
        <div className="gap-2 p-3 rounded-lg flex flex-col items-center justify-center text-center bg-card border-main border-2">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="text-5xl mb-2 text-info"
            />
            <p className="text-xs text-white mb-1">Nivel de Riesgo</p>
          </div>
          <div className="h-12 bg-warning flex items-center justify-center px-4 rounded-lg">
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-main">
              Medio
            </p>
          </div>
        </div>
        <div className="gap-4 p-6 rounded-lg flex flex-col items-center justify-center text-center bg-card border-main border-2">
          <p className="text-sm font-semibold">Próxima sugerencia predictiva</p>
          <div className="h-20 bg-main flex items-center justify-center px-4 rounded-lg">
            <p className="text-xs font-semibold text-approved">
              Renovar 12 licencias en 7 días
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceRisk;
