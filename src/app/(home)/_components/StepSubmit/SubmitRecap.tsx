import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import { useAtomValue } from 'jotai';
import { calculationAtom } from '@/app/store';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import MapIcon from '@mui/icons-material/Map';
import { formatTime } from '@/utils/formatTime';

type RouteDestination = {
  address: string;
  arrivalDate?: Date | null;
  departureDate?: Date | null;
};

export default function SubmitRecap() {
  const calculation = useAtomValue(calculationAtom);

  if (!calculation) return null;

  const origin = calculation.routes[0].from!;
  const destination = calculation.routes[calculation.routes.length - 1].to!;

  let waypoints: RouteDestination[] = [];

  if (calculation.routes && calculation.routes.length > 1) {
    waypoints = calculation.routes.slice(0, -1).map((route) => route.to);
  }

  return (
    <>
      <h2 className="text-[#012512DD]">Kalkulace cesty</h2>

      <div className="rounded-t-2xl border-0 border-l-[24px] border-solid border-[#9b59b6] bg-white p-2 pl-0 transition-all ease-in hover:border-l-[28px] hover:bg-[#9b59b6]">
        <div className="flex flex-row items-center gap-2 text-left">
          <div className="ml-[-16px] flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <LocationOnIcon sx={{ fontSize: '16px', color: '#9b59b6' }} />
          </div>

          <div>
            <div>
              <span className="font-bold">{origin?.address}</span>
            </div>
            {origin.departureDate && (
              <div className="mt-1">
                <span className="text-gray-600">Odjezd: </span>
                {new Date(origin.departureDate).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      {waypoints.map((destination, i) => (
        <Waypoint key={i} destination={destination} number={i + 1} />
      ))}

      <div className="rounded-b-md border-0 border-l-[24px] border-solid border-[#3498db] bg-white p-2 pl-0 transition-all hover:border-l-[28px] hover:bg-[#3498db]">
        <div className="flex flex-row items-center gap-2 text-left">
          <div className="ml-[-16px] flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <FlagIcon sx={{ fontSize: '16px', color: '#3498db' }} />
          </div>

          <div>
            <div>
              <span className="font-bold">{destination.address}</span>
            </div>
            {destination.arrivalDate && (
              <div className="mt-1">
                <span className="text-gray-600">Příjezd: </span>
                {new Date(destination.arrivalDate).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-1 flex flex-row justify-center gap-2 rounded-b-2xl rounded-t-md bg-white p-4">
        <div className="flex flex-1 flex-row items-center justify-center">
          <AccessTimeFilledIcon sx={{ fontSize: '18px', color: 'gray', mr: 1 }} />
          {formatTime(calculation.duration ?? 0)}
        </div>
        <div>|</div>
        <div className="flex flex-1 flex-row items-center justify-center">
          <MapIcon sx={{ fontSize: '18px', color: 'gray', mr: 1 }} />
          {calculation.distance ? Math.round(calculation.distance) : 0} km
        </div>
        <div>|</div>
        <div className="flex flex-1 flex-row items-center justify-center">
          <PeopleAltIcon sx={{ fontSize: '18px', color: 'gray', mr: 1 }} />
          {calculation.passengers ?? 0}
        </div>
      </div>
    </>
  );
}

function Waypoint({ destination, number }: { destination: RouteDestination; number: number }) {
  return (
    <div className="border-0 border-l-[24px] border-solid border-[#fdcb6e] bg-white p-2 pl-0 transition-all ease-in hover:border-l-[28px] hover:bg-[#fdcb6e]">
      <div className="flex flex-row items-center gap-2 text-left">
        <div className="ml-[-16px] flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <span className="font-bold text-[#fdcb6e]">{number}</span>
        </div>

        <div>
          <div>
            <span className="font-bold">{destination.address}</span>
          </div>
          {destination.arrivalDate && (
            <div className="mt-1">
              <span className="text-gray-600">Příjezd: </span>
              {new Date(destination.arrivalDate).toLocaleString()}
            </div>
          )}
          {destination.departureDate && (
            <div className="mt-1">
              <span className="text-gray-600">Odjezd: </span>
              {new Date(destination.departureDate).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
