export function BrandFallback({ name, initials }: { name: string; initials?: string }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-gray-200 grid place-items-center font-bold text-gray-700">
      {initials ?? name[0]}
    </div>
  );
}