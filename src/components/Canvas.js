// src/components/Canvas.js
import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  removeElements,
} from "react-flow-renderer";
import { v4 as uuidv4 } from "uuid";
import Module from "./Module";

const nodeTypes = {
  llmProcessor: Module,
  llmCoordinator: Module,
  database: Module,
  apiEndpoint: Module,
};

const initialNodes = [
  { id: '1', type: 'apiEndpoint', position: { x: 0, y: 100 }, data: { label: 'API Endpoint 1', commands: "" } },
  { id: '2', type: 'apiEndpoint', position: { x: 0, y: 300 }, data: { label: 'API Endpoint 2', commands: "" } },
  { id: '4', type: 'llmProcessor', position: { x: 200, y: 100 }, data: { label: 'LLM - Processor 1', commands: "Activate: API Endpoint 1" } },
  { id: '5', type: 'llmProcessor', position: { x: 200, y: 300 }, data: { label: 'LLM - Processor 2', commands: "Activate: API Endpoint 2" } },
  { id: '7', type: 'llmCoordinator', position: { x: 400, y: 200 }, data: { label: 'LLM - Coordinator 1', commands: "Activate: LLM - Processor 1\nActivate: LLM - Processor 2" } },
];

const initialEdges = [
  { id: 'e1-4', source: '4', target: '1' },
  { id: 'e2-5', source: '5', target: '2' },
  { id: 'e7-4', source: '7', target: '4' },
  { id: 'e7-5', source: '7', target: '5' },
];

const Canvas = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [processorCount, setProcessorCount] = useState(2);
  const [coordinatorCount, setCoordinatorCount] = useState(1);
  const [databaseCount, setDatabaseCount] = useState(0);
  const [apiCount, setApiCount] = useState(2);

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

  const deleteModule = (nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
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
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onDelete: () => deleteModule(node.id),
          },
        }))}
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
