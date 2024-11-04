// src/components/Canvas.js
import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import Module from "./Module";

// Define nodeTypes outside the component to prevent re-creation
const nodeTypes = {
  llmProcessor: Module,
  llmCoordinator: Module,
  database: Module,
  apiEndpoint: Module,
};

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [processorCount, setProcessorCount] = useState(0);
  const [coordinatorCount, setCoordinatorCount] = useState(0);
  const [databaseCount, setDatabaseCount] = useState(0);
  const [apiCount, setApiCount] = useState(0);

  const addLLMProcessorModule = () => {
    setProcessorCount((count) => count + 1);
    const newNode = {
      id: uuidv4(),
      type: "llmProcessor",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `LLM - Processor ${processorCount + 1}`, commands: "" },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const addLLMCoordinatorModule = () => {
    setCoordinatorCount((count) => count + 1);
    const newNode = {
      id: uuidv4(),
      type: "llmCoordinator",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `LLM - Coordinator ${coordinatorCount + 1}`, commands: "" },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const addDatabaseModule = () => {
    setDatabaseCount((count) => count + 1);
    const newNode = {
      id: uuidv4(),
      type: "database",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Database ${databaseCount + 1}`, commands: "" },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const addAPIEndpointModule = () => {
    setApiCount((count) => count + 1);
    const newNode = {
      id: uuidv4(),
      type: "apiEndpoint",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `API Endpoint ${apiCount + 1}`, commands: "" },
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const onConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));

    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (sourceNode && targetNode) {
      const updatedNodes = nodes.map((node) => {
        if (node.id === sourceNode.id) {
          const updatedCommands = `${node.data.commands}\nActivate: ${targetNode.data.label}`;
          return {
            ...node,
            data: {
              ...node.data,
              commands: updatedCommands,
            },
          };
        }
        return node;
      });

      setNodes(updatedNodes);
    }
  };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <div className="canvas-button-container">
        <button onClick={addLLMProcessorModule} className="canvas-button">
          Add LLM - Processor
        </button>
        <button onClick={addLLMCoordinatorModule} className="canvas-button">
          Add LLM - Coordinator
        </button>
        <button onClick={addDatabaseModule} className="canvas-button">
          Add Database Module
        </button>
        <button onClick={addAPIEndpointModule} className="canvas-button">
          Add API Endpoint Module
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
