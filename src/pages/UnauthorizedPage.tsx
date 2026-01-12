import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { authUtils } from "@/utils/auth.util";

export const UnauthorizedPage = () => {
  authUtils.logout();
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-soft">
      <div className="bg-card shadow-lg rounded-3xl p-10 w-full max-w-3xl text-center border border-border animate-neon-glow">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-critic text-6xl md:text-7xl lg:text-8xl animate-neon-pulse drop-shadow-lg"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 font-avenir">
          No tiene permisos para ver esta pagina
        </h1>
      </div>
    </div>
  );
};
