export default function LoadingBar() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="flex space-x-2 text-white">
        <span className="w-2 h-2 bg-current rounded-full animate-[bounceStrong_0.6s_infinite]" />
        <span className="w-2 h-2 bg-current rounded-full animate-[bounceStrong_0.6s_infinite_0.15s]" />
        <span className="w-2 h-2 bg-current rounded-full animate-[bounceStrong_0.6s_infinite_0.3s]" />
      </div>
    </div>
  );
}
