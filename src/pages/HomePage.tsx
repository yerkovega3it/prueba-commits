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
      <div className="w-full px-4 sm:px-6 lg:px-8 py-2 sm:py-4 bg-bg-soft text-text-default">
        <div className="flex flex-col gap-2 sm:gap-4 max-w-[1920px] mx-auto pb-4">
          {/* Header */}
          <div className="border border-border p-3 sm:p-4 lg:p-5 rounded-xl shadow-md bg-white shrink-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-primary">
                  Centro de Mando Operativo Minero
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-text mt-1 font-medium">
                  Estado de Faena (Flujo)
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                  {currentDateTime.toLocaleTimeString("es-CL", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
                <p className="text-xs sm:text-sm text-text mt-1">
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
            <div className="lg:col-span-2 border border-border p-3 sm:p-4 lg:p-6 rounded-xl bg-white transition-shadow duration-300 flex flex-col justify-between">
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold mb-2 flex items-center gap-2 text-text-default shrink-0">
                <FontAwesomeIcon
                  icon={faUserClock}
                  className="text-blue text-sm sm:text-base lg:text-lg"
                />{" "}
                Personas en Faena (Tiempo Real)
              </h2>
              <div className="text-center shrink-0">
                <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-blue mb-1">
                  <AnimatedCounter value={peopleOnSite} />
                </p>
                <p className="text-xs text-text-soft mb-1">
                  Capacidad Máx: {maxCapacity.toLocaleString()}
                </p>
                <div className="mt-1 mb-2">
                  <div className="flex items-center justify-center gap-1 sm:gap-2">
                    <div className="bg-bg-mute h-1.5 sm:h-2 rounded-full flex-1 overflow-hidden">
                      <div
                        className="bg-linear-to-r from-blue to-primary h-full rounded-full"
                        style={{ width: `${occupancyPercentage}%` }}
                      />
                    </div>
                    <span className="text-sm sm:text-base lg:text-lg font-bold text-blue">
                      {occupancyPercentage}%
                    </span>
                  </div>
                  <p className="text-xs text-text mt-1">Ocupación</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 shrink-0">
                <div className="border border-border p-2 rounded-lg bg-bg-soft flex items-center gap-1.5 justify-center">
                  <FontAwesomeIcon
                    icon={faArrowRightToBracket}
                    className="text-green text-xl sm:text-2xl lg:text-4xl"
                  />
                  <div className="text-left">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green leading-none">
                      <AnimatedCounter value={entryPerHour} />
                    </p>
                    <p className="text-xs text-text mt-1">/ Hr Entrada</p>
                  </div>
                </div>
                <div className="border border-border p-2 rounded-lg bg-bg-soft flex items-center gap-1.5 justify-center">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="text-red text-xl sm:text-2xl lg:text-4xl"
                  />
                  <div className="text-left">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-red leading-none">
                      <AnimatedCounter value={exitPerHour} />
                    </p>
                    <p className="text-xs text-text mt-1">/ Hr Salida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Alertas */}
            <div className="lg:col-span-3 border-2 border-red p-3 sm:p-4 lg:p-6 rounded-xl shadow-lg shadow-red/30 bg-white hover:shadow-xl hover:shadow-red/40 transition-shadow duration-300 flex flex-col gap-2">
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-red flex items-center gap-2 shrink-0">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="animate-pulse text-sm sm:text-base lg:text-lg"
                />
                Alerta Operativa Crítica
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-red/50 p-2 rounded-lg bg-bg-soft hover:shadow-md hover:shadow-red/20 transition-shadow flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faCalendarDay}
                      className="text-red text-xl sm:text-2xl lg:text-3xl"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-default leading-none">
                      <AnimatedCounter value={3} />
                    </p>
                    <p className="text-xs text-text mt-1">
                      Jornadas No Retiradas
                    </p>
                  </div>
                </div>
                <div className="border border-orange/50 p-2 rounded-lg bg-bg-soft hover:shadow-md hover:shadow-orange/20 transition-shadow flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faClipboardCheck}
                      className="text-orange text-xl sm:text-2xl lg:text-3xl"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-default leading-none">
                      <AnimatedCounter value={30} />
                    </p>
                    <p className="text-xs text-text mt-1">Exámenes Vencidos</p>
                  </div>
                </div>
                <div className="border border-orange/50 p-2 rounded-lg bg-bg-soft hover:shadow-md hover:shadow-orange/20 transition-shadow flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faIdCard}
                      className="text-orange text-xl sm:text-2xl lg:text-3xl"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-default leading-none">
                      <AnimatedCounter value={7} />
                    </p>
                    <p className="text-xs text-text mt-1">Licencias Vencidas</p>
                  </div>
                </div>
                <div className="border border-yellow/50 p-2 rounded-lg bg-bg-soft hover:shadow-md hover:shadow-yellow/20 transition-shadow flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 sm:w-10 lg:w-12 shrink-0">
                    <FontAwesomeIcon
                      icon={faCarSide}
                      className="text-yellow text-xl sm:text-2xl lg:text-3xl"
                    />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-default leading-none">
                      <AnimatedCounter value={5} />
                    </p>
                    <p className="text-xs sm:text-sm text-text mt-1">
                      Vehículos No Acreditados
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Control de Acceso */}
            <div className="lg:col-span-2 border border-border p-3 sm:p-4 lg:p-6 rounded-xl bg-white transition-shadow duration-300 flex flex-col gap-3">
              <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-text-default">
                Control de Acceso
              </h2>
              <div className="border border-border p-3 md:p-4 rounded-lg bg-bg-soft transition-shadow text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  <AnimatedCounter value={45} />
                </p>
                <span className="text-xs sm:text-sm text-text block mt-1">
                  <FontAwesomeIcon
                    icon={faClipboardCheck}
                    className="mr-1 text-primary"
                  />{" "}
                  Pases Aprobados (Hoy)
                </span>
              </div>
              <div className="border border-border p-3 md:p-4 rounded-lg bg-bg-soft transition-shadow text-center">
                <p className="text-3xl sm:text-4xl font-bold text-primary">
                  <AnimatedCounter value={9} />
                </p>
                <span className="text-xs sm:text-sm text-text block mt-1">
                  <FontAwesomeIcon
                    icon={faCalendarDay}
                    className="mr-1 text-primary"
                  />{" "}
                  Larga Estadía (&gt; 1 día)
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Matriz de Riesgo */}
            <div className="border border-border p-2 sm:p-3 lg:p-4 rounded-xl bg-white transition-shadow duration-300 flex flex-col overflow-hidden gap-2">
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-text-default">
                Matriz de Riesgo de Cumplimiento
              </h2>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="border border-border p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center">
                  <p className="text-3xl sm:text-4xl lg:text-6xl font-bold text-red">
                    <AnimatedCounter value={37} />
                  </p>
                  <p className="text-xs text-text-soft mt-1">
                    Personal Inhabilitado
                  </p>
                </div>

                <div className="border border-border p-2 sm:p-3 rounded-lg flex flex-col items-center justify-center text-center">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="text-xl sm:text-2xl text-text-soft mb-1"
                  />
                  <p className="text-xs text-text mb-1">Nivel de Riesgo</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow mb-1 sm:mb-2">
                    Medio
                  </p>
                  <p className="text-xs text-text-soft mb-1">
                    Próxima sugerencia predictiva
                  </p>
                  <p className="text-xs font-semibold text-green">
                    Renovar 12 licencias en 7 días
                  </p>
                </div>
              </div>

              <div className="bg-bg-soft p-2 sm:p-3 rounded-lg">
                <p className="text-xs text-text-default">
                  Exámenes Vencidos (30 días):{" "}
                  <span className="font-semibold">
                    <AnimatedCounter value={30} />
                  </span>
                </p>
                <div className="bg-bg-mute h-1.5 sm:h-2 rounded-full w-full mt-1 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-red to-red-light h-full rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>

              <div className="bg-bg-soft p-2 sm:p-3 rounded-lg">
                <p className="text-xs text-text-default">
                  Licencias Operativas Vencidas:{" "}
                  <span className="font-semibold">
                    <AnimatedCounter value={7} />
                  </span>
                </p>
                <div className="bg-bg-mute h-1.5 sm:h-2 rounded-full w-full mt-1 overflow-hidden">
                  <div
                    className="bg-linear-to-r from-orange to-yellow h-full rounded-full"
                    style={{ width: "35%" }}
                  />
                </div>
              </div>
            </div>

            {/* Índice de Performance */}
            <div className="border border-border p-2 sm:p-3 lg:p-4 rounded-xl bg-white transition-shadow duration-300 flex flex-col gap-2">
              <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-text-default">
                Índice de Performance de Seguridad (ISP)
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                {/* Progress Circle */}
                <div className="flex flex-col items-center justify-center bg-bg-soft p-3 sm:p-4 md:p-6 rounded-lg">
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
                        className="text-bg-mute"
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
                        className="text-border-default opacity-40"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50%"
                        cy="50%"
                        r="40%"
                        stroke="currentColor"
                        strokeWidth="14"
                        fill="transparent"
                        strokeDasharray={`${
                          (ispPercentage / 100) * 439.6
                        } 439.6`}
                        className="text-blue"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xl sm:text-2xl lg:text-4xl font-bold text-blue">
                        {ispPercentage}%
                      </p>
                      <p className="text-xs text-text-soft mt-1">
                        Meta: {ispGoal}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="border border-border p-2 sm:p-3 rounded-lg bg-bg-soft transition-shadow">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0"
                          style={{ backgroundColor: "rgba(220, 38, 38, 0.8)" }}
                        ></span>
                        <p className="text-xs sm:text-sm text-text-default">
                          A1. Alertas de Máximo Riesgo
                        </p>
                      </div>
                      <span className="text-base sm:text-lg lg:text-2xl font-bold text-text-default shrink-0">
                        <AnimatedCounter value={7} />
                      </span>
                    </div>
                  </div>
                  <div className="border border-border p-2 sm:p-3 rounded-lg bg-bg-soft transition-shadow">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0"
                          style={{ backgroundColor: "rgba(249, 115, 22, 0.8)" }}
                        ></span>
                        <p className="text-xs sm:text-sm text-text-default">
                          A2. Inhabilitación Documental
                        </p>
                      </div>
                      <span className="text-base sm:text-lg lg:text-2xl font-bold text-text-default shrink-0">
                        <AnimatedCounter value={37} />
                      </span>
                    </div>
                  </div>
                  <div className="border border-border p-2 sm:p-3 rounded-lg bg-bg-soft transition-shadow">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span
                          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0"
                          style={{ backgroundColor: "rgba(147, 51, 234, 0.8)" }}
                        ></span>
                        <p className="text-xs sm:text-sm text-text-default">
                          A3. Vehículos No Acreditados
                        </p>
                      </div>
                      <span className="text-base sm:text-lg lg:text-2xl font-bold text-text-default shrink-0">
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
