# Generated by Django 5.0.7 on 2024-07-11 23:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='name',
            field=models.CharField(default='Default Name', max_length=255),
        ),
    ]
