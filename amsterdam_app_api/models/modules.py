""" Modules models for Mobile App
"""
from django.db import models
from django.contrib.postgres.fields import ArrayField


class Modules(models.Model):
    """ Modules definition
    """
    slug = models.CharField(max_length=100, blank=False)
    title = models.CharField(max_length=500, blank=False)
    icon = models.CharField(max_length=100, blank=False)
    version = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=1000, blank=False)

    class Meta:
        """ Constraints (unique together is deprecated)
        """
        constraints = [models.UniqueConstraint(fields=["slug", "version"],
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
