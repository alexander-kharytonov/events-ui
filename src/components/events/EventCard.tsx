import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCalendarDays,
  HiClock,
  HiIdentification,
  HiMapPin,
  HiUserCircle,
} from "react-icons/hi2";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "long",
  timeStyle: "short",
});

const compactDateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});

function formatDate(value, formatter = dateFormatter) {
  if (!value) return "Not specified";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : formatter.format(date);
}

function getMapUrl(latitude, longitude) {
  const lat = Number(latitude);
  const lon = Number(longitude);
  const offset = 0.025;
  const bbox = [lon - offset, lat - offset, lon + offset, lat + offset].join(
    ",",
  );

  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(`${lat},${lon}`)}`;
}

export default function EventCard({ event, preview }) {
  const hasCoordinates =
    event.latitude !== null &&
    event.latitude !== undefined &&
    event.longitude !== null &&
    event.longitude !== undefined;

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-80 overflow-hidden border-b border-slate-100 bg-linear-to-br from-brand-50 to-white">
        {hasCoordinates && (
          <div className="pointer-events-none absolute inset-0 -m-12.5">
            <iframe
              className="h-full w-full border-0"
              src={getMapUrl(event.latitude, event.longitude)}
              title={`Map showing ${event.location}`}
              loading="lazy"
              tabIndex="-1"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/55 via-slate-950/20 to-slate-950/80" />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-600/10">
              <HiIdentification className="text-base" aria-hidden="true" />
              Event #{event.id}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-sm">
              <HiCalendarDays
                className="text-lg text-brand-600"
                aria-hidden="true"
              />
              <time dateTime={event.date}>{formatDate(event.date)}</time>
            </span>
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
              {event.title}
            </h2>
            <p className="mt-3 line-clamp-3 leading-7 text-slate-100 drop-shadow-sm">
              {event.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div className="flex gap-3 sm:col-span-2">
            <HiMapPin
              className="mt-0.5 shrink-0 text-xl text-brand-600"
              aria-hidden="true"
            />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Location
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                {event.location}
              </dd>
              <dd className="mt-1 text-sm text-slate-500">
                {hasCoordinates
                  ? `${event.latitude}, ${event.longitude}`
                  : "Coordinates not specified"}
              </dd>
            </div>
          </div>

          <div className="flex gap-3">
            <HiUserCircle
              className="mt-0.5 shrink-0 text-xl text-brand-600"
              aria-hidden="true"
            />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Organizer
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-800">
                User #{event.organizerId}
              </dd>
            </div>
          </div>

          <div className="flex gap-3">
            <HiClock
              className="mt-0.5 shrink-0 text-xl text-brand-600"
              aria-hidden="true"
            />
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Record history
              </dt>
              <dd className="mt-1 text-sm text-slate-600">
                Created {formatDate(event.createdAt, compactDateFormatter)}
              </dd>
              <dd className="mt-1 text-sm text-slate-600">
                Updated {formatDate(event.updatedAt, compactDateFormatter)}
              </dd>
            </div>
          </div>
        </dl>
        {!preview && (
          <Link
            to={`/events/${event.id}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-600"
          >
            View event
            <HiArrowRight className="text-base" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
