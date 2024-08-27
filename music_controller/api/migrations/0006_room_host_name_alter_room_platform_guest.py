# Generated by Django 5.0.4 on 2024-08-27 03:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_room_platform'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='host_name',
            field=models.CharField(default='John', max_length=50),
        ),
        migrations.AlterField(
            model_name='room',
            name='platform',
            field=models.CharField(default='spotify', max_length=50),
        ),
        migrations.CreateModel(
            name='Guest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('joined_at', models.DateTimeField(auto_now_add=True)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='guests', to='api.room')),
            ],
        ),
    ]