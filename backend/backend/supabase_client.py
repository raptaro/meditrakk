# supabase_client.py
import os
import logging
from supabase import create_client
import boto3
from botocore.client import Config

logger = logging.getLogger(__name__)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SERVICE_ROLE_KEY")

S3_ACCESS_KEY = os.getenv("SUPABASE_S3_ACCESS_KEY_ID")
S3_SECRET_KEY = os.getenv("SUPABASE_S3_SECRET_ACCESS_KEY")
S3_BUCKET = os.getenv("SUPABASE_STORAGE_BUCKET")
S3_ENDPOINT = os.getenv("SUPABASE_S3_ENDPOINT_URL")
S3_REGION = os.getenv("SUPABASE_S3_REGION_NAME")

def get_supabase_service_client():
    """Return supabase client created with SERVICE ROLE key (server side only)."""
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        logger.warning("Supabase service role key missing.")
        return None
    try:
        return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    except Exception as e:
        logger.exception("Failed to create supabase service client: %s", e)
        return None

def get_supabase_public_client():
    """Public/anon client. Safer for non-sensitive reads only."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        return None
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        logger.exception("Failed to create supabase public client: %s", e)
        return None

def get_boto3_s3_client():
    """Return a boto3 S3 client configured for Supabase S3-compatible endpoint."""
    if not all([S3_ACCESS_KEY, S3_SECRET_KEY, S3_ENDPOINT]):
        logger.warning("S3 boto3 env vars missing.")
        return None
    # Use signature v4 and path-style addressing for custom endpoints
    config = Config(signature_version="s3v4", s3={'addressing_style': 'path'})
    return boto3.client(
        "s3",
        region_name=S3_REGION or None,
        aws_access_key_id=S3_ACCESS_KEY,
        aws_secret_access_key=S3_SECRET_KEY,
        endpoint_url=S3_ENDPOINT,
        config=config
    )

# singletons for convenience
supabase = get_supabase_service_client()
supabase_public = get_supabase_public_client()
s3_client = get_boto3_s3_client()
