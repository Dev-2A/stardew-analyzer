from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "Stardew Analyzer"
    APP_VERSION: str = "0.1.0"
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE_MB: int = 50
    
    class Config:
        env_file = ".env"


settings = Settings()