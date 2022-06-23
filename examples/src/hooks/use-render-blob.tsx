import { ISubscription } from "@thi.ng/rstream";
import {
  createContext,
  FC,
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  createRenderBlobContext,
  RenderBlobContext,
  RenderBlobResult,
} from "../blend-ast/render-blob";

export interface RenderBlobOpts {
  base_url: string;
  blend_url: string;
  mode: number;
  opacity: number;
}

const Context = createContext<RenderBlobContext>(null!);

export const RenderBlobProvider: FC<any> = ({ children }) => {
  const context = useMemo(() => {
    return createRenderBlobContext();
  }, []);

  useEffect(() => {
    return () => {
      context.dispose();
    };
  }, []);

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useRenderBlobContext = () => useContext(Context);

export const useRenderBlob = (
  ref: MutableRefObject<HTMLElement>,
  intersecting: boolean,
  opts: RenderBlobOpts
) => {
  const ctx = useRenderBlobContext();
  const blob = useRef<ISubscription<any, RenderBlobResult | null>>();

  useEffect(() => {
    if (intersecting && !blob.current) {
      console.log("Create blob, ");
      blob.current = ctx.renderBlob(opts).subscribe({
        next: (blob) => {
          if (blob) {
            ref.current.style.backgroundImage = `url(${blob.url})`;
          }
        },
      });
    }
  }, [intersecting]);

  useEffect(() => {
    return () => {
      if (blob.current) {
        console.log("Revoke");
        const res = blob.current.deref();
        if (res) {
          res.revoke();
        }
        blob.current.unsubscribe();
      }
    };
  }, []);
};
