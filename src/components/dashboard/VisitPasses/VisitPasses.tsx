import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useVisitorPass } from "@/hooks/useDashboardData";

export default function VisitPasses() {
  const {
    approvedPassesToday,
    peopleWithPlusOneApprovedNext5Days,
    approvedPassesNext7Days,
  } = useVisitorPass();

  return (
    <div className="w-full max-w-xl text-white space-y-5 sm:space-y-6 lg:space-y-8">
      <h2 className="text-approved font-bold text-base sm:text-lg mb-3 sm:mb-4">
        PASES DE VISITA
      </h2>
      <div className="mt-[32px] space-y-12">
        <div className="flex items-start">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-approved/15 shadow-[0_0_10px_var(--tw-approved)] shrink-0">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-approved text-base sm:text-lg"
            />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-4">
            <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
              {approvedPassesToday}
            </span>
            <span className="text-xs sm:text-sm opacity-90">
              Pases Aprobados hoy (duración 1 día)
            </span>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-approved/15 shadow-[0_0_10px_var(--tw-approved)] shrink-0">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-approved text-base sm:text-lg"
            />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-4">
            <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
              {peopleWithPlusOneApprovedNext5Days}
            </span>
            <span className="text-xs sm:text-sm opacity-90">
              Personas con +1 pase aprobados en los próximos 5 días
            </span>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-approved/15 shadow-[0_0_10px_var(--tw-approved)] shrink-0">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-approved text-base sm:text-lg"
            />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-4">
            <span className="text-3xl sm:text-4xl font-bold w-12 sm:w-16 text-center shrink-0">
              {approvedPassesNext7Days}
            </span>
            <span className="text-xs sm:text-sm opacity-90">
              Pases Aprobados en los próximos 7 días
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
