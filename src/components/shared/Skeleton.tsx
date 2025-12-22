import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  className = "",
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-700 ${className}`.trim()}
      style={{
        width,
        height,
        borderRadius,
        display: "inline-block",
        verticalAlign: "middle",
      }}
      data-testid="skeleton-loading"
    />
  );
};

export default Skeleton;
