# Generated by Django 5.0.4 on 2024-07-18 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_room_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='current_song',
            field=models.CharField(default='null', max_length=50),
        ),
    ]