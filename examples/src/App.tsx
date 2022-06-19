import { useState } from "react";
import { styled } from "@stitches/react";

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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Button color="pink">Button 1</Button>
        <Button as="div">Button 2</Button>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
    </div>
  );
}

export default App;
