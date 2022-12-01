""" Create Django web/api user during first docker start
"""
import os
from django.contrib.auth import get_user_model
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "amsterdam_app_backend.settings")
django.setup()


def create_users():
    """ Create user based on credentials set in the docker environment
    :return: void
    """
    model = get_user_model()
    teamuser = os.getenv('TEAM_USERNAME')
    teampass = os.getenv('TEAM_PASSWORD')

    users = [[teamuser, teampass]]

    for user in users:
        if not model.objects.filter(username=user[0]).exists():
            account = model.objects.create_user(user[0], password=user[1])
            account.is_superuser = False
            account.is_staff = True
            account.save()


if __name__ == '__main__':
    create_users()
