import useCurrentTime from "@/hooks/useCurrentTime";
import { useDashboardInfo } from "@/hooks/useDashboardData";

function DashboardHeader() {
  const { currentDateTime } = useCurrentTime();
  const { lastUpdateSecondsAgo, miningCompanyName } = useDashboardInfo();

  const transformSecondsToHours = () => {
    const hours = Math.floor(lastUpdateSecondsAgo / 3600);
    const minutes = Math.floor((lastUpdateSecondsAgo % 3600) / 60);

    if (hours > 0 && minutes > 0) {
      return `${hours} ${hours === 1 ? "hora" : "horas"} y ${minutes} ${
        minutes === 1 ? "minuto" : "minutos"
      }`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hora" : "horas"}`;
    } else {
      return `${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
    }
  };

  return (
    <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-card shadow-[0_0_5px_rgba(0,0,0,0.3)] shadow-approved">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-approved leading-tight">
            Centro de Mando SIGA - {miningCompanyName}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mt-1 font-medium">
            Estado de faena - Actualización últimas {transformSecondsToHours()}
          </p>
        </div>
        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-2xl sm:text-3xl font-bold">
            {currentDateTime.toLocaleTimeString("es-CL", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-white mt-1">
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
  );
}

export default DashboardHeader;
