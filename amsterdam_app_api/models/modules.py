""" Modules models for Mobile App
"""
from datetime import datetime
from django.db import models
from django.contrib.postgres.fields import ArrayField


class Module(models.Model):
    """ Module definition
    """
    slug = models.CharField(max_length=100, blank=False, primary_key=True)
    status = models.IntegerField(blank=False)


class ModuleVersions(models.Model):
    """ ModuleVersions definition
    """
    moduleSlug = models.CharField(max_length=100, blank=False)
    title = models.CharField(max_length=500, blank=False)
    icon = models.CharField(max_length=100, blank=False)
    version = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=1000, blank=False)

    class Meta:
        """ Constraints (unique together is deprecated)
        """
        constraints = [models.UniqueConstraint(fields=["moduleSlug", "version"],
                                               name="unique_slug_version")]

    def partial_update(self, *args, **kwargs):
        """ Patch function
        :param args: any
        :param kwargs: any
        :return: void
        """
        for key, value in kwargs.items():
            setattr(self, key, value)
        super().save()


class ModulesByApp(models.Model):
    """ Modules by app version
    """
    appVersion = models.CharField(max_length=100, blank=False)
    moduleSlug = models.CharField(max_length=500, blank=False)
    moduleVersion = models.CharField(max_length=100, blank=False)
    status = models.IntegerField(default=1, blank=False)

    class Meta:
        """ Constraints (unique together is deprecated)
        """
        constraints = [models.UniqueConstraint(fields=["appVersion", "moduleSlug"],
                                               name="unique_appVersion_moduleSlug")]

    def delete(self, *args, **kwargs):
        modules_by_app = list(ModulesByApp.objects.filter(appVersion=self.appVersion, moduleSlug=self.moduleSlug).all())
        if len(modules_by_app) == 1:
            module_order = ModuleOrder.objects.filter(appVersion=self.appVersion).first()
            if module_order is not None:
                module_order.order = [x for x in module_order.order if x != self.moduleSlug]
                module_order.save()
        super().delete(*args, **kwargs)

    def partial_update(self, *args, **kwargs):
        """ Patch function
        :param args: any
        :param kwargs: any
        :return: void
        """
        for key, value in kwargs.items():
            setattr(self, key, value)
        super().save()


class ModuleOrder(models.Model):
    """ Order the modules for an appversion
    """
    appVersion = models.CharField(max_length=100, blank=False, unique=True, primary_key=True)
    order = ArrayField(models.CharField(max_length=500, blank=False), blank=False)


class Releases(models.Model):
    """ App releases
    """
    version = models.CharField(max_length=15, blank=False, unique=True, primary_key=True)
    releaseNotes = models.CharField(max_length=2000, blank=False, unique=False)
    published = models.CharField(max_length=10, blank=False, unique=False)
    unpublished = models.CharField(max_length=10, null=True)
    created = models.DateTimeField(auto_created=True)
    modified = models.DateTimeField(null=True)

    def save(self, *args, **kwargs):
        """ On save, update timestamps """
        exist = Releases.objects.filter(version=self.version).first()
        if exist is None:
            self.created = datetime.now()
        else:
            self.modified = datetime.now()
        return super(Releases, self).save(*args, **kwargs)
