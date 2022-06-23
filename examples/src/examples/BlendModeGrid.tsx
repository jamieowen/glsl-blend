import React, { FC, ReactNode, useMemo } from "react";
import { styled } from "@stitches/react";
import { FN_NAMES } from "glsl-blend/ast";
import { useIntersection } from "../hooks/use-intersection";
import {
  RenderBlobProvider,
  useRenderBlob,
  useRenderCanvas,
} from "../hooks/use-render-blob";
import { RenderBlobOpts } from "../blend-ast/render-blob";
import {
  map,
  normRange2d,
  push,
  range2d,
  transduce,
} from "@thi.ng/transducers";

// temp until UI.
const STEPS = 5;

const Grid = {
  Root: styled("div", {
    display: "grid",
    width: "100%",
    gridTemplateColumns: `repeat(${STEPS},1fr)`,
    gap: "10px",
    boxSizing: "border-box",
    padding: "64px",
  }),

  Cell: styled("div", {
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundColor: "#efefef",
    aspectRatio: 1,
    borderRadius: "16%",
  }),

  CellSpan: styled("div", {
    // columnSpan: STEPS,
    gridColumn: "span 3",
  }),
};

export const RenderBlobBackground: React.FC<
  RenderBlobOpts & { children?: ReactNode }
> = (props) => {
  const { children, ...opts } = props;
  const [ref, intersecting] = useIntersection<HTMLDivElement>();
  // useRenderBlob(ref, intersecting, opts);
  useRenderCanvas(ref, intersecting, opts);
  return <Grid.Cell ref={ref}>{children}</Grid.Cell>;
};

const v = [...normRange2d(1, 1)];
console.log("r2d", v);

export const BlendModeGrid: FC = () => {
  const range = useMemo(() => {
    const modes = Object.keys(FN_NAMES).length;
    const steps = STEPS;

    return transduce(
      // @ts-ignore
      map(([x, y]) => [x / (steps - 1), y]),
      push(),
      range2d(0, steps, 0, modes) // unsure why generator / destruturing isn't working on array.
    ) as [number, number][];
  }, []);

  return (
    <RenderBlobProvider>
      <Grid.Root>
        {range.map(([step, mode], i) =>
          step === -1 ? (
            <Grid.CellSpan>{Object.values(FN_NAMES)[mode]}</Grid.CellSpan>
          ) : (
            <RenderBlobBackground
              key={i}
              mode={mode}
              opacity={step}
              //
              /// base_url="https://images.unsplash.com/photo-1653942154398-e38352d10342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
              // landscape
              base_url="https://images.unsplash.com/photo-1655720406770-12ea329b5b61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80"
              // base_url="https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
              blend_url="https://images.unsplash.com/photo-1652385698317-b6a5cfc43d86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
              // blend_url="https://images.unsplash.com/photo-1653942154398-e38352d10342?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
            ></RenderBlobBackground>
          )
        )}
      </Grid.Root>
    </RenderBlobProvider>
  );
};
