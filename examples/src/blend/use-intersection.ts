import { useEffect, useRef, useState } from "react";

type IntersectionCallback = (intersecting: boolean) => void;

const createProxy = () => {
  const map = new Map<Element, IntersectionCallback>();
  const instance: IntersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const cb = map.get(entry.target);
        if (cb) {
          cb(entry.isIntersecting);
        }
      });
    },
    {
      threshold: 0,
    }
  );

  return {
    observe: (ele: Element, cb: IntersectionCallback) => {
      map.set(ele, cb);
      instance.observe(ele);
    },
    unobserve: (ele: Element) => {
      map.delete(ele);
      instance.unobserve(ele);
    },
  };
};

let proxy: ReturnType<typeof createProxy>;

const getSingleton = () => {
  if (!proxy) {
    proxy = createProxy();
  }
  return proxy;
};

export const useIntersection = <T extends Element>() => {
  const ref = useRef<T>(null!);
  const [intersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const io = getSingleton();
    if (ref.current) {
      io.observe(ref.current, (inter) => {
        setIntersecting(inter);
      });
    }
    return () => {
      if (ref.current) {
        io.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, intersecting] as [typeof ref, boolean];
};
