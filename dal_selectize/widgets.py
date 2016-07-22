"""Selectize widget implementation module."""

from dal.widgets import (
    QuerySetSelectMixin,
    Select,
    SelectMultiple,
    WidgetMixin
)

from django import forms
from django.utils import six


class SelectizeWidgetMixin(object):
    """Mixin for Selectize widgets."""

    class Media:
        """Automatically include static files for the admin."""

        css = {
            'all': (
                'autocomplete_light/vendor/selectize/dist/css/selectize.css',
                'autocomplete_light/selectize.css',
            )
        }
        js = (
            'autocomplete_light/jquery.init.js',
            'autocomplete_light/autocomplete.init.js',
            'autocomplete_light/vendor/selectize/dist/js/selectize.min.js',
            'autocomplete_light/selectize.js',
        )

    autocomplete_function = 'selectize'


class Selectize(SelectizeWidgetMixin, Select):
    """Selectize widget for regular choices."""


class SelectizeMultiple(SelectizeWidgetMixin, SelectMultiple):
    """SelectizeMultiple widget for regular choices."""


class ModelSelectize(QuerySetSelectMixin,
                   SelectizeWidgetMixin,
                   forms.Select):
    """Select widget for QuerySet choices and Selectize."""


class ModelSelectizeMultiple(QuerySetSelectMixin,
                           SelectizeWidgetMixin,
                           forms.SelectMultiple):
    """SelectMultiple widget for QuerySet choices and Selectize."""


class TagSelectize(WidgetMixin,
                 SelectizeWidgetMixin,
                 forms.SelectMultiple):
    """Selectize in tag mode."""

    def build_attrs(self, *args, **kwargs):
        """Automatically set data-tags=1."""
        attrs = super(TagSelectize, self).build_attrs(*args, **kwargs)
        attrs.setdefault('data-tags', 1)
        return attrs

    def value_from_datadict(self, data, files, name):
        """Return a comma-separated list of options.

        This is needed because Selectize uses a multiple select even in tag mode,
        and the model field expects a comma-separated list of tags.
        """
        values = super(TagSelectize, self).value_from_datadict(data, files, name)
        return six.text_type(',').join(values)
