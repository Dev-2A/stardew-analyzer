import { useState } from "react";
import Layout from "./components/Layout";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <Layout>
      <p className="text-center text-stardew-brown font-semibold">
        세이브 파일을 업로드하면 분석이 시작됩니다 🌱
      </p>
    </Layout>
  );
}