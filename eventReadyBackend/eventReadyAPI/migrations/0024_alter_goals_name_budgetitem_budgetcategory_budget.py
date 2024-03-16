# Generated by Django 4.2.10 on 2024-03-16 02:37

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("eventReadyAPI", "0023_alter_marketingposter_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="goals",
            name="name",
            field=models.CharField(max_length=64, verbose_name="Name"),
        ),
        migrations.CreateModel(
            name="BudgetItem",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=64, verbose_name="Name")),
                (
                    "description",
                    models.CharField(
                        blank=True,
                        max_length=1024,
                        null=True,
                        verbose_name="Description",
                    ),
                ),
                (
                    "quantity",
                    models.IntegerField(
                        validators=[django.core.validators.MinValueValidator(0)],
                        verbose_name="Quantity",
                    ),
                ),
                ("cost", models.FloatField(verbose_name="Cost")),
                ("total", models.FloatField(null=True, verbose_name="Total")),
                ("paid", models.BooleanField(default=False)),
                (
                    "event_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="budget_item",
                        to="eventReadyAPI.eventgeneralinfo",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="BudgetCategory",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=64, verbose_name="Name")),
                ("total", models.FloatField(verbose_name="Total")),
                (
                    "event_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="budget_category",
                        to="eventReadyAPI.eventgeneralinfo",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Budget",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("total", models.FloatField(verbose_name="Total")),
                ("leftover", models.FloatField(verbose_name="Leftover")),
                (
                    "progress",
                    models.IntegerField(
                        null=True,
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(100),
                        ],
                        verbose_name="Progress",
                    ),
                ),
                (
                    "event_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="budget",
                        to="eventReadyAPI.eventgeneralinfo",
                    ),
                ),
            ],
        ),
    ]