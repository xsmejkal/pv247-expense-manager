export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="p-5 flex-1 overflow-x-hidden overflow-y-hidden">{children}</div>
    </div>
  );
}
