import React, { useState, useEffect, useRef } from "react";
import { BinarySearchTree } from "./BST_structure";
import * as d3 from "d3";

const BSTTemplate = () => {
  const BST = new BinarySearchTree();
  for (var i = 0; i < 5; i++) {
    BST.insert(`${Math.ceil(Math.random() * 10)} example`);
  }
  return BST;
};

const myLink = (d) => {
  return `M ${d.source.x} ${d.source.y + 48} l ${d.target.x - d.source.x} ${
    d.target.y - d.source.y
  }`;
};

const BSTViz = () => {
  const [number, setNumber] = useState(0);
  const [output, setOutput] = useState(BSTTemplate);
  const containerRef = useRef();

  const handleOnChange = (e) => {
    setNumber(e.target.value);
  };

  const handleRun = (e) => {
    e.preventDefault();
    runBuildTree(number);
  };

  const runBuildTree = (n) => {
    const BST = new BinarySearchTree();
    for (var i = 0; i < n; i++) {
      BST.insert(Math.ceil(Math.random() * 100));
    }
    setOutput(BST);
  };

  useEffect(() => {
    const height = 960;
    const width = containerRef.current.clientWidth;
    const root = d3.hierarchy(output.root);
    const treeLayout = d3.tree().size([width, height]);
    const links = treeLayout(root).links();
    const svg = d3.select("#BSTViz");

    svg
      .attr("width", width)
      .style("height", height)
      .style("border", "1px solid black");

    svg
      .selectAll("path")
      .data(links)
      .join("path")
      .transition()
      .duration(300)
      .attr("d", myLink)
      .attr("fill", "none")
      .attr("stroke", (d) => (d.target.data.data ? "black" : "none"));

    svg
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .transition()
      .duration(300)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y + 48)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text((d) => d.data.data)
      .style("display", (d) => (d.data.data === 0 ? "none" : "block"))
      .style("text-shadow", "-1px -1px 3px white")
      .style("user-select", "none");
  }, [output]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Binary Search Tree</h1>
      <form onSubmit={handleRun}>
        <span style={{ fontSize: "1rem" }}>
          {
            "Please enter the number of nodes you want to insert in the Binary Search Tree "
          }
        </span>
        <input
          onChange={handleOnChange}
          placeholder="between 3 and 100"
          style={{ textAlign: "center" }}
        />
        <div>
          <button
            style={{ margin: "1rem 0" }}
            disabled={(number > 100) | (number < 3)}
          >
            BUILD
          </button>
        </div>
      </form>
      <div
        ref={containerRef}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <svg id="BSTViz" />
      </div>
    </div>
  );
};

export default BSTViz;
