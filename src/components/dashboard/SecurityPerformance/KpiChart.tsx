function KpiChart({
  ispGoal,
  ispPercentage,
}: {
  ispGoal: number;
  ispPercentage: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 bg-main rounded-xl">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          viewBox="0 0 178 178"
          fill="none"
        >
          <path
            d="M89 15C79.3478 15 69.7902 16.9011 60.8728 20.5949C51.9553 24.2886 43.8528 29.7025 37.0277 36.5277C30.2025 43.3528 24.7886 51.4553 21.0949 60.3728C17.4011 69.2902 15.5 78.8478 15.5 88.5C15.5 98.1522 17.4011 107.71 21.0949 116.627C24.7886 125.545 30.2025 133.647 37.0277 140.472C43.8528 147.297 51.9553 152.711 60.8728 156.405C69.7902 160.099 79.3478 162 89 162"
            stroke="white"
            stroke-opacity="0.39"
            stroke-width="30"
          />
          <path
            d="M89 162C98.6522 162 108.21 160.099 117.127 156.405C126.045 152.711 134.147 147.297 140.972 140.472C147.797 133.647 153.211 125.545 156.905 116.627C160.599 107.71 162.5 98.1522 162.5 88.5"
            stroke="#64CCC9"
            stroke-width="30"
          />
          <path
            d="M162.5 88.5C162.5 76.9009 159.755 65.4665 154.489 55.1317C149.223 44.7969 141.586 35.855 132.202 29.0372"
            stroke="#64CCC9"
            stroke-width="30"
          />
          <path
            d="M15.5 88.5C15.5 100.099 18.2452 111.533 23.511 121.868C28.7769 132.203 36.4139 141.145 45.7978 147.963"
            stroke="#64CCC9"
            stroke-width="30"
          />
          <path
            d="M102.773 16.3019C113.4 18.3292 123.449 22.6778 132.202 29.0373"
            stroke="#64CCC9"
            stroke-width="30"
          />
          <path
            d="M93.8596 161.985C83.1161 162.774 72.3309 161.181 62.274 157.321"
            stroke="#64CCC9"
            stroke-width="30"
          />
          <path
            d="M75.2275 160.698C64.5998 158.671 54.5508 154.322 45.7978 147.963"
            stroke="#64CCC9"
            stroke-width="30"
          />
          <path
            d="M89 15C93.6216 15 98.2328 15.4359 102.773 16.3019"
            stroke="#64CCC9"
            stroke-width="30"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold">
            {ispPercentage}%
          </p>
          <p className="text-[10px] sm:text-xs text-white mt-0.5 sm:mt-1">
            Meta: {ispGoal}%
          </p>
        </div>
      </div>
      <p className="text-xs sm:text-sm text-center mt-2">
        KPI clave de adherencia y control de incidentes potenciales
      </p>
    </div>
  );
}

export default KpiChart;
