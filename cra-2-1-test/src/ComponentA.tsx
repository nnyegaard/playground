import React from "react";

export const ComponentA = () => <>Hello world from ComponentA</>;

export class ComponentC extends React.Component {
  public render() {
    const result = bla(2);

    return (
      <>
        <div>Hello world</div>
        {result}
      </>
    );
  }
}

type Bla = {
  name: string;
  age: number;
};

const bla = (input: number): Bla | void => {
  if (input % 2) {
    return {
      name: "gdgf",
      age: 1
    };
  }
};
