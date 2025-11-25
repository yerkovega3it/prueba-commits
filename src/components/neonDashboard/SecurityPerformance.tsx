import AnimatedCounter from "../animatedCounter/AnimatedCounter";
import useDashboardData from "@/hooks/useDashboardData";

function SecurityPerformance() {
  const { ispPercentage, ispGoal } = useDashboardData();

  return (
    <div
      className="border-2 border-neon-cyan p-2 sm:p-3 lg:p-4 rounded-xl bg-black transition-shadow duration-300 flex flex-col gap-2"
      style={{
        boxShadow: "0 0 15px #00ffff, inset 0 0 15px rgba(0,255,255,0.1)",
      }}
    >
      <h2 className="text-sm sm:text-base lg:text-xl font-semibold text-neon-cyan">
        Índice de Performance de Seguridad (ISP)
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 items-center">
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
                strokeDasharray={`${(ispPercentage / 100) * 439.6} 439.6`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-xl sm:text-2xl lg:text-4xl font-bold text-neon-cyan">
                {ispPercentage}%
              </p>
              <p className="text-xs text-gray-400 mt-1">Meta: {ispGoal}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-2 pr-4">
          <div
            className="border-2 border-neon-pink p-2 sm:p-3 rounded-lg bg-gray-900 transition-shadow"
            style={{
              boxShadow: "0 0 10px #ff0055, inset 0 0 10px rgba(255,0,85,0.1)",
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
              boxShadow: "0 0 10px #ff9900, inset 0 0 10px rgba(255,153,0,0.1)",
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
              boxShadow: "0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.1)",
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
  );
}

export default SecurityPerformance;
