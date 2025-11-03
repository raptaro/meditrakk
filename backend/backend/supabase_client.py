# supabase_client.py
import os
import logging
from supabase import create_client, Client

logger = logging.getLogger(__name__)

# Don't load dotenv here - let Django handle it
# Just use os.getenv() and handle missing values gracefully

def get_supabase_client():
    """Factory function to create Supabase client"""
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        logger.warning("Supabase environment variables not found")
        return None
    
    try:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        logger.error(f"Failed to create Supabase client: {e}")
        return None

# Initialize the client
supabase = get_supabase_client()