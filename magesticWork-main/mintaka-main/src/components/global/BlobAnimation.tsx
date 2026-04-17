export default function BlobAnimation() {
  const blobAColor = "#EDB74D";
  const blobBColor = "#EB6666";
  const blobCColor = "#6FB18A";

  return (
    <>
      <div className="blob-cont absolute flex flex-col justify-center items-center -z-10 h-full w-full">
        <div 
          className="blob-color-a blob absolute rounded-[100px] blur-[80px] opacity-50 top-[200px] left-[100px] h-[200px] w-[200px]" 
          style={{ backgroundColor: blobAColor, animation: 'blob-color-a 8s infinite ease' }} 
        />
        <div 
          className="blob-color-c blob absolute rounded-[100px] blur-[80px] opacity-50 right-0 top-[300px] h-[250px] w-[200px]" 
          style={{ backgroundColor: blobCColor, animation: 'blob-color-c 8s infinite linear' }} 
        />
        <div 
          className="blob-color-b blob absolute rounded-[100px] blur-[80px] opacity-50 top-[80px] right-[-20px] h-[200px] w-[250px]" 
          style={{ backgroundColor: blobBColor, animation: 'blob-color-b 8s infinite ease' }} 
        />
      </div>

      <style>{`
        @keyframes blob-color-a {
          0% { top: 200px; left: 10%; transform: scale(1); }
          30% { top: 300px; left: 15%; transform: scale(1.2); }
          60% { top: 100px; left: 20%; transform: scale(1.3); }
          100% { top: 200px; left: 10%; transform: scale(1); }
        }
        @keyframes blob-color-b {
          0% { top: 80px; right: 40%; transform: scale(1.2); }
          30% { top: 300px; right: 50%; transform: scale(1); }
          60% { top: 200px; right: 60%; transform: scale(1); }
          100% { top: 80px; right: 40%; transform: scale(1.2); }
        }
        @keyframes blob-color-c {
          0% { top: 250px; right: 75%; transform: scale(1); }
          30% { top: 150px; right: 70%; transform: scale(1.4); }
          60% { top: 250px; right: 80%; transform: scale(1); }
          100% { top: 250px; right: 75%; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
