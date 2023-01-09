""" Models for modules
"""
from rest_framework import serializers
from amsterdam_app_api.models import Module
from amsterdam_app_api.models import ModuleVersions
from amsterdam_app_api.models import ModulesByApp
from amsterdam_app_api.models import ModuleOrder


class ModuleSerializer(serializers.ModelSerializer):
    """ ModuleVersions """
    class Meta:
        model = Module
        fields = '__all__'


class ModuleVersionsSerializer(serializers.ModelSerializer):
    """ ModuleVersions """
    class Meta:
        model = ModuleVersions
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
