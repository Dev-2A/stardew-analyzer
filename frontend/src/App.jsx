import { useState } from "react";
import { analyzeFile } from "./api/client";
import BasicInfoCard from "./components/BasicInfoCard";
import FarmStatusCard from "./components/FarmStatusCard";
import Layout from "./components/Layout";
import SkillsChart from "./components/SkillsChart";
import UploadZone from "./components/UploadZone";
import FriendshipRadar from "./components/FriendshipRadar";
import PerfectionTracker from "./components/PerfectionTracker";

export default function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeFile(file);
      setResult(data);
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        "파일 분석에 실패했습니다. 올바른 세이브 파일인지 확인해주세요.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <Layout>
      {/* 업로드 영역: 결과가 없을 때만 표시 */}
      {!result && <UploadZone onUpload={handleUpload} isLoading={isLoading} />}

      {/* 에러 메시지 */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* 분석 결과 */}
      {result && (
        <div className="space-y-6">
          {/* 다시 분석 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-stardew-brown text-white rounded-lg text-sm
                         hover:bg-yellow-800 transition-colors"
            >
              🔄 다른 파일 분석하기
            </button>
          </div>

          {/* 기본 정보 카드 */}
          <BasicInfoCard data={result.basic_info} />

          {/* 스킬 레벨 */}
          <SkillsChart skills={result.skills} />

          {/* 농장 현황 */}
          <FarmStatusCard data={result.farm_status} />

          {/* 주민 우정도 */}
          <FriendshipRadar friendship={result.friendship} />

          {/* 퍼펙션 달성률 */}
          <PerfectionTracker perfection={result.perfection} />
        </div>
      )}
    </Layout>
  );
}
