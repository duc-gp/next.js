import dynamic from "next/dynamic";

const DummyB = dynamic(() => import("./DummyB"));

function DummyA() {
  return (
    <div>
      <div>Dummy Component A!</div>

      <DummyB />
    </div>
  );
}

export default DummyA;
