import { useState } from "react";
import { styled } from "@stitches/react";
import { Router, Route, Link } from "wouter";
import { BlendModeGrid } from "./examples/BlendModeGrid";
import { BlendLayers3JS } from "./examples/BlendLayers3JS";

const Button = styled("button", {
  backgroundColor: "Blue",
  variants: {
    color: {
      pink: {
        backgroundColor: "pink",
      },
    },
  },
});

const examples = [
  { path: "/blendgrid", component: <BlendModeGrid /> },
  { path: "/threejs-layers", component: <BlendLayers3JS /> },
  { path: "/three", component: <div>Three</div> },
];

const Menu = () => {
  return (
    <>
      {examples.map((e, i) => (
        <Link key={i} to={e.path}>
          {e.path}
        </Link>
      ))}
    </>
  );
};

const Examples = () => {
  return (
    <>
      {examples.map((e, i) => (
        <Route key={i} path={e.path}>
          {e.component}
        </Route>
      ))}
    </>
  );
};

const Page = styled("div", {});

function App() {
  return (
    <div>
      <header>
        <Menu />
      </header>
      <section>
        <Examples />
      </section>
    </div>
  );
}

export default App;
