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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4 bg-gray-900 text-white min-h-screen">
        <div className="flex flex-col gap-2 sm:gap-4 max-w-[1920px] mx-auto pb-4">
          {/* Header */}
          <div
            className="border-2 border-neon-cyan p-3 sm:p-4 lg:p-5 rounded-xl bg-black shrink-0"
            style={{
              boxShadow: "0 0 20px #00ffff, inset 0 0 20px rgba(0,255,255,0.1)",
            }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-neon-cyan">
                  Centro de Mando Operativo Minero
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-neon-magenta mt-1 font-medium">
                  Estado de Faena (Flujo)
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-neon-green">
                  {currentDateTime.toLocaleTimeString("es-CL", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
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
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-4">
            {/* Personas en Faena */}
            <div
              className="lg:col-span-2 border-2 border-neon-cyan p-3 sm:p-4 lg:p-6 rounded-xl bg-black transition-shadow duration-300 flex flex-col justify-between"
              style={{
                boxShadow:
                  "0 0 15px #00ffff, inset 0 0 15px rgba(0,255,255,0.1)",
              }}
            >
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold mb-2 flex items-center gap-2 text-neon-cyan shrink-0">
                <FontAwesomeIcon
                  icon={faUserClock}
                  className="text-neon-cyan text-sm sm:text-base lg:text-lg animate-neon-pulse"
                />{" "}
                Personas en Faena (Tiempo Real)
              </h2>
              <div className="text-center shrink-0">
                <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-neon-cyan mb-1">
                  <AnimatedCounter value={peopleOnSite} />
                </p>
                <p className="text-xs text-gray-400 mb-1">
                  Capacidad Máx: {maxCapacity.toLocaleString()}
                </p>
                <div className="mt-1 mb-2">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <div className="bg-gray-950 h-1.5 sm:h-2 rounded-full flex-1 overflow-hidden border border-neon-cyan">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${occupancyPercentage}%`,
                          background:
                            "linear-gradient(90deg, #00ffff 0%, #00ff88 100%)",
                          boxShadow: "0 0 10px #00ffff",
                        }}
                      />
                    </div>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-neon-cyan">
                      {occupancyPercentage}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Ocupación</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 shrink-0">
                <div
                  className="border-2 border-neon-green p-2 rounded-lg bg-gray-900 flex items-center gap-1.5 justify-center"
                  style={{
                    boxShadow:
                      "0 0 10px #00ff88, inset 0 0 10px rgba(0,255,136,0.1)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className="text-neon-green text-xl sm:text-2xl lg:text-4xl animate-neon-pulse"
                  />
                  <div className="text-left">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-green leading-none">
                      <AnimatedCounter value={entryPerHour} />
                    </p>
                    <p className="text-xs text-gray-400 mt-1">/ Hr Entrada</p>
                  </div>
                </div>
                <div
                  className="border-2 border-neon-pink p-2 rounded-lg bg-gray-900 flex items-center gap-1.5 justify-center"
                  style={{
                    boxShadow:
                      "0 0 10px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="text-neon-pink text-xl sm:text-2xl lg:text-4xl animate-neon-pulse"
                  />
                  <div className="text-left">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-pink leading-none">
                      <AnimatedCounter value={exitPerHour} />
                    </p>
                    <p className="text-xs text-gray-400 mt-1">/ Hr Salida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas */}
            <div
              className="lg:col-span-3 border-4 border-neon-pink p-3 sm:p-4 lg:p-6 rounded-xl bg-black transition-shadow duration-300 flex flex-col gap-2 animate-neon-glow"
              style={{
                boxShadow:
                  "0 0 30px #ff0055, 0 0 60px #ff0055, inset 0 0 30px rgba(255,0,85,0.2)",
              }}
            >
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-neon-pink flex items-center gap-2 shrink-0">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="animate-pulse text-sm sm:text-base lg:text-lg"
                  style={{
                    filter:
                      "drop-shadow(0 0 10px #ff0055) drop-shadow(0 0 20px #ff0055)",
                  }}
                />
                Alerta Operativa Crítica
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div
                  className="border-2 border-neon-pink p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
                  style={{
                    boxShadow:
                      "0 0 15px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
                  }}
                >
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className="text-neon-pink text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-pink leading-none">
                      <AnimatedCounter value={3} />
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Jornadas No Retiradas
                    </p>
                  </div>
                </div>
                <div
                  className="border-2 border-neon-orange p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
                  style={{
                    boxShadow:
                      "0 0 15px #ff9900, inset 0 0 10px rgba(255,153,0,0.1)",
                  }}
                >
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      className="text-neon-orange text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-orange leading-none">
                      <AnimatedCounter value={30} />
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Exámenes Vencidos
                    </p>
                  </div>
                </div>
                <div
                  className="border-2 border-neon-orange p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
                  style={{
                    boxShadow:
                      "0 0 15px #ff9900, inset 0 0 10px rgba(255,153,0,0.1)",
                  }}
                >
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faIdCard}
                      className="text-neon-orange text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-orange leading-none">
                      <AnimatedCounter value={7} />
                    </p>
                    <p className="text-xs text-gray-300 mt-1">
                      Licencias Vencidas
                    </p>
                  </div>
                </div>
                <div
                  className="border-2 border-neon-yellow p-2 rounded-lg bg-gray-900 transition-shadow flex items-center gap-2"
                  style={{
                    boxShadow:
                      "0 0 15px #ffff00, inset 0 0 10px rgba(255,255,0,0.1)",
                  }}
                >
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faCarSide}
                      className="text-neon-yellow text-xl sm:text-2xl lg:text-3xl animate-neon-pulse"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-neon-yellow leading-none">
                      <AnimatedCounter value={5} />
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 mt-1">
                      Vehículos No Acreditados
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Control de Acceso */}
            <div
              className="lg:col-span-2 border-2 border-neon-magenta p-3 sm:p-4 lg:p-6 rounded-xl bg-black transition-shadow duration-300 flex flex-col gap-3"
              style={{
                boxShadow:
                  "0 0 15px #ff00ff, inset 0 0 15px rgba(255,0,255,0.1)",
              }}
            >
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-neon-magenta">
                Control de Acceso
              </h2>
              <div
                className="border-2 border-neon-magenta p-3 md:p-4 rounded-lg bg-gray-900 transition-shadow text-center"
                style={{
                  boxShadow:
                    "0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.1)",
                }}
              >
                <p className="text-3xl sm:text-4xl font-bold text-neon-magenta">
                  <AnimatedCounter value={45} />
                </p>
                <span className="text-xs sm:text-sm text-gray-300 block mt-1">
                  <FontAwesomeIcon
                    icon={faClipboardCheck}
                    className="mr-1 text-neon-magenta"
                  />{" "}
                  Pases Aprobados (Hoy)
                </span>
              </div>
              <div
                className="border-2 border-neon-magenta p-3 md:p-4 rounded-lg bg-gray-900 transition-shadow text-center"
                style={{
                  boxShadow:
                    "0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.1)",
                }}
              >
                <p className="text-3xl sm:text-4xl font-bold text-neon-magenta">
                  <AnimatedCounter value={9} />
                </p>
                <span className="text-xs sm:text-sm text-gray-300 block mt-1">
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className="mr-1 text-neon-magenta"
                  />{" "}
                  Larga Estadía (&gt; 1 día)
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Matriz de Riesgo */}
            <div
              className="border-2 border-neon-pink p-2 sm:p-3 lg:p-4 rounded-xl bg-black transition-shadow duration-300 flex flex-col overflow-hidden gap-2"
              style={{
                boxShadow:
                  "0 0 15px #ff0055, inset 0 0 15px rgba(255,0,85,0.1)",
              }}
            >
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-neon-pink">
                Matriz de Riesgo de Cumplimiento
              </h2>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div
                  className="border-2 border-neon-pink p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center bg-gray-900"
                  style={{
                    boxShadow:
                      "0 0 10px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
                  }}
                >
                  <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-neon-pink">
                    <AnimatedCounter value={37} />
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    Personal Inhabilitado
                  </p>
                </div>

                <div
                  className="border-2 border-neon-yellow p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center bg-gray-900"
                  style={{
                    boxShadow:
                      "0 0 10px #ffff00, inset 0 0 10px rgba(255,255,0,0.1)",
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
                  <p className="text-xs text-gray-400 mb-1">
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
                      background:
                        "linear-gradient(90deg, #ff0055 0%, #ff3377 100%)",
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
                      background:
                        "linear-gradient(90deg, #ff9900 0%, #ffff00 100%)",
                      boxShadow: "0 0 10px #ff9900",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Índice de Performance */}
            <div
              className="border-2 border-neon-cyan p-2 sm:p-3 lg:p-4 rounded-xl bg-black transition-shadow duration-300 flex flex-col gap-2"
              style={{
                boxShadow:
                  "0 0 15px #00ffff, inset 0 0 15px rgba(0,255,255,0.1)",
              }}
            >
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-neon-cyan">
                Índice de Performance de Seguridad (ISP)
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {/* Progress Circle */}
                <div className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44">
                    <svg className="transform -rotate-90 w-full h-full">
                      {/* Background circle */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="currentColor"
                        strokeWidth="14"
                        fill="transparent"
                        className="text-gray-900"
                      />
                      {/* Meta circle (gray) */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="currentColor"
                        strokeWidth="14"
                        fill="transparent"
                        strokeDasharray={`${(ispGoal / 100) * 439.6} 439.6`}
                        className="text-gray-600 opacity-40"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="#00ffff"
                        strokeWidth="14"
                        fill="transparent"
                        strokeDasharray={`${
                          (ispPercentage / 100) * 439.6
                        } 439.6`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xl sm:text-2xl lg:text-4xl font-bold text-neon-cyan">
                        {ispPercentage}%
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Meta: {ispGoal}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div
                    className="border-2 border-neon-pink p-2 sm:p-3 rounded-lg bg-gray-900 transition-shadow"
                    style={{
                      boxShadow:
                        "0 0 10px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0 animate-pulse"
                          style={{
                            backgroundColor: "#ff0055",
                            boxShadow: "0 0 10px #ff0055",
                          }}
                        ></span>
                        <p className="text-xs sm:text-sm text-gray-200">
                          A1. Alertas de Máximo Riesgo
                        </p>
                      </div>
                      <span className="text-base sm:text-lg lg:text-2xl font-bold text-neon-pink shrink-0">
                        <AnimatedCounter value={7} />
                      </span>
                    </div>
                  </div>
                  <div
                    className="border-2 border-neon-orange p-2 sm:p-3 rounded-lg bg-gray-900 transition-shadow"
                    style={{
                      boxShadow:
                        "0 0 10px #ff9900, inset 0 0 10px rgba(255,153,0,0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0 animate-pulse"
                          style={{
                            backgroundColor: "#ff9900",
                            boxShadow: "0 0 10px #ff9900",
                          }}
                        ></span>
                        <p className="text-xs sm:text-sm text-gray-200">
                          A2. Inhabilitación Documental
                        </p>
                      </div>
                      <span className="text-base sm:text-lg lg:text-2xl font-bold text-neon-orange shrink-0">
                        <AnimatedCounter value={37} />
                      </span>
                    </div>
                  </div>
                  <div
                    className="border-2 border-neon-magenta p-2 sm:p-3 rounded-lg bg-gray-900 transition-shadow"
                    style={{
                      boxShadow:
                        "0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.1)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0 animate-pulse"
                          style={{
                            backgroundColor: "#ff00ff",
                            boxShadow: "0 0 10px #ff00ff",
                          }}
                        ></span>
                        <p className="text-xs sm:text-sm text-gray-200">
                          A3. Vehículos No Acreditados
                        </p>
                      </div>
                      <span className="text-base sm:text-lg lg:text-2xl font-bold text-neon-magenta shrink-0">
                        <AnimatedCounter value={5} />
                      </span>
                    </div>
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
