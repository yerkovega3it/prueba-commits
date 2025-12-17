import useCurrentTime from "@/hooks/useCurrentTime";
import { useDashboardInfo } from "@/hooks/useDashboardData";
import FitText from "@/components/shared/FitText";

function DashboardHeader() {
  const { currentDateTime } = useCurrentTime();
  const { miningCompanyName } = useDashboardInfo();

  return (
    <div className="px-6 py-[8px] rounded-3xl bg-card">
      <div className="flex justify-between items-center gap-2">
        <div>
          <h1 className="font-normal text-approved leading-tight font-aldrich">
            <FitText
              className="inline-block"
              maxFontSizePx={18}
              minFontSizePx={12}
            >
              Centro de Mando SIGA - {miningCompanyName}
            </FitText>
          </h1>
          <p className="text-lg md:text-xl mt-1 font-normal font-aldrich">
            Estado de faena - Actualización cada 1 hora
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl md:text-4xl lg:text-5xl font-normal font-aldrich">
            {currentDateTime.toLocaleTimeString("es-CL", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
          <p className="text-lg md:text-xl text-white mt-1 font-aldrich">
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
