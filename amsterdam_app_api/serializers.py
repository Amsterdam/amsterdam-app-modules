""" Models for modules
"""
from rest_framework import serializers
from amsterdam_app_api.models import Module
from amsterdam_app_api.models import ModuleVersions
from amsterdam_app_api.models import ModuleVersionsByRelease
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
        fields = ('moduleSlug', 'title', 'version', 'description', 'icon')


class ModuleVersionsByReleaseSerializer(serializers.ModelSerializer):
    """ ModuleVersions by release """
    class Meta:
        model = ModuleVersionsByRelease
        fields = '__all__'


class ModuleOrderSerializer(serializers.ModelSerializer):
    """ Module order """
    class Meta:
        model = ModuleOrder
        fields = '__all__'
