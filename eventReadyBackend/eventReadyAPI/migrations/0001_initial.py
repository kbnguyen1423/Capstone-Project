# Generated by Django 5.0.1 on 2024-01-20 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Project",
            fields=[
                (
                    "id",
                    models.UUIDField(editable=False, primary_key=True, serialize=False),
                ),
                (
                    "name",
                    models.CharField(max_length=256, unique=True, verbose_name="Name"),
                ),
                ("doe", models.DateField(verbose_name="Day of Event")),
                ("start_time", models.TimeField(verbose_name="Start Time")),
                ("end_time", models.TimeField(verbose_name="End Time")),
                ("location", models.CharField(max_length=100, verbose_name="Location")),
                (
                    "description",
                    models.CharField(max_length=1024, verbose_name="Description"),
                ),
                ("created", models.DateField(auto_now_add=True)),
                ("active", models.BooleanField(default=True)),
            ],
        ),
    ]
