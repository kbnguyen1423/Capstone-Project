# Generated by Django 5.0.1 on 2024-01-20 19:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eventReadyAPI", "0002_alter_project_id"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="id",
            field=models.IntegerField(
                editable=False, primary_key=True, serialize=False
            ),
        ),
    ]
