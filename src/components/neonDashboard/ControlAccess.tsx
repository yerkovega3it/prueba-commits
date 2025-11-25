import AnimatedCounter from "../animatedCounter/AnimatedCounter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDay,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";

function ControlAccess() {
  return (
    <div
      className="lg:col-span-2 border-2 border-neon-magenta p-3 sm:p-4 lg:p-6 rounded-xl bg-black transition-shadow duration-300 flex flex-col gap-3"
      style={{
        boxShadow: "0 0 15px #ff00ff, inset 0 0 15px rgba(255,0,255,0.1)",
      }}
    >
      <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-neon-magenta">
        Control de Acceso
      </h2>
      <div
        className="border-2 border-neon-magenta p-3 md:p-4 rounded-lg bg-gray-900 transition-shadow text-center"
        style={{
          boxShadow: "0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.1)",
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
          boxShadow: "0 0 10px #ff00ff, inset 0 0 10px rgba(255,0,255,0.1)",
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
  );
}

export default ControlAccess;
