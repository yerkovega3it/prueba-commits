import useCurrentTime from "@/hooks/useCurrentTime";

function DashboardHeader() {
  const { currentDateTime } = useCurrentTime();

  return (
    <div className="p-3 sm:p-4 lg:p-5 rounded-xl bg-card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h1 className="text-2xl font-bold">
            Centro de Mando Operativo Minero
          </h1>
          <p className="text-base mt-1 font-medium">Estado de Faena (Flujo)</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-lg sm:text-xl md:text-2xl font-bold">
            {currentDateTime.toLocaleTimeString("es-CL", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p className="text-xs sm:text-sm text-white mt-1">
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
