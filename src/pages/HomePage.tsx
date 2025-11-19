import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserClock,
  faArrowRightToBracket,
  faArrowRightFromBracket,
  faTriangleExclamation,
  faCalendarDay,
  faClipboardCheck,
  faIdCard,
  faCarSide,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

function AnimatedCounter({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(
        startValue + (endValue - startValue) * easeOutQuart
      );

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function HomePage() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // KPIs data
  const peopleOnSite = 985;
  const maxCapacity = 1200;
  const occupancyPercentage = Math.round((peopleOnSite / maxCapacity) * 100);
  const entryPerHour = 55;
  const exitPerHour = 12;

  // ISP data
  const ispPercentage = 84.9;
  const ispGoal = 95;

  return (
    <>
      <div className="w-full h-screen p-4 bg-bg-soft overflow-hidden flex flex-col gap-4 text-text-default">
        {/* Header */}
        <div className="border border-border p-3 rounded-xl shadow-md bg-white shrink-0">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                CENTRO DE MANDO OPERATIVO MINERO
              </h1>
              <p className="text-sm text-text mt-1">Estado de Faena (Flujo)</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {currentDateTime.toLocaleTimeString("es-CL", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <p className="text-sm text-text mt-1">
                {currentDateTime.toLocaleDateString("es-CL", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 flex-1 min-h-0">
          {/* Personas en Faena */}
          <div className="md:col-span-2 border border-border p-3 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 overflow-auto">
            <h2 className="text-base font-semibold mb-2 flex items-center gap-2 text-text-default">
              <FontAwesomeIcon icon={faUserClock} className="text-blue" />{" "}
              Personas en Faena (Tiempo Real)
            </h2>
            <div className="text-center mt-3">
              <p className="text-6xl font-bold text-blue mb-2">
                <AnimatedCounter value={peopleOnSite} />
              </p>
              <p className="text-sm text-text-soft mb-1">
                Capacidad Máx: {maxCapacity.toLocaleString()}
              </p>
              <div className="mt-2 mb-3">
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-bg-mute h-2 rounded-full flex-1 overflow-hidden">
                    <div
                      className="bg-linear-to-r from-blue to-primary h-full rounded-full"
                      style={{ width: `${occupancyPercentage}%` }}
                    />
                  </div>
                  <span className="text-lg font-bold text-blue">
                    {occupancyPercentage}%
                  </span>
                </div>
                <p className="text-xs text-text mt-1">Ocupación</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-border p-3 rounded-lg bg-bg-soft text-center">
                <FontAwesomeIcon
                  icon={faArrowRightToBracket}
                  className="text-green text-2xl mb-2"
                />
                <p className="text-3xl font-bold text-green">
                  <AnimatedCounter value={entryPerHour} />
                </p>
                <p className="text-xs text-text mt-1">/ Hr Entrada</p>
              </div>
              <div className="border border-border p-3 rounded-lg bg-bg-soft text-center">
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className="text-red text-2xl mb-2"
                />
                <p className="text-3xl font-bold text-red">
                  <AnimatedCounter value={exitPerHour} />
                </p>
                <p className="text-xs text-text mt-1">/ Hr Salida</p>
              </div>
            </div>
          </div>

          {/* Alertas */}
          <div className="md:col-span-3 border-2 border-red p-3 rounded-xl shadow-lg shadow-red/30 bg-gray-700 hover:shadow-xl hover:shadow-red/40 transition-shadow duration-300 space-y-2 overflow-auto">
            <h2 className="text-base font-semibold text-red flex items-center gap-2">
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="animate-pulse"
              />
              Alerta Operativa Crítica
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              <div className="border border-red/50 p-3 rounded-lg bg-gray-600 hover:shadow-md hover:shadow-red/20 transition-shadow text-center">
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  className="text-red text-2xl mb-2"
                />
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter value={3} />
                </p>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  Jornadas No Retiradas
                </p>
              </div>
              <div className="border border-orange/50 p-3 rounded-lg bg-gray-600 hover:shadow-md hover:shadow-orange/20 transition-shadow text-center">
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  className="text-orange text-2xl mb-2"
                />
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter value={30} />
                </p>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  Exámenes Vencidos
                </p>
              </div>
              <div className="border border-orange/50 p-3 rounded-lg bg-gray-600 hover:shadow-md hover:shadow-orange/20 transition-shadow text-center">
                <FontAwesomeIcon
                  icon={faIdCard}
                  className="text-orange text-2xl mb-2"
                />
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter value={7} />
                </p>
                <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                  Licencias Vencidas
                </p>
              </div>
            </div>

            <div className="border border-yellow/50 p-4 rounded-lg text-center bg-gray-600 hover:shadow-md hover:shadow-yellow/20 transition-shadow">
              <FontAwesomeIcon
                icon={faCarSide}
                className="text-yellow text-2xl mb-2"
              />
              <p className="text-3xl font-bold text-white">
                <AnimatedCounter value={5} />
              </p>
              <p className="text-sm text-gray-300 mt-1 line-clamp-2">
                Vehículos No Acreditados
              </p>
            </div>
          </div>

          {/* Control de Acceso */}
          <div className="md:col-span-2 border border-border p-3 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 space-y-2 overflow-auto">
            <h2 className="text-base font-semibold text-text-default">
              Control de Acceso
            </h2>
            <div className="border border-border p-4 rounded-lg bg-bg-soft hover:shadow-md transition-shadow text-center">
              <p className="text-4xl font-bold text-primary">
                <AnimatedCounter value={45} />
              </p>
              <span className="text-sm text-text block mt-1">
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  className="mr-1 text-primary"
                />{" "}
                Pases Aprobados (Hoy)
              </span>
            </div>
            <div className="border border-border p-4 rounded-lg bg-bg-soft hover:shadow-md transition-shadow text-center">
              <p className="text-4xl font-bold text-primary">
                <AnimatedCounter value={9} />
              </p>
              <span className="text-sm text-text block mt-1">
                <FontAwesomeIcon
                  icon={faCalendarDay}
                  className="mr-1 text-primary"
                />{" "}
                Larga Estadía (&gt; 1 día)
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
          {/* Matriz de Riesgo */}
          <div className="border border-border p-3 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden">
            <h2 className="text-base font-semibold text-text-default mb-2">
              Matriz de Riesgo de Cumplimiento
            </h2>

            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div className="border border-border p-4 rounded-lg flex flex-col items-center justify-center text-center">
                <p className="text-6xl font-bold text-red">
                  <AnimatedCounter value={37} />
                </p>
                <p className="text-sm text-text-soft">Personal Inhabilitado</p>
              </div>

              <div className="border border-border p-4 rounded-lg flex flex-col items-center justify-center text-center">
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  className="text-3xl text-text-soft mb-2"
                />
                <p className="text-sm text-text mb-1">Nivel de Riesgo</p>
                <p className="text-2xl font-bold text-yellow mb-3">Medio</p>
                <p className="text-xs text-text-soft mb-1">
                  Próxima sugerencia predictiva
                </p>
                <p className="text-sm font-semibold text-green">
                  Renovar 12 licencias en 7 días
                </p>
              </div>
            </div>

            <div className="bg-bg-soft p-3 rounded-lg shrink-0">
              <p className="text-sm text-text-default">
                Exámenes Vencidos (30 días):{" "}
                <span className="font-semibold">
                  <AnimatedCounter value={30} />
                </span>
              </p>
              <div className="bg-bg-mute h-3 rounded-full w-full mt-2 overflow-hidden">
                <div
                  className="bg-linear-to-r from-red to-red-light h-full rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
            </div>

            <div className="bg-bg-soft p-3 rounded-lg shrink-0">
              <p className="text-sm text-text-default">
                Licencias Operativas Vencidas:{" "}
                <span className="font-semibold">
                  <AnimatedCounter value={7} />
                </span>
              </p>
              <div className="bg-bg-mute h-3 rounded-full w-full mt-2 overflow-hidden">
                <div
                  className="bg-linear-to-r from-orange to-yellow h-full rounded-full"
                  style={{ width: "35%" }}
                />
              </div>
            </div>
          </div>

          {/* Índice de Performance */}
          <div className="border border-border p-3 rounded-xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 overflow-auto">
            <h2 className="text-base font-semibold mb-3 text-text-default">
              Índice de Performance de Seguridad (ISP)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Progress Circle */}
              <div className="flex flex-col items-center justify-center bg-bg-soft p-6 rounded-lg">
                <div className="relative w-44 h-44">
                  <svg className="transform -rotate-90 w-44 h-44">
                    {/* Background circle */}
                    <circle
                      cx="88"
                      cy="88"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="14"
                      fill="transparent"
                      className="text-bg-mute"
                    />
                    {/* Meta circle (gray) */}
                    <circle
                      cx="88"
                      cy="88"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray={`${(ispGoal / 100) * 439.6} 439.6`}
                      className="text-border-default opacity-40"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="88"
                      cy="88"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="14"
                      fill="transparent"
                      strokeDasharray={`${(ispPercentage / 100) * 439.6} 439.6`}
                      className="text-blue"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold text-blue">
                      {ispPercentage}%
                    </p>
                    <p className="text-xs text-text-soft mt-1">
                      Meta: {ispGoal}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="border border-border p-3 rounded-lg bg-bg-soft hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: "rgba(220, 38, 38, 0.8)" }}
                      ></span>
                      <p className="text-sm text-text-default">
                        A1. Alertas de Máximo Riesgo
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-text-default">
                      <AnimatedCounter value={7} />
                    </span>
                  </div>
                </div>
                <div className="border border-border p-3 rounded-lg bg-bg-soft hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: "rgba(249, 115, 22, 0.8)" }}
                      ></span>
                      <p className="text-sm text-text-default">
                        A2. Inhabilitación Documental
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-text-default">
                      <AnimatedCounter value={37} />
                    </span>
                  </div>
                </div>
                <div className="border border-border p-3 rounded-lg bg-bg-soft hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: "rgba(147, 51, 234, 0.8)" }}
                      ></span>
                      <p className="text-sm text-text-default">
                        A3. Vehículos No Acreditados
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-text-default">
                      <AnimatedCounter value={5} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
