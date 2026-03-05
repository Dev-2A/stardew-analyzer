import { useMemo } from "react";

/**
 * 레이더 차트 SVG 좌표 계산 훅
 * @param {number} size - SVG 전체 크기
 * @param {number} levels - 동심원 개수 (최대 하트 수)
 */
export function useRadarChart(data, size = 400, levels = 5) {
  return useMemo(() => {
    const cx = size / 2;
    const cy = size / 2;
    const radius = size * 0.36;
    const total = data.length;

    // 각 축의 각도 계산 (12시 방향 기준)
    const angleSlice = (Math.PI * 2) / total;
    const getAngle = (i) => i * angleSlice - Math.PI / 2;

    // 축 끝점 좌표
    const axes = data.map((d, i) => {
      const angle = getAngle(i);
      return {
        ...d,
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        labelX: cx + (radius + 24) * Math.cos(angle),
        labelY: cy + (radius + 24) * Math.sin(angle),
      };
    });

    // 동심원 폴리곤 좌표
    const gridPolygons = Array.from({ length: levels }, (_, lv) => {
      const r = (radius / levels) * (lv + 1);
      return Array.from({ length: total }, (_, i) => {
        const angle = getAngle(i);
        return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
      }).join(" ");
    });

    // 데이터 폴리곤 좌표
    const dataPolygon = data
      .map((d, i) => {
        const ratio = d.hearts / d.max_hearts;
        const angle = getAngle(i);
        return `${cx + radius * ratio * Math.cos(angle)},${
          cy + radius * ratio * Math.sin(angle)
        }`;
      })
      .join(" ");

    // 데이터 포인트 좌표
    const dataPoints = data.map((d, i) => {
      const ratio = d.hearts / d.max_hearts;
      const angle = getAngle(i);
      return {
        ...d,
        cx: cx + radius * ratio * Math.cos(angle),
        cy: cy + radius * ratio * Math.sin(angle),
      };
    });

    return { axes, gridPolygons, dataPolygon, dataPoints, cx, cy };
  }, [data, size, levels]);
}
