export default function ReportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <label htmlFor="simpleDatePicker">Select a Date:</label>
        <input type="date" id="simpleDatePicker" name="simpleDatePicker" />
      </div>
      <div className="p-5 flex-1">{children}</div>
    </div>
  );
}
