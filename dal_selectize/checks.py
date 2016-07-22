"""Checks for the dal_selectize module."""
import os

from django.core import checks


def selectize_submodule_check(app_configs, **kwargs):
    """Return an error if selectize is missing."""
    errors = []
    dal_selectize_path = os.path.dirname(__file__)
    selectize = os.path.join(
        os.path.abspath(dal_selectize_path),
        'static/autocomplete_light/vendor/selectize/dist/js/selectize.min.js'
    )

    if not os.path.exists(selectize):
        errors.append(
            checks.Error(
                'selectize static files not checked out',
                hint='Run git submodule update --init in DAL ({})'.format(
                    os.path.dirname(dal_selectize_path)),
                id='dal_selectize.E001',
            )
        )

    return errors
