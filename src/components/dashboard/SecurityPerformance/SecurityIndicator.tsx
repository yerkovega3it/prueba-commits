function SecurityIndicator({
  indicatorColor,
  label,
  value,
}: { indicatorColor: string } & { label: string } & { value: number }) {
  return (
    <div className="p-2 sm:p-3 rounded-lg bg-main h-20 flex">
      <div className="flex items-center justify-between gap-3 w-full">
        <div className="flex items-center gap-4">
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{
              backgroundColor: indicatorColor,
              boxShadow: `0 0 10px ${indicatorColor}`,
            }}
          ></span>
          <p className="text-xs lg:text-sm text-gray-200">{label}</p>
        </div>
        <span className="text-base md:text-lg lg:text-2xl font-bold shrink-0">
          {value}
        </span>
      </div>
    </div>
  );
}

export default SecurityIndicator;
