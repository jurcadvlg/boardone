import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import { useFormContext } from 'react-hook-form';
import { useAtomValue } from 'jotai';
import { directionsAtom } from '@/app/store';

export default function TripRecap() {
  const { getValues } = useFormContext();
  const directions = useAtomValue(directionsAtom);
  const { origin, destination } = getValues();

  return (
    <>
      <h2 className="text-[#012512]">Kalkulace cesty</h2>

      <div className="rounded-t-2xl border-0 border-l-[24px] border-solid border-[#9b59b6] bg-white p-2 pl-0 transition-all ease-in hover:border-l-[28px] hover:bg-[#9b59b6]">
        <div className="flex flex-row items-center gap-2 text-left">
          <div className="ml-[-16px] flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <LocationOnIcon sx={{ fontSize: '16px', color: '#9b59b6' }} />
          </div>

          <div>
            <div>
              <span className="font-bold">{origin}</span>
            </div>
            <div className="">Odjezd:</div>
          </div>
        </div>
      </div>

      <Waypoint number={1} />
      <Waypoint number={2} />
      <Waypoint number={3} />
      <Waypoint number={4} />
      <Waypoint number={5} />

      <div className="rounded-b-md border-0 border-l-[24px] border-solid border-[#3498db] bg-white p-2 pl-0 transition-all hover:border-l-[28px] hover:bg-[#3498db]">
        <div className="flex flex-row items-center gap-2 text-left">
          <div className="ml-[-16px] flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <FlagIcon sx={{ fontSize: '16px', color: '#3498db' }} />
          </div>

          <div>
            <div>
              <span className="font-bold">{destination}</span>
            </div>
            <div className="">Příjezd:</div>
          </div>
        </div>
      </div>

      <div className="mt-1 flex flex-row justify-center gap-2 rounded-b-2xl rounded-t-md bg-white p-4">
        <div className="flex-1 text-center">{directions?.routes[0].legs[0].duration.text}</div>
        <div>|</div>
        <div className="flex-1">{directions?.routes[0].legs[0].distance.text}</div>
      </div>
    </>
  );
}

function Waypoint({ number }: { number: number }) {
  const { getValues } = useFormContext();
  const waypoint = getValues('waypoint' + number);

  if (!waypoint) {
    return null;
  }

  return (
    <div className="border-0 border-l-[24px] border-solid border-[#fdcb6e] bg-white p-2 pl-0 transition-all ease-in hover:border-l-[28px] hover:bg-[#fdcb6e]">
      <div className="flex flex-row items-center gap-2 text-left">
        <div className="ml-[-16px] flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <span className="font-bold text-[#fdcb6e]">{number}</span>
        </div>

        <div>
          <div>
            <span className="font-bold">{waypoint}</span>
          </div>
          <div className="">Příjezd:</div>
          <div className="">Odjezd:</div>
        </div>
      </div>
    </div>
  );
}
