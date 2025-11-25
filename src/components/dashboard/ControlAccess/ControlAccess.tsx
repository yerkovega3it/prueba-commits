import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import CardTitle from "../shared/CardHeader";

function ControlAccess() {
  return (
    <div className="col-span-1 lg:col-span-2 p-6 rounded-xl bg-card flex flex-col gap-4">
      <CardTitle title="Control de Acceso (Visitas y logística)" />
      <div className="p-3 md:p-4 rounded-lg bg-main flex justify-center gap-6">
        <div className="h-9 w-9 flex items-center justify-center bg-info rounded-sm mt-1">
          <FontAwesomeIcon icon={faCircleUser} height={16} width={16} />
        </div>
        <div>
          <span className="text-md text-white">Pasos aprobados (Hoy)</span>
          <p className="text-4xl font-bold text-center mt-2">45</p>
        </div>
      </div>
      <div className="p-3 md:p-4 rounded-lg bg-main flex justify-center gap-6">
        <div className="h-9 w-9 flex items-center justify-center bg-info rounded-sm mt-1">
          <FontAwesomeIcon icon={faClipboardCheck} height={16} width={16} />
        </div>
        <div>
          <span className="text-md text-white">Larga Estadía (&gt; 1 día)</span>
          <p className="text-4xl font-bold text-center mt-2">9</p>
        </div>
      </div>
    </div>
  );
}

export default ControlAccess;
