// components/BitmapRenderer.tsx
import React from 'react';
import { cmap } from '@/settings/cmap'
 // 각 셀의 크기

// 색상 매핑 함수 (값에 따라 다른 색상을 매핑)
const getColor = (value: number ): string => {
  const colors = cmap
  return colors[value % colors.length]; // 값에 따라 색상 선택
};

export type Bitmap =  number[][];

type BitmapRendererProps = {
  data: Bitmap | undefined; // Accept undefined in props
  cellsize: number | undefined;
};


export const BitmapRenderer: React.FC<BitmapRendererProps> = ({ data, cellsize }: BitmapRendererProps) => {
  let CELL_SIZE = 20;
  if (data === undefined || data.length ===0 ) return;
  if( !!cellsize) CELL_SIZE = cellsize 
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${data.length}, ${CELL_SIZE}px)`,
        gap: '1px', // 셀 간격
      }}
    >
      {data.flat().map((value: number, index: number) => (
        <div
          key={index}
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: getColor(value),
            border: '1px solid #ccc', // 셀 테두리
          }}
        >{}</div>
      ))}
    </div>
  );
};

export default BitmapRenderer;
