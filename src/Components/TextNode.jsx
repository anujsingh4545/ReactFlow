import {useCallback, useState} from "react";
import {Handle, Position} from "reactflow";

function TextUpdaterNode({data}) {
  const [text, setText] = useState(data.label);
  const [showDelete, setShowDelete] = useState(false);

  const closeDelete = () => {
    setTimeout(() => {
      setShowDelete(false);
    }, 500);
  };

  return (
    <>
      <Handle type="target" position={Position.Top} style={{background: "red"}} />
      <div className="relative" onClick={() => setShowDelete(true)} onBlur={closeDelete}>
        <input id="text" value={text} onChange={(e) => setText(e.target.value)} name="text" className=" w-full text-center border-[0.1px] outline-none text-[0.8rem] py-2 rounded-md  border-black" />
        {showDelete && (
          <section onClick={() => data.deleteNode(data.id)} className=" cursor-pointer absolute  bg-red-500 rounded-full flex items-center justify-center pb-[1px] size-3 bottom-9 right-[-10px]">
            <p className="text-center text-white">-</p>
          </section>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} id="a" style={{background: "green"}} />
      <Handle type="source" position={Position.Left} id="b" style={{background: "green"}} />
      <Handle type="target" position={Position.Right} id="c" style={{background: "red"}} />
    </>
  );
}

export default TextUpdaterNode;
