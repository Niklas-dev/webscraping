export default function BlurColors() {
  return (
    <div className="absolute w-full h-96 blur-[135px] flex justify-center -top-10 gap-2 ">
      <div className="w-44 h-44 bg-red-600 rounded-full"></div>
      <div className="w-44 h-44 bg-orange-600 rounded-full"></div>
      <div className="w-44 h-44 bg-yellow-400 rounded-full"></div>
      <div className="w-44 h-44 bg-green-600 rounded-full"></div>
      <div className="w-44 h-44 bg-blue-700 rounded-full"></div>
      <div className="w-44 h-44 bg-indigo-600 rounded-full"></div>
    </div>
  );
}
