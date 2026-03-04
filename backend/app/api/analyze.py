from fastapi import APIRouter, File, HTTPException, UploadFile

from app.models.analysis import AnalysisResult
from app.parser.save_parser import StardewSaveParser

router = APIRouter(prefix="/api", tags=["analyze"])

MAX_FILE_SIZE = 50 * 1024 * 1024    # 50MB


@router.post("/analyze", response_model=AnalysisResult)
async def analyze_save_file(file: UploadFile = File(...)):
    """
    스타듀밸리 세이브 파일을 업로드하면 분석 결과를 반환합니다.
    """
    # 파일 크기 체크
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="파일 크기가 너무 큽니다. (최대 50MB)",
        )
    
    # XML 파싱 시도
    try:
        parser = StardewSaveParser(content)
        result = parser.parse_all()
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"세이브 파일 파싱에 실패했습니다: {str(e)}",
        )
    
    return AnalysisResult(**result)