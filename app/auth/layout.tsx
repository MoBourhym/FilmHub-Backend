export default function authPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {children}
    </div>
  );
}
