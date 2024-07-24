# Generated by Django 5.0.4 on 2024-07-23 14:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_room_current_song'),
        ('spotify', '0002_vote'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Vote',
            new_name='VoteSkip',
        ),
        migrations.CreateModel(
            name='VotePrev',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('song_id', models.CharField(max_length=50)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
    ]
