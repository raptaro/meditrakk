from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('user', '0013_alter_useraccount_id'),
    ]

    operations = [
        # First drop existing policies
        migrations.RunSQL(
            'DROP POLICY IF EXISTS "Allow Secretary to Upload 1uq5nb8_0" ON storage.objects;',
            reverse_sql=migrations.RunSQL.noop
        ),
        migrations.RunSQL(
            'DROP POLICY IF EXISTS "Allow Uploads to lab_results" ON storage.objects;',
            reverse_sql=migrations.RunSQL.noop
        ),
        migrations.RunSQL(
            'DROP POLICY IF EXISTS "Allow View lab_results" ON storage.objects;',
            reverse_sql=migrations.RunSQL.noop
        ),
        
        # Then create new policies
        migrations.RunSQL(
            '''
            CREATE POLICY "Allow Uploads to lab_results"
              ON storage.objects
              FOR INSERT
              TO authenticated
              WITH CHECK (
                bucket_id = 'lab_results'::text
                AND EXISTS (
                  SELECT 1
                  FROM user_useraccount u
                  WHERE u.id::text = auth.uid()::text
                    AND u.role::text IN ('secretary'::text, 'doctor'::text, 'on-call-doctor'::text)
                )
              );
            ''',
            reverse_sql='DROP POLICY IF EXISTS "Allow Uploads to lab_results" ON storage.objects;'
        ),
        migrations.RunSQL(
            '''
            CREATE POLICY "Allow View lab_results"
              ON storage.objects
              FOR SELECT
              TO authenticated
              USING (
                bucket_id = 'lab_results'::text
                AND EXISTS (
                  SELECT 1
                  FROM user_useraccount u
                  WHERE u.id::text = auth.uid()::text
                    AND u.role::text IN ('doctor'::text, 'on-call-doctor'::text, 'patient'::text)
                )
              );
            ''',
            reverse_sql='DROP POLICY IF EXISTS "Allow View lab_results" ON storage.objects;'
        ),
    ]