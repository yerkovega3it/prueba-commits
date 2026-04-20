import useCurrentTime from "@/hooks/useCurrentTime";
import FitText from "@/components/shared/FitText";

interface DashboardHeaderProps {
  miningCompanyName: string;
  isLoading: boolean;
}

function DashboardHeader({
  miningCompanyName,
  isLoading,
}: DashboardHeaderProps) {
  const { currentDateTime } = useCurrentTime();

  return (
    <div className="px-3 sm:px-4 md:px-5 xl:px-6 py-2 xl:py-[8px] rounded-3xl bg-card">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-2 text-center md:text-left">
        <div>
          <h1 className="font-normal text-approved leading-tight font-aldrich">
            <FitText
              className="inline-block"
              maxFontSizePx={24}
              minFontSizePx={12}
            >
              Centro de Mando SIGA -{" "}
              {isLoading ? (
                <span className="inline-block align-middle">
                  <span className="animate-pulse bg-gray-300 dark:bg-gray-700 rounded w-32 h-6 inline-block" />
                </span>
              ) : (
                miningCompanyName
              )}
            </FitText>
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mt-0.5 font-normal font-aldrich">
            Estado de faena - Actualización cada 1 hora
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal font-aldrich whitespace-nowrap">
            {currentDateTime.toLocaleTimeString("es-CL", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-white mt-0.5 font-aldrich">
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
