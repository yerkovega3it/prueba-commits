import type { Context } from "chartjs-plugin-datalabels";
import type { MonthlyApprovedPasses } from "@/interfaces/dashboard/monthlyApprovedPasses.interface";
import { MONTHS } from "./constants";

export function getChartValues(monthlyData: MonthlyApprovedPasses): number[] {
  return MONTHS.map((_, index) => {
    const monthKey = `month${String(index + 1).padStart(2, "0")}`;
    return (
      (monthlyData[monthKey as keyof MonthlyApprovedPasses] as number) ?? 0
    );
  });
}

export function getChartData(
  monthlyData: MonthlyApprovedPasses,
  currentMonthIndex: number,
) {
  const values = getChartValues(monthlyData);
  return {
    labels: MONTHS,
    datasets: [
      {
        label: "",
        data: values,
        borderRadius: 8,
        borderSkipped: false,
        borderWidth: 2,
        borderColor: (ctx: { dataIndex: number }) =>
          ctx.dataIndex === currentMonthIndex ? "#ff005e" : "#53F7F6",
        backgroundColor: (ctx: Context) => {
          const index = ctx.dataIndex;
          const { ctx: canvasCtx, chartArea } = ctx.chart;
          if (!chartArea) return undefined;
          const gradient = canvasCtx.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0,
          );
          if (index === currentMonthIndex) {
            gradient.addColorStop(0, "rgba(145, 49, 78, 1)");
            gradient.addColorStop(1, "rgba(255, 0, 94, 1)");
          } else {
            gradient.addColorStop(0, "rgba(49, 145, 144, 1)");
            gradient.addColorStop(1, "rgba(83, 247, 246, 1)");
          }
          return gradient;
        },
        barPercentage: 0.5,
        categoryPercentage: 0.85,
        maxBarThickness: 20,
      },
    ],
  };
}

export function getChartOptions(
  labelFontSize: number,
  tickFontSize: number,
  maxTicksLimit: number | undefined,
  scaledMaxValue: number,
  currentMonthIndex: number,
  maxValue: number,
) {
  return {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        display: maxValue !== 0,
        anchor: "end" as const,
        align: "end" as const,
        color: "#ffffff",
        font: {
          size: labelFontSize,
          weight: "bold" as const,
          family: "Anta",
        },
        offset: (context: Context) => {
          const value = context.dataset.data[context.dataIndex];
          return value === 0 ? -5 : 4;
        },
        borderRadius: 4,
        padding: { top: 4, bottom: 4, left: 6, right: 6 },
        formatter: (value: number) => value,
      },
    },
    scales: {
      x: {
        ticks: { display: false },
        grid: { display: false },
        max: scaledMaxValue,
      },
      y: {
        ticks: {
          color: "#ffffff",
          font: (context: { index: number }) => ({
            size: tickFontSize,
            weight: (context.index === currentMonthIndex
              ? "bold"
              : "normal") as "bold" | "normal",
            family: "Anta",
          }),
          autoSkip: false,
          maxTicksLimit,
        },
        grid: { display: false },
      },
    },
  };
}
