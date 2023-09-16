import { useState, useEffect } from "react";
import styles from "./tooltip.module.css";
import { useMemo } from "react";
import * as d3 from "d3";

const MARGIN = { top: 20, right: 20, bottom: 80, left: 80 };

const Renderer = ({
  setHoveredCell,
  data,
  onOpen
}) => {
  const [availableWidth, setAvailableWidth] = useState(window.innerWidth - 260);
  useEffect(() => {
    const handleResize = () => {
      setAvailableWidth(window.innerWidth - 260); // Recalculate available width
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const width = availableWidth;
  const height = 800 - MARGIN.top - MARGIN.bottom;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
  const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

  const [min = 0, max = 0] = d3.extent(data.map((d) => d.value));

  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([0, boundsWidth])
      .domain(allXGroups)
      .padding(0.01);
  }, [data, width]);

  const yScale = useMemo(() => {
    return d3
      .scaleBand()
      .range([boundsHeight, 0])
      .domain(allYGroups)
      .padding(0.01);
  }, [data, height]);

  var colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateGreens)
    .domain([0, max]);

  const squareSize = Math.min(xScale.bandwidth(), yScale.bandwidth());

  const allShapes = data.map((d, i) => {
    const x = xScale(d.x);
    const y = yScale(d.y);

    if (d.value === null || !x || !y) {
      return;
    }

    return (
      <rect
        key={i}
        r={4}
        x={x + (xScale.bandwidth() - squareSize) / 2}
        y={y + (yScale.bandwidth() - squareSize) / 2}
        width={squareSize}
        height={squareSize}
        opacity={1}
        fill={colorScale(d.value)}
        rx={5}
        stroke={"white"}
        onMouseEnter={(e) => {
          setHoveredCell({
            xLabel: "group " + d.x,
            yLabel: "group " + d.y,
            xPos: x + xScale.bandwidth() + MARGIN.left,
            yPos: y + xScale.bandwidth() / 2 + MARGIN.top,
            value: Math.round(d.value * 100) / 100
          });
        }}
        onMouseLeave={() => setHoveredCell(null)}
        onClick={onOpen} // Added click event handler
        cursor="pointer"
      />
    );
  });

  const xLabels = allXGroups.map((name, i) => {
    const x = xScale(name);

    if (!x) {
      return null;
    }

    return (
      <text
      key={i}
      x={x + xScale.bandwidth() / 2}
      y={boundsHeight + 10}
      
      
      fontSize={10}
      transform={`rotate(90 ${x + xScale.bandwidth() / 2} ${boundsHeight + 10})`}
    >
      {name}
    </text>
    );
  });

  const yLabels = allYGroups.map((name, i) => {
    const y = yScale(name);

    if (!y) {
      return null;
    }

    return (
      <text
        key={i}
        x={-5}
        y={y + yScale.bandwidth() / 2}
        textAnchor="end"
        dominantBaseline="middle"
        fontSize={10}
      >
        {name}
      </text>
    );
  });

  return (
    <svg width={width} height={height}>
      <g
        width={boundsWidth}
        height={boundsHeight}
        transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
      >
        {allShapes}
        {xLabels}
        {yLabels}
      </g>
    </svg>
  );
};

const Tooltip = ({ interactionData, width, height }) => {
  if (!interactionData) {
    return null;
  }

  return (
    <div
      style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none"
      }}
    >
      <div
        className={styles.tooltip}
        style={{
          position: "absolute",
          left: interactionData.xPos,
          top: interactionData.yPos
        }}
      >
        <TooltipRow label={"x"} value={interactionData.xLabel} />
        <TooltipRow label={"y"} value={interactionData.yLabel} />
        <TooltipRow label={"value"} value={String(interactionData.value)} />
      </div>
    </div>
  );
};

const TooltipRow = ({ label, value }) => (
  <div>
    <b>{label}</b>
    <span>: </span>
    <span>{value}</span>
  </div>
);

const Heatmap = ({ width, height, data, onOpen }) => {
  const [hoveredCell, setHoveredCell] = useState(null);

  return (
    <div style={{ position: "relative" }}>
      <Renderer
        width={width}
        height={height}
        data={data}
        setHoveredCell={setHoveredCell}
        onOpen={onOpen}
      />
      <Tooltip interactionData={hoveredCell} width={width} height={height} onOpen={onOpen} />
    </div>
  );
};

export default Heatmap;
