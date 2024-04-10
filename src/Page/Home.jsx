import React, {useCallback, useMemo, useState} from "react";
import ReactFlow, {MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge, updateEdge} from "reactflow";
import "reactflow/dist/style.css";
import TextUpdaterNode from "../Components/TextNode";
import {v4 as uuidv4} from "uuid";

const initialNodes = [];
const initialEdges = [];

const Home = () => {
  const nodeTypes = useMemo(() => ({textUpdater: TextUpdaterNode}), []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => {
      const edge = {...connection};

      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => setEdges((els) => updateEdge(oldEdge, newConnection, els)), []);

  const createNode = async () => {
    const uuid = await uuidv4();
    const newNode = {id: uuid, type: "textUpdater", position: {x: 450, y: 250}, data: {label: "Hello world", id: uuid, deleteNode: deleteNode}, innerWidth: "100", outerHeight: 1000};
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const deleteNode = (id) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
  };

  return (
    <main className=" w-full h-screen  max-h-screen max-w-full  grid grid-cols-10  items-center justify-center ">
      <section className=" col-span-2 h-full w-full bg-black py-6 rounded-r-3xl flex flex-col relative items-center justify-center ">
        <div className=" w-full bg-zinc-800 py-2 absolute top-5 ">
          <p className=" w-full text-center text-white tracking-widest text-[1rem] italic ">Node - Link</p>
        </div>

        <div className=" flex flex-col w-full gap-y-10 px-5 ">
          <button className=" w-full  bg-blue-500  text-white py-2 text-[0.95rem] rounded-md tracking-wider " onClick={createNode}>
            Create Node
          </button>
        </div>
      </section>

      <section className=" col-span-8 h-full w-full">
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} onEdgeUpdate={onEdgeUpdate} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect}>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </section>
    </main>
  );
};

export default Home;
