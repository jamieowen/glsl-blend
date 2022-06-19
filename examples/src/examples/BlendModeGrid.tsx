import { createRef, FC, useEffect, useMemo, useRef } from "react";
import { styled } from "@stitches/react";
import { FN_NAMES } from "glsl-blend/ast";
import {
  BlendRenderContext,
  createRenderContext,
  renderBlob,
} from "../blend/render-blob";

const Grid = {
  Root: styled("div", {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "10px",
  }),

  Cell: styled("div", {
    backgroundColor: "blue",
    aspectRatio: 1,
  }),
};

export const BlendRenderBlob: FC<{
  blend: BlendRenderContext;
  base_url: string;
  blend_url: string;
}> = ({ blend, base_url, blend_url }) => {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const $blob = renderBlob(base_url, blend_url, blend).subscribe({
      next: (blob) => {
        console.log("BLOB", ref.current);
        if (blob) {
          ref.current.style.backgroundImage = `url(${blob.url})`;
        }
      },
    });
    return () => {
      const blob = $blob.deref();
      if (blob) {
        console.log("Revoke");
        blob.revoke();
      }
      $blob.unsubscribe();
    };
  }, []);
  return <div ref={ref} style={{ width: "100%", height: "100%" }}></div>;
};

export const BlendModeGrid: FC = () => {
  const context = useMemo(() => {
    return createRenderContext();
  }, []);

  return (
    <Grid.Root>
      {Object.keys(FN_NAMES).map((name, i) => (
        <Grid.Cell key={i}>
          {name}
          <BlendRenderBlob
            blend={context}
            base_url="https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            blend_url="https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
          />
        </Grid.Cell>
      ))}
    </Grid.Root>
  );
};
