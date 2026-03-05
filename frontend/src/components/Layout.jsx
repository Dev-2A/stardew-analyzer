export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-stardew-bg">
      {/* 헤더 */}
      <header className="bg-stardew-brown text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <span className="text-2xl">🌾</span>
          <div>
            <h1 className="text-lg font-bold leading-tight">Stardew Analyzer</h1>
            <p className="text-xs text-yellow-200 opacity-80">
              세이브 파일 분석기
            </p>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* 푸터 */}
      <footer className="text-center text-xs text-gray-400 py-6">
        Stardew Valley is a trademark of ConcernedApe. This tool is fan-made and not affiliated.
      </footer>
    </div>
  );
}