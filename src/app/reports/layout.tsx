export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="p-5 flex-1">{children}</div>
    </div>
  );
}
