""" Models for modules
"""
from rest_framework import serializers
from amsterdam_app_api.models import Modules
from amsterdam_app_api.models import ModulesByApp
from amsterdam_app_api.models import ModuleOrder


class ModulesSerializer(serializers.ModelSerializer):
    """ Modules """
    class Meta:
        model = Modules
        fields = '__all__'


class ModulesByAppSerializer(serializers.ModelSerializer):
    """ Modules by app """
    class Meta:
        model = ModulesByApp
        fields = '__all__'


class ModuleOrderSerializer(serializers.ModelSerializer):
    """ Module order """
    class Meta:
        model = ModuleOrder
        fields = '__all__'
