"""Default AppConfig for dal_selectize."""
from django.apps import AppConfig
from django.core import checks

from .checks import selectize_submodule_check


class DefaultApp(AppConfig):
    """Default app for dal_selectize."""

    name = 'dal_selectize'

    def ready(self):
        """Register selectize_submodule_check."""
        checks.register(selectize_submodule_check)
