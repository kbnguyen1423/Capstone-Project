# Generated by Django 5.0.1 on 2024-02-10 00:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eventReadyAPI", "0006_alter_eventgeneralinfo_description_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="MarketingPoster",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=256)),
                ("description", models.TextField()),
                ("image", models.ImageField(upload_to="images")),
            ],
        ),
    ]
