# Generated by Django 4.2.10 on 2024-03-11 22:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("eventReadyAPI", "0020_goals_tasks_alter_task_goal"),
    ]

    operations = [
        migrations.AlterField(
            model_name="goals",
            name="progress",
            field=models.IntegerField(
                null=True,
                validators=[
                    django.core.validators.MinValueValidator(0),
                    django.core.validators.MaxValueValidator(100),
                ],
                verbose_name="Progress",
            ),
        ),
    ]
