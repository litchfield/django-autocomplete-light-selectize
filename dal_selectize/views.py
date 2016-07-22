"""Selectize view implementation."""

import json

from dal.views import BaseQuerySetView

from django import http
from django.utils.translation import ugettext as _


class SelectizeViewMixin(object):
    """View mixin to render a JSON response for Selectize."""

    def dispatch(self, request, *args, **kwargs):
        self.selected = [ v for v in request.GET.get('selected', '').split(',') if v != '' ]
        return super(SelectizeViewMixin, self).dispatch(request, *args, **kwargs)

    def get_results(self, context):
        """Return data for the 'results' key of the response."""
        return [
            {
                'value': self.get_result_value(result),
                'text': self.get_result_label(result),
            } for result in context['object_list']
        ]

    def render_to_response(self, context):
        """Return a JSON response in Selectize format."""
        create_option = []

        q = self.request.GET.get('q', None)

        # ****** NYI item creation
        
        # display_create_option = False
        # if self.create_field and q:
        #     page_obj = context.get('page_obj', None)
        #     if page_obj is None or page_obj.number == 1:
        #         display_create_option = True

        # if display_create_option and self.has_add_permission(self.request):
        #     create_option = [{
        #         'value': q,
        #         'text': _('Create "%(new_value)s"') % {'new_value': q},
        #         'create_id': True,
        #     }]

        return http.HttpResponse(
            json.dumps({
                'results': self.get_results(context) + create_option,
            }),
            content_type='application/json',
        )


class SelectizeQuerySetView(SelectizeViewMixin, BaseQuerySetView):
    """List options for a Selectize widget."""
