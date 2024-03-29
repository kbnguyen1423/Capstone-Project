# Generated by Django 5.0.1 on 2024-02-21 21:35

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eventReadyAPI', '0006_alter_eventgeneralinfo_description_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=256, verbose_name='Title')),
                ('description', models.CharField(blank=True, max_length=1024, null=True, verbose_name='Description')),
                ('status', models.CharField(choices=[('to_do', 'To Do'), ('in_progress', 'In Progress'), ('done', 'Done')], max_length=20, verbose_name='Status')),
                ('priority', models.CharField(choices=[('low', 'Low'), ('medium', 'Medium'), ('high', 'High')], max_length=20, verbose_name='Priority')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='eventReadyAPI.eventgeneralinfo')),
            ],
        ),
    ]
